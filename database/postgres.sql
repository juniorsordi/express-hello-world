create table usuario (
	id serial primary key,
	nome varchar(512),
	email varchar(512),
	senha varchar(512),
	foto varchar(512),
	id_tipo_login integer,
	is_admin integer,
	ativo boolean,
	id_empresa integer
);

drop table projeto CASCADE;
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

drop table projeto_atividade_participante cascade;
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
	id_empresa integer,
	datahora timestamp
);

create table projeto_tipo (
	id serial primary key,
	nome varchar(256),
	ativo integer,
	id_empresa integer,
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
	id_conta_bancaria integer references financas_conta_bancaria2(id),
	id_categoria integer references financas_categoria(id),
	observacoes text,
	nro_documento varchar(128),
	lembrete integer,
	estornado boolean default false,
	conciliado boolean default false,
	id_empresa integer references empresa(id)
);