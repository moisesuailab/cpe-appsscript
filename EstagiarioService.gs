const EstagiarioService = {

  get _SHEET() { return CONFIG.SHEETS.ESTAGIARIOS; },

  _rules: {
    nome:     ['required'],
    cpf:      ['required', 'cpf'],
    telefone: ['phone'],
  },

  _assertCpfUnico(estagiarios, cpf, excludeId = null) {
    const normalized = String(cpf).replace(/\D/g, '');
    const duplicado = estagiarios.some(e =>
      String(e.cpf).replace(/\D/g, '') === normalized &&
      (excludeId ? String(e.id) !== String(excludeId) : true)
    );
    if (duplicado) throw new Error(`Já existe um estagiário com o CPF '${cpf}'.`);
  },

  _assertEmailUnico(estagiarios, email, excludeId = null) {
    if (!email || String(email).trim() === '') return;
    const duplicado = estagiarios.some(e =>
      String(e.email) === String(email) &&
      (excludeId ? String(e.id) !== String(excludeId) : true)
    );
    if (duplicado) throw new Error(`Já existe um estagiário com o e-mail '${email}'.`);
  },

  create(data) {
    const result = EntityService.create(this._SHEET, data, this._rules, () => {
      const estagiarios = CrudRepository.findAll(this._SHEET);
      this._assertCpfUnico(estagiarios, data.cpf);
      this._assertEmailUnico(estagiarios, data.email);
    });
    if (result.status === 'success') {
      AppLogService.append('CREATE_ESTAGIARIO', 'estagiarios', result.data.id, `Estagiário '${data.nome}' (CPF: ${data.cpf}) criado.`);
    }
    return result;
  },

  update(id, data) {
    const result = EntityService.update(this._SHEET, id, data, this._rules, () => {
      const estagiarios = CrudRepository.findAll(this._SHEET);
      this._assertCpfUnico(estagiarios, data.cpf, id);
      this._assertEmailUnico(estagiarios, data.email, id);
    });
    if (result.status === 'success') {
      AppLogService.append('UPDATE_ESTAGIARIO', 'estagiarios', id, `Estagiário '${data.nome}' atualizado.`);
    }
    return result;
  },

  delete(id) {
    const result = EntityService.delete(this._SHEET, id, () => {
      const contratos = CrudRepository.findAll(CONFIG.SHEETS.CONTRATOS);
      const vinculado = contratos.some(c => String(c.id_estagiario) === String(id));
      if (vinculado) throw new Error('Estagiário não pode ser excluído pois possui contratos vinculados.');
    });
    if (result.status === 'success') {
      AppLogService.append('DELETE_ESTAGIARIO', 'estagiarios', id, `Estagiário com ID '${id}' excluído.`);
    }
    return result;
  },
};
