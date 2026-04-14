const Setup = {

  _CONFIG: {
    spreadsheetId: '', // <-- COLOQUE AQUI O ID DA PLANILHA (EXTRAIDO DA URL) E EXECUTE setupInit() PARA CONFIGURAR O AMBIENTE
  },

  _ensureSheet(spreadsheet, sheetName, headers) {
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      console.log('[OK] Aba "' + sheetName + '" criada.');
    }
    const firstCell = sheet.getRange(1, 1);
    if (!firstCell.getValue()) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      SpreadsheetApp.flush();
      console.log('[OK] Cabecalho da aba "' + sheetName + '" definido.');
    } else {
      console.log('[OK] Aba "' + sheetName + '" ja existe com cabecalho.');
    }
  },

  _ensureDashboard(spreadsheet) {
    let sheet = spreadsheet.getSheetByName(CONFIG.SHEETS.DASHBOARD);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(CONFIG.SHEETS.DASHBOARD);
      console.log('[OK] Aba "dashboard" criada.');
    }

    if (sheet.getLastRow() > 0) {
      sheet.getRange('B1:B' + sheet.getLastRow()).clearContent();
    }
    console.log('[OK] Formulas da aba "dashboard" serão reescritas.');

    const labels = [
      'ultimoRecalculo',
      'totalVagas',
      'vagasOcupadas',
      'vagasOciosas',
      'vagasAlocadasOrgao',
      'vagasAlocadasSetor',
      'vagasNaoAlocadas',
      'vagasDisponiveis',
      'contratosAtivos',
      'contratosVencendo30d',
      'contratosVencendo60d',
      'vagasGraduacao',
      'vagasPosGraduacao',
      'vagasIndefinidas',
    ];

    const formulas = [
      '',
      '=COUNTA(vagas!A2:A)',
      '=SUMPRODUCT((contratos!E2:E<>"")*(contratos!E2:E<=TODAY())*(contratos!F2:F>=TODAY()))',
      '=B2-B3',
      '=COUNTIF(vagas!D2:D;"<>")',
      '=COUNTIFS(vagas!F2:F;"alocada";vagas!D2:D;"")',
      '=COUNTIF(vagas!F2:F;"nao_alocada")',
      '=B2-B3',
      '=B3',
      '=COUNTIFS(contratos!E2:E;"<="&TODAY();contratos!F2:F;">="&TODAY();contratos!F2:F;"<="&(TODAY()+30))',
      '=COUNTIFS(contratos!E2:E;"<="&TODAY();contratos!F2:F;">"&(TODAY()+30);contratos!F2:F;"<="&(TODAY()+60))',
      '=COUNTIF(vagas!E2:E;"graduacao")',
      '=COUNTIF(vagas!E2:E;"pos_graduacao")',
      '=COUNTIF(vagas!E2:E;"indefinido")',
    ];

    sheet.getRange(1, 1, labels.length, 1).setValues(labels.map(l => [l]));

    for (let i = 1; i < formulas.length; i++) {
      sheet.getRange(i + 1, 2).setFormula(formulas[i]);
    }

    SpreadsheetApp.flush();
    console.log('[OK] Aba "dashboard" configurada com labels e formulas.');
  },

  _validateConfig() {
    const { spreadsheetId } = this._CONFIG;
    const errors = [];

    if (!spreadsheetId || spreadsheetId.trim() === '') {
      errors.push('spreadsheetId nao preenchido.');
    } else if (!/^[a-zA-Z0-9_-]{20,}$/.test(spreadsheetId.trim())) {
      errors.push('spreadsheetId parece invalido. Extraia o ID diretamente da URL da planilha.');
    }

    if (errors.length > 0) {
      console.log('============================================================');
      console.log('[CONFIGURACAO INCOMPLETA] Corrija os itens abaixo em Setup._CONFIG:');
      errors.forEach(msg => console.error('  [ERRO] ' + msg));
      console.log('  Abra Setup.gs, edite _CONFIG e execute novamente.');
      console.log('============================================================');
      return false;
    }

    return true;
  },

  _seedCPE() {
    const setores = CrudRepository.findAll(CONFIG.SHEETS.SETORES);
    let setorCPE  = setores.find(s => s.sigla === 'CPE');

    if (!setorCPE) {
      const result = CrudRepository.create(CONFIG.SHEETS.SETORES, {
        nome:  'Central de Processo Eletrônico',
        sigla: 'CPE',
      });
      setorCPE = result.data;
      console.log('[OK] Setor CPE criado (id: ' + setorCPE.id + ').');
    } else {
      console.log('[OK] Setor CPE ja existe (id: ' + setorCPE.id + ').');
    }

    const gestores = CrudRepository.findAll(CONFIG.SHEETS.GESTORES_SETOR);
    const gestorExiste = gestores.some(g => String(g.id_setor) === String(setorCPE.id));

    if (!gestorExiste) {
      CrudRepository.create(CONFIG.SHEETS.GESTORES_SETOR, {
        id_setor:     setorCPE.id,
        nome:         'Evelyne Maia de Holanda',
        matricula:    'T0090951',
        atualizado_em: new Date(),
      });
      console.log('[OK] Gestora do setor CPE criada.');
    } else {
      console.log('[OK] Gestora do setor CPE ja existe.');
    }
  },

  init() {
    if (!this._validateConfig()) return;

    const { spreadsheetId } = this._CONFIG;
    const adminEmail = Session.getActiveUser().getEmail();

    console.log('============================================================');
    console.log('  SETUP — Iniciando configuracao do template Apps Script');
    console.log('============================================================');

    const errors = [];

    try {
      PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheetId);
      console.log('[OK] SPREADSHEET_ID salvo nas Script Properties.');
    } catch (e) {
      errors.push('Falha ao salvar SPREADSHEET_ID: ' + e.message);
    }

    let spreadsheet = null;
    try {
      spreadsheet = SpreadsheetApp.openById(spreadsheetId);
      console.log('[OK] Acesso a planilha confirmado.');
    } catch (e) {
      errors.push('Nao foi possivel acessar a planilha. Verifique o ID e as permissoes de compartilhamento: ' + e.message);
    }

    if (spreadsheet) {
      const sheets = [
        { name: CONFIG.SHEETS.LOGS,            columns: CONFIG.COLUMNS.logs            },
        { name: CONFIG.SHEETS.GRUPOS,          columns: CONFIG.COLUMNS.grupos          },
        { name: CONFIG.SHEETS.ORGAOS,          columns: CONFIG.COLUMNS.orgaos          },
        { name: CONFIG.SHEETS.CARGOS,          columns: CONFIG.COLUMNS.cargos          },
        { name: CONFIG.SHEETS.OCUPACOES,       columns: CONFIG.COLUMNS.ocupacoes       },
        { name: CONFIG.SHEETS.MAGISTRADOS,     columns: CONFIG.COLUMNS.magistrados     },
        { name: CONFIG.SHEETS.SETORES,         columns: CONFIG.COLUMNS.setores         },
        { name: CONFIG.SHEETS.GESTORES_SETOR,  columns: CONFIG.COLUMNS.gestores_setor  },
        { name: CONFIG.SHEETS.ESTAGIARIOS,     columns: CONFIG.COLUMNS.estagiarios     },
        { name: CONFIG.SHEETS.CONTRATOS,       columns: CONFIG.COLUMNS.contratos       },
        { name: CONFIG.SHEETS.VAGAS,           columns: CONFIG.COLUMNS.vagas           },
      ];
      sheets.forEach(({ name, columns }) => {
        try {
          this._ensureSheet(spreadsheet, name, columns);
        } catch (e) {
          errors.push('Falha ao criar aba ' + name + ': ' + e.message);
        }
      });

      try {
        this._ensureDashboard(spreadsheet);
      } catch (e) {
        errors.push('Falha ao configurar aba dashboard: ' + e.message);
      }

      try {
        this._seedCPE();
      } catch (e) {
        errors.push('Falha ao realizar seed CPE: ' + e.message);
      }
    }

    try {
      if (typeof Sheets === 'undefined') throw new Error('Objeto Sheets nao disponivel.');
      Sheets.Spreadsheets.get(spreadsheetId);
      console.log('[OK] Google Sheets API (Advanced) habilitada e acessivel.');
    } catch (e) {
      errors.push('Google Sheets API nao esta habilitada. Va em: Servicos > Google Sheets API > Adicionar. Detalhe: ' + e.message);
    }

    try {
      const existing = UserService.getRole(adminEmail);
      if (existing) {
        console.log('[OK] Admin ja cadastrado (' + adminEmail + ' — ' + existing + '). Nenhuma alteracao feita.');
      } else {
        const res = UserService.add(adminEmail, 'admin');
        if (res.status === 'success') {
          console.log('[OK] Admin cadastrado com sucesso: ' + adminEmail);
        } else {
          errors.push('Falha ao cadastrar admin: ' + res.message);
        }
      }
    } catch (e) {
      errors.push('Erro ao cadastrar admin: ' + e.message);
    }

    console.log('------------------------------------------------------------');
    if (errors.length === 0) {
      console.log('[SETUP CONCLUIDO] Execute setupVerify() para validar o ambiente.');
    } else {
      console.log('[SETUP COM ERROS] Corrija os problemas abaixo e execute novamente:');
      errors.forEach((msg, i) => console.log('  ' + (i + 1) + '. ' + msg));
    }
    console.log('============================================================');
  },

  verify() {
    console.log('============================================================');
    console.log('  SETUP — Verificando ambiente');
    console.log('============================================================');

    const checks = [];

    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    checks.push({
      label: 'SPREADSHEET_ID configurado',
      ok: !!spreadsheetId,
      detail: spreadsheetId || 'nao encontrado',
    });

    let sheetAccessOk = false;
    if (spreadsheetId) {
      try { SpreadsheetApp.openById(spreadsheetId); sheetAccessOk = true; } catch (_) { }
    }
    checks.push({
      label: 'Acesso a planilha',
      ok: sheetAccessOk,
      detail: sheetAccessOk ? 'OK' : 'Sem acesso — verifique compartilhamento',
    });

    let sheetsApiOk = false;
    if (spreadsheetId && sheetAccessOk) {
      try {
        if (typeof Sheets !== 'undefined') {
          Sheets.Spreadsheets.get(spreadsheetId);
          sheetsApiOk = true;
        }
      } catch (_) { }
    }
    checks.push({
      label: 'Google Sheets API (Advanced) habilitada',
      ok: sheetsApiOk,
      detail: sheetsApiOk ? 'OK' : 'Nao habilitada — va em: Servicos > Google Sheets API > Adicionar',
    });

    let adminOk = false;
    try {
      adminOk = UserService.getAll().some(u => u.role === 'admin');
    } catch (_) { }
    checks.push({
      label: 'Ao menos um usuario admin cadastrado',
      ok: adminOk,
      detail: adminOk ? 'OK' : 'Nenhum admin encontrado — execute setupInit() primeiro',
    });

    try {
      const email = Session.getActiveUser().getEmail();
      const role = UserService.getRole(email);
      const selfAccess = !!role;
      checks.push({
        label: 'Usuario atual (' + email + ') tem acesso',
        ok: selfAccess,
        detail: selfAccess ? role : 'Sem acesso — execute setupInit() com este usuario',
      });
    } catch (e) {
      checks.push({ label: 'Usuario atual', ok: false, detail: 'Nao foi possivel verificar: ' + e.message });
    }

    let rolesOk = false;
    try {
      const raw = PropertiesService.getScriptProperties().getProperty('USER_ROLES') || '{}';
      JSON.parse(raw);
      rolesOk = true;
    } catch (_) { }
    checks.push({
      label: 'USER_ROLES valido (JSON)',
      ok: rolesOk,
      detail: rolesOk ? 'OK' : 'Valor corrompido — execute setupReset() e depois setupInit()',
    });

    const requiredSheets = [
      CONFIG.SHEETS.LOGS,
      CONFIG.SHEETS.GRUPOS,
      CONFIG.SHEETS.ORGAOS,
      CONFIG.SHEETS.CARGOS,
      CONFIG.SHEETS.OCUPACOES,
      CONFIG.SHEETS.MAGISTRADOS,
      CONFIG.SHEETS.SETORES,
      CONFIG.SHEETS.GESTORES_SETOR,
      CONFIG.SHEETS.ESTAGIARIOS,
      CONFIG.SHEETS.CONTRATOS,
      CONFIG.SHEETS.VAGAS,
      CONFIG.SHEETS.DASHBOARD,
    ];
    if (spreadsheetId && sheetAccessOk) {
      try {
        const ss = SpreadsheetApp.openById(spreadsheetId);
        requiredSheets.forEach(name => {
          const ok = !!ss.getSheetByName(name);
          checks.push({
            label: 'Aba "' + name + '" existe',
            ok,
            detail: ok ? 'OK' : 'Nao encontrada — execute setupInit() para cria-la',
          });
        });
      } catch (_) { }
    }

    const allPassed = checks.every(c => c.ok);
    checks.forEach(c => {
      const icon = c.ok ? '[OK]  ' : '[ERRO]';
      console.log(icon + ' ' + c.label + (c.ok ? '' : '\n         Detalhe: ' + c.detail));
    });

    console.log('------------------------------------------------------------');
    if (allPassed) {
      console.log('[AMBIENTE OK] O sistema esta pronto para uso.');
    } else {
      console.log('[AMBIENTE COM PROBLEMAS] Corrija os itens com [ERRO] e execute setupVerify() novamente.');
    }
    console.log('============================================================');
  },

  triggerRecalcularFormulas() {
    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    if (!spreadsheetId) {
      console.error('[ERRO] SPREADSHEET_ID nao configurado.');
      return;
    }
    const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    const sheet = spreadsheet.getSheetByName(CONFIG.SHEETS.DASHBOARD);
    if (!sheet) {
      console.error('[ERRO] Aba "dashboard" nao encontrada. Execute setupInit() primeiro.');
      return;
    }
    sheet.getRange('B1').setValue(new Date());
    SpreadsheetApp.flush();
    console.log('[OK] Dashboard recalculado em ' + new Date());
  },

  setupTrigger() {
    const handlerName = 'triggerRecalcularFormulas';
    const existing = ScriptApp.getProjectTriggers().find(t => t.getHandlerFunction() === handlerName);
    if (existing) {
      console.log('[OK] Trigger "' + handlerName + '" ja existe. Nenhuma alteracao feita.');
      return;
    }
    ScriptApp.newTrigger(handlerName)
      .timeBased()
      .everyDays(1)
      .atHour(0)
      .create();
    console.log('[OK] Trigger diario "' + handlerName + '" criado (executa entre 00h e 01h).');
  },

  listUsers() {
    const users = UserService.getAll();
    console.log('============================================================');
    console.log('  Usuario(s) cadastrado(s): ' + users.length);
    console.log('------------------------------------------------------------');
    if (users.length === 0) {
      console.log('  Nenhum usuario encontrado.');
    } else {
      users.forEach(u => console.log('  ' + u.email + '  —  ' + u.role));
    }
    console.log('============================================================');
  },

  clearRolesCache() {
    CONFIG.clearRolesCache();
    console.log('[OK] Cache de roles limpo.');
  },

  clearSheetIdProperties() {
    SheetsApiService.clearSheetIdProperties();
    console.log('[OK] Propriedades de sheetId limpas.');
  },

  reset() {
    const CONFIRM_KEY = 'setup_reset_confirmed';
    const CONFIRM_TTL = 60 * 1000;

    const props = PropertiesService.getScriptProperties();
    const confirmed = props.getProperty(CONFIRM_KEY);
    const now = Date.now();

    if (confirmed && (now - parseInt(confirmed)) <= CONFIRM_TTL) {
      props.deleteProperty(CONFIRM_KEY);

      const lock = LockService.getScriptLock();
      if (!lock.tryLock(3000)) {
        console.error('[ERRO] Nao foi possivel adquirir lock. Tente novamente.');
        return;
      }
      try {
        props.deleteProperty('SPREADSHEET_ID');
        props.deleteProperty('USER_ROLES');
        CONFIG.clearRolesCache();
        SheetsApiService.clearSheetIdProperties();
        console.log('============================================================');
        console.log('[RESET CONCLUIDO] Todas as configuracoes foram removidas.');
        console.log('  Execute setupInit() para reconfigurar o ambiente.');
        console.log('============================================================');
      } finally {
        lock.releaseLock();
      }
      return;
    }

    if (confirmed && (now - parseInt(confirmed)) > CONFIRM_TTL) {
      props.setProperty(CONFIRM_KEY, String(now));
      console.log('============================================================');
      console.log('[RESET] Tempo esgotado. Um novo token foi gerado.');
      console.log('  Execute setupReset() novamente nos proximos 60 segundos para confirmar.');
      console.log('============================================================');
      return;
    }

    const users = UserService.getAll();
    console.log('============================================================');
    console.log('[RESET] Esta acao ira remover TODA a configuracao do sistema.');
    if (users.length > 0) {
      console.log('[RESET] ' + users.length + ' usuario(s) perderao acesso imediatamente:');
      users.forEach(u => console.log('  ' + u.email + '  —  ' + u.role));
    }
    props.setProperty(CONFIRM_KEY, String(now));
    console.log('------------------------------------------------------------');
    console.log('[RESET] Execute setupReset() novamente nos proximos 60 segundos para confirmar.');
    console.log('============================================================');
  },
};

function setupInit() { Setup.init(); }
function setupVerify() { Setup.verify(); }
function setupUsers() { Setup.listUsers(); }
function setupClearRolesCache() { Setup.clearRolesCache(); }
function setupClearSheetIdProperties() { Setup.clearSheetIdProperties(); }
function setupReset() { Setup.reset(); }
function triggerRecalcularFormulas() { Setup.triggerRecalcularFormulas(); }
function setupTrigger() { Setup.setupTrigger(); }