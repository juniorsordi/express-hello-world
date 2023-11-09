create table migrations (
	id serial primary key,
	file text,
	date_creation TIMESTAMP DEFAULT NOW()
);

create table empresa (
	id serial primary key,
	nome varchar(512) not null,
	logo varchar(1024),
	id_tipo_login integer,
	servidor_ad varchar(256),
	ativo boolean
);

create table empresa_categoria (
	id serial primary key,
	descricao varchar(1024),
	id_empresa integer references empresa(id)
);


create table empresa_cliente (
	id serial primary key,
	nome varchar(1024),
	logo varchar(1024),
	ativo boolean,
	id_empresa integer references empresa(id)
);

create table usuario (
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

create table projeto (
	id serial primary key,
	nome varchar(512),
	descricao text,
	inicio_estimado	date,
	termino_estimado date,
	esforco_estimado float,
	esforco_real float,
	percentual_completo float,
	id_responsavel integer references usuario(id),
	id_categoria integer,
	id_cliente integer,
	id_status integer,
	prioridade integer,
	valor_hora float,
	receita_estimada float,
	gasto_estimado float,
	id_empresa integer
);

create table projeto_atividade (
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

create table projeto_atividade_apontamento (
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

create table projeto_atividade_participante (
	id serial primary key,
	id_atividade integer references projeto_atividade(id),
	id_usuario integer references usuario(id)
);

create table projeto_situacao (
	id serial primary key,
	nome varchar(256),
	cor varchar(128),
	visivel integer,
	encerra boolean,
	id_empresa integer references empresa (id),
	datahora timestamp
);

create table projeto_tipo (
	id serial primary key,
	nome varchar(256),
	ativo integer,
	id_empresa integer references empresa (id),
	data_cadastro timestamp
);

create table projeto_comentario (
	id serial primary key,
	id_projeto integer references projeto(id),
	id_usuario integer references usuario(id),
	comentario text,
	data_cadastro timestamp
);

create table financas_conta_bancaria (
	id serial primary key,
	nome varchar(512),
	banco varchar(6),
	agencia varchar(15),
	conta varchar(30),
	id_tipo_conta integer,
	limite float,
	saldo_inicial float,
	saldo_atual float,
	id_empresa integer references empresa(id),
	ativo integer
);

create table financas_categoria (
	id serial primary key,
	nome varchar(512),
	tipo varchar(1),
	ativo int2,
	id_pai integer,
	id_empresa integer references empresa(id)
);

create table financas_conta_bancaria2 (
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

create table financas_bancos (
	id serial primary key,
	nome varchar(512),
	img varchar(512),
	tipo json,
	codigo_bacen varchar(6)
);

create table financas_movimentacao (
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

create table projeto_financeiro_pagamentos (
	id serial primary key,
	id_projeto integer not null references projeto (id),
	id_tarefa integer,
	esforco_pago float,
	valor_hora float,
	total_pago float,
	data_recebimento timestamp
);

create table projeto_financeiro_despesas (
	id serial primary key,
	id_projeto integer not null references projeto (id),
	id_tarefa integer,
	descricao varchar(1024),
	valor float,
	data_despesas timestamp
);

create table rh_batida_ponto (
	id serial primary key,
	id_usuario integer not null references usuario (id),
	dia integer,
	mes integer,
	ano integer,
	hora varchar(15),
	data_cadastro timestamp
);

create table financas_conta_bancaria_saldo (
	id serial primary key,
	id_conta integer references financas_conta_bancaria (id),
	data_saldo timestamp,
	saldo float,
	data_cadastros timestamp
);

create table sistema_notificacao (
	id serial primary key,
	id_usuario integer not null references usuario (id),
	tipo_notificacao integer not null,
	titulo varchar(256),
	texto varchar(2048),
	lido integer,
	data_cadastro timestamp
);

alter table projeto add constraint fk_projeto_tipo foreign key (id_categoria) references projeto_tipo (id);
alter table projeto add constraint fk_empresa_cliente foreign key (id_cliente) references empresa_cliente (id);
alter table projeto add constraint fk_empresa foreign key (id_empresa) references empresa (id);
alter table projeto add constraint fk_projeto_situacao foreign key (id_status) references projeto_situacao (id);

alter table usuario add constraint fk_empresa foreign key (id_empresa) references empresa (id);

CREATE TABLE ticket (
	id serial primary key,
	id_usuario integer references usuario(id),
	id_responsavel integer references usuario(id),
	id_situacao integer,
	titulo varchar(1024),
	descricao text,
	data_cadastro timestamp not null,
	data_encerramento timestamp
);

CREATE TABLE ticket_evento (
  id serial primary key,
  id_ticket integer references ticket (id),
  id_usuario integer references usuario(id),
  evento text,
  data_cadastro timestamp NOT NULL
);

create table ticket_status (
	id serial primary key,
	nome varchar(256),
	cor varchar(128),
	ativo integer
);

CREATE TABLE controle_mudancas (
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

CREATE TABLE controle_mudancas_detalhamento (
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

create table agendamento_areas (
	id serial primary key,
	nome varchar(512),
	data_cadastro timestamp
);

create table agendamento_prestador (
	id serial primary key,
	id_area integer references agendamento_areas (id),
	titulo text,
	descricao text,
	foto text,
	rating float,
	data_cadastro timestamp,
	ativo integer
);

create table agendamento_prestador_produto (
	id serial primary key,
	id_prestador integer references agendamento_prestador (id),
	nome text,
	descricao text,
	valor float,
	ativo integer
);

create table agendamento_prestador_compromisso (
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

create table projeto_atividade_situacao (
	id serial primary key,
	nome varchar(512),
	ativo integer,
	ordem integer,
	id_empresa integer references empresa(id)
);