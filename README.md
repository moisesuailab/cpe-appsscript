# Template Apps Script

Esse template de aplicacão web com Google Apps Script oferece uma estrutura pronta com autenticação por perfis de acesso (admin, editor, viewer), operações de leitura e escrita em Google Sheets e uma interface web responsiva. O objetivo é servir como base para construção de ferramentas internas, eliminando a necessidade de configurar essas fundações a cada novo projeto.

## Requisitos para implantação

Antes de começar, tenha em mãos:

- Acesso ao [Google Apps Script](https://script.google.com) com uma conta Google
- Uma **Google Spreadsheet** criada (o ID será necessário durante o setup)
- **Google Sheets API** habilitada no projeto do Apps Script
  - No editor: `Serviços` (icone de "+") > pesquise `Google Sheets API` > `Adicionar`
  
![Adicionar serviço Sheets API ao Apps Script](assets/images/sheetsapi.png)
- Os e-mails dos demais usuários que terão acesso (podem ser adicionados depois pela própria interface)

## Como implantar

Siga a sequência abaixo. Cada etapa só deve ser executada após a anterior estar concluída.

**1. Configurar o Setup.gs**

Abra o arquivo `Setup.gs` e edite o objeto `_CONFIG` com o ID da sua planilha:

```js
_CONFIG: {
  spreadsheetId: 'ID_DA_SUA_PLANILHA',
}
```

O ID da planilha está na URL, no formato: `docs.google.com/spreadsheets/d/ID_AQUI/edit`

![ID da planilha na URL](assets/images/planilha.png)

O e-mail do administrador inicial será detectado automaticamente a partir da conta que executar o setup.

**2. Executar o setup inicial**

No Apps Script Editor, execute a função:

```
setupInit()
```

![Executar o script de setup inicial](assets/images/executar.png)

Verifique o log de execução. Todos os itens devem aparecer com `[OK]`.

**3. Verificar o ambiente**

```
setupVerify()
```

Todos os itens devem estar `[OK]`. Corrija qualquer item marcado com `[ERRO]` antes de continuar.

**4. Publicar como aplicativo web**

No Apps Script Editor:

1. `Implantar > Nova implantação`
2. Tipo: `App da Web`
3. Executar como: `Usuario que acessa o app`
4. Quem tem acesso: conforme a necessidade do projeto
5. Clique em `Implantar` e copie a URL gerada

![Publicar como aplicativo web](assets/images/implantacao.png)

## Como acessar

Apos o deploy, acesse a URL gerada pelo Apps Script. A aplicação verificará automaticamente se o e-mail da conta Google logada tem permissão de acesso. Caso nao tenha, uma página de acesso negado sera exibida.

Novos usuários podem ser adicionados pelo administrador diretamente pela interface, na seção **Usuários**, ou via `setupUsers()` no editor.

## Desenvolvimento e testes

Durante o desenvolvimento de novas funcionalidades, utilize a **URL de desenvolvimento** disponível no Apps Script Editor em `Implantar > Testar implantações`. Ela sempre executa o código mais recente salvo, sem necessidade de criar uma nova versão a cada alteração. Somente após validar o comportamento esperado, realize uma nova implantação para promover as mudanças a versão de produção.

## Como customizar

A interface exibida no template — Dashboard, Alertas e Usuários — é apenas um exemplo de estrutura. Todo o conteúdo pode ser substituido ou expandido conforme a necessidade do projeto.

Para adicionar uma nova seção à ferramenta:

1. Crie um novo modulo JavaScript em `_scripts.html` com o estado e as operações da funcionalidade
2. Incorpore o módulo em `app()` e declare os getters de filtragem e paginação
3. Adicione o item correspondente no menu lateral
4. Crie o bloco de conteudo em `index.html`
5. Exponha as funções necessárias em `Codigo.gs` com os guards de permissão adequados

O arquivo `_styles.html` concentra todo o sistema de design. Cores, tipografia e componentes visuais podem ser ajustados diretamente nele.

> A estrutura de pastas, os nomes das abas da planilha e os campos de cada entidade devem ser definidos de acordo com o contexto do projeto. O template não impõe nenhuma estrutura de dados específica.