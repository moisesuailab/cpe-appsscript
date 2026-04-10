const CargoService = {

  _SHEET:  CONFIG.SHEETS.CARGOS,
  _TIPOS:  ['titular', 'suplente', 'substituto'],

  _rulesCreate: {
    nome:     ['required'],
    tipo:     ['required'],
    id_orgao: ['required'],
  },

  _rulesUpdate: {
    nome: ['required'],
    tipo: ['required'],
  },

  _assertNomeUnico(cargos, nome, idOrgao, excludeId = null) {
    const duplicado = cargos.some(c =>
      String(c.id_orgao) === String(idOrgao) &&
      String(c.nome).toLowerCase() === String(nome).toLowerCase() &&
      (excludeId ? String(c.id) !== String(excludeId) : true)
    );
    if (duplicado) throw new Error(`Já existe um cargo com o nome '${nome}' neste órgão.`);
  },

  create(data) {
    return EntityService.create(this._SHEET, data, this._rulesCreate, (payload) => {
      ValidationService.validate({ tipo: payload.tipo }, { tipo: [['inList', this._TIPOS]] });
      const cargos = CrudRepository.findAll(this._SHEET);
      this._assertNomeUnico(cargos, payload.nome, payload.id_orgao);
      payload.is_presidente = 'FALSE';
    });
  },

  update(id, data) {
    return EntityService.update(this._SHEET, id, data, this._rulesUpdate, () => {
      if (data.tipo) ValidationService.validate({ tipo: data.tipo }, { tipo: [['inList', this._TIPOS]] });
      const cargo = CrudRepository.findById(this._SHEET, id);
      const idOrgao = data.id_orgao || cargo.id_orgao;
      const cargos = CrudRepository.findAll(this._SHEET);
      this._assertNomeUnico(cargos, data.nome, idOrgao, id);
    });
  },

  delete(id) {
    return EntityService.delete(this._SHEET, id, () => {
      const ocupacoes = CrudRepository.findAll(CONFIG.SHEETS.OCUPACOES);
      const vinculado = ocupacoes.some(o => String(o.id_cargo) === String(id));
      if (vinculado) throw new Error('Cargo não pode ser excluído pois possui ocupações vinculadas.');
    });
  },

  setPresidente(id) {
    try {
      const cargo = CrudRepository.findById(this._SHEET, id);
      if (!cargo) throw new Error(`Cargo com ID '${id}' não encontrado.`);

      const cargos = CrudRepository.findAll(this._SHEET);
      const presidenteAtual = cargos.find(c =>
        String(c.id_orgao) === String(cargo.id_orgao) &&
        String(c.is_presidente) === 'TRUE' &&
        String(c.id) !== String(id)
      );

      if (presidenteAtual) {
        EntityService.update(this._SHEET, presidenteAtual.id, { is_presidente: 'FALSE' });
      }

      return EntityService.update(this._SHEET, id, { is_presidente: 'TRUE' });
    } catch (error) {
      Utils.logError('CargoService.setPresidente', error);
      return Utils.createResponse('error', null, error.message);
    }
  },
};
