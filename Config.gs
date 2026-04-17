const CONFIG = {
  APP_NAME:     'CPE',
  APP_SUBTITLE: 'Central de Processos Eletrônicos',

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
    MAGISTRADOS:    'magistrados',
    SETORES:        'setores',
    GESTORES_SETOR: 'gestores_setor',
    ESTAGIARIOS:    'estagiarios',
    CONTRATOS:      'contratos',
    VAGAS:          'vagas',
    DASHBOARD:      'dashboard',
  },

  DASHBOARD_ROWS: {
    ULTIMO_RECALCULO:      0,
    TOTAL_VAGAS:           1,
    VAGAS_OCUPADAS:        2,
    VAGAS_OCIOSAS:         3,
    VAGAS_ALOCADAS_ORGAO:  4,
    VAGAS_ALOCADAS_SETOR:  5,
    CONTRATOS_VENCENDO_30: 9,
    CONTRATOS_VENCENDO_60: 10,
    VAGAS_GRADUACAO:       11,
    VAGAS_POS_GRADUACAO:   12,
    VAGAS_INDEFINIDAS:     13,
  },

  COLUMNS: {
    logs:           ['id', 'timestamp', 'userEmail', 'userName', 'action', 'entity', 'entityId', 'description'],
    grupos:         ['id', 'nome', 'descricao'],
    orgaos:         ['id', 'nome', 'id_grupo'],
    cargos:         ['id', 'id_orgao', 'nome', 'tipo', 'is_presidente'],
    ocupacoes:      ['id', 'id_cargo', 'id_magistrado'],
    magistrados:    ['id', 'nome', 'matricula', 'cidade'],
    setores:        ['id', 'nome', 'sigla'],
    gestores_setor: ['id', 'id_setor', 'nome', 'matricula', 'atualizado_em'],
    estagiarios:    ['id', 'nome', 'cpf', 'email', 'matricula', 'data_nascimento', 'telefone', 'curso', 'instituicao', 'observacoes'],
    contratos:      ['id', 'id_estagiario', 'id_vaga', 'tipo_contrato', 'data_inicio', 'data_fim'],
    vagas:          ['id', 'numero_vaga', 'id_setor', 'id_cargo', 'tipo_vaga', 'status', 'descricao'],
  },
};