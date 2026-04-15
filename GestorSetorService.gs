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
    const result = EntityService.update(this._SHEET, id, data, this._rules, (_id, payload) => {
      payload.atualizado_em = new Date().toISOString();
    });
    if (result.status === 'success') {
      AppLogService.append('UPDATE_GESTOR_SETOR', 'gestores_setor', id, `Gestor do setor '${data.id_setor}' atualizado.`);
    }
    return result;
  },
};
