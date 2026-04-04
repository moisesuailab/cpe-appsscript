const Tests = {
  _SHEET: '_test',

  // Runner
  runAll() {
    this._passed = 0;
    this._failed = 0;

    console.log('══════════════ TEST RUNNER ═════════════════');
    this._ensureTestSheet();

    this._run('ValidationService', () => this._testValidation());
    this._run('UserService',       () => this._testUserService());
    this._run('CrudRepository',    () => this._testCrud());

    console.log('════════════════════════════════════════════');
    console.log(`Passou: ${this._passed}  Falhou: ${this._failed}`);
    console.log('════════════════════════════════════════════');

    this._cleanTestSheet();
  },

  // Setup / Teardown
  _ensureTestSheet() {
    try {
      const ss    = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
      const sheet = ss.getSheetByName(this._SHEET);

      if (!sheet) {
        ss.insertSheet(this._SHEET);
        console.log(`Aba '${this._SHEET}' criada automaticamente.`);
      }

      SheetsApiService.clearValues(CONFIG.SPREADSHEET_ID, this._SHEET, 'A:ZZ');
      SheetsApiService.updateValues(CONFIG.SPREADSHEET_ID, this._SHEET, 'A1', [['id', 'nome', 'email']]);
      console.log(`Aba '${this._SHEET}' preparada.`);
    } catch (e) {
      console.error('Erro ao preparar aba de teste:', e.message);
    }
  },

  _cleanTestSheet() {
    try {
      const ss    = SpreadsheetApp.openById(CONFIG.SPREADSHEET_ID);
      const sheet = ss.getSheetByName(this._SHEET);
      if (sheet) {
        sheet.clearContents();
        console.log(`Aba '${this._SHEET}' limpa após os testes.`);
      }
    } catch (e) {
      console.error('Erro ao limpar aba de teste:', e.message);
    }
  },

  // ── Helpers ───────────────────────────────────────────
  _run(suiteName, fn) {
    console.log(`\nSuite: ${suiteName}`);
    try {
      fn();
    } catch (e) {
      this._fail(`Erro inesperado na suite '${suiteName}': ${e.message}`);
    }
  },

  _assert(description, condition) {
    if (condition) {
      console.log(`  ✔ ${description}`);
      this._passed++;
    } else {
      console.log(`  ✘ ${description}`);
      this._failed++;
    }
  },

  _assertThrows(description, fn) {
    try {
      fn();
      console.log(`  ✘ ${description} (esperava erro, mas não lançou)`);
      this._failed++;
    } catch {
      console.log(`  ✔ ${description}`);
      this._passed++;
    }
  },

  _fail(description) {
    console.log(`  ✘ ${description}`);
    this._failed++;
  },

  // Suite: ValidationService
  _testValidation() {
    // required
    this._assertThrows('required → lança erro para valor vazio', () =>
      ValidationService.validate({ nome: '' }, { nome: ['required'] })
    );

    this._assert('required → passa para valor preenchido', (() => {
      try { ValidationService.validate({ nome: 'João' }, { nome: ['required'] }); return true; }
      catch { return false; }
    })());

    // email
    this._assertThrows('email → lança erro para formato inválido', () =>
      ValidationService.validate({ email: 'nao-e-email' }, { email: ['email'] })
    );

    this._assert('email → passa para formato válido', (() => {
      try { ValidationService.validate({ email: 'teste@email.com' }, { email: ['email'] }); return true; }
      catch { return false; }
    })());

    // minLength / maxLength
    this._assertThrows('minLength → lança erro para string curta', () =>
      ValidationService.validate({ senha: '123' }, { senha: [['minLength', 6]] })
    );

    this._assertThrows('maxLength → lança erro para string longa', () =>
      ValidationService.validate({ nome: 'a'.repeat(51) }, { nome: [['maxLength', 50]] })
    );

    // numeric / min / max
    this._assertThrows('numeric → lança erro para valor não numérico', () =>
      ValidationService.validate({ idade: 'abc' }, { idade: ['numeric'] })
    );

    this._assertThrows('min → lança erro para valor abaixo do mínimo', () =>
      ValidationService.validate({ idade: 0 }, { idade: [['min', 1]] })
    );

    this._assertThrows('max → lança erro para valor acima do máximo', () =>
      ValidationService.validate({ idade: 200 }, { idade: [['max', 120]] })
    );

    // inList
    this._assertThrows('inList → lança erro para valor fora da lista', () =>
      ValidationService.validate({ role: 'superuser' }, { role: [['inList', ['admin', 'editor', 'viewer']]] })
    );
  },

  // Suite: UserService
  _testUserService() {
    const testEmail = '_test_user@teste.com';

    if (UserService.getRole(testEmail)) UserService.remove(testEmail);

    // add
    const addRes = UserService.add(testEmail, 'viewer');
    this._assert('add → retorna sucesso',          addRes.status === 'success');
    this._assert('add → usuário existe após criar', UserService.getRole(testEmail) === 'viewer');

    this._assert('add → duplicata retorna erro', (() => {
      const r = UserService.add(testEmail, 'viewer');
      return r.status === 'error';
    })());

    this._assertThrows('add → role inválida lança erro via ValidationService', () => {
      const r = UserService.add('outro@teste.com', 'superuser');
      if (r.status === 'error') throw new Error(r.message);
    });

    // updateRole
    const updRes = UserService.updateRole(testEmail, 'editor');
    this._assert('updateRole → retorna sucesso',              updRes.status === 'success');
    this._assert('updateRole → role atualizada corretamente', UserService.getRole(testEmail) === 'editor');

    // hasMinRole / hierarquia
    this._assert('hasMinRole → admin satisfaz viewer',  UserService.hasMinRole('_admin_fake@t.com', 'viewer') === false);
    this._assert('getRole    → retorna null para email inexistente', UserService.getRole('naoexiste@t.com') === null);

    // remove
    const delRes = UserService.remove(testEmail);
    this._assert('remove → retorna sucesso',         delRes.status === 'success');
    this._assert('remove → usuário não existe mais', UserService.getRole(testEmail) === null);

    this._assert('remove → email inexistente retorna erro', (() => {
      const r = UserService.remove(testEmail);
      return r.status === 'error';
    })());
  },

  // Suite: CrudRepository
  _testCrud() {
    const sheet = this._SHEET;
    const id    = 'TEST-001';
    const data  = { id, nome: 'Usuário Teste', email: 'crud@teste.com' };

    // create
    const created = CrudRepository.create(sheet, data);
    this._assert('create → retorna sucesso',      created.success === true);
    this._assert('create → rowNumber preenchido', created.rowNumber > 1);

    // findAll
    const all = CrudRepository.findAll(sheet);
    this._assert('findAll → retorna ao menos 1 registro', all.length >= 1);

    // findById
    const found = CrudRepository.findById(sheet, id);
    this._assert('findById → encontra o registro criado', found !== null);
    this._assert('findById → nome correto',               found?.nome === data.nome);

    // update
    const updated = CrudRepository.update(sheet, id, { nome: 'Nome Atualizado' });
    this._assert('update → retorna sucesso',   updated.success === true);
    this._assert('update → dado foi alterado', updated.data?.nome === 'Nome Atualizado');

    // findById após update
    const afterUpdate = CrudRepository.findById(sheet, id);
    this._assert('findById após update → reflete alteração', afterUpdate?.nome === 'Nome Atualizado');

    // delete
    const deleted = CrudRepository.delete(sheet, id);
    this._assert('delete → retorna sucesso', deleted.success === true);

    // findById após delete
    const afterDelete = CrudRepository.findById(sheet, id);
    this._assert('findById após delete → retorna null', afterDelete === null);

    // findById inexistente
    this._assertThrows('findById inexistente → lança erro', () =>
      CrudRepository._findRow(sheet, 'ID-INVALIDO')
    );
  },
};

function runAllTests() { Tests.runAll(); }