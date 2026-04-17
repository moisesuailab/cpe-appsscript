const DashboardService = {

  getDashboardData() {
    const spreadsheetId = CONFIG.SPREADSHEET_ID;
    const rows = SheetsApiService.getValues(spreadsheetId, CONFIG.SHEETS.DASHBOARD, 'B1:B14');

    const val = (i) => (rows[i] && rows[i][0] !== undefined && rows[i][0] !== '') ? rows[i][0] : null;
    const num = (i) => Number(val(i)) || 0;

    const R = CONFIG.DASHBOARD_ROWS;
    return Utils.createResponse('success', {
      ultimoRecalculo:      val(R.ULTIMO_RECALCULO) !== null ? String(val(R.ULTIMO_RECALCULO)) : null,
      totalVagas:           num(R.TOTAL_VAGAS),
      vagasOcupadas:        num(R.VAGAS_OCUPADAS),
      vagasOciosas:         num(R.VAGAS_OCIOSAS),
      vagasAlocadasOrgao:   num(R.VAGAS_ALOCADAS_ORGAO),
      vagasAlocadasSetor:   num(R.VAGAS_ALOCADAS_SETOR),
      contratosVencendo30d: num(R.CONTRATOS_VENCENDO_30),
      contratosVencendo60d: num(R.CONTRATOS_VENCENDO_60),
      vagasGraduacao:       num(R.VAGAS_GRADUACAO),
      vagasPosGraduacao:    num(R.VAGAS_POS_GRADUACAO),
      vagasIndefinidas:     num(R.VAGAS_INDEFINIDAS),
    });
  },
};
