const OcupacaoService = {

  get _SHEET() { return CONFIG.SHEETS.OCUPACOES; },

  _rulesCreate: {
    id_cargo:      ['required'],
    id_magistrado: ['required'],
  },

  create(data) {
    const result = EntityService.create(this._SHEET, data, this._rulesCreate, () => {
      const ocupacoes = CrudRepository.findAll(this._SHEET);
      const cargos    = CrudRepository.findAll(CONFIG.SHEETS.CARGOS);

      const cargo = cargos.find(c => String(c.id) === String(data.id_cargo));
      if (!cargo) throw new Error(`Cargo com ID '${data.id_cargo}' não encontrado.`);

      const idsCargosDoOrgao = cargos
        .filter(c => String(c.id_orgao) === String(cargo.id_orgao))
        .map(c => String(c.id));

      const jaOcupaNoOrgao = ocupacoes.find(o =>
        String(o.id_magistrado) === String(data.id_magistrado) &&
        idsCargosDoOrgao.includes(String(o.id_cargo))
      );
      if (jaOcupaNoOrgao) throw new Error('Magistrado já ocupa um cargo neste órgão.');

      const ocupacaoAnterior = ocupacoes.find(o => String(o.id_cargo) === String(data.id_cargo));
      if (ocupacaoAnterior) CrudRepository.delete(this._SHEET, ocupacaoAnterior.id);
    });
    if (result.status === 'success') {
      AppLogService.append('VINCULAR_MAGISTRADO', 'ocupacoes', result.data.id, `Magistrado '${data.id_magistrado}' vinculado ao cargo '${data.id_cargo}'.`);
    }
    return result;
  },

  remover(id) {
    const result = EntityService.delete(this._SHEET, id, (recordId) => {
      const existe = CrudRepository.findById(this._SHEET, recordId);
      if (!existe) throw new Error(`Ocupação com ID '${recordId}' não encontrada.`);
    });
    if (result.status === 'success') {
      AppLogService.append('REMOVER_MAGISTRADO', 'ocupacoes', id, `Ocupação com ID '${id}' removida.`);
    }
    return result;
  },
};
