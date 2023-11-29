create table if not exists g4f.empresa (
    id serial primary key,
	nome varchar(512) not null,
	logo varchar(1024),
	ativo boolean
);

create table if not exists g4f.empresa_cliente (
	id serial primary key,
	nome varchar(1024),
	logo varchar(1024),
	ativo boolean,
	id_empresa integer references g4f.empresa(id)
);

create table if not exists g4f.usuario (
	id serial primary key,
	nome varchar(512),
	email varchar(512),
	senha varchar(512),
	foto varchar(512),
	id_tipo_login integer,
	is_admin integer,
	ativo boolean,
	id_empresa integer references g4f.empresa (id)
);

create table if not exists g4f.rh_batida_ponto (
	id serial primary key,
	id_usuario integer not null references g4f.usuario (id),
	dia integer,
	mes integer,
	ano integer,
	hora varchar(15),
	data_cadastro timestamp
);

CREATE TABLE if not exists g4f.lista_tecnologias (
    id serial primary key,
    nome text,
    descricao text
);

CREATE TABLE IF NOT EXISTS g4f.contrato (
    id serial primary key,
    id_empresa integer references g4f.empresa (id),
    id_cliente integer references g4f.empresa_cliente(id),
    numeracao text,
    inicio_contrato date,
    termino_contrato date,
    termos_contrato text,
    id_usuario_cadastro integer references g4f.usuario (id),
    data_cadastro timestamp
);

CREATE TABLE if not exists g4f.controle_os (
    id serial primary key,
    id_contrato integer references g4f.contrato (id),
    id_empresa integer references g4f.empresa (id),
    id_usuario_responsavel integer references g4f.usuario (id),
    sistema text,
    metodo_contagem text,
    tipo_contagem text,
    flag_cfps boolean,
    data_contagem date,
    id_tecnologia integer references g4f.lista_tecnologias (id),
    duracao_intereacao integer,
    qtde_postos_trabalho integer,
    meta_pf float,
    total_pf_bruto float,
    total_pf_liquido float,
    proposito text,
    escopo text,
    fronteira text,
    observacao text,
    id_usuario_cadastro integer references g4f.usuario (id),
    data_cadastro timestamp DEFAULT now()
);

CREATE TABLE if not exists g4f.os_visao_geral (
    id serial primary key,
    id_os integer references g4f.controle_os (id),
    titulo text,
    mes_referencia_conclusao date,
    id_desenvolvedor integer references g4f.usuario (id),
    status_os integer,
    prazo_inicial date,
    prazo_final date,
    pf_liquido float,
    pf_bruto float,
    produtividade float,
    observacao text,
    tipo_os text
)

CREATE TABLE if not exists g4f.contagem_pontos_funcao (
    id serial primary key,
    id_os integer references g4f.controle_os (id),
    funcao text,
    id_tipo_contagem integer,
    deflator integer,
    qtde_td integer,
    descricao text,
    qtde_ar_tr integer,
    descricao_ar_tr text,
    qtde_inm integer,
    observacao text,
    cp integer,
    pfb integer,
    pfl integer,
    documentacao text,
    id_usuario_cadastro integer references g4f.usuario (id),
    data_cadastro timestamp
);

CREATE TABLE if not exists g4f.controle_mudancas (
	id serial primary key,
	numero_os text not null,
	sistema text,
	solicitante text,
	unidade text,
	analista_responsavel integer references g4f.usuario (id),
	tipo_demanda text,
	descricao text,
	detalhamento text,
	tecnologia integer references g4f.lista_tecnologias (id),
	total_alocados integer,
	tempo_gasto float,
    tempo_gasto_medida text,
	aprovado integer,
	data_cadastro timestamp,
    id_usuario_cadastro integer references g4f.usuario (id)
);
CREATE UNIQUE INDEX controle_mudancas_numero_os_idx ON g4f.controle_mudancas (numero_os);


CREATE TABLE if not exists g4f.controle_mudancas_detalhamento (
	id serial primary key,
	id_controle_mudancas integer references g4f.controle_mudancas (id),
	nome_detalhamento text,
	detalhamento text,
	passo_passo text,
	descricao text,
	tipo text,
	interface text,
    alteracao_banco text
	data_cadastro timestamp,
    id_usuario_cadastro integer references g4f.usuario (id)
);
alter table g4f.controle_mudancas_detalhamento add column alteracao_banco text;

CREATE TABLE IF NOT EXISTS sistema_menus (
    id serial primary key,
    titulo varchar(256),
    rota varchar(256),
    classe_icone varchar(256),
    id_menu_pai integer,
    ativo boolean
);

CREATE TABLE IF NOT EXISTS g4f.ferias (
    id serial primary key,
    id_colaborador integer references g4f.usuario (id),
    id_tipo_modalidade integer,
    periodos json,
    id_usuario_cadastro integer references g4f.usuario (id),
    data_cadastro timestamp DEFAULT now()
);


INSERT INTO g4f.empresa (id, nome, logo, ativo) VALUES(1, 'G4F', 'https://mail.contrato.g4f.com.br/skins/default/images/logo.svg', true);
INSERT INTO g4f.empresa_cliente (id, nome, logo, ativo, id_empresa) VALUES(1, 'TCE-SC', NULL, true, 1);
INSERT INTO g4f.lista_tecnologias (id, nome, descricao) VALUES(1, 'JAVA', 'JAVA');
INSERT INTO g4f.lista_tecnologias (id, nome, descricao) VALUES(2, 'PHP', NULL);
INSERT INTO g4f.lista_tecnologias (id, nome, descricao) VALUES(3, 'C#', NULL);
INSERT INTO g4f.lista_tecnologias (id, nome, descricao) VALUES(4, 'VB/.Net', NULL);
INSERT INTO g4f.lista_tecnologias (id, nome, descricao) VALUES(5, 'Outras Tecnologias', NULL);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(1, 'Dilson Sordi Junior', 'dilson@sc.senac.br', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'assets/img/users/dilson_sordi_junior.jpg', 1, 1, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(2, 'Cristian Bianchi', 'cbianchi@sc.senac.br', '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(3, 'JACKSON DE ANDRADA ', 'jackson.andrada@tcesc.tc.br', '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(4, 'BRUNO RAMOS MARTINS', 'bruno.martins@tcesc.tc.br', '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(5, 'FERNANDO ROBERTO DE AGUIAR', NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(6, 'FERNANDO SALES', NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(7, 'GABRIEL DANTAS FERREIRA', NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(8, 'HELENA LATOSINKI', NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(9, 'JORGE SEVILLA', NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(10, 'JEFERSON DE OLIVEIRA', NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(11, 'LUCAS PEREIRA', NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(12, 'MARCELO CARVALHO PINTO', NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(13, 'MAX GUNTZEL', NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(14, 'NICOLAS CARDOSO', NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(15, 'PAULO SERGIO DA SILVA', NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(16, 'SABRINA DOS PASSOS TORTELLI', NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
INSERT INTO g4f.usuario (id, nome, email, senha, foto, id_tipo_login, is_admin, ativo, id_empresa) VALUES(17, 'SILVIO PERCICOTTE JUNIOR ', NULL, '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, 1, 0, true, 1);
