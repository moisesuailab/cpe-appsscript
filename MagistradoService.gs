const MagistradoService = {

  get _SHEET() { return CONFIG.SHEETS.MAGISTRADOS; },

  _rules: {
    nome:      ['required'],
    matricula: ['required'],
  },

  _assertMatriculaUnica(magistrados, matricula, excludeId = null) {
    const duplicado = magistrados.some(m =>
      String(m.matricula) === String(matricula) &&
      (excludeId ? String(m.id) !== String(excludeId) : true)
    );
    if (duplicado) throw new Error(`Já existe um magistrado com a matrícula '${matricula}'.`);
  },

  create(data) {
    const result = EntityService.create(this._SHEET, data, this._rules, () => {
      const magistrados = CrudRepository.findAll(this._SHEET);
      this._assertMatriculaUnica(magistrados, data.matricula);
    });
    if (result.status === 'success') {
      AppLogService.append('CREATE_MAGISTRADO', 'magistrados', result.data.id, `Magistrado '${data.nome}' (Matrícula: ${data.matricula}) criado.`);
    }
    return result;
  },

  update(id, data) {
    const result = EntityService.update(this._SHEET, id, data, this._rules, () => {
      const magistrados = CrudRepository.findAll(this._SHEET);
      this._assertMatriculaUnica(magistrados, data.matricula, id);
    });
    if (result.status === 'success') {
      AppLogService.append('UPDATE_MAGISTRADO', 'magistrados', id, `Magistrado '${data.nome}' atualizado.`);
    }
    return result;
  },

  delete(id) {
    const result = EntityService.delete(this._SHEET, id, () => {
      const ocupacoes = CrudRepository.findAll(CONFIG.SHEETS.OCUPACOES);
      const vinculado = ocupacoes.some(o => String(o.id_magistrado) === String(id));
      if (vinculado) throw new Error('Magistrado não pode ser excluído pois possui ocupações vinculadas.');
    });
    if (result.status === 'success') {
      AppLogService.append('DELETE_MAGISTRADO', 'magistrados', id, `Magistrado com ID '${id}' excluído.`);
    }
    return result;
  },
};
