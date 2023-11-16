
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

create table if not exists rh_batida_ponto (
	id serial primary key,
	id_usuario integer not null references usuario (id),
	dia integer,
	mes integer,
	ano integer,
	hora varchar(15),
	data_cadastro timestamp
);

CREATE TABLE if not exists lista_tecnologias (
    id serial primary key,
    nome text,
    descricao text
);

CREATE TABLE if not exists controle_os (
    id serial primary key,
    id_contrato integer,
    id_empresa integer,
    id_usuario_responsavel integer references usuario (id),
    sistema text,
    metodo_contagem text,
    tipo_contagem text,
    flag_cfps boolean,
    data_contagem date,
    id_tecnologia integer references lista_tecnologias (id),
    duracao_intereacao integer,
    qtde_postos_trabalho integer,
    meta_pf float,
    total_pf_bruto float,
    total_pf_liquido float,
    proposito text,
    escopo text,
    fronteira text,
    observacao text,
    id_usuario_cadastro integer references usuario (id),
    data_cadastro timestamp
);

CREATE TABLE contagem_pontos_funcao (
    id serial primary key,
    id_os integer references controle_os (id),
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
    id_usuario_cadastro integer references usuario (id),
    data_cadastro timestamp
);

CREATE TABLE if not exists controle_mudancas (
	id serial primary key,
	numero_os text not null,
	sistema text,
	solicitante text,
	unidade text,
	analista_responsavel integer references usuario (id),
	tipo_demanda text,
	descricao text,
	detalhamento text,
	tecnologia integer references lista_tecnologias (id),
	total_alocados integer,
	tempo_gasto float,
    tempo_gasto_medida text,
	aprovado integer,
	data_cadastro timestamp,
    id_usuario_cadastro integer references usuario (id)
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
	data_cadastro timestamp,
    id_usuario_cadastro integer references usuario (id)
);