const OrgaoService = {

  get _SHEET() { return CONFIG.SHEETS.ORGAOS; },

  _rulesCreate: {
    nome:     ['required'],
    id_grupo: ['required'],
  },

  _rulesUpdate: {
    nome: ['required'],
  },

  create(data) {
    const result = EntityService.create(this._SHEET, data, this._rulesCreate);
    if (result.status === 'success') {
      AppLogService.append('CREATE_ORGAO', 'orgaos', result.data.id, `Órgão '${data.nome}' criado no grupo '${data.id_grupo}'.`);
    }
    return result;
  },

  update(id, data) {
    const result = EntityService.update(this._SHEET, id, data, this._rulesUpdate);
    if (result.status === 'success') {
      AppLogService.append('UPDATE_ORGAO', 'orgaos', id, `Órgão '${data.nome}' atualizado.`);
    }
    return result;
  },

  delete(id) {
    const result = EntityService.delete(this._SHEET, id, () => {
      const cargos = CrudRepository.findAll(CONFIG.SHEETS.CARGOS);
      const vinculado = cargos.some(c => String(c.id_orgao) === String(id));
      if (vinculado) throw new Error('Órgão não pode ser excluído pois possui cargos vinculados.');
    });
    if (result.status === 'success') {
      AppLogService.append('DELETE_ORGAO', 'orgaos', id, `Órgão com ID '${id}' excluído.`);
    }
    return result;
  },
};
