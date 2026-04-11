const VagaService = {

  _SHEET: CONFIG.SHEETS.VAGAS,

  _TIPOS:   ['graduacao', 'pos_graduacao', 'indefinido'],
  _STATUS:  ['nao_alocada', 'alocada'],

  _rulesCreate: {
    id_setor:  ['required'],
    tipo_vaga: ['required', ['inList', ['graduacao', 'pos_graduacao', 'indefinido']]],
  },

  _rulesUpdate: {
    tipo_vaga: ['required', ['inList', ['graduacao', 'pos_graduacao', 'indefinido']]],
    status:    ['required', ['inList', ['nao_alocada', 'alocada']]],
  },

  _nextNumeroVaga(vagas, idSetor) {
    const doSetor = vagas.filter(v => String(v.id_setor) === String(idSetor));
    if (doSetor.length === 0) return 1;
    return Math.max(...doSetor.map(v => Number(v.numero_vaga) || 0)) + 1;
  },

  _validarConsistenciaAlocacao(data) {
    const temCargo = data.id_cargo && String(data.id_cargo).trim() !== '';
    if (temCargo && data.status !== 'alocada') {
      throw new Error("Quando 'id_cargo' é informado, 'status' deve ser 'alocada'.");
    }
  },

  _assertSemContratos(id) {
    try {
      const contratos = CrudRepository.findAll(CONFIG.SHEETS.CONTRATOS);
      const vinculado = contratos.some(c => String(c.id_vaga) === String(id));
      if (vinculado) throw new Error('Vaga não pode ser excluída pois possui contratos vinculados.');
    } catch (e) {
      if (e.message.includes('contratos vinculados')) throw e;
    }
  },

  create(data) {
    return EntityService.create(this._SHEET, data, this._rulesCreate, () => {
      this._validarConsistenciaAlocacao(data);
      const vagas = CrudRepository.findAll(this._SHEET);
      data.numero_vaga = this._nextNumeroVaga(vagas, data.id_setor);
      data.status = 'nao_alocada';
      if (!data.id_cargo) data.id_cargo = '';
    });
  },

  update(id, data) {
    return EntityService.update(this._SHEET, id, data, this._rulesUpdate, () => {
      this._validarConsistenciaAlocacao(data);
    });
  },

  delete(id) {
    return EntityService.delete(this._SHEET, id, () => {
      this._assertSemContratos(id);
    });
  },
};
