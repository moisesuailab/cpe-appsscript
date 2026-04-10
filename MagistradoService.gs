const MagistradoService = {

  _SHEET: CONFIG.SHEETS.MAGISTRADOS,

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
    return EntityService.create(this._SHEET, data, this._rules, () => {
      const magistrados = CrudRepository.findAll(this._SHEET);
      this._assertMatriculaUnica(magistrados, data.matricula);
    });
  },

  update(id, data) {
    return EntityService.update(this._SHEET, id, data, this._rules, () => {
      const magistrados = CrudRepository.findAll(this._SHEET);
      this._assertMatriculaUnica(magistrados, data.matricula, id);
    });
  },

  delete(id) {
    return EntityService.delete(this._SHEET, id, () => {
      const ocupacoes = CrudRepository.findAll(CONFIG.SHEETS.OCUPACOES);
      const vinculado = ocupacoes.some(o => String(o.id_magistrado) === String(id));
      if (vinculado) throw new Error('Magistrado não pode ser excluído pois possui ocupações vinculadas.');
    });
  },
};
