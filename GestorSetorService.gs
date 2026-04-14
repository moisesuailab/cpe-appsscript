const GestorSetorService = {

  get _SHEET() { return CONFIG.SHEETS.GESTORES_SETOR; },

  _rules: {
    nome:      ['required'],
    matricula: ['required'],
  },

  getBySetor(id_setor) {
    return EntityService.findAll(this._SHEET, r => String(r.id_setor) === String(id_setor));
  },

  update(id, data) {
    return EntityService.update(this._SHEET, id, data, this._rules, (_id, payload) => {
      payload.atualizado_em = new Date().toISOString();
    });
  },
};
