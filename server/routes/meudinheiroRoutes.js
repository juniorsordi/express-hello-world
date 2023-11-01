const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");
const database = require("../infra/database");

router.post("/lancamentos/confirmacaoauto", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/cadastros/categorias", async function (req, res, next) {
    try {
        let temp = [
            {
                "id": 25287448,
                "nome": "Alimentação",
                "nomeRel": "Alimentação",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "ALIMENTAçAO25287448",
                "sistema": false
            },
            {
                "id": 25287191,
                "nome": "Aluguel",
                "nomeRel": "Aluguel",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "r"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "ALUGUEL25287191",
                "sistema": false
            },
            {
                "id": 25287216,
                "nome": "Aplicação",
                "nomeRel": "Aplicação",
                "tipo": "t",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "t"
                            ]
                        },
                        "contaDestino": {
                            "tipo": {
                                "c": "in",
                                "v": [
                                    "INVESTIMENTO"
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "APLICAçAO25287216",
                "sistema": true,
                "tipoL": 11
            },
            {
                "id": 25287174,
                "nome": "Automóvel",
                "nomeRel": "Automóvel",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "AUTOMOVEL25287174",
                "sistema": false
            },
            {
                "id": 25287175,
                "nome": "Bem Estar",
                "nomeRel": "Bem Estar",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "BEM ESTAR25287175",
                "sistema": false
            },
            {
                "id": 25287214,
                "nome": "Compra de ativos",
                "nomeRel": "Compra de ativos",
                "tipo": "t",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "COMPRA DE ATIVOS25287214",
                "sistema": true,
                "tipoL": 9
            },
            {
                "id": 25287176,
                "nome": "Educação",
                "nomeRel": "Educação",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "EDUCAçAO25287176",
                "sistema": false
            },
            {
                "id": 25287177,
                "nome": "Empregados",
                "nomeRel": "Empregados",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "EMPREGADOS25287177",
                "sistema": false
            },
            {
                "id": 25287178,
                "nome": "Familiares Diversas",
                "nomeRel": "Familiares Diversas",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "FAMILIARES DIVERSAS25287178",
                "sistema": false
            },
            {
                "id": 25287179,
                "nome": "Impostos e Tarifas",
                "nomeRel": "Impostos e Tarifas",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "IMPOSTOS E TARIFAS25287179",
                "sistema": false
            },
            {
                "id": 25287207,
                "nome": "Investimentos",
                "nomeRel": "Investimentos",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": false,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287207",
                "sistema": true,
                "tipoL": 31
            },
            {
                "id": 25287195,
                "nome": "Investimentos",
                "nomeRel": "Investimentos",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": false,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287195",
                "sistema": true,
                "tipoL": 31
            },
            {
                "id": 25287180,
                "nome": "Lazer",
                "nomeRel": "Lazer",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "LAZER25287180",
                "sistema": false
            },
            {
                "id": 25287192,
                "nome": "Lucros",
                "nomeRel": "Lucros",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "r"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "LUCROS25287192",
                "sistema": false
            },
            {
                "id": 25287220,
                "nome": "Líquido de nota",
                "nomeRel": "Líquido de nota",
                "tipo": "t",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "LIQUIDO DE NOTA25287220",
                "sistema": true,
                "tipoL": 17
            },
            {
                "id": 25287181,
                "nome": "Moradia",
                "nomeRel": "Moradia",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "MORADIA25287181",
                "sistema": false
            },
            {
                "id": 25287189,
                "nome": "Outras Despesas",
                "nomeRel": "Outras Despesas",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "OUTRAS DESPESAS25287189",
                "sistema": true
            },
            {
                "id": 25287194,
                "nome": "Outras Receitas",
                "nomeRel": "Outras Receitas",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "r"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "OUTRAS RECEITAS25287194",
                "sistema": true
            },
            {
                "id": 25287221,
                "nome": "Pagamento de cartão",
                "nomeRel": "Pagamento de cartão",
                "tipo": "t",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "t"
                            ]
                        },
                        "contaDestino": {
                            "tipo": {
                                "c": "in",
                                "v": [
                                    "CARTAOCREDITO"
                                ]
                            }
                        },
                        "contaOrigem": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "PAGAMENTO DE CARTAO25287221",
                "sistema": true,
                "tipoL": 18
            },
            {
                "id": 25287182,
                "nome": "Pessoais",
                "nomeRel": "Pessoais",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "PESSOAIS25287182",
                "sistema": false
            },
            {
                "id": 25287183,
                "nome": "Previdência",
                "nomeRel": "Previdência",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "PREVIDENCIA25287183",
                "sistema": false
            },
            {
                "id": 25287193,
                "nome": "Pró-labore",
                "nomeRel": "Pró-labore",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "r"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "PRO-LABORE25287193",
                "sistema": false
            },
            {
                "id": 25287217,
                "nome": "Resgate",
                "nomeRel": "Resgate",
                "tipo": "t",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "t"
                            ]
                        },
                        "contaDestino": {
                            "tipo": {
                                "c": "nin",
                                "v": [
                                    "CARTAOCREDITO"
                                ]
                            }
                        },
                        "contaOrigem": {
                            "tipo": {
                                "c": "in",
                                "v": [
                                    "INVESTIMENTO"
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "RESGATE25287217",
                "sistema": true,
                "tipoL": 12
            },
            {
                "id": 25287218,
                "nome": "Resgate de cotas",
                "nomeRel": "Resgate de cotas",
                "tipo": "t",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "RESGATE DE COTAS25287218",
                "sistema": true,
                "tipoL": 23
            },
            {
                "id": 25287190,
                "nome": "Salário",
                "nomeRel": "Salário",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "r"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "SALARIO25287190",
                "sistema": false
            },
            {
                "id": 25287222,
                "nome": "Saque",
                "nomeRel": "Saque",
                "tipo": "t",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "t"
                            ]
                        },
                        "contaDestino": {
                            "tipo": {
                                "c": "in",
                                "v": [
                                    "DINHEIRO"
                                ]
                            }
                        },
                        "contaOrigem": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "SAQUE25287222",
                "sistema": true,
                "tipoL": 19
            },
            {
                "id": 25287184,
                "nome": "Saúde",
                "nomeRel": "Saúde",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "SAUDE25287184",
                "sistema": false
            },
            {
                "id": 25287185,
                "nome": "Seguros",
                "nomeRel": "Seguros",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "SEGUROS25287185",
                "sistema": false
            },
            {
                "id": 25287186,
                "nome": "Telefonia",
                "nomeRel": "Telefonia",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "TELEFONIA25287186",
                "sistema": false
            },
            {
                "id": 25287219,
                "nome": "Transferência",
                "nomeRel": "Transferência",
                "tipo": "t",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "t"
                            ]
                        }
                    }
                },
                "_ordenacao": "TRANSFERENCIA25287219",
                "sistema": true,
                "tipoL": 15
            },
            {
                "id": 25287187,
                "nome": "Transporte",
                "nomeRel": "Transporte",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "TRANSPORTE25287187",
                "sistema": false
            },
            {
                "id": 25287215,
                "nome": "Venda de ativos",
                "nomeRel": "Venda de ativos",
                "tipo": "t",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "VENDA DE ATIVOS25287215",
                "sistema": true,
                "tipoL": 10
            },
            {
                "id": 25287188,
                "nome": "Vestuário",
                "nomeRel": "Vestuário",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "VESTUARIO25287188",
                "sistema": false
            },
            {
                "id": 25287636,
                "nome": "Moradia/Luz",
                "nomeRel": "Luz",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "MORADIA25287181LUZ",
                "sistema": false,
                "pai": 25287181
            },
            {
                "id": 25287206,
                "nome": "Investimentos/Ajuste Diário",
                "nomeRel": "Ajuste Diário",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287195AJUSTE DIARIO",
                "sistema": true,
                "tipoL": 26,
                "pai": 25287195
            },
            {
                "id": 25287202,
                "nome": "Investimentos/Aluguel de imóveis",
                "nomeRel": "Aluguel de imóveis",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287195ALUGUEL DE IMOVEIS",
                "sistema": true,
                "tipoL": 27,
                "pai": 25287195
            },
            {
                "id": 25287200,
                "nome": "Investimentos/Bonificação",
                "nomeRel": "Bonificação",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287195BONIFICAçAO",
                "sistema": true,
                "tipoL": 20,
                "pai": 25287195
            },
            {
                "id": 25287197,
                "nome": "Investimentos/Dividendos",
                "nomeRel": "Dividendos",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287195DIVIDENDOS",
                "sistema": true,
                "tipoL": 2,
                "pai": 25287195
            },
            {
                "id": 25287199,
                "nome": "Investimentos/JSCP",
                "nomeRel": "JSCP",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287195JSCP",
                "sistema": true,
                "tipoL": 16,
                "pai": 25287195
            },
            {
                "id": 25287198,
                "nome": "Investimentos/Juros",
                "nomeRel": "Juros",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "r"
                            ]
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287195JUROS",
                "sistema": true,
                "tipoL": 3,
                "pai": 25287195
            },
            {
                "id": 25287205,
                "nome": "Investimentos/Participação de Debêntures",
                "nomeRel": "Participação de Debêntures",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287195PARTICIPAçAO DE DEBENTURES",
                "sistema": true,
                "tipoL": 25,
                "pai": 25287195
            },
            {
                "id": 25287203,
                "nome": "Investimentos/Proventos de ações",
                "nomeRel": "Proventos de ações",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287195PROVENTOS DE AçOES",
                "sistema": true,
                "tipoL": 22,
                "pai": 25287195
            },
            {
                "id": 25287201,
                "nome": "Investimentos/Proventos de fundos",
                "nomeRel": "Proventos de fundos",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287195PROVENTOS DE FUNDOS",
                "sistema": true,
                "tipoL": 21,
                "pai": 25287195
            },
            {
                "id": 25287204,
                "nome": "Investimentos/Prêmios de Debêntures",
                "nomeRel": "Prêmios de Debêntures",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": []
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287195PREMIOS DE DEBENTURES",
                "sistema": true,
                "tipoL": 24,
                "pai": 25287195
            },
            {
                "id": 25287196,
                "nome": "Investimentos/Rendimentos",
                "nomeRel": "Rendimentos",
                "tipo": "r",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "r"
                            ]
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287195RENDIMENTOS",
                "sistema": true,
                "tipoL": 1,
                "pai": 25287195
            },
            {
                "id": 25287210,
                "nome": "Investimentos/Custos operacionais",
                "nomeRel": "Custos operacionais",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287207CUSTOS OPERACIONAIS",
                "sistema": true,
                "tipoL": 6,
                "pai": 25287207
            },
            {
                "id": 25287212,
                "nome": "Investimentos/Custódia",
                "nomeRel": "Custódia",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287207CUSTODIA",
                "sistema": true,
                "tipoL": 8,
                "pai": 25287207
            },
            {
                "id": 25287213,
                "nome": "Investimentos/Despesas com imóveis",
                "nomeRel": "Despesas com imóveis",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287207DESPESAS COM IMOVEIS",
                "sistema": true,
                "tipoL": 28,
                "pai": 25287207
            },
            {
                "id": 25287208,
                "nome": "Investimentos/IOF",
                "nomeRel": "IOF",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287207IOF",
                "sistema": true,
                "tipoL": 4,
                "pai": 25287207
            },
            {
                "id": 25287209,
                "nome": "Investimentos/IR",
                "nomeRel": "IR",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287207IR",
                "sistema": true,
                "tipoL": 5,
                "pai": 25287207
            },
            {
                "id": 25287211,
                "nome": "Investimentos/Perdas",
                "nomeRel": "Perdas",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": false
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        }
                    }
                },
                "_ordenacao": "INVESTIMENTOS25287207PERDAS",
                "sistema": true,
                "tipoL": 7,
                "pai": 25287207
            },
            {
                "id": 25287450,
                "nome": "Alimentação/Mercado",
                "nomeRel": "Mercado",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "ALIMENTAçAO25287448MERCADO",
                "sistema": false,
                "pai": 25287448
            },
            {
                "id": 25287459,
                "nome": "Alimentação/Padaria",
                "nomeRel": "Padaria",
                "tipo": "d",
                "status": true,
                "permissoes": {
                    "visivel": true,
                    "acoes": {
                        "editar": true,
                        "excluir": true
                    },
                    "lancamento": {
                        "tipo": {
                            "c": "in",
                            "v": [
                                "d"
                            ]
                        },
                        "conta": {
                            "tipoInvestimento": {
                                "c": "in",
                                "v": [
                                    2
                                ]
                            }
                        }
                    }
                },
                "_ordenacao": "ALIMENTAçAO25287448PADARIA",
                "sistema": false,
                "pai": 25287448
            }
        ];
        res.json(temp);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/cadastros/contas", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.post("/cadastros/contas", async function (req, res, next) {
    try {
        console.log(req.body);
        res.json(req.body);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/cadastros/contas/bancos", async function (req, res, next) {
    try {
        let list = await database.any("SELECT * FROM financas_bancos");
        res.json(list);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/cadastros/contas/moedas", async function (req, res, next) {
    try {
        //let list = await database.any("SELECT * FROM financas_bancos");
        //res.json(list);
        res.json([
            {
                "id": 1,
                "codigo": "BRL",
                "nome": "Real",
                "simbolo": "R$"
            },
            {
                "id": 2,
                "codigo": "USD",
                "nome": "Dólar",
                "simbolo": "US$"
            },
            {
                "id": 3,
                "codigo": "EUR",
                "nome": "Euro",
                "simbolo": "€"
            }]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/cadastros/centros", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/metas/economia", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/relatorios/metasinvestimentos", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/integracao/connections", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/usuarios/demoavailable", async function (req, res, next) {
    try {
        res.json({
            "fin": true,
            "inv": true,
            "con": true
        });
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/regras", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/cadastros/tags", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/cadastros/plasticos", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/cadastros/formas", async function (req, res, next) {
    try {
        res.json([
            {
                "id": 4754918,
                "nome": "Boleto",
                "tipo": "NORMAL",
                "status": true
            },
            {
                "id": 4754919,
                "nome": "Cartão de Crédito",
                "tipo": "CARTAOCREDITO",
                "status": true
            },
            {
                "id": 4754920,
                "nome": "Cartão de Débito",
                "tipo": "NORMAL",
                "status": true
            },
            {
                "id": 4754921,
                "nome": "Cheque",
                "tipo": "NORMAL",
                "status": true
            },
            {
                "id": 4754922,
                "nome": "Depósito",
                "tipo": "NORMAL",
                "status": true
            },
            {
                "id": 4754923,
                "nome": "Dinheiro",
                "tipo": "NORMAL",
                "status": true
            },
            {
                "id": 4754924,
                "nome": "DOC/TED",
                "tipo": "NORMAL",
                "status": true
            },
            {
                "id": 4754925,
                "nome": "Débito Automático",
                "tipo": "NORMAL",
                "status": true
            },
            {
                "id": 4754926,
                "nome": "Internet",
                "tipo": "NORMAL",
                "status": true
            },
            {
                "id": 4754927,
                "nome": "Outros",
                "tipo": "NORMAL",
                "status": true
            }
        ]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/cadastros/projetos", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/cadastros/contatos", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/cadastros/contatos/campos", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/cadastros/contatos/categorias", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

router.get("/relatorios/resumoCartoes", async function (req, res, next) {
    try {
        res.json([]);
    } catch (err) {
        console.error(`Error while getting response`, err.message);
        next(err);
    }
});

module.exports = router;