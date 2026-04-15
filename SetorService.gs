const SetorService = {

  get _SHEET() { return CONFIG.SHEETS.SETORES; },

  _rules: {
    nome:  ['required'],
    sigla: ['required'],
  },

  create(data) {
    const result = EntityService.create(this._SHEET, data, this._rules);
    if (result.status === 'success') {
      AppLogService.append('CREATE_SETOR', 'setores', result.data.id, `Setor '${data.nome}' (${data.sigla}) criado.`);
    }
    return result;
  },

  findAll() {
    return EntityService.findAll(this._SHEET);
  },

  findById(id) {
    return EntityService.findById(this._SHEET, id);
  },

  update(id, data) {
    const result = EntityService.update(this._SHEET, id, data, this._rules);
    if (result.status === 'success') {
      AppLogService.append('UPDATE_SETOR', 'setores', id, `Setor '${data.nome}' atualizado.`);
    }
    return result;
  },

  delete(id) {
    const result = EntityService.delete(this._SHEET, id, () => {
      const gestores = CrudRepository.findAll(CONFIG.SHEETS.GESTORES_SETOR);
      if (gestores.some(g => String(g.id_setor) === String(id))) {
        throw new Error('Setor não pode ser excluído pois possui gestor vinculado.');
      }
    });
    if (result.status === 'success') {
      AppLogService.append('DELETE_SETOR', 'setores', id, `Setor com ID '${id}' excluído.`);
    }
    return result;
  },
};
