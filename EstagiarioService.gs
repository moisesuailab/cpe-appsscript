const EstagiarioService = {

  _SHEET: CONFIG.SHEETS.ESTAGIARIOS,

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
    return EntityService.create(this._SHEET, data, this._rules, () => {
      const estagiarios = CrudRepository.findAll(this._SHEET);
      this._assertCpfUnico(estagiarios, data.cpf);
      this._assertEmailUnico(estagiarios, data.email);
    });
  },

  update(id, data) {
    return EntityService.update(this._SHEET, id, data, this._rules, () => {
      const estagiarios = CrudRepository.findAll(this._SHEET);
      this._assertCpfUnico(estagiarios, data.cpf, id);
      this._assertEmailUnico(estagiarios, data.email, id);
    });
  },

  delete(id) {
    return EntityService.delete(this._SHEET, id, () => {
      const contratos = CrudRepository.findAll(CONFIG.SHEETS.CONTRATOS);
      const vinculado = contratos.some(c => String(c.id_estagiario) === String(id));
      if (vinculado) throw new Error('Estagiário não pode ser excluído pois possui contratos vinculados.');
    });
  },
};
