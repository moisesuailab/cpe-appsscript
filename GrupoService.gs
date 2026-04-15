const GrupoService = {

  get _SHEET() { return CONFIG.SHEETS.GRUPOS; },

  _rules: {
    nome: ['required'],
  },

  create(data) {
    const result = EntityService.create(this._SHEET, data, this._rules);
    if (result.status === 'success') {
      AppLogService.append('CREATE_GRUPO', 'grupos', result.data.id, `Grupo '${data.nome}' criado.`);
    }
    return result;
  },

  update(id, data) {
    const result = EntityService.update(this._SHEET, id, data, this._rules);
    if (result.status === 'success') {
      AppLogService.append('UPDATE_GRUPO', 'grupos', id, `Grupo '${data.nome}' atualizado.`);
    }
    return result;
  },

  delete(id) {
    const result = EntityService.delete(this._SHEET, id, () => {
      const orgaos = CrudRepository.findAll(CONFIG.SHEETS.ORGAOS);
      const vinculado = orgaos.some(o => String(o.id_grupo) === String(id));
      if (vinculado) throw new Error('Grupo não pode ser excluído pois possui órgãos vinculados.');
    });
    if (result.status === 'success') {
      AppLogService.append('DELETE_GRUPO', 'grupos', id, `Grupo com ID '${id}' excluído.`);
    }
    return result;
  },
};
