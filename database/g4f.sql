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
    data_cadastro timestamp
);
ALTER TABLE g4f.controle_os ALTER COLUMN data_cadastro SET DEFAULT now();

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
alter table g4f.controle_mudancas add column alteracao_banco text;

CREATE TABLE if not exists g4f.controle_mudancas_detalhamento (
	id serial primary key,
	id_controle_mudancas integer references g4f.controle_mudancas (id),
	nome_detalhamento text,
	detalhamento text,
	passo_passo text,
	descricao text,
	tipo text,
	interface text,
	data_cadastro timestamp,
    id_usuario_cadastro integer references g4f.usuario (id)
);

CREATE TABLE IF NOT EXISTS sistema_menus (
    id serial primary key,
    titulo varchar(256),
    rota varchar(256),
    classe_icone varchar(256),
    id_menu_pai integer,
    ativo boolean
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

CREATE TABLE IF NOT EXISTS g4f.ferias (
    id serial primary key,
    id_colaborador integer references g4f.usuario (id),
    id_tipo_modalidade integer,
    periodos json,
    id_usuario_cadastro integer references g4f.usuario (id),
    data_cadastro timestamp DEFAULT now()
);