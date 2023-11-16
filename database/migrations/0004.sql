
SELECT SETVAL('projeto_atividade_id_seq', (SELECT MAX(id) FROM projeto_atividade));