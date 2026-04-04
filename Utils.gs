const Utils = {
  
  createResponse(status, data = null, message = null, meta = null) {
    const response = {
      status,
      data,
      message,
      timestamp: new Date().toISOString()
    };
    if (meta) response.meta = meta;
    return response;
  },

  parseSheetValues(values) {
    if (!values || values.length < 2) return [];
    const [headers, ...rows] = values;
    return rows.map(row => this.arrayToObject(headers, row));
  },
  
  arrayToObject(headers, row) {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i] !== undefined ? row[i] : null;
    });
    return obj;
  },
  
  objectToArray(headers, obj) {
    return headers.map(header => obj[header] !== undefined ? obj[header] : '');
  },
  
  findColumnIndex(headers, columnName) {
    const index = headers.findIndex(h => h.toString().toLowerCase() === columnName.toLowerCase());
    
    if (index === -1) {
      throw new Error(`Coluna '${columnName}' não encontrada.`);
    }
    
    return index;
  },
  
  logError(context, error) {
    const user = Session.getActiveUser().getEmail() || 'anônimo';
    console.error(`[${context}] [${user}] ${error.message}`, error.stack);
  },

  _findMatch(item, collection, itemKey, collectionKey) {
    return collection.find(f => String(f[collectionKey]) === String(item[itemKey])) || null;
  },
 
  leftJoin(primary, foreign, primaryKey, foreignKey, alias = 'related') {
    return primary.map(item => ({
      ...item,
      [alias]: this._findMatch(item, foreign, primaryKey, foreignKey)
    }));
  },
 
  innerJoin(primary, foreign, primaryKey, foreignKey, alias = 'related') {
    return primary.reduce((acc, item) => {
      const match = this._findMatch(item, foreign, primaryKey, foreignKey);
      if (match) acc.push({ ...item, [alias]: match });
      return acc;
    }, []);
  },
 
  rightJoin(primary, foreign, primaryKey, foreignKey, alias = 'related') {
    return foreign.map(item => ({
      ...item,
      [alias]: this._findMatch(item, primary, foreignKey, primaryKey)
    }));
  },
};