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

CREATE TABLE IF NOT EXISTS agendamento_planos (
    id serial primary key,
    titulo varchar(256),
    descricao text,
    valor_mensal float,
    padrao boolean,
    ativo boolean
);
INSERT INTO agendamento_planos (id, titulo, descricao, valor_mensal, padrao, ativo) VALUES(1, 'Básico', '<ul class="list-unstyled plan-features">
	<li>Agendar horarios com diversos tipos de profissionais</li>
	<li>Descontos exclusivos</li>
	<li>Agilidade e facilidade em localizar profissionais proximos</li>
</ul>', 0.0, true, true);
INSERT INTO agendamento_planos (id, titulo, descricao, valor_mensal, padrao, ativo) VALUES(2, 'Profissional', '<ul class="list-unstyled plan-features">
                                        <li>Gerenciar seus agendamentos</li>
                                        <li>Disponibilizar sua agenda para os clientes fazerem seus agendamentos de forma inteligente</li>
                                    </ul>', 200.0, false, true);
INSERT INTO agendamento_planos (id, titulo, descricao, valor_mensal, padrao, ativo) VALUES(3, 'Empresarial', '<ul class="list-unstyled plan-features">
                                        <li>Gerenciar seus agendamentos</li>
                                        <li>Disponibilizar sua agenda para os clientes fazerem seus agendamentos de forma inteligente</li>
                                        <li>Gerenciamento de todas atividades da empresa</li>
                                    </ul>', 500.0, false, true);

CREATE TABLE agendamento_academias (
    id serial primary key,
    nome varchar(256),
    capa text,
    id_usuario_responstavel integer references usuario (id),
    data_cadastro timestamp,
    ativo integer
);
INSERT INTO agendamento_academias (id, nome, capa, id_usuario_responstavel, data_cadastro, ativo) VALUES(2, 'Academia do Douglas', 'assets/img/gyms/facebook-fitness-cover-design-template-0467cfdc196325e9098855cdab3ff352_screen.jpg?ts=1568879538', 3, '2023-12-08 13:24:44.701', 1);
INSERT INTO agendamento_academias (id, nome, capa, id_usuario_responstavel, data_cadastro, ativo) VALUES(3, 'Academia do Dilson', 'assets/img/gyms/gym-and-fitness-facebook-cover-advertising-te-design-template-ac1243e180d670f56a4e31a3950307fc_screen.jpg?ts=1619300876', 1, '2023-12-08 13:24:47.868', 1);

INSERT INTO agendamento_prestador_compromisso (id, id_prestador, id_produto, id_usuario_solicitante, descricao, "data", horario, id_status, data_cadastro) VALUES(1, 1, 1, 3, 'Desenvolvimento PHP', '2023-12-15', '10:00:00', 1, '2023-12-08 15:03:15.492');
INSERT INTO agendamento_prestador_compromisso (id, id_prestador, id_produto, id_usuario_solicitante, descricao, "data", horario, id_status, data_cadastro) VALUES(2, 1, 1, 2, 'Desenvolvimento PHP', '2023-11-10', '10:00:00', 2, '2023-12-08 15:06:25.034');

