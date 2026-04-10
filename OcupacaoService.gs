const OcupacaoService = {

  _SHEET: CONFIG.SHEETS.OCUPACOES,

  _rulesCreate: {
    id_cargo:      ['required'],
    id_magistrado: ['required'],
  },

  create(data) {
    try {
      ValidationService.validate(data, this._rulesCreate);

      const ocupacoes = CrudRepository.findAll(this._SHEET);
      const cargos    = CrudRepository.findAll(CONFIG.SHEETS.CARGOS);

      const cargo = cargos.find(c => String(c.id) === String(data.id_cargo));
      if (!cargo) throw new Error(`Cargo com ID '${data.id_cargo}' não encontrado.`);

      // RN-NEW-02: magistrado único por órgão
      const idsCargosDoOrgao = cargos
        .filter(c => String(c.id_orgao) === String(cargo.id_orgao))
        .map(c => String(c.id));

      const jaOcupaNaOrgao = ocupacoes.find(o =>
        String(o.id_magistrado) === String(data.id_magistrado) &&
        idsCargosDoOrgao.includes(String(o.id_cargo))
      );
      if (jaOcupaNaOrgao) throw new Error('Magistrado já ocupa um cargo neste órgão.');

      // RN-NEW-01: 1 magistrado por cargo — deletar ocupação anterior
      const ocupacaoAnterior = ocupacoes.find(o => String(o.id_cargo) === String(data.id_cargo));
      if (ocupacaoAnterior) CrudRepository.delete(this._SHEET, ocupacaoAnterior.id);

      const result = CrudRepository.create(this._SHEET, data);
      return Utils.createResponse('success', result.data, null, { rowNumber: result.rowNumber });
    } catch (error) {
      Utils.logError('OcupacaoService.create', error);
      return Utils.createResponse('error', null, error.message);
    }
  },

  remover(id) {
    return EntityService.delete(this._SHEET, id, (recordId) => {
      const existe = CrudRepository.findById(this._SHEET, recordId);
      if (!existe) throw new Error(`Ocupação com ID '${recordId}' não encontrada.`);
    });
  },
};
