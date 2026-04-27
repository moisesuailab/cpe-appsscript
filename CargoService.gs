const CargoService = {

  get _SHEET() { return CONFIG.SHEETS.CARGOS; },
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
    const result = EntityService.create(this._SHEET, data, this._rulesCreate, (payload) => {
      ValidationService.validate({ tipo: payload.tipo }, { tipo: [['inList', this._TIPOS]] });
      const cargos = CrudRepository.findAll(this._SHEET);
      this._assertNomeUnico(cargos, payload.nome, payload.id_orgao);
      payload.is_presidente = 'FALSE';
    });
    if (result.status === 'success') {
      AppLogService.append('CREATE_CARGO', 'cargos', result.data.id, `Cargo '${data.nome}' (${data.tipo}) criado no órgão '${data.id_orgao}'.`);
    }
    return result;
  },

  update(id, data) {
    const result = EntityService.update(this._SHEET, id, data, this._rulesUpdate, () => {
      if (data.tipo) ValidationService.validate({ tipo: data.tipo }, { tipo: [['inList', this._TIPOS]] });
      const cargos = CrudRepository.findAll(this._SHEET);
      const cargo = cargos.find(c => String(c.id) === String(id));
      const idOrgao = data.id_orgao || cargo?.id_orgao;
      this._assertNomeUnico(cargos, data.nome, idOrgao, id);
    });
    if (result.status === 'success') {
      AppLogService.append('UPDATE_CARGO', 'cargos', id, `Cargo '${data.nome}' atualizado.`);
    }
    return result;
  },

  delete(id) {
    const result = EntityService.delete(this._SHEET, id, () => {
      const ocupacoes = CrudRepository.findAll(CONFIG.SHEETS.OCUPACOES);
      const vinculado = ocupacoes.some(o => String(o.id_cargo) === String(id));
      if (vinculado) throw new Error('Cargo não pode ser excluído pois possui ocupações vinculadas.');
    });
    if (result.status === 'success') {
      AppLogService.append('DELETE_CARGO', 'cargos', id, `Cargo com ID '${id}' excluído.`);
    }
    return result;
  },

  setPresidente(id) {
    try {
      const cargos = CrudRepository.findAll(this._SHEET);
      const cargo = cargos.find(c => String(c.id) === String(id));
      if (!cargo) throw new Error(`Cargo com ID '${id}' não encontrado.`);

      const presidenteAtual = cargos.find(c =>
        String(c.id_orgao) === String(cargo.id_orgao) &&
        String(c.is_presidente) === 'TRUE' &&
        String(c.id) !== String(id)
      );

      const updates = [];
      if (presidenteAtual) updates.push({ id: presidenteAtual.id, data: { is_presidente: 'FALSE' } });
      updates.push({ id, data: { is_presidente: 'TRUE' } });

      CrudRepository.updateBatch(this._SHEET, updates);
      AppLogService.append('SET_PRESIDENTE_CARGO', 'cargos', id, `Cargo com ID '${id}' definido como presidente no órgão '${cargo.id_orgao}'.`);
      return Utils.createResponse('success', null, 'Presidente definido com sucesso.');
    } catch (error) {
      Utils.logError('CargoService.setPresidente', error);
      return Utils.createResponse('error', null, error.message);
    }
  },
};
