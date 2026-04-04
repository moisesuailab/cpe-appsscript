// =============================================================================
// Diagnostics.gs — Inspeção de estado do sistema em desenvolvimento
//
// Todas as funções são somente leitura. Nenhuma altera dados ou configurações.
// Para acoes como limpar caches ou resetar o ambiente, use Setup.gs.
// =============================================================================

const Diagnostics = {

  config() {
    const spreadsheetId = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
    const userRolesRaw  = PropertiesService.getScriptProperties().getProperty('USER_ROLES') || '{}';
    const email         = Session.getActiveUser().getEmail();

    console.log('============================================================');
    console.log('  DIAGNOSTICS — Configuracao');
    console.log('------------------------------------------------------------');
    console.log('SPREADSHEET_ID :', spreadsheetId || '[nao configurado]');
    console.log('Usuario logado :', email         || '[email vazio]');
    console.log('USER_ROLES raw :', userRolesRaw);
    console.log('USER_ROLES     :', JSON.stringify(JSON.parse(userRolesRaw), null, 2));
    console.log('Role do usuario:', UserService.getRole(email) || '[sem role]');
    console.log('============================================================');
  },

  userRoles() {
    const users = UserService.getAll();
    console.log('============================================================');
    console.log('  DIAGNOSTICS — Usuarios cadastrados: ' + users.length);
    console.log('------------------------------------------------------------');
    if (users.length === 0) {
      console.log('  Nenhum usuario cadastrado.');
    } else {
      users.forEach(u => console.log('  ' + u.email + '  —  ' + u.role));
    }
    console.log('============================================================');
  },

  cache() {
    const roles = CONFIG.USER_ROLES;
    console.log('============================================================');
    console.log('  DIAGNOSTICS — Cache');
    console.log('------------------------------------------------------------');
    console.log('user_roles:', roles);
    console.log('============================================================');
  },
};

function diagnosticsConfig()    { Diagnostics.config(); }
function diagnosticsUserRoles() { Diagnostics.userRoles(); }
function diagnosticsCache()     { Diagnostics.cache(); }