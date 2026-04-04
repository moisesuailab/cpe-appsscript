const EntityService = {

  _assertUnique(records, fieldName, value, excludeId = null, idColumn = CONFIG.ID_COLUMN) {
    const duplicate = records.find(r =>
      String(r[fieldName]) === String(value) &&
      (excludeId ? String(r[idColumn]) !== String(excludeId) : true)
    );
    if (duplicate) throw new Error(`Valor '${value}' para '${fieldName}' já existe.`);
  },
  
  create(sheetName, data, validationRules = null, beforeCreate = null) {
    try {
      if (validationRules) {
        ValidationService.validate(data, validationRules);
      }
      
      if (beforeCreate && typeof beforeCreate === 'function') {
        beforeCreate(data);
      }
      
      const result = CrudRepository.create(sheetName, data);
      return Utils.createResponse('success', result.data, null, { rowNumber: result.rowNumber });      
    } catch (error) {
      Utils.logError('EntityService.create', error);
      return Utils.createResponse('error', null, error.message);
    }
  },
  
  findAll(sheetName, filters = null) {
    try {
      let records = CrudRepository.findAll(sheetName);
      
      if (filters && typeof filters === 'function') {
        records = records.filter(filters);
      }
      
      return Utils.createResponse('success', records);
      
    } catch (error) {
      Utils.logError('EntityService.findAll', error);
      return Utils.createResponse('error', null, error.message);
    }
  },
  
  findById(sheetName, id) {
    try {
      const record = CrudRepository.findById(sheetName, id);
      if (!record) throw new Error(`Registro com ID '${id}' não encontrado.`);
      return Utils.createResponse('success', record);
    } catch (error) {
      Utils.logError('EntityService.findById', error);
      return Utils.createResponse('error', null, error.message);
    }
  },

  findByIdOrNull(sheetName, id) {
    try {
      const record = CrudRepository.findById(sheetName, id);
      return Utils.createResponse('success', record);
    } catch (error) {
      Utils.logError('EntityService.findByIdOrNull', error);
      return Utils.createResponse('error', null, error.message);
    }
  },
  
  update(sheetName, id, data, validationRules = null, beforeUpdate = null) {
    try {
      if (validationRules) ValidationService.validate(data, validationRules);
      if (typeof beforeUpdate === 'function') beforeUpdate(id, data);
 
      const result = CrudRepository.update(sheetName, id, data);
      return Utils.createResponse('success', result.data, null, { rowNumber: result.rowNumber });
    } catch (error) {
      Utils.logError('EntityService.update', error);
      return Utils.createResponse('error', null, error.message);
    }
  },
 
  delete(sheetName, id, beforeDelete = null) {
    try {
      if (typeof beforeDelete === 'function') beforeDelete(id);
 
      const result = CrudRepository.delete(sheetName, id);
      return Utils.createResponse('success', result);
    } catch (error) {
      Utils.logError('EntityService.delete', error);
      return Utils.createResponse('error', null, error.message);
    }
  },
  
  batchCreate(sheetName, dataArray, validationRules = null) {
    try {
      if (validationRules) {
        const errors = [];

        dataArray.forEach((data, index) => {
          try {
            ValidationService.validate(data, validationRules);
          } catch (e) {
            errors.push(`Item ${index + 1}: ${e.message}`);
          }
        });

        if (errors.length > 0) {
          throw new Error(`Erros de validação em lote:\n- ${errors.join('\n- ')}`);
        }
      }

      const result = CrudRepository.batchCreate(sheetName, dataArray);
      return Utils.createResponse('success', result);

    } catch (error) {
      Utils.logError('EntityService.batchCreate', error);
      return Utils.createResponse('error', null, error.message);
    }
  }
};