const CrudRepository = {

  getHeaders(sheetName) {
    try {
      const values = SheetsApiService.getValues(
        CONFIG.SPREADSHEET_ID,
        sheetName,
        '1:1'
      );

      if (!values || values.length === 0) {
        throw new Error(`Planilha '${sheetName}' está vazia ou sem headers.`);
      }

      return values[0];
    } catch (error) {
      Utils.logError('CrudRepository.getHeaders', error);
      throw error;
    }
  },

  _loadSheetData(sheetName) {
    const values = SheetsApiService.getAllValues(CONFIG.SPREADSHEET_ID, sheetName);
    if (!values || values.length < 2) return null;
    return { values, headers: values[0] };
  },

  _findRow(sheetName, id, sheet = null) {
    const data = sheet || this._loadSheetData(sheetName);
    if (!data) throw new Error('Planilha vazia ou sem dados.');

    const { values, headers } = data;
    const idColIndex = Utils.findColumnIndex(headers, CONFIG.ID_COLUMN);
    const rowIndex   = values.findIndex((row, i) => i > 0 && String(row[idColIndex]) === String(id));

    if (rowIndex === -1) throw new Error(`Registro com ID '${id}' não encontrado em '${sheetName}'.`);
    return { values, headers, rowIndex };
  },

  findAll(sheetName) {
    try {
      const values = SheetsApiService.getAllValues(
        CONFIG.SPREADSHEET_ID,
        sheetName
      );
      return Utils.parseSheetValues(values);
    } catch (error) {
      Utils.logError('CrudRepository.findAll', error);
      throw error;
    }
  },

  findAllBatch(sheetNames) {
    try {
      const ranges  = sheetNames.map(name => `${name}!A:ZZ`);
      const results = SheetsApiService.batchGet(CONFIG.SPREADSHEET_ID, ranges);
      return sheetNames.reduce((acc, name, index) => {
        acc[name] = Utils.parseSheetValues(results[index]);
        return acc;
      }, {});
    } catch (error) {
      Utils.logError('CrudRepository.findAllBatch', error);
      throw error;
    }
  },
  
  findById(sheetName, id, sheet = null) {
    try {
      const data = sheet || this._loadSheetData(sheetName);
      if (!data) return null;

      const { values, headers, rowIndex } = this._findRow(sheetName, id, data);
      return Utils.arrayToObject(headers, values[rowIndex]);
    } catch (error) {
      if (error.message.includes('não encontrado')) return null;
      Utils.logError('CrudRepository.findById', error);
      throw error;
    }
  },
  
  _withLock(fn) {
    const lock = LockService.getScriptLock();
    lock.waitLock(5000);
    try {
      return fn();
    } finally {
      lock.releaseLock();
    }
  },

  create(sheetName, data) {
    return this._withLock(() => {
      try {
        const headers = this.getHeaders(sheetName);
        const dataWithId = data[CONFIG.ID_COLUMN]
          ? data
          : { ...data, [CONFIG.ID_COLUMN]: this.generateId() };
        const newRow = Utils.objectToArray(headers, dataWithId);
        const response = SheetsApiService.appendValues(CONFIG.SPREADSHEET_ID, sheetName, [newRow]);
        const updatedRange = response.updates.updatedRange;
        const rowMatch = updatedRange.match(/!A(\d+)/);
        const rowNumber = rowMatch ? parseInt(rowMatch[1]) : null;
        return { success: true, rowNumber, data: dataWithId };
      } catch (error) {
        Utils.logError('CrudRepository.create', error);
        throw error;
      }
    });
  },

  update(sheetName, id, data) {
    return this._withLock(() => {
      try {
        const sheet = this._loadSheetData(sheetName);
        const { values, headers, rowIndex } = this._findRow(sheetName, id, sheet);
        const currentRow = Utils.arrayToObject(headers, values[rowIndex]);
        const updatedRow = { ...currentRow, ...data, [CONFIG.ID_COLUMN]: id };
        const updatedArray = Utils.objectToArray(headers, updatedRow);
        const a1 = SheetsApiService.toA1Notation(rowIndex + 1, 1, 1, updatedArray.length);
        SheetsApiService.updateValues(CONFIG.SPREADSHEET_ID, sheetName, a1, [updatedArray]);
        return { success: true, rowNumber: rowIndex + 1, data: updatedRow };
      } catch (error) {
        Utils.logError('CrudRepository.update', error);
        throw error;
      }
    });
  },

  delete(sheetName, id) {
    return this._withLock(() => {
      try {
        const sheet = this._loadSheetData(sheetName);
        const { rowIndex } = this._findRow(sheetName, id, sheet);
        SheetsApiService.deleteRow(CONFIG.SPREADSHEET_ID, sheetName, rowIndex + 1);
        return { success: true, rowNumber: rowIndex + 1, deletedId: id };
      } catch (error) {
        Utils.logError('CrudRepository.delete', error);
        throw error;
      }
    });
  },

  batchCreate(sheetName, dataArray) {
    return this._withLock(() => {
      try {
        if (!dataArray || dataArray.length === 0) throw new Error('Array de dados vazio.');
        const headers = this.getHeaders(sheetName);
        const matrix = dataArray.map(obj => Utils.objectToArray(headers, obj));
        const response = SheetsApiService.appendValues(CONFIG.SPREADSHEET_ID, sheetName, matrix);
        const updatedRange = response.updates.updatedRange;
        const rowMatch = updatedRange.match(/!A(\d+)/);
        const startRow = rowMatch ? parseInt(rowMatch[1]) : null;
        return { success: true, insertedCount: matrix.length, startRow };
      } catch (error) {
        Utils.logError('CrudRepository.batchCreate', error);
        throw error;
      }
    });
  },

  generateId() {
    return Utilities.getUuid();
  },
};