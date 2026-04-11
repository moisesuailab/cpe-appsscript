const DashboardService = {

  getDashboardData() {
    const spreadsheetId = CONFIG.SPREADSHEET_ID;
    const rows = SheetsApiService.getValues(spreadsheetId, CONFIG.SHEETS.DASHBOARD, 'B1:B14');

    const val = (i) => (rows[i] && rows[i][0] !== undefined && rows[i][0] !== '') ? rows[i][0] : null;
    const num = (i) => Number(val(i)) || 0;

    return Utils.createResponse('success', {
      ultimoRecalculo:     val(0) !== null ? String(val(0)) : null,
      totalVagas:          num(1),
      vagasOcupadas:       num(2),
      vagasOciosas:        num(3),
      vagasAlocadasOrgao:  num(4),
      vagasAlocadasSetor:  num(5),
      contratosVencendo30d: num(9),
      contratosVencendo60d: num(10),
      vagasGraduacao:      num(11),
      vagasPosGraduacao:   num(12),
      vagasIndefinidas:    num(13),
    });
  },
};
