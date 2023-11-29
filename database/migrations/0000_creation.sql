
CREATE TABLE if not exists migrations (
	id serial primary key,
	"name" varchar(100),
	hash varchar(40),
	executed_at timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    file varchar(512)
);

create table if not exists empresa (
	id serial primary key,
	nome varchar(512) not null,
	logo varchar(1024),
	id_tipo_login integer,
	servidor_ad varchar(256),
	ativo boolean
);

create table if not exists empresa_categoria (
	id serial primary key,
	descricao varchar(1024),
	id_empresa integer references empresa(id)
);

create table if not exists empresa_cliente (
	id serial primary key,
	nome varchar(1024),
	logo varchar(1024),
	ativo boolean,
	id_empresa integer references empresa(id)
);

create table if not exists usuario (
	id serial primary key,
	nome varchar(512),
	email varchar(512),
	senha varchar(512),
	foto varchar(512),
	id_tipo_login integer,
	is_admin integer,
	ativo boolean,
	id_empresa integer references empresa (id)
);

create table if not exists sistema_mensagem (
	id serial primary key,
	id_usuario_origem integer references usuario (id),
	id_usuario_destino integer references usuario (id),
	mensagem text,
	lido integer,
	data_cadastro timestamp not null,
	data_lido timestamp
);

create table if not exists projeto_situacao (
	id serial primary key,
	nome varchar(256),
	cor varchar(128),
	visivel integer,
	encerra boolean,
	id_empresa integer references empresa (id),
	datahora timestamp
);

create table if not exists projeto_tipo (
	id serial primary key,
	nome varchar(256),
	ativo integer,
	id_empresa integer references empresa (id),
	data_cadastro timestamp
);

create table if not exists projeto (
	id serial primary key,
	nome varchar(512),
	descricao text,
	inicio_estimado	date,
	termino_estimado date,
	esforco_estimado float,
	esforco_real float,
	percentual_completo float,
	id_responsavel integer references usuario(id),
	id_categoria integer references projeto_tipo (id),
	id_cliente integer references empresa_cliente (id),
	id_status integer references projeto_situacao (id),
	prioridade integer,
	valor_hora float,
	receita_estimada float,
	gasto_estimado float,
	id_empresa integer references empresa (id)
);

create table if not exists projeto_atividade (
	id serial primary key,
	id_projeto integer references projeto(id),
	titulo varchar(512),
	descricao text,
	etapa integer,
	inicio_estimado date,
	termino_estimado date,
	esforco_estimado float,
	esforco_real float,
	percentual_completo float,
	id_status_atividade integer,
	id_responsavel integer references usuario(id),
	criado_em date,
	atualizado_em date
);

create table if not exists projeto_atividade_apontamento (
	id serial primary key,
	id_atividade integer references projeto_atividade(id),
	id_usuario integer references usuario(id),
	esforco float,
	observacao text,
	data_apontamento date,
	criado_em date,
	atualizado_em date,
	pago boolean
);

create table if not exists projeto_atividade_participante (
	id serial primary key,
	id_atividade integer references projeto_atividade(id),
	id_usuario integer references usuario(id)
);

create table if not exists projeto_comentario (
	id serial primary key,
	id_projeto integer references projeto(id),
	id_usuario integer references usuario(id),
	comentario text,
	data_cadastro timestamp
);

create table if not exists financas_bancos (
	id serial primary key,
	nome varchar(512),
	img varchar(512),
	tipo json,
	codigo_bacen varchar(6)
);

create table if not exists financas_conta_bancaria (
	id serial primary key,
	nome varchar(512),
	banco integer references financas_bancos  (id),
	agencia varchar(15),
	conta varchar(30),
	id_tipo_conta integer,
	limite float,
	saldo_inicial float,
	saldo_atual float,
    conta_principal boolean,
	id_empresa integer references empresa(id),
	ativo integer
);

create table if not exists financas_categoria (
	id serial primary key,
	nome varchar(512),
	tipo varchar(1),
	ativo int2,
	id_pai integer,
	id_empresa integer references empresa(id)
);

create table if not exists financas_conta_bancaria2 (
	id serial primary key,
	nome varchar(512),
	tipo_conta varchar(512),
	status boolean default true,
	encerrada boolean default false,
	banco json,
	saldo_inicial float,
	data_saldo_inicial timestamp,
	saldo_atual float,
	moeda integer,
	liquidez integer,
	id_empresa integer references empresa(id)
); 

create table if not exists financas_movimentacao (
	id serial primary key,
	descricao varchar(512) not null,
	data_prevista date not null,
	valor float not null,
	valor_previsto float not null,
	valor_efetivo float,
	tipo varchar(5) not null,
	status integer not null,
	data_criacao timestamp not null,
	data_baixa timestamp,
	id_conta_bancaria integer references financas_conta_bancaria(id),
	id_categoria integer references financas_categoria(id),
	observacoes text,
	nro_documento varchar(128),
	lembrete integer,
	estornado boolean default false,
	conciliado boolean default false,
	id_empresa integer references empresa(id)
);

create table if not exists projeto_financeiro_pagamentos (
	id serial primary key,
	id_projeto integer not null references projeto (id),
	id_atividade integer references projeto_atividade (id),
	descricao varchar(512),
	esforco_pago float,
	valor_hora float,
	total_pago float,
    total_liquido float,
	data_recebimento timestamp
);

create table if not exists projeto_financeiro_despesas (
	id serial primary key,
	id_projeto integer not null references projeto (id),
	id_atividade integer references projeto_atividade (id),
	descricao varchar(1024),
	valor float,
	data_despesas timestamp
);

create table if not exists rh_batida_ponto (
	id serial primary key,
	id_usuario integer not null references usuario (id),
	dia integer,
	mes integer,
	ano integer,
	hora varchar(15),
	data_cadastro timestamp
);

create table if not exists financas_conta_bancaria_saldo (
	id serial primary key,
	id_conta integer references financas_conta_bancaria (id),
	data_saldo timestamp,
	saldo float,
	data_cadastros timestamp
);

create table if not exists sistema_notificacao (
	id serial primary key,
	id_usuario integer not null references usuario (id),
	tipo_notificacao integer not null,
	titulo varchar(256),
	texto varchar(2048),
	lido integer,
	data_cadastro timestamp
);

create table if not exists ticket_status (
	id serial primary key,
	nome varchar(256),
	cor varchar(128),
	ativo integer
);

CREATE TABLE if not exists ticket (
	id serial primary key,
	id_usuario integer references usuario(id),
	id_responsavel integer references usuario(id),
	id_situacao integer references ticket_status(id),
	titulo varchar(1024),
	descricao text,
	data_cadastro timestamp not null,
	data_encerramento timestamp
);

CREATE TABLE if not exists ticket_evento (
  id serial primary key,
  id_ticket integer references ticket (id),
  id_usuario integer references usuario(id),
  evento text,
  data_cadastro timestamp NOT NULL
);



CREATE TABLE if not exists controle_mudancas (
	id serial primary key,
	numero_os text not null,
	sistema text,
	solicitante text,
	unidade text,
	analista_responsavel text,
	tipo_demanda text,
	descricao text,
	detalhamento text,
	tecnologia text,
	total_alocados integer,
	tempo_gasto float,
	aprovado integer,
	data_cadastro timestamp,
	tempo_gasto_medida text
);

CREATE TABLE if not exists controle_mudancas_detalhamento (
	id serial primary key,
	id_controle_mudancas integer references controle_mudancas (id),
	nome_detalhamento text,
	detalhamento text,
	passo_passo text,
	descricao text,
	tipo text,
	interface text,
	data_cadastro timestamp
);

CREATE TABLE if not exists agendamento_areas (
    id serial primary key,
    nome character varying(512),
    data_cadastro timestamp without time zone
);

CREATE TABLE if not exists agendamento_prestador (
    id serial primary key,
    id_area integer references agendamento_areas (id),
    titulo text,
    descricao text,
    foto text,
    rating float,
    data_cadastro timestamp without time zone,
    ativo integer
);

create table if not exists agendamento_prestador_produto (
	id serial primary key,
	id_prestador integer references agendamento_prestador (id),
	nome text,
	descricao text,
	valor float,
	ativo integer
);

create table if not exists agendamento_prestador_compromisso (
	id serial primary key,
	id_prestador integer references agendamento_prestador (id),
	id_produto integer references agendamento_prestador_produto (id),
	id_usuario_solicitante integer references usuario (id),
	descricao text,
	data date,
	horario time,
	id_status integer,
	data_cadastro timestamp
);

create table if not exists projeto_atividade_situacao (
	id serial primary key,
	nome varchar(512),
	ativo integer,
	ordem integer,
	id_empresa integer references empresa(id)
);