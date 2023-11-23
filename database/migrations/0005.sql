CREATE TABLE IF NOT EXISTS sistema_menus (
    id serial primary key,
    titulo varchar(256),
    rota varchar(256),
    classe_icone varchar(256),
    id_menu_pai integer,
    ativo boolean,
    ordem integer
);

INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(1, 'Home', '/', 'home', NULL, true, 1);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(2, 'Projects', NULL, 'folder', NULL, true, 2);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(3, 'Dashboard', '/projects/dashboard', 'layers', 2, true, NULL);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(4, 'Projects', '/projects', 'view_cozy', 2, true, NULL);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(5, 'Activities', '/projects/activities', 'format_list_bulleted', 2, true, NULL);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(6, 'Kanban', '/projects/kanban', 'format_list_bulleted', 2, true, NULL);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(7, 'Finances', NULL, 'folder', NULL, true, 3);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(8, 'Dashboard', '/finances', 'insights', 7, true, NULL);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(9, 'Movimentações', '/finances/movimentacoes', 'currency_exchange', 7, true, NULL);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(10, 'Relatório OFX', '/finance/ofxreport', 'currency_exchange', 7, true, NULL);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(11, 'Cash Flow', '/finance/cashFlow', 'currency_exchange', 7, true, NULL);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(12, 'Tickets', NULL, 'folder', NULL, true, 4);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(13, 'Dashboard', '/tickets', 'rule', 12, true, NULL);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(14, 'Tickets', '/tickets/list', 'event_note', 12, true, NULL);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(15, 'RH', NULL, 'folder', NULL, true, 5);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(16, 'Dashboard', '/rh', 'format_list_bulleted', 15, true, NULL);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(17, 'Bater Ponto', '/rh/baterPonto', 'alarm', 15, true, NULL);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(18, 'System', NULL, 'folder', NULL, true, 6);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(19, 'Users', '/sistema/usuarios', 'manage_accounts', 18, true, NULL);
INSERT INTO sistema_menus (id, titulo, rota, classe_icone, id_menu_pai, ativo, ordem) VALUES(20, 'Settings', '/company/settings', 'settings', 18, true, NULL);