const OrgaoService = {

  _SHEET: CONFIG.SHEETS.ORGAOS,

  _rulesCreate: {
    nome:     ['required'],
    id_grupo: ['required'],
  },

  _rulesUpdate: {
    nome: ['required'],
  },

  create(data) {
    return EntityService.create(this._SHEET, data, this._rulesCreate);
  },

  update(id, data) {
    return EntityService.update(this._SHEET, id, data, this._rulesUpdate);
  },

  delete(id) {
    return EntityService.delete(this._SHEET, id, () => {
      const cargos = CrudRepository.findAll(CONFIG.SHEETS.CARGOS);
      const vinculado = cargos.some(c => String(c.id_orgao) === String(id));
      if (vinculado) throw new Error('Órgão não pode ser excluído pois possui cargos vinculados.');
    });
  },
};
