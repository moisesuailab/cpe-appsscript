const SheetsApiService = {

  columnToLetter(column) {
    let temp, letter = '';
    while (column > 0) {
      temp = (column - 1) % 26;
      letter = String.fromCharCode(temp + 65) + letter;
      column = (column - temp - 1) / 26;
    }
    return letter;
  },
  
  toA1Notation(row, col, numRows = 1, numCols = 1) {
    const startCol = this.columnToLetter(col);
    const endCol = this.columnToLetter(col + numCols - 1);
    const startRow = row;
    const endRow = row + numRows - 1;
    
    if (numRows === 1 && numCols === 1) {
      return `${startCol}${startRow}`;
    }
    
    return `${startCol}${startRow}:${endCol}${endRow}`;
  },
  
  getSheetId(spreadsheetId, sheetName, forceRefresh = false) {
    const key   = `sheetId_${spreadsheetId}_${sheetName}`;
    const props = PropertiesService.getScriptProperties();

    if (!forceRefresh) {
      const saved = props.getProperty(key);
      if (saved !== null) return parseInt(saved);
    }

    try {
      const ss    = Sheets.Spreadsheets.get(spreadsheetId);
      const sheet = ss.sheets.find(s => s.properties.title === sheetName);
      if (!sheet) return null;

      props.setProperty(key, String(sheet.properties.sheetId));
      return sheet.properties.sheetId;
    } catch (error) {
      Utils.logError('SheetsApiService.getSheetId', error);
      throw new Error(`Não foi possível obter sheetId para '${sheetName}': ${error.message}`);
    }
  },
  
  getAllValues(spreadsheetId, sheetName) {
    try {
      const range = `${sheetName}`;
      const response = Sheets.Spreadsheets.Values.get(spreadsheetId, range);
      
      return response.values || [];
    } catch (error) {
      Utils.logError('SheetsApiService.getAllValues', error);
      throw error;
    }
  },
  
  getValues(spreadsheetId, sheetName, a1Notation) {
    try {
      const range = `${sheetName}!${a1Notation}`;
      const response = Sheets.Spreadsheets.Values.get(spreadsheetId, range);
      
      return response.values || [];
    } catch (error) {
      Utils.logError('SheetsApiService.getValues', error);
      throw error;
    }
  },
  
  updateValues(spreadsheetId, sheetName, a1Notation, values, valueInputOption = 'USER_ENTERED') {
    try {
      const range = `${sheetName}!${a1Notation}`;
      
      const response = Sheets.Spreadsheets.Values.update(
        {
          values: values
        },
        spreadsheetId,
        range,
        {
          valueInputOption: valueInputOption
        }
      );
      
      return response;
    } catch (error) {
      Utils.logError('SheetsApiService.updateValues', error);
      throw error;
    }
  },
  
  appendValues(spreadsheetId, sheetName, values) {
    try {
      const range = `${sheetName}`;
      
      const response = Sheets.Spreadsheets.Values.append(
        {
          values: values
        },
        spreadsheetId,
        range,
        {
          valueInputOption: 'USER_ENTERED',
          insertDataOption: 'OVERWRITE'
        }
      );
      
      return response;
    } catch (error) {
      Utils.logError('SheetsApiService.appendValues', error);
      throw error;
    }
  },
  
  deleteRow(spreadsheetId, sheetName, rowIndex) {
    return this._withSheetIdRetry(spreadsheetId, sheetName, (sheetId) =>
      this._executeBatchDelete(spreadsheetId, sheetId, rowIndex)
    );
  },

  _withSheetIdRetry(spreadsheetId, sheetName, fn) {
    const sheetId = this.getSheetId(spreadsheetId, sheetName);
    if (sheetId === null) throw new Error(`Aba '${sheetName}' não encontrada na planilha.`);

    try {
      return fn(sheetId);
    } catch (firstError) {
      Utils.logError('SheetsApiService._withSheetIdRetry', firstError);

      const freshId = this.getSheetId(spreadsheetId, sheetName, true);
      if (freshId === null) throw new Error(`Aba '${sheetName}' não encontrada na planilha.`);

      if (freshId === sheetId) throw firstError;

      try {
        return fn(freshId);
      } catch (retryError) {
        Utils.logError('SheetsApiService._withSheetIdRetry [retry falhou]', retryError);
        throw retryError;
      }
    }
  },

  _executeBatchDelete(spreadsheetId, sheetId, rowIndex) {
    return Sheets.Spreadsheets.batchUpdate(
      { requests: [{ deleteDimension: { range: {
        sheetId,
        dimension:   'ROWS',
        startIndex:  rowIndex - 1,
        endIndex:    rowIndex,
      }}}]},
      spreadsheetId
    );
  },
  
  batchUpdate(spreadsheetId, requests) {
    try {
      const response = Sheets.Spreadsheets.batchUpdate(
        {
          requests: requests
        },
        spreadsheetId
      );
      
      return response;
    } catch (error) {
      Utils.logError('SheetsApiService.batchUpdate', error);
      throw error;
    }
  },
  
  clearSheetIdProperties(spreadsheetId = null) {
    try {
      const props    = PropertiesService.getScriptProperties();
      const allProps = props.getProperties();

      Object.keys(allProps).forEach(key => {
        if (key.startsWith('sheetId_')) {
          if (!spreadsheetId || key.includes(spreadsheetId)) props.deleteProperty(key);
        }
      });
    } catch (error) {
      Utils.logError('SheetsApiService.clearSheetIdProperties', error);
    }
  },

  batchGet(spreadsheetId, ranges) {
    try {
      const response = Sheets.Spreadsheets.Values.batchGet(spreadsheetId, { ranges });
      return (response.valueRanges || []).map(vr => vr.values || []);
    } catch (error) {
      Utils.logError('SheetsApiService.batchGet', error);
      throw error;
    }
  },

  clearValues(spreadsheetId, sheetName, range) {
    try {
      return Sheets.Spreadsheets.Values.clear({}, spreadsheetId, `${sheetName}!${range}`);
    } catch (error) {
      Utils.logError('SheetsApiService.clearValues', error);
      throw error;
    }
  },
};