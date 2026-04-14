const GrupoService = {

  get _SHEET() { return CONFIG.SHEETS.GRUPOS; },

  _rules: {
    nome: ['required'],
  },

  create(data) {
    return EntityService.create(this._SHEET, data, this._rules);
  },

  update(id, data) {
    return EntityService.update(this._SHEET, id, data, this._rules);
  },

  delete(id) {
    return EntityService.delete(this._SHEET, id, () => {
      const orgaos = CrudRepository.findAll(CONFIG.SHEETS.ORGAOS);
      const vinculado = orgaos.some(o => String(o.id_grupo) === String(id));
      if (vinculado) throw new Error('Grupo não pode ser excluído pois possui órgãos vinculados.');
    });
  },
};
