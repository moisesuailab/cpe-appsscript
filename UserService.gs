const UserService = {
  _KEY: 'USER_ROLES',
  _LIMIT_BYTES: 8000,

  getAll() {
    const raw = PropertiesService.getScriptProperties().getProperty(this._KEY) || '{}';
    try {
      const roles = JSON.parse(raw);
      return Object.entries(roles).map(([email, role]) => ({ email, role }));
    } catch {
      return [];
    }
  },

  getRole(email) {
    if (!email) return null;
    return CONFIG.USER_ROLES[email.toLowerCase()] || null;
  },

  hasMinRole(email, requiredRole) {
    const userRole = this.getRole(email);
    return (CONFIG.ROLES.HIERARCHY[userRole] || 0) >= (CONFIG.ROLES.HIERARCHY[requiredRole] || 0);
  },

  add(email, role) {
    try {
      ValidationService.validate({ email, role }, {
        email: ['required', 'email', 'noFormula'],
        role: [['inList', CONFIG.ROLES.LIST]],
      });
      const roles = this._loadRaw();
      if (roles[email.toLowerCase()]) throw new Error(`Usuário '${email}' já está cadastrado.`);
      roles[email.toLowerCase()] = role;
      this._save(roles);
      CONFIG.clearRolesCache();
      return Utils.createResponse('success', null, 'Usuário adicionado com sucesso.');
    } catch (error) {
      Utils.logError('UserService.add', error);
      return Utils.createResponse('error', null, error.message);
    }
  },

  updateRole(email, role) {
    try {
      ValidationService.validate({ email, role }, {
        email: ['required', 'email', 'noFormula'],
        role: [['inList', CONFIG.ROLES.LIST]],
      });
      const roles = this._loadRaw();
      if (!roles[email.toLowerCase()]) throw new Error(`Usuário '${email}' não encontrado.`);
      roles[email.toLowerCase()] = role;
      this._save(roles);
      CONFIG.clearRolesCache();
      return Utils.createResponse('success', null, 'Perfil atualizado com sucesso.');
    } catch (error) {
      Utils.logError('UserService.updateRole', error);
      return Utils.createResponse('error', null, error.message);
    }
  },

  remove(email) {
    try {
      const roles = this._loadRaw();
      if (!roles[email.toLowerCase()]) throw new Error(`Usuário '${email}' não encontrado.`);
      delete roles[email.toLowerCase()];
      this._save(roles);
      CONFIG.clearRolesCache();
      return Utils.createResponse('success', null, 'Usuário removido com sucesso.');
    } catch (error) {
      Utils.logError('UserService.remove', error);
      return Utils.createResponse('error', null, error.message);
    }
  },

  _loadRaw() {
    const raw = PropertiesService.getScriptProperties().getProperty(this._KEY) || '{}';
    try { return JSON.parse(raw); } catch { return {}; }
  },

  _save(roles) {
    const serialized = JSON.stringify(roles);
    if (serialized.length > this._LIMIT_BYTES) {
      throw new Error(
        `Limite de usuários atingido. O sistema suporta aproximadamente 200 usuários nesta configuração. ` +
        `Para escalar além disso, migre os usuários para uma aba da planilha.`
      );
    }
    PropertiesService.getScriptProperties().setProperty(this._KEY, serialized);
  },
};