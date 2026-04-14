const SetorService = {

  get _SHEET() { return CONFIG.SHEETS.SETORES; },

  _rules: {
    nome:  ['required'],
    sigla: ['required'],
  },

  create(data) {
    return EntityService.create(this._SHEET, data, this._rules);
  },

  findAll() {
    return EntityService.findAll(this._SHEET);
  },

  findById(id) {
    return EntityService.findById(this._SHEET, id);
  },

  update(id, data) {
    return EntityService.update(this._SHEET, id, data, this._rules);
  },

  delete(id) {
    return EntityService.delete(this._SHEET, id, () => {
      const gestores = CrudRepository.findAll(CONFIG.SHEETS.GESTORES_SETOR);
      if (gestores.some(g => String(g.id_setor) === String(id))) {
        throw new Error('Setor não pode ser excluído pois possui gestor vinculado.');
      }
    });
  },
};
