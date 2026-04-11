const ContratoService = {

  _SHEET: CONFIG.SHEETS.CONTRATOS,

  _TIPOS: ['graduacao', 'pos_graduacao'],

  _rules: {
    id_estagiario: ['required'],
    id_vaga:       ['required'],
    tipo_contrato: ['required', ['inList', ['graduacao', 'pos_graduacao']]],
    data_inicio:   ['required'],
    data_fim:      ['required'],
  },

  _assertDatas(dataInicio, dataFim) {
    const inicio = new Date(dataInicio);
    const fim    = new Date(dataFim);
    if (isNaN(inicio.getTime())) throw new Error("'data_inicio' é inválida.");
    if (isNaN(fim.getTime()))    throw new Error("'data_fim' é inválida.");
    if (fim <= inicio) throw new Error("'data_fim' deve ser posterior a 'data_inicio'.");
  },

  _assertSemSobreposicao(contratos, idVaga, dataInicio, dataFim, excludeId = null) {
    const inicio = new Date(dataInicio);
    const fim    = new Date(dataFim);
    const sobreposicao = contratos.some(c => {
      if (String(c.id_vaga) !== String(idVaga)) return false;
      if (excludeId && String(c.id) === String(excludeId)) return false;
      const cInicio = new Date(c.data_inicio);
      const cFim    = new Date(c.data_fim);
      return inicio <= cFim && fim >= cInicio;
    });
    if (sobreposicao) throw new Error('O período informado se sobrepõe a um contrato já existente para esta vaga.');
  },

  _assertCompatibilidadeTipo(tipoContrato, tipoVaga) {
    if (tipoVaga === 'indefinido') return;
    if (tipoContrato !== tipoVaga) {
      throw new Error(`Tipo de contrato '${tipoContrato}' é incompatível com o tipo da vaga '${tipoVaga}'.`);
    }
  },

  create(data) {
    return EntityService.create(this._SHEET, data, this._rules, () => {
      this._assertDatas(data.data_inicio, data.data_fim);

      const vaga = CrudRepository.findById(CONFIG.SHEETS.VAGAS, data.id_vaga);
      if (!vaga) throw new Error('Vaga não encontrada.');

      this._assertCompatibilidadeTipo(data.tipo_contrato, vaga.tipo_vaga);

      const contratos = CrudRepository.findAll(this._SHEET);
      this._assertSemSobreposicao(contratos, data.id_vaga, data.data_inicio, data.data_fim);

      if (vaga.tipo_vaga === 'indefinido') {
        CrudRepository.update(CONFIG.SHEETS.VAGAS, data.id_vaga, { tipo_vaga: data.tipo_contrato });
      }
    });
  },

  update(id, data) {
    return EntityService.update(this._SHEET, id, data, this._rules, () => {
      this._assertDatas(data.data_inicio, data.data_fim);

      const vaga = CrudRepository.findById(CONFIG.SHEETS.VAGAS, data.id_vaga);
      if (!vaga) throw new Error('Vaga não encontrada.');

      this._assertCompatibilidadeTipo(data.tipo_contrato, vaga.tipo_vaga);

      const contratos = CrudRepository.findAll(this._SHEET);
      this._assertSemSobreposicao(contratos, data.id_vaga, data.data_inicio, data.data_fim, id);
    });
  },

  delete(id) {
    return EntityService.delete(this._SHEET, id);
  },
};
