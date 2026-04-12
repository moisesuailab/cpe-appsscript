function seedDadosIniciais() {

  // ── GRUPOS JURISDICIONAIS ──────────────────────────────────────────────────
  // índice 0..30 → usado como id_grupo em orgaos
  const grupos = [
    { nome: 'Belo Horizonte, Betim e Contagem',  descricao: 'Belo Horizonte, Betim, Bonfim, Brumadinho, Esmeraldas, Ibirité, Igarapé, Itaguara, Juatuba, Mateus Leme, Pará de Minas, Pitangui, Contagem, Nova Lima, Sabará e Santa Luzia.' }, // 0
    { nome: 'Araguari',                          descricao: 'Araguari, Estrela do Sul e Monte Carmelo.' }, // 1
    { nome: 'Araxá',                             descricao: 'Araxá, Campos Altos, Ibiá, Luz, Nova Ponte, Perdizes e Sacramento.' }, // 2
    { nome: 'Barbacena',                         descricao: 'Alto Rio Doce, Barbacena, Barroso, Carandaí e Mercês.' }, // 3
    { nome: 'Cataguases',                        descricao: 'Além Paraíba, Cataguases, Leopoldina, Miraí, Palma e Pirapetinga.' }, // 4
    { nome: 'Conselheiro Lafaiete',              descricao: 'Belo Vale, Congonhas, Conselheiro Lafaiete, Entre Rios de Minas, Itabirito, Ouro Branco e Piranga.' }, // 5
    { nome: 'Curvelo',                           descricao: 'Abaeté, Buenópolis, Corinto, Curvelo, Diamantina, Itamarandiba, Martinho Campos, Morada Nova de Minas, Pirapora, Pompéu, Rio Vermelho, Serro, Três Marias e Várzea da Palma.' }, // 6
    { nome: 'Divinópolis',                       descricao: 'Carmo da Mata, Carmo do Cajuru, Carmópolis de Minas, Cláudio, Divinópolis, Dores do Indaiá, Itapecerica, Itaúna, Nova Serrana, Passa Tempo, Santo Antônio do Monte e São Gonçalo do Pará.' }, // 7
    { nome: 'Formiga',                           descricao: 'Aimorés, Arcos, Bambuí, Bom Despacho, Candeias, Caratinga, Formiga, Iguatama, Lagoa da Prata, Pains e Piumhi.' }, // 8
    { nome: 'Governador Valadares',              descricao: 'Conselheiro Pena, Coroaci, Galiléia, Governador Valadares, Inhapim, Ipanema, Itabirinha de Mantena, Itanhomi, Lajinha, Mantena, Mutum, Peçanha, Resplendor, Santa Maria do Suaçuí e Tarumirim.' }, // 9
    { nome: 'Itajubá',                           descricao: 'Aiuruoca, Brazópolis, Carmo de Minas, Cristina, Itajubá, Itamonte, Itanhandu, Paraisópolis, Passa Quatro, Pedralva e São Lourenço.' }, // 10
    { nome: 'Ipatinga',                          descricao: 'Açucena, Belo Oriente, Bom Jesus do Galho, Conceição do Mato Dentro, Coronel Fabriciano, Ipatinga, Mesquita e Timóteo.' }, // 11
    { nome: 'Itabira',                           descricao: 'Barão de Cocais, Caeté, Ferros, Guanhães, Itabira, João Monlevade, Nova Era, Rio Piracicaba, Sabinópolis, Santa Bárbara, Santa Maria de Itabira, São Domingos do Prata, São João Evangelista e Virginópolis.' }, // 12
    { nome: 'Ituiutaba',                         descricao: 'Campina Verde, Canápolis, Capinópolis, Carneirinho, Ituiutaba, Iturama e Santa Vitória.' }, // 13
    { nome: 'Juiz de Fora',                      descricao: 'Andrelândia, Bicas, Juiz de Fora, Lima Duarte, Mar de Espanha, Matias Barbosa, Rio Novo, Rio Preto, Santos Dumont e São João Nepomuceno.' }, // 14
    { nome: 'Lavras',                            descricao: 'Bom Sucesso, Campo Belo, Itumirim, Lavras, Nepomuceno, Oliveira, Perdões e Santo Antônio do Amparo.' }, // 15
    { nome: 'Montes Claros',                     descricao: 'Bocaíuva, Brasília de Minas, Coração de Jesus, Espinosa, Francisco Sá, Grão Mogol, Jaíba, Janaúba, Januária, Manga, Mato Verde, Mirabela, Montalvânia, Monte Azul, Montes Claros, Porteirinha, Rio Pardo de Minas, Salinas, São Francisco, São João da Ponte, São João do Paraíso, São Romão e Taiobeiras.' }, // 16
    { nome: 'Muriaé',                            descricao: 'Carangola, Divino, Espera Feliz, Eugenópolis, Manhuaçu, Manhumirim, Miradouro, Muriaé e Tombos.' }, // 17
    { nome: 'Paracatu',                          descricao: 'Arinos, Bonfinópolis de Minas, Buritis, João Pinheiro, Paracatu, Unaí e Vazante.' }, // 18
    { nome: 'Passos',                            descricao: 'Alpinópolis, Carmo do Rio Claro, Cássia, Guapé, Guaranésia, Guaxupé, Ibiraci, Itamoji, Jacuí, Monte Santo de Minas, Nova Resende, Passos, Pratápolis, São Roque de Minas, São Sebastião do Paraíso e São Tomás de Aquino.' }, // 19
    { nome: 'Patos de Minas',                    descricao: 'Carmo do Paranaíba, Coromandel, Patos de Minas, Patrocínio, Presidente Olegário, Rio Paranaíba, São Gonçalo do Abaeté, São Gotardo e Tiros.' }, // 20
    { nome: 'Poços de Caldas',                   descricao: 'Andradas, Areado, Botelhos, Cabo Verde, Caldas, Campestre, Machado, Monte Belo, Muzambinho, Poço Fundo, Poços de Caldas e Santa Rita de Caldas.' }, // 21
    { nome: 'Viçosa',                            descricao: 'Abre Campo, Alvinópolis, Ervália, Jequeri, Mariana, Ouro Preto, Ponte Nova, Raul Soares, Rio Casca, Teixeiras e Viçosa.' }, // 22
    { nome: 'Pouso Alegre',                      descricao: 'Borda da Mata, Bueno Brandão, Cachoeira de Minas, Camanducaia, Cambuí, Extrema, Jacutinga, Monte Sião, Natércia, Ouro Fino, Pouso Alegre, Santa Rita do Sapucaí, São Gonçalo do Sapucaí e Silvianópolis.' }, // 23
    { nome: 'São João Del Rei',                  descricao: 'Lagoa Dourada, Prados, Resende Costa e São João Del Rei.' }, // 24
    { nome: 'Sete Lagoas',                       descricao: 'Jaboticatubas, Lagoa Santa, Matozinhos, Papagaios, Paraopeba, Pedro Leopoldo, Ribeirão das Neves, Sete Lagoas e Vespasiano.' }, // 25
    { nome: 'Teófilo Otoni',                     descricao: 'Água Boa, Águas Formosas, Almenara, Araçuaí, Capelinha, Carlos Chagas, Itambacuri, Itaobin, Jacinto, Jequitinhonha, Joaíma, Malacacheta, Medina, Minas Novas, Nanuque, Novo Cruzeiro, Padre Paraíso, Pedra Azul, Rubin, Teófilo Otoni e Turmalina.' }, // 26
    { nome: 'Ubá',                               descricao: 'Guarani, Rio Pomba, Senador Firmino, Tocantins, Ubá e Visconde do Rio Branco.' }, // 27
    { nome: 'Uberaba',                           descricao: 'Conceição das Alagoas, Conquista, Fronteira, Frutal, Itapajipe e Uberaba.' }, // 28
    { nome: 'Uberlândia',                        descricao: 'Monte Alegre de Minas, Prata, Tupaciguara e Uberlândia.' }, // 29
    { nome: 'Varginha',                          descricao: 'Alfenas, Baependi, Boa Esperança, Cambuquira, Campanha, Campos Gerais, Caxambu, Conceição do Rio Verde, Cruzília, Elói Mendes, Lambari, Paraguaçu, Três Corações, Três Pontas e Varginha.' }, // 30
  ];

  // ── ÓRGÃOS JULGADORES ─────────────────────────────────────────────────────
  // índice 0..48 (= turmaId - 1) → usado como id_orgao em cargos
  const orgaos = [
    { nome: 'Turma Recursal com Jurisdição Exclusiva', id_grupo: 0  }, //  0
    { nome: 'Turma Recursal Temporária',               id_grupo: 0  }, //  1
    { nome: 'Turma Recursal',                          id_grupo: 1  }, //  2
    { nome: 'Turma Recursal',                          id_grupo: 2  }, //  3
    { nome: 'Turma Recursal',                          id_grupo: 3  }, //  4
    { nome: 'Turma Recursal',                          id_grupo: 4  }, //  5
    { nome: 'Turma Recursal',                          id_grupo: 5  }, //  6
    { nome: 'Turma Recursal',                          id_grupo: 6  }, //  7
    { nome: '1ª Turma Recursal',                       id_grupo: 7  }, //  8
    { nome: '2ª Turma Recursal',                       id_grupo: 7  }, //  9
    { nome: 'Turma Recursal',                          id_grupo: 8  }, // 10
    { nome: '1ª Turma Recursal',                       id_grupo: 9  }, // 11
    { nome: '2ª Turma Recursal',                       id_grupo: 9  }, // 12
    { nome: 'Turma Recursal Temporária',               id_grupo: 9  }, // 13
    { nome: 'Turma Recursal',                          id_grupo: 10 }, // 14
    { nome: '1ª Turma Recursal',                       id_grupo: 11 }, // 15
    { nome: '2ª Turma Recursal',                       id_grupo: 11 }, // 16
    { nome: 'Turma Recursal',                          id_grupo: 12 }, // 17
    { nome: 'Turma Recursal',                          id_grupo: 13 }, // 18
    { nome: '1ª Turma Recursal',                       id_grupo: 14 }, // 19
    { nome: '2ª Turma Recursal',                       id_grupo: 14 }, // 20
    { nome: '3ª Turma Recursal',                       id_grupo: 14 }, // 21
    { nome: '4ª Turma Recursal',                       id_grupo: 14 }, // 22
    { nome: '5ª Turma Recursal',                       id_grupo: 14 }, // 23
    { nome: 'Turma Recursal',                          id_grupo: 15 }, // 24
    { nome: '1ª Turma Recursal',                       id_grupo: 16 }, // 25
    { nome: '2ª Turma Recursal',                       id_grupo: 16 }, // 26
    { nome: 'Turma Recursal',                          id_grupo: 17 }, // 27
    { nome: 'Turma Recursal',                          id_grupo: 18 }, // 28
    { nome: 'Turma Recursal',                          id_grupo: 19 }, // 29
    { nome: 'Turma Recursal',                          id_grupo: 20 }, // 30
    { nome: '1ª Turma Recursal',                       id_grupo: 21 }, // 31
    { nome: '2ª Turma Recursal',                       id_grupo: 21 }, // 32
    { nome: 'Turma Recursal',                          id_grupo: 22 }, // 33
    { nome: 'Turma Recursal',                          id_grupo: 23 }, // 34
    { nome: 'Turma Recursal',                          id_grupo: 24 }, // 35
    { nome: '1ª Turma Recursal',                       id_grupo: 25 }, // 36
    { nome: '2ª Turma Recursal',                       id_grupo: 25 }, // 37
    { nome: '1ª Turma Recursal',                       id_grupo: 26 }, // 38
    { nome: '2ª Turma Recursal',                       id_grupo: 26 }, // 39
    { nome: 'Turma Recursal',                          id_grupo: 27 }, // 40
    { nome: '1ª Turma Recursal',                       id_grupo: 28 }, // 41
    { nome: '2ª Turma Recursal',                       id_grupo: 28 }, // 42
    { nome: '1ª Turma Recursal',                       id_grupo: 29 }, // 43
    { nome: '2ª Turma Recursal',                       id_grupo: 29 }, // 44
    { nome: '3ª Turma Recursal',                       id_grupo: 29 }, // 45
    { nome: '4ª Turma Recursal',                       id_grupo: 29 }, // 46
    { nome: '1ª Turma Recursal',                       id_grupo: 30 }, // 47
    { nome: '2ª Turma Recursal',                       id_grupo: 30 }, // 48
  ];

  // ── CARGOS ────────────────────────────────────────────────────────────────
  // Slots VAGO são incluídos (posição existe, mas sem magistrado atribuído).
  // is_presidente vinculado ao slot de cargo, não ao magistrado.
  const cargos = [

    // ── Órgão 0 · Turma Recursal com Jurisdição Exclusiva (BH/Betim/Contagem)
    { id_orgao:  0, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao:  0, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  0, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  0, nome: '4º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  0, nome: '5º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  0, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  0, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  0, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  0, nome: '4º Suplente',  tipo: 'suplente', is_presidente: false }, // VAGO
    { id_orgao:  0, nome: '5º Suplente',  tipo: 'suplente', is_presidente: false }, // VAGO

    // ── Órgão 1 · Turma Recursal Temporária (BH)
    { id_orgao:  1, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao:  1, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  1, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },

    // ── Órgão 2 · Turma Recursal (Araguari)
    { id_orgao:  2, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao:  2, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  2, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  2, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  2, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  2, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 3 · Turma Recursal (Araxá)
    { id_orgao:  3, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  3, nome: '2º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao:  3, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  3, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  3, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  3, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 4 · Turma Recursal (Barbacena)
    { id_orgao:  4, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao:  4, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  4, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  4, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  4, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  4, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 5 · Turma Recursal (Cataguases)
    { id_orgao:  5, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao:  5, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  5, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  5, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  5, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  5, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 6 · Turma Recursal (Conselheiro Lafaiete)
    { id_orgao:  6, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao:  6, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  6, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  6, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  6, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  6, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 7 · Turma Recursal (Curvelo)
    { id_orgao:  7, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  7, nome: '2º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao:  7, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  7, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  7, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  7, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 8 · 1ª Turma Recursal (Divinópolis)
    { id_orgao:  8, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao:  8, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  8, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  8, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  8, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  8, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 9 · 2ª Turma Recursal (Divinópolis)
    { id_orgao:  9, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao:  9, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  9, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao:  9, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  9, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao:  9, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 10 · Turma Recursal (Formiga)
    { id_orgao: 10, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 10, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 10, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 10, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 10, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 10, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 11 · 1ª Turma Recursal (Governador Valadares)
    { id_orgao: 11, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 11, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 11, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 11, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 11, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 11, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 12 · 2ª Turma Recursal (Governador Valadares)
    { id_orgao: 12, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 12, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 12, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 12, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 12, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 12, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 13 · Turma Recursal Temporária (Governador Valadares)
    { id_orgao: 13, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 13, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 13, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 13, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 13, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 13, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 14 · Turma Recursal (Itajubá)
    { id_orgao: 14, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 14, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 14, nome: '3º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 14, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 14, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 14, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 15 · 1ª Turma Recursal (Ipatinga)
    { id_orgao: 15, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 15, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 15, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 15, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 15, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 15, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 16 · 2ª Turma Recursal (Ipatinga)
    { id_orgao: 16, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 16, nome: '2º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 16, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 16, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 16, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 16, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 17 · Turma Recursal (Itabira)
    { id_orgao: 17, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 17, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 17, nome: '3º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 17, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 17, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 17, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 18 · Turma Recursal (Ituiutaba)
    { id_orgao: 18, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 18, nome: '2º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 18, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 18, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 18, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 18, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 19 · 1ª Turma Recursal (Juiz de Fora)
    { id_orgao: 19, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 19, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 19, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 19, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 19, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 19, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 20 · 2ª Turma Recursal (Juiz de Fora)
    { id_orgao: 20, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 20, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 20, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 20, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 20, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 20, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 21 · 3ª Turma Recursal (Juiz de Fora)
    { id_orgao: 21, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 21, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 21, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 21, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 21, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 21, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 22 · 4ª Turma Recursal (Juiz de Fora)
    { id_orgao: 22, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 22, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 22, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 22, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 22, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 22, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 23 · 5ª Turma Recursal (Juiz de Fora)
    { id_orgao: 23, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 23, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 23, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 23, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 23, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 23, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 24 · Turma Recursal (Lavras)
    { id_orgao: 24, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 24, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 24, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 24, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 24, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 24, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 25 · 1ª Turma Recursal (Montes Claros)
    { id_orgao: 25, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 25, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 25, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 25, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 25, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 25, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 26 · 2ª Turma Recursal (Montes Claros)
    { id_orgao: 26, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 26, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 26, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 26, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 26, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 26, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 27 · Turma Recursal (Muriaé)
    { id_orgao: 27, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 27, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 27, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 27, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 27, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 27, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 28 · Turma Recursal (Paracatu)
    { id_orgao: 28, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 28, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 28, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 28, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 28, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 28, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 29 · Turma Recursal (Passos)
    { id_orgao: 29, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 29, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 29, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 29, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 29, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 29, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 30 · Turma Recursal (Patos de Minas)
    { id_orgao: 30, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 30, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 30, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 30, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 30, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 30, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 31 · 1ª Turma Recursal (Poços de Caldas)
    { id_orgao: 31, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 31, nome: '2º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 31, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 31, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 31, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 31, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 32 · 2ª Turma Recursal (Poços de Caldas)
    { id_orgao: 32, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 32, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 32, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 32, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 32, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 32, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 33 · Turma Recursal (Viçosa)
    { id_orgao: 33, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 33, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 33, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 33, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 33, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 33, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 34 · Turma Recursal (Pouso Alegre)
    { id_orgao: 34, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 34, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 34, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 34, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 34, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 34, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 35 · Turma Recursal (São João Del Rei)
    { id_orgao: 35, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 35, nome: '2º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 35, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 35, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 35, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 35, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 36 · 1ª Turma Recursal (Sete Lagoas)
    { id_orgao: 36, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 36, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 36, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 36, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 36, nome: '2º Suplente',  tipo: 'suplente', is_presidente: true  }, // presidente é suplente
    { id_orgao: 36, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 37 · 2ª Turma Recursal (Sete Lagoas)
    { id_orgao: 37, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 37, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 37, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 37, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 37, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 37, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 38 · 1ª Turma Recursal (Teófilo Otoni)
    { id_orgao: 38, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 38, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 38, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 38, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 38, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 38, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 39 · 2ª Turma Recursal (Teófilo Otoni)
    { id_orgao: 39, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 39, nome: '2º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 39, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 39, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 39, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 39, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 40 · Turma Recursal (Ubá)
    { id_orgao: 40, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 40, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 40, nome: '3º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 40, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 40, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 40, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 41 · 1ª Turma Recursal (Uberaba)
    { id_orgao: 41, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 41, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 41, nome: '3º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 41, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 41, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 41, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 42 · 2ª Turma Recursal (Uberaba)
    { id_orgao: 42, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 42, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 42, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 42, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 42, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 42, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 43 · 1ª Turma Recursal (Uberlândia)
    { id_orgao: 43, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 43, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 43, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 43, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 43, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 43, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 44 · 2ª Turma Recursal (Uberlândia)
    { id_orgao: 44, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 44, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 44, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 44, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 44, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 44, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 45 · 3ª Turma Recursal (Uberlândia)
    { id_orgao: 45, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 45, nome: '2º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 45, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 45, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 45, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 45, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 46 · 4ª Turma Recursal (Uberlândia)
    { id_orgao: 46, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 46, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 46, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 46, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 46, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 46, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 47 · 1ª Turma Recursal (Varginha)
    { id_orgao: 47, nome: '1º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 47, nome: '2º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 47, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 47, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 47, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 47, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },

    // ── Órgão 48 · 2ª Turma Recursal (Varginha)
    { id_orgao: 48, nome: '1º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 48, nome: '2º Titular',   tipo: 'titular',  is_presidente: true  },
    { id_orgao: 48, nome: '3º Titular',   tipo: 'titular',  is_presidente: false },
    { id_orgao: 48, nome: '1º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 48, nome: '2º Suplente',  tipo: 'suplente', is_presidente: false },
    { id_orgao: 48, nome: '3º Suplente',  tipo: 'suplente', is_presidente: false },
  ];

  // ── MAGISTRADOS ───────────────────────────────────────────────────────────
  // Slots VAGO (suplente 4 e 5 do órgão 0) não possuem entrada aqui.
  // matricula deixada em branco — a preencher futuramente.
  const magistrados = [

    // ── Órgão 0 · Turma Recursal com Jurisdição Exclusiva (BH/Betim/Contagem)
    { nome: 'Luziene Medeiros do Nascimento Barbosa', matricula: '', cidade: ''                      },
    { nome: 'Flávia Birchal de Moura',               matricula: '', cidade: ''                      },
    { nome: 'Adriana de Vasconcelos Pereira',         matricula: '', cidade: ''                      },
    { nome: 'Patrícia Santos Firmo',                  matricula: '', cidade: ''                      },
    { nome: 'Sabrina da Cunha Peixoto Ladeira',       matricula: '', cidade: ''                      },
    { nome: 'Renato Luiz Faraco',                     matricula: '', cidade: ''                      },
    { nome: 'Michel Curi e Silva',                    matricula: '', cidade: ''                      },
    { nome: 'Paulo Sérgio Tinoco Néris',              matricula: '', cidade: ''                      },

    // ── Órgão 1 · Turma Recursal Temporária (BH)
    { nome: 'Maria Dolores Gióvine Cordovil',         matricula: '', cidade: ''                      },
    { nome: 'Beatriz Junqueira Guimarães',            matricula: '', cidade: ''                      },
    { nome: 'Mateus Bicalho de Melo Chavinho',        matricula: '', cidade: ''                      },

    // ── Órgão 2 · Turma Recursal (Araguari)
    { nome: 'Haroldo Pimenta',                        matricula: '', cidade: ''                      },
    { nome: 'Ana Régia Santos Chagas',                matricula: '', cidade: ''                      },
    { nome: 'João Marcos Luchesi',                    matricula: '', cidade: 'Monte Carmelo'         },
    { nome: 'Pedro Marcos Begatti',                   matricula: '', cidade: ''                      },
    { nome: 'Ana Maria Marco Antonio',                matricula: '', cidade: ''                      },
    { nome: 'Tainá Silveira Cruvinel',                matricula: '', cidade: 'Monte Carmelo'         },

    // ── Órgão 3 · Turma Recursal (Araxá)
    { nome: 'Eduardo Augusto Gardesani Guastini',     matricula: '', cidade: ''                      },
    { nome: 'Cláudio Henrique Cardoso Brasileiro',    matricula: '', cidade: 'Perdizes'              },
    { nome: 'Ivana Fidélis Silveira',                 matricula: '', cidade: 'Sacramento'            },
    { nome: 'Renato Zouain Zupo',                     matricula: '', cidade: ''                      },
    { nome: 'Dimas Ramon Esper',                      matricula: '', cidade: ''                      },
    { nome: 'Luiz Antônio Messias',                   matricula: '', cidade: 'Nova Ponte'            },

    // ── Órgão 4 · Turma Recursal (Barbacena)
    { nome: 'Marcos Alves de Andrade',                matricula: '', cidade: ''                      },
    { nome: 'Lélio Erlon Alves Tolentino',            matricula: '', cidade: ''                      },
    { nome: 'Alexandre Verneque Soares',              matricula: '', cidade: ''                      },
    { nome: 'Liliane Rossi dos Santos Oliveira',      matricula: '', cidade: ''                      },
    { nome: 'Tatiana de Moura Marinho',               matricula: '', cidade: 'Barroso'              },
    { nome: 'Karine Loyola Santos',                   matricula: '', cidade: ''                      },

    // ── Órgão 5 · Turma Recursal (Cataguases)
    { nome: 'Reinaldo Daniel Moreira',                matricula: '', cidade: ''                      },
    { nome: 'João Carneiro Duarte Neto',              matricula: '', cidade: ''                      },
    { nome: 'Leonardo Curty Bergamini',               matricula: '', cidade: 'Além Paraíba'         },
    { nome: 'Glauber Oliveira Fernandes',             matricula: '', cidade: 'Pirapetinga'           },
    { nome: 'Diego Lavendoski Vasconcelos',           matricula: '', cidade: ''                      },
    { nome: 'Diego Teixeira Martinez',                matricula: '', cidade: 'Além Paraíba'         },

    // ── Órgão 6 · Turma Recursal (Conselheiro Lafaiete)
    { nome: 'José Leão Santiago Campos',              matricula: '', cidade: ''                      },
    { nome: 'Célia Maria Andrade Freitas Corrêa',     matricula: '', cidade: ''                      },
    { nome: 'Frederico Esteves Duarte Gonçalves',     matricula: '', cidade: ''                      },
    { nome: 'Gustavo Vargas de Mendonça',             matricula: '', cidade: ''                      },
    { nome: 'Antônio Francisco Gonçalves',            matricula: '', cidade: 'Itabirito'             },
    { nome: 'Taunier Cristian Malheiros Lima',        matricula: '', cidade: ''                      },

    // ── Órgão 7 · Turma Recursal (Curvelo)
    { nome: 'Erlânia Zica e Silva Lucas Pereira',     matricula: '', cidade: ''                      },
    { nome: 'Breno Aquino Ribeiro',                   matricula: '', cidade: ''                      },
    { nome: 'Neanderson Martins Ramos',               matricula: '', cidade: 'Diamantina'           },
    { nome: 'Manoel Jorge de Matos Junior',           matricula: '', cidade: ''                      },
    { nome: 'Pedro Fernandes Alonso Alves Pereira',   matricula: '', cidade: 'Várzea da Palma'      },
    { nome: 'Bárbara Colen Diniz',                    matricula: '', cidade: ''                      },

    // ── Órgão 8 · 1ª Turma Recursal (Divinópolis)
    { nome: 'Ather Aguiar',                           matricula: '', cidade: ''                      },
    { nome: 'Marlúcio Teixeira de Carvalho',          matricula: '', cidade: ''                      },
    { nome: 'Juliano Abrantes Rodrigues',             matricula: '', cidade: ''                      },
    { nome: 'Christiano de Oliveira Cesarino',        matricula: '', cidade: ''                      },
    { nome: 'Rodrigo Péres Pereira',                  matricula: '', cidade: 'Nova Serrana'         },
    { nome: 'Alex Matoso Silva',                      matricula: '', cidade: 'Itaúna'               },

    // ── Órgão 9 · 2ª Turma Recursal (Divinópolis)
    { nome: 'Orlando Israel de Souza',                matricula: '', cidade: ''                      },
    { nome: 'Francisco de Assis Corrêa',              matricula: '', cidade: ''                      },
    { nome: 'Lucinalva Ferraz dos Santos',            matricula: '', cidade: ''                      },
    { nome: 'Núbio de Oliveira Parreiras',            matricula: '', cidade: ''                      },
    { nome: 'José Alexandre Marson Guidi',            matricula: '', cidade: 'Cláudio'              },
    { nome: 'Marcilene da Conceição Miranda',         matricula: '', cidade: ''                      },

    // ── Órgão 10 · Turma Recursal (Formiga)
    { nome: 'Altair Resende de Alvarenga',            matricula: '', cidade: ''                      },
    { nome: 'Rodrigo Márcio de Souza Rezende',        matricula: '', cidade: ''                      },
    { nome: 'Pedro dos Santos Barcelos',              matricula: '', cidade: 'Bambuí'               },
    { nome: 'Islon Cézar Damasceno',                  matricula: '', cidade: 'Lagoa da Prata'       },
    { nome: 'Sônia Helena Tavares de Azevedo',        matricula: '', cidade: 'Bom Despacho'         },
    { nome: 'César Rodrigo Iotti',                    matricula: '', cidade: 'Piumhi'               },

    // ── Órgão 11 · 1ª Turma Recursal (Governador Valadares)
    { nome: 'Anacleto Falci',                         matricula: '', cidade: ''                      },
    { nome: 'Michel Cristian de Freitas',             matricula: '', cidade: ''                      },
    { nome: 'Alan Raschke Jardim',                    matricula: '', cidade: 'Peçanha'              },
    { nome: 'Felipe Ceolin Lírio',                    matricula: '', cidade: 'Ipanema'              },
    { nome: 'Carla de Fátima Barreto de Souza',       matricula: '', cidade: ''                      },
    { nome: 'Marco Anderson Almeida Leal',            matricula: '', cidade: ''                      },

    // ── Órgão 12 · 2ª Turma Recursal (Governador Valadares)
    { nome: 'Cláudio Alves de Souza',                 matricula: '', cidade: ''                      },
    { nome: 'David Miranda Barroso',                  matricula: '', cidade: 'Mantena'              },
    { nome: 'Vinícius da Silva Pereira',              matricula: '', cidade: ''                      },
    { nome: 'Lupércio Paulo Fernandes de Oliveira',   matricula: '', cidade: ''                      },
    { nome: 'Natália Cravo Lázaro Monteiro',          matricula: '', cidade: 'Conselheiro Pena'     },
    { nome: 'Paulo Victor de França Albuquerque Paes',matricula: '', cidade: ''                      },

    // ── Órgão 13 · Turma Recursal Temporária (Governador Valadares)
    { nome: 'Alexandre Ferreira',                     matricula: '', cidade: ''                      },
    { nome: 'José Antônio de Oliveira Cordeiro',      matricula: '', cidade: ''                      },
    { nome: 'Consuelo Silveira Neto',                 matricula: '', cidade: ''                      },
    { nome: 'Max Wild de Souza',                      matricula: '', cidade: ''                      },
    { nome: 'Cleiton Luís Chiodi',                    matricula: '', cidade: ''                      },
    { nome: 'Jorge Arbex Bueno',                      matricula: '', cidade: ''                      },

    // ── Órgão 14 · Turma Recursal (Itajubá)
    { nome: 'Luiz Fernando Rennó Matos',              matricula: '', cidade: ''                      },
    { nome: 'Luciene Cristina Marassi Cagnin',        matricula: '', cidade: ''                      },
    { nome: 'Fábio Aurélio Marchello',                matricula: '', cidade: ''                      },
    { nome: 'Letícia Drumond',                        matricula: '', cidade: ''                      },
    { nome: 'Maria Fernanda Manfrinato Braga',        matricula: '', cidade: ''                      },
    { nome: 'Felipe Manzanares Tonon',                matricula: '', cidade: ''                      },

    // ── Órgão 15 · 1ª Turma Recursal (Ipatinga)
    { nome: 'Josselma Lopes da Silva',                matricula: '', cidade: ''                      },
    { nome: 'Mauro Simonassi',                        matricula: '', cidade: ''                      },
    { nome: 'José Carlos de Matos',                   matricula: '', cidade: ''                      },
    { nome: 'Luiz Flávio Ferreira',                   matricula: '', cidade: ''                      },
    { nome: 'Patrícia de Santana Napoleão',           matricula: '', cidade: ''                      },
    { nome: 'Daniel da Silva Ulhoa',                  matricula: '', cidade: 'Timóteo'              },

    // ── Órgão 16 · 2ª Turma Recursal (Ipatinga)
    { nome: 'Carlos Henrique Trindade Lourenço dos Santos', matricula: '', cidade: 'Coronel Fabriciano' },
    { nome: 'Érica Climene Xavier Duarte',            matricula: '', cidade: ''                      },
    { nome: 'Otavio Pinheiro da Silva',               matricula: '', cidade: ''                      },
    { nome: 'Rodrigo Antunes Lage',                   matricula: '', cidade: 'Timóteo'              },
    { nome: 'Eduardo Tavares Vianna',                 matricula: '', cidade: 'Coronel Fabriciano'   },
    { nome: 'Rodrigo Braga Ramos',                    matricula: '', cidade: ''                      },

    // ── Órgão 17 · Turma Recursal (Itabira)
    { nome: 'Rêidric Víctor da Silveira Condé Neiva e Silva', matricula: '', cidade: ''             },
    { nome: 'Guilherme Esch de Rueda',                matricula: '', cidade: ''                      },
    { nome: 'João Fábio Bomfim Machado de Siqueira',  matricula: '', cidade: ''                      },
    { nome: 'Estevão José Damazo',                    matricula: '', cidade: 'João Monlevade'       },
    { nome: 'Paulo José Rezende Borges',              matricula: '', cidade: 'João Monlevade'       },
    { nome: 'Luiz Felipe Sampaio Aranha',             matricula: '', cidade: 'João Monlevade'       },

    // ── Órgão 18 · Turma Recursal (Ituiutaba)
    { nome: 'Adilson da Silva da Conceição',          matricula: '', cidade: ''                      },
    { nome: 'Pedro Guimarães Pereira',                matricula: '', cidade: 'Santa Vitória'        },
    { nome: 'Carlos Eduardo da Silva',                matricula: '', cidade: 'Iturama'              },
    { nome: 'Gustavo Eleutério Alcalde',              matricula: '', cidade: 'Iturama'              },
    { nome: 'Maysa Silveira Urzêdo',                  matricula: '', cidade: 'Iturama'              },
    { nome: 'André Luiz Riginel da Silva Oliveira',   matricula: '', cidade: ''                      },

    // ── Órgão 19 · 1ª Turma Recursal (Juiz de Fora)
    { nome: 'Paulo Tristão Machado Junior',           matricula: '', cidade: ''                      },
    { nome: 'Rodrigo Mendes Pinto Ribeiro',           matricula: '', cidade: ''                      },
    { nome: 'Mônica Barbosa dos Santos',              matricula: '', cidade: ''                      },
    { nome: 'Marcelo Alexandre do Valle Thomaz',      matricula: '', cidade: ''                      },
    { nome: 'Jayme de Oliveira Maia',                 matricula: '', cidade: ''                      },
    { nome: 'Elisa Eumenia Mattos Machado Penido',    matricula: '', cidade: 'São João Nepomuceno'  },

    // ── Órgão 20 · 2ª Turma Recursal (Juiz de Fora)
    { nome: 'Francisco José da Silva',                matricula: '', cidade: ''                      },
    { nome: 'Mauro Francisco Pittelli',               matricula: '', cidade: ''                      },
    { nome: 'Silvemar José Henriques Salgado',        matricula: '', cidade: ''                      },
    { nome: 'Luiz Augusto de Souza Melo',             matricula: '', cidade: ''                      },
    { nome: 'Joyce Souza de Paula',                   matricula: '', cidade: ''                      },
    { nome: 'Augusto Vinícius Fonseca e Silva',       matricula: '', cidade: ''                      },

    // ── Órgão 21 · 3ª Turma Recursal (Juiz de Fora)
    { nome: 'Edir Guerson de Medeiros',               matricula: '', cidade: ''                      },
    { nome: 'Roberta Araújo de Carvalho Maciel',      matricula: '', cidade: ''                      },
    { nome: 'Ricardo Rodrigues de Lima',              matricula: '', cidade: ''                      },
    { nome: 'Saulo de Freitas Carvalho Filho',        matricula: '', cidade: 'Santos Dumont'        },
    { nome: 'Ricardo Domingos de Andrade',            matricula: '', cidade: 'Bicas'                },
    { nome: 'Maria Cristina de Souza Trúlio',         matricula: '', cidade: 'Santos Dumont'        },

    // ── Órgão 22 · 4ª Turma Recursal (Juiz de Fora)
    { nome: 'Ana Maria Lammoglia Jabour',             matricula: '', cidade: ''                      },
    { nome: 'Orfeu Sérgio Ferreira Filho',            matricula: '', cidade: ''                      },
    { nome: 'Ivanete Jota de Almeida',                matricula: '', cidade: ''                      },
    { nome: 'Sérgio Murilo Pacelli',                  matricula: '', cidade: ''                      },
    { nome: 'Sílvia Paiva de Souza Ramos Musse',      matricula: '', cidade: 'Lima Duarte'          },
    { nome: 'Valéria Possa Dornellas',                matricula: '', cidade: 'Santos Dumont'        },

    // ── Órgão 23 · 5ª Turma Recursal (Juiz de Fora)
    { nome: 'José Alfredo Junger Souza Vieira',       matricula: '', cidade: ''                      },
    { nome: 'Edson Geraldo Ladeira',                  matricula: '', cidade: ''                      },
    { nome: 'Júlio César Silveira de Castro',         matricula: '', cidade: 'São João Nepomuceno'  },
    { nome: 'Eduardo Cunha Mansur',                   matricula: '', cidade: 'Andrelândia'          },
    { nome: 'Raul Fernando de Oliveira Rodrigues',    matricula: '', cidade: 'Rio Novo'             },
    { nome: 'Flávia de Vasconcellos Araújo Silva',    matricula: '', cidade: ''                      },

    // ── Órgão 24 · Turma Recursal (Lavras)
    { nome: 'Renata Abranches Perdigão',              matricula: '', cidade: 'Campo Belo'           },
    { nome: 'Patrícia Narciso Alvarenga',             matricula: '', cidade: ''                      },
    { nome: 'Fernando de Moraes Mourão',              matricula: '', cidade: 'Oliveira'             },
    { nome: 'Antônio Godinho',                        matricula: '', cidade: 'Campo Belo'           },
    { nome: 'Renan Bueno Ribeiro',                    matricula: '', cidade: 'Perdões'              },
    { nome: 'Mário Paulo de Moura Campos Montoro',    matricula: '', cidade: ''                      },

    // ── Órgão 25 · 1ª Turma Recursal (Montes Claros)
    { nome: 'Francisco Lacerda de Figueiredo',        matricula: '', cidade: ''                      },
    { nome: 'Evandro Cangussu Melo',                  matricula: '', cidade: ''                      },
    { nome: 'Eliseu Silva Leite Fonseca',             matricula: '', cidade: ''                      },
    { nome: 'Vítor Luís de Almeida',                  matricula: '', cidade: ''                      },
    { nome: 'Sônia Maria Fernandes Marques',          matricula: '', cidade: 'Bocaiúva'             },
    { nome: 'Nalbernard de Oliveira Bichara',         matricula: '', cidade: ''                      },

    // ── Órgão 26 · 2ª Turma Recursal (Montes Claros)
    { nome: 'Maria Isabela Freire Cardoso',           matricula: '', cidade: ''                      },
    { nome: 'Antônio de Souza Rosa',                  matricula: '', cidade: ''                      },
    { nome: 'João Adilson Nunes Oliveira',            matricula: '', cidade: ''                      },
    { nome: 'Marcos Antônio Ferreira',                matricula: '', cidade: ''                      },
    { nome: 'Rozana Silqueira Paixão',                matricula: '', cidade: ''                      },
    { nome: 'Danilo de Mello Ferraz',                 matricula: '', cidade: 'Januária'             },

    // ── Órgão 27 · Turma Recursal (Muriaé)
    { nome: 'Marcelo Picanço de Andrade Von Held',    matricula: '', cidade: ''                      },
    { nome: 'Alinne Arquete Leite Novais',            matricula: '', cidade: ''                      },
    { nome: 'Adriano de Pádua Nakashima',             matricula: '', cidade: ''                      },
    { nome: 'Daniela Bertolini Rosa Coelho',          matricula: '', cidade: 'Manhuaçu'             },
    { nome: 'Maurício José Machado Pirozi',           matricula: '', cidade: ''                      },
    { nome: 'Juliano Carneiro Veiga',                 matricula: '', cidade: ''                      },

    // ── Órgão 28 · Turma Recursal (Paracatu)
    { nome: 'José Rubens Borges Matos',               matricula: '', cidade: ''                      },
    { nome: 'Rafael Lopes Lorenzoni',                 matricula: '', cidade: 'Unaí'                 },
    { nome: 'Gustavo Obata Trevisan',                 matricula: '', cidade: 'Arinos'               },
    { nome: 'Hugo Silva Oliveira',                    matricula: '', cidade: 'João Pinheiro'        },
    { nome: 'Maurício Pinto Filho',                   matricula: '', cidade: 'João Pinheiro'        },
    { nome: 'Ana Beatriz Cruz de Oliveira',           matricula: '', cidade: 'Vazante'              },

    // ── Órgão 29 · Turma Recursal (Passos)
    { nome: 'Mateus Queiroz de Oliveira',             matricula: '', cidade: ''                      },
    { nome: 'Ricardo Bastos Machado',                 matricula: '', cidade: ''                      },
    { nome: 'Patrícia Maria de Oliveira Leite',       matricula: '', cidade: ''                      },
    { nome: 'Bruno Moya Raimondo',                    matricula: '', cidade: 'Guaxupé'              },
    { nome: 'Elisandra Alice dos Santos Camilo',      matricula: '', cidade: 'São Sebastião do Paraíso' },
    { nome: 'Isadora de Castro Silva',                matricula: '', cidade: ''                      },

    // ── Órgão 30 · Turma Recursal (Patos de Minas)
    { nome: 'Marcus Caminhas Fasciani',               matricula: '', cidade: ''                      },
    { nome: 'Joamar Gomes Vieira Nunes',              matricula: '', cidade: ''                      },
    { nome: 'Serlon Silva Santos',                    matricula: '', cidade: 'Patrocínio'           },
    { nome: 'Walney Alves Diniz',                     matricula: '', cidade: 'Patrocínio'           },
    { nome: 'Denes Marcos Vieira',                    matricula: '', cidade: 'Carmo do Paranaíba'   },
    { nome: 'Rodrigo de Carvalho Assumpção',          matricula: '', cidade: ''                      },

    // ── Órgão 31 · 1ª Turma Recursal (Poços de Caldas)
    { nome: 'Claudio Hesketh',                        matricula: '', cidade: ''                      },
    { nome: 'Tânia Marina de Azevedo Grandal Coelho', matricula: '', cidade: ''                      },
    { nome: 'Rodrigo Dias de Castro',                 matricula: '', cidade: 'Machado'              },
    { nome: 'Eduardo Soares de Araújo',               matricula: '', cidade: 'Andradas'             },
    { nome: 'Raphael Ferreira Moreira',               matricula: '', cidade: 'Santa Rita de Caldas' },
    { nome: 'Larissa de Carvalho Santa Rosa',         matricula: '', cidade: 'Botelhos'             },

    // ── Órgão 32 · 2ª Turma Recursal (Poços de Caldas)
    { nome: 'Carlos Alberto Pereira da Silva',        matricula: '', cidade: ''                      },
    { nome: 'Paulo Rubens Salomão Caputo',            matricula: '', cidade: ''                      },
    { nome: 'Alessandra Bittencourt dos Santos Deppner', matricula: '', cidade: ''                   },
    { nome: 'José Henrique Mallmann',                 matricula: '', cidade: ''                      },
    { nome: 'José Eduardo Junqueira Gonçalves',       matricula: '', cidade: ''                      },
    { nome: 'Maurício Ferreira Cunha',                matricula: '', cidade: ''                      },

    // ── Órgão 33 · Turma Recursal (Viçosa)
    { nome: 'Rosângela Fátima de Freitas',            matricula: '', cidade: ''                      },
    { nome: 'Giovanna Travenzolli Abreu Lourenço',    matricula: '', cidade: ''                      },
    { nome: 'Dayse Mara Silveira Baltazar',           matricula: '', cidade: 'Ponte Nova'           },
    { nome: 'Daniele Viana da Silva',                 matricula: '', cidade: ''                      },
    { nome: 'Bruno Henrique Tenório Taveira',         matricula: '', cidade: 'Ponte Nova'           },
    { nome: 'Felipe Alexandre Vieira Rodrigues',      matricula: '', cidade: 'Ponte Nova'           },

    // ── Órgão 34 · Turma Recursal (Pouso Alegre)
    { nome: 'Caroline Dias Lopes Bela',               matricula: '', cidade: 'Cambuí'               },
    { nome: 'João Cláudio Teodoro',                   matricula: '', cidade: 'Ouro Fino'            },
    { nome: 'José Dimas Rocha Martins Guerra',        matricula: '', cidade: ''                      },
    { nome: 'André Luiz Polydoro',                    matricula: '', cidade: 'São Gonçalo do Sapucaí' },
    { nome: 'Roberto Troster Rodrigues Alves',        matricula: '', cidade: 'Monte Sião'           },
    { nome: 'Juliana Mendes Pedrosa',                 matricula: '', cidade: ''                      },

    // ── Órgão 35 · Turma Recursal (São João Del Rei)
    { nome: 'Hélio Martins Costa',                    matricula: '', cidade: ''                      },
    { nome: 'Ernane Barbosa Neves',                   matricula: '', cidade: ''                      },
    { nome: 'Flávio Mondaini',                        matricula: '', cidade: ''                      },
    { nome: 'Thiago Guimarães Emerim',                matricula: '', cidade: ''                      },
    { nome: 'Donizetti Nogueira Ramos',               matricula: '', cidade: ''                      },
    { nome: 'Maria Augusta Balbinot',                 matricula: '', cidade: ''                      },

    // ── Órgão 36 · 1ª Turma Recursal (Sete Lagoas)
    { nome: 'Karla Dolabela Irrthum',                 matricula: '', cidade: 'Matozinhos'           },
    { nome: 'Maria Flávia Albergaria Costa',          matricula: '', cidade: 'Matozinhos'           },
    { nome: 'Ricky Bert Biglionne Guimarães',         matricula: '', cidade: 'Vespasiano'           },
    { nome: 'Leonardo Guimarães Moreira',             matricula: '', cidade: 'Pedro Leopoldo'       },
    { nome: 'Alessandro de Abreu Borges',             matricula: '', cidade: ''                      },
    { nome: 'Flávia Silva da Penha',                  matricula: '', cidade: 'Vespasiano'           },

    // ── Órgão 37 · 2ª Turma Recursal (Sete Lagoas)
    { nome: 'Roberto das Graças Silva',               matricula: '', cidade: ''                      },
    { nome: 'Daniela Diniz',                          matricula: '', cidade: ''                      },
    { nome: 'Flávio Barros Moreira',                  matricula: '', cidade: ''                      },
    { nome: 'Sayonara Marques',                       matricula: '', cidade: 'Vespasiano'           },
    { nome: 'Gislene Martins Meutzner',               matricula: '', cidade: 'Lagoa Santa'          },
    { nome: 'Gisa Carina Gadelha Sabino',             matricula: '', cidade: 'Ribeirão das Neves'   },

    // ── Órgão 38 · 1ª Turma Recursal (Teófilo Otoni)
    { nome: 'Renzzo Giaccomo Ronchi',                 matricula: '', cidade: ''                      },
    { nome: 'Arnon Argolo Matos Rocha',               matricula: '', cidade: 'Medina'               },
    { nome: 'Juliana Alcova Nogueira',                matricula: '', cidade: ''                      },
    { nome: 'Flávia Braga Corte Imperial',            matricula: '', cidade: 'Pedra Azul'           },
    { nome: 'Cláudio Schiavo Cruz',                   matricula: '', cidade: 'Itambacuri'           },
    { nome: 'Maurício da Cruz Rossato',               matricula: '', cidade: 'Itambacuri'           },

    // ── Órgão 39 · 2ª Turma Recursal (Teófilo Otoni)
    { nome: 'Bárbara Livio',                          matricula: '', cidade: ''                      },
    { nome: 'Maurício Simões Coelho Júnior',          matricula: '', cidade: ''                      },
    { nome: 'Tiago Benetton Rossiti',                 matricula: '', cidade: ''                      },
    { nome: 'Aline Gomes dos Santos Silva',           matricula: '', cidade: ''                      },
    { nome: 'Edson Alfredo Sossai Regonini',          matricula: '', cidade: 'Nanuque'              },
    { nome: 'Bianca Maria Spinassi',                  matricula: '', cidade: 'Malacacheta'          },

    // ── Órgão 40 · Turma Recursal (Ubá)
    { nome: 'Cinthia Faria Honório Delgado',          matricula: '', cidade: ''                      },
    { nome: 'Cristiane Mello Coelho Gasparoni',       matricula: '', cidade: ''                      },
    { nome: 'Geraldo Magela Reis Alves',              matricula: '', cidade: 'Visconde do Rio Branco' },
    { nome: 'Daniele Rodrigues Marota Teixeira',      matricula: '', cidade: 'Visconde do Rio Branco' },
    { nome: 'Luciana de Oliveira Torres',             matricula: '', cidade: 'Rio Pomba'            },
    { nome: 'Felipe Teixeira Cancela Jr.',            matricula: '', cidade: ''                      },

    // ── Órgão 41 · 1ª Turma Recursal (Uberaba)
    { nome: 'Marcelo Geraldo Lemos',                  matricula: '', cidade: ''                      },
    { nome: 'Sidnei Ponce',                           matricula: '', cidade: ''                      },
    { nome: 'Raquel Agreli Melo',                     matricula: '', cidade: ''                      },
    { nome: 'Letícia Rezende Castelo Branco',         matricula: '', cidade: ''                      },
    { nome: 'Bruno Henrique de Oliveira',             matricula: '', cidade: 'Conceição das Alagoas' },
    { nome: 'Marco Antônio de Oliveira Roberto',      matricula: '', cidade: ''                      },

    // ── Órgão 42 · 2ª Turma Recursal (Uberaba)
    { nome: 'Stefano Renato Raymundo',                matricula: '', cidade: ''                      },
    { nome: 'José Paulino de Freitas Neto',           matricula: '', cidade: ''                      },
    { nome: 'Fábio Gameiro Vivancos',                 matricula: '', cidade: ''                      },
    { nome: 'Marco Antônio Macedo Ferreira',          matricula: '', cidade: ''                      },
    { nome: 'Beatriz Auxiliadora Rezende Machado',    matricula: '', cidade: ''                      },
    { nome: 'Claudio Roberto Domingues Junior',       matricula: '', cidade: ''                      },

    // ── Órgão 43 · 1ª Turma Recursal (Uberlândia)
    { nome: 'José Roberto Poiani',                    matricula: '', cidade: ''                      },
    { nome: 'José Márcio Parreira',                   matricula: '', cidade: ''                      },
    { nome: 'Marcos José Vedovotto',                  matricula: '', cidade: ''                      },
    { nome: 'Danielle Louise Rutkowski Dias Engel',   matricula: '', cidade: 'Tupaciguara'          },
    { nome: 'Vanessa Guimarães da Costa Vedovotto',   matricula: '', cidade: ''                      },
    { nome: 'Márcio José Tricotti',                   matricula: '', cidade: ''                      },

    // ── Órgão 44 · 2ª Turma Recursal (Uberlândia)
    { nome: 'Carlos José Cordeiro',                   matricula: '', cidade: ''                      },
    { nome: 'Lourenço Migliorini Fonseca Ribeiro',    matricula: '', cidade: ''                      },
    { nome: 'Kênia Suzete Baía Ferreira',             matricula: '', cidade: ''                      },
    { nome: 'Claudiana Silva de Freitas',             matricula: '', cidade: ''                      },
    { nome: 'Roberto Ribeiro de Paiva Júnior',        matricula: '', cidade: ''                      },
    { nome: 'Edinamar Aparecida da Silva Costa',      matricula: '', cidade: ''                      },

    // ── Órgão 45 · 3ª Turma Recursal (Uberlândia)
    { nome: 'João Ecyr Mota Ferreira',                matricula: '', cidade: ''                      },
    { nome: 'Maria Elisa Taglialegna',                matricula: '', cidade: ''                      },
    { nome: 'Luís Eusébio Camuci',                    matricula: '', cidade: ''                      },
    { nome: 'Juliana Faleiro de Lacerda Ventura',     matricula: '', cidade: ''                      },
    { nome: 'André Ricardo Botasso',                  matricula: '', cidade: ''                      },
    { nome: 'Roberto Bertoldo Garcia',                matricula: '', cidade: 'Tupaciguara'          },

    // ── Órgão 46 · 4ª Turma Recursal (Uberlândia)
    { nome: 'Alaor Alves de Melo Júnior',             matricula: '', cidade: ''                      },
    { nome: 'Pedro Vivaldo de Souza Noleto',          matricula: '', cidade: ''                      },
    { nome: 'Ewerton Roncoleta',                      matricula: '', cidade: ''                      },
    { nome: 'Ricardo Augusto Salge',                  matricula: '', cidade: ''                      },
    { nome: 'Alexandre Magno Mendes do Valle',        matricula: '', cidade: ''                      },
    { nome: 'Adelson Soares de Oliveira',             matricula: '', cidade: ''                      },

    // ── Órgão 47 · 1ª Turma Recursal (Varginha)
    { nome: 'Fernanda Machado de Moura Leite',        matricula: '', cidade: 'Três Corações'        },
    { nome: 'Flávio Junqueira Silva',                 matricula: '', cidade: 'Três Corações'        },
    { nome: 'Aline Cristina Modesto da Silva',        matricula: '', cidade: 'Três Pontas'          },
    { nome: 'Elias Aparecido de Oliveira',            matricula: '', cidade: 'Alfenas'              },
    { nome: 'Lucas Carvalho Murad',                   matricula: '', cidade: 'Baependi'             },
    { nome: 'Fábio Moreira Arantes',                  matricula: '', cidade: 'Campos Gerais'        },

    // ── Órgão 48 · 2ª Turma Recursal (Varginha)
    { nome: 'Glauciene Gonçalves da Silva',           matricula: '', cidade: 'Três Corações'        },
    { nome: 'Maurício Navarro Bandeira de Mello',     matricula: '', cidade: ''                      },
    { nome: 'Denes Ferreira Mendes',                  matricula: '', cidade: 'Três Corações'        },
    { nome: 'Enismar Kelley de Freitas',              matricula: '', cidade: ''                      },
    { nome: 'Hilton Silva Alonso Junior',             matricula: '', cidade: 'Caxambu'              },
    { nome: 'Karen Cristina Lavoura Lima',            matricula: '', cidade: 'Três Corações'        },
  ];


  // ── Gerar UUIDs antecipados para montar FKs ───────────────────────────────
  const grupoIds = grupos.map(() => Utilities.getUuid());
  const orgaoIds = orgaos.map(() => Utilities.getUuid());

  // ── 1. GRUPOS ─────────────────────────────────────────────────────────────
  try {
    const existentes = CrudRepository.findAll(CONFIG.SHEETS.GRUPOS);
    if (existentes.length > 0) {
      Logger.log('[Seed] grupos já possui dados, pulando.');
    } else {
      const rows = grupos.map((g, i) => ({ id: grupoIds[i], nome: g.nome, descricao: g.descricao }));
      CrudRepository.batchCreate(CONFIG.SHEETS.GRUPOS, rows);
    }
  } catch (e) {
    Logger.log('[Seed] Erro em grupos: ' + e.message);
  }

  // ── 2. ÓRGÃOS ─────────────────────────────────────────────────────────────
  try {
    const existentes = CrudRepository.findAll(CONFIG.SHEETS.ORGAOS);
    if (existentes.length > 0) {
      Logger.log('[Seed] orgaos já possui dados, pulando.');
    } else {
      const rows = orgaos.map((o, i) => ({ id: orgaoIds[i], nome: o.nome, id_grupo: grupoIds[o.id_grupo] }));
      CrudRepository.batchCreate(CONFIG.SHEETS.ORGAOS, rows);
    }
  } catch (e) {
    Logger.log('[Seed] Erro em orgaos: ' + e.message);
  }

  // ── 3. CARGOS ─────────────────────────────────────────────────────────────
  try {
    const existentes = CrudRepository.findAll(CONFIG.SHEETS.CARGOS);
    if (existentes.length > 0) {
      Logger.log('[Seed] cargos já possui dados, pulando.');
    } else {
      const rows = cargos.map(c => ({
        id:            Utilities.getUuid(),
        id_orgao:      orgaoIds[c.id_orgao],
        nome:          c.nome,
        tipo:          c.tipo,
        is_presidente: c.is_presidente,
      }));
      CrudRepository.batchCreate(CONFIG.SHEETS.CARGOS, rows);
    }
  } catch (e) {
    Logger.log('[Seed] Erro em cargos: ' + e.message);
  }

  // ── 4. MAGISTRADOS ────────────────────────────────────────────────────────
  try {
    const existentes = CrudRepository.findAll(CONFIG.SHEETS.MAGISTRADOS);
    if (existentes.length > 0) {
      Logger.log('[Seed] magistrados já possui dados, pulando.');
    } else {
      const rows = magistrados.map(m => ({
        id:        Utilities.getUuid(),
        nome:      m.nome,
        matricula: m.matricula,
        cidade:    m.cidade,
      }));
      CrudRepository.batchCreate(CONFIG.SHEETS.MAGISTRADOS, rows);
    }
  } catch (e) {
    Logger.log('[Seed] Erro em magistrados: ' + e.message);
  }

  Logger.log('[Seed] Concluído.');
}