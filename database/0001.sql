create table usuario (
	id integer primary key,
	nome text,
	email text,
	senha text,
	foto text,
	ativo integer,
	id_tipo_login integer,
	is_admin integer,
	id_empresa integer
);

INSERT INTO usuario (nome, email, senha, foto, ativo, id_tipo_login, is_admin, id_empresa) VALUES ('Dilson Sordi Junior','dilson@sc.senac.br','7c4a8d09ca3762af61e59520943dc26494f8941b','assets/img/users/dilson_sordi_junior.jpg',1,2,1,1);

create table empresa (
	id integer primary key,
	nome text,
	logo text,
	id_tipo_login integer,
	servidor_ad text,
	ativo integer
);

INSERT INTO empresa VALUES (null, 'DSJ Consultoria e Desenvolvimento', null, 1, null, 1);

create table empresa_cliente (
	id integer primary key,
	id_empresa integer,
	nome_cliente text,
	logo text,
	ativo integer
);

create table projeto (
    id integer primary key,
    id_empresa integer,
    id_cliente integer,
    nome text,
    descricao text,
    categoria text,
    inicio_estimado date,
    termino_estimado date,
    inicio_real date,
    termino_real date,
    esforco_estimado float,
    esforco_real float,
    percentual_completo float,
    id_situacao integer,
    id_tipo_projeto integer,
    prioridade integer,
    custo_estimado float,
    receita_estimada float,
    valor_hora float,
    id_forma_cobranca integer,
    id_responsavel integer,
    criado_em date,
    atualizado_em date
);

create table projeto_situacao (
	id integer primary key,
	id_empresa integer,
	descricao text,
	cor text,
	visivel integer,
	encerra integer,
	datahora datetime
);

create table projeto_tipo (
	id integer primary key,
	id_empresa integer,
	descricao text,
	ativo integer,
	datahora datetime
);

create table empresa_categoria (
	id integer primary key,
	id_empresa integer,
	descricao text
);

create table projeto_atividade_participante (
	id integer primary key,
	id_projeto integer,
	id_atividade integer,
	id_usuario integer,
	data_cadastro datetime
);

create table projeto_financeiro (
	id integer primary key,
	id_projeto integer,
	id_usuario integer,
	titulo text,
	descricao text,
	data_vencimento date,
	data_pagamento date,
	tipo_operacao integer,
	valor float,
	data_cadastro datetime
);

create table empresa_prioridade (
	id integer primary key,
	nome text,
	ativo boolean
);

create table projeto_atividade_apontamento(
	id integer primary key,
	id_atividade integer,
	id_usuario integer,
	data_apontamento date,
	esforco float,
	observacao text,
	criado_em datetime,
	atualizado_em datetime,
	pago boolean
);

create table projeto_atividade (
	id integer primary key,
	id_projeto integer,
	etapa integer,
	titulo text,
	descricao text,
	inicio_estimado date,
	termino_estimado date,
	inicio_real date,
	termino_real date,
	id_status_atividade integer,
	esforco_estimado float,
	esforco_atual float,
	id_responsavel integer,
	id_usuario_criacao integer,
	data_criacao datetime,
	atualizado_em datetime,
	id_cliente integer
);
alter table projeto_atividade add column percentual_completo float;

create table projeto_comentario (
	id integer primary key,
	id_projeto integer not null,
	id_usuario integer not null,
	comentario text,
	data_cadastro datetime
);

CREATE TABLE financas_contas_pagar (
  id integer primary key,
  id_empresa integer NOT NULL,
  titulo text NOT NULL,
  valor double NOT NULL,
  data_vencimento date NOT NULL,
  data_pagamento date,
  forma_pagamento integer DEFAULT NULL,
  id_categoria_financeiro integer,
  pago integer NOT NULL DEFAULT 0
);

CREATE TABLE financas_contas_receber (
  id integer primary key,
  id_empresa integer NOT NULL,
  titulo text NOT NULL,
  valor double NOT NULL,
  data_vencimento date NOT NULL,
  data_pagamento date,
  forma_pagamento integer DEFAULT NULL,
  id_categoria_financeiro integer,
  pago integer NOT NULL DEFAULT 0
);

create table financas_categoria (
	id integer primary key,
	nome text,
	id_pai integer
);
ALTER TABLE financas_categoria ADD id_empresa INTEGER;


create table financas_forma_pagamento (
	id integer primary key,
	nome text,
	banco text,
	agencia text,
	nro_conta text,
	saldo_inicial float,
	limite float,
	ativo boolean
);
ALTER TABLE financas_forma_pagamento ADD COLUMN id_empresa integer;

CREATE TABLE projeto_atividade_situacao (
	id integer primary key,
	descricao text,
	id_empresa int,
	ativo boolean,
	data_cadastro datetime,
	ordem tinyint
);

CREATE TABLE financas_ofx (
	id integer primary key,
	id_empresa int,
	ref_num text unique,
	valor float,
	descricao text,
	data_transacao datetime,
	data_cadastro datetime
);

CREATE TABLE usuario_tarefa (
	id integer primary key,
	id_usuario integer,
	titulo text,
	descricao text,
	inicio_estimado date,
	termino_estimado date,
	id_status_tarefa integer,
	esforco_estimado float,
	esforco_real float,
	percentual_completo float,
	data_criacao datetime,
	data_atualizacao datetime
	publico boolean
);

CREATE TABLE usuario_tarefa_apontamento (
	id integer primary key,
	id_tarefa integer not null,
	id_usuario integer not null,
	data_apontamento date,
	esforco double,
	observacao text,
	criado_em datetime,
	atualizado_em datetime
);