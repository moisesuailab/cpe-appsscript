function doGet(e) {
  const email = getUserEmail();
  const role  = UserService.getRole(email);
  if (!role) return render('acesso-negado', { appName: CONFIG.APP_NAME });
  const profile = UserService.getUserProfile(email);
  return render('index', {
    userRole:        role,
    userEmail:       email,
    userDisplayName: profile.displayName,
    userPhotoUrl:    profile.photoUrl,
    appName:         CONFIG.APP_NAME,
    appSubtitle:     CONFIG.APP_SUBTITLE || 'Subtítulo da aplicação',
    alertasMuted:    UserService.getAlertasMuted(),
  });
}

function render(filename, data = {}) {
  const template = HtmlService.createTemplateFromFile(filename);
  Object.assign(template, data);
  return template.evaluate()
    .setTitle(CONFIG.APP_NAME)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  try {
    return HtmlService.createTemplateFromFile(filename).evaluate().getContent();
  } catch (e) {
    Utils.logError('include', e);
    return `<!-- Erro ao incluir ${filename} -->`;
  }
}

function getUserEmail() {
  return Session.getActiveUser().getEmail();
}


function hasRole(role) {
  return UserService.hasMinRole(getUserEmail(), role);
}

function _requireAccess() {
  if (!UserService.getRole(getUserEmail())) throw new Error('Acesso negado.');
}

function _requireRole(role) {
  if (!hasRole(role)) throw new Error('Permissão insuficiente.');
}

function getAppData(sheets) {
  try {
    _requireAccess();
    if (!sheets || sheets.length === 0) return Utils.createResponse('error', null, 'Nenhuma aba informada.');
    return Utils.createResponse('success', {
      collections: CrudRepository.findAllBatch(sheets),
      user: getUserEmail(),
    });
  } catch (error) {
    Utils.logError('getAppData', error);
    return Utils.createResponse('error', null, error.message);
  }
}

// CRUD genérico — com guards por nível
function genericFindAll(sheetName) { _requireAccess(); return EntityService.findAll(sheetName); }
function genericFindById(sheetName, id) { _requireAccess(); return EntityService.findById(sheetName, id); }
function genericCreate(sheetName, data) { _requireRole('editor'); return EntityService.create(sheetName, data); }
function genericUpdate(sheetName, id, data) { _requireRole('editor'); return EntityService.update(sheetName, id, data); }
function genericDelete(sheetName, id) { _requireRole('admin'); return EntityService.delete(sheetName, id); }

// Preferências de usuário — qualquer role autenticado
function getAlertasMuted()        { _requireAccess(); return UserService.getAlertasMuted(); }
function setAlertasMuted(value)   { _requireAccess(); UserService.setAlertasMuted(value); }

// Gestão de usuários — somente admin
function userGetAll() { _requireRole('admin'); return UserService.getAll(); }
function userAdd(email, role) { _requireRole('admin'); return UserService.add(email, role); }
function userUpdateRole(email, role) { _requireRole('admin'); return UserService.updateRole(email, role); }
function userRemove(email) { _requireRole('admin'); return UserService.remove(email); }

// Grupos
function grupoCreate(data)     { _requireRole('admin'); return GrupoService.create(data); }
function grupoUpdate(id, data) { _requireRole('admin'); return GrupoService.update(id, data); }
function grupoDelete(id)       { _requireRole('admin'); return GrupoService.delete(id); }

// Órgãos
function orgaoCreate(data)     { _requireRole('admin'); return OrgaoService.create(data); }
function orgaoUpdate(id, data) { _requireRole('admin'); return OrgaoService.update(id, data); }
function orgaoDelete(id)       { _requireRole('admin'); return OrgaoService.delete(id); }

// Cargos
function cargoCreate(data)        { _requireRole('admin'); return CargoService.create(data); }
function cargoUpdate(id, data)    { _requireRole('admin'); return CargoService.update(id, data); }
function cargoDelete(id)          { _requireRole('admin'); return CargoService.delete(id); }
function cargoSetPresidente(id)   { _requireRole('admin'); return CargoService.setPresidente(id); }

// Ocupações
function ocupacaoCreate(data)  { _requireRole('admin'); return OcupacaoService.create(data); }
function ocupacaoRemover(id)   { _requireRole('admin'); return OcupacaoService.remover(id); }

// Magistrados
function magistradoCreate(data)     { _requireRole('admin'); return MagistradoService.create(data); }
function magistradoUpdate(id, data) { _requireRole('admin'); return MagistradoService.update(id, data); }
function magistradoDelete(id)       { _requireRole('admin'); return MagistradoService.delete(id); }

// Setores e Gestores
function setorGetAll()                   { _requireAccess();      return SetorService.findAll(); }
function gestorSetorGetBySetor(id_setor) { _requireAccess();      return GestorSetorService.getBySetor(id_setor); }
function gestorSetorUpdate(id, data)     { _requireRole('admin'); return GestorSetorService.update(id, data); }

// Estagiários
function estagiarioCreate(data)     { _requireRole('editor'); return EstagiarioService.create(data); }
function estagiarioUpdate(id, data) { _requireRole('editor'); return EstagiarioService.update(id, data); }
function estagiarioDelete(id)       { _requireRole('editor'); return EstagiarioService.delete(id); }

// Vagas
function vagaCreate(data)     { _requireRole('editor'); return VagaService.create(data); }
function vagaUpdate(id, data) { _requireRole('editor'); return VagaService.update(id, data); }
function vagaDelete(id)       { _requireRole('editor'); return VagaService.delete(id); }

// Contratos
function contratoCreate(data)     { _requireRole('editor'); return ContratoService.create(data); }
function contratoUpdate(id, data) { _requireRole('editor'); return ContratoService.update(id, data); }
function contratoDelete(id)       { _requireRole('editor'); return ContratoService.delete(id); }

// Dashboard
function getDashboardData() {
  try {
    _requireAccess();
    return DashboardService.getDashboardData();
  } catch (error) {
    Utils.logError('getDashboardData', error);
    return Utils.createResponse('error', null, error.message);
  }
}