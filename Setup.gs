const Setup = {

  _CONFIG: {
    spreadsheetId: '1v4LJt-vOegSUnYAHZpK7NjasT4qokxou4i4uNoaWq9M',
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

    try {
      SpreadsheetApp.openById(spreadsheetId);
      console.log('[OK] Acesso a planilha confirmado.');
    } catch (e) {
      errors.push('Nao foi possivel acessar a planilha. Verifique o ID e as permissoes de compartilhamento: ' + e.message);
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