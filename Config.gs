const CONFIG = {
  APP_NAME:  'Minha Aplicação',

  _KEYS: {
    SPREADSHEET_ID: 'SPREADSHEET_ID',
    USER_ROLES_PROP:  'USER_ROLES',
    USER_ROLES_CACHE: 'user_roles',
  },

  ROLES: {
    LIST:      ['admin', 'editor', 'viewer'],
    HIERARCHY: { admin: 3, editor: 2, viewer: 1 },
  },

  get SPREADSHEET_ID() {
    return PropertiesService.getScriptProperties().getProperty(this._KEYS.SPREADSHEET_ID);
  },

  get USER_ROLES() {
    const cache  = CacheService.getScriptCache();
    const cached = cache.get(this._KEYS.USER_ROLES_CACHE);
    if (cached) return JSON.parse(cached);

    const raw   = PropertiesService.getScriptProperties().getProperty(this._KEYS.USER_ROLES_PROP) || '{}';
    const roles = JSON.parse(raw);
    cache.put(this._KEYS.USER_ROLES_CACHE, JSON.stringify(roles), 600);
    return roles;
  },

  clearRolesCache() {
    CacheService.getScriptCache().remove(this._KEYS.USER_ROLES_CACHE);
  },

  ID_COLUMN: 'id',

  SHEETS: {
    LOGS:        'logs',
    GRUPOS:      'grupos',
    ORGAOS:      'orgaos',
    CARGOS:      'cargos',
    OCUPACOES:   'ocupacoes',
    MAGISTRADOS: 'magistrados',
  },

  COLUMNS: {
    logs:        ['id', 'timestamp', 'userEmail', 'userName', 'action', 'entity', 'entityId', 'description'],
    grupos:      ['id', 'nome', 'descricao'],
    orgaos:      ['id', 'nome', 'id_grupo'],
    cargos:      ['id', 'id_orgao', 'nome', 'tipo', 'is_presidente'],
    ocupacoes:   ['id', 'id_cargo', 'id_magistrado'],
    magistrados: ['id', 'nome', 'matricula', 'cidade'],
  },
};