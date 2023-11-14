--
-- PostgreSQL database dump
--

-- Dumped from database version 10.4
-- Dumped by pg_dump version 15.3

-- Started on 2023-11-10 14:56:18

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 6 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

--
-- TOC entry 3223 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: postgres
--

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

--
-- TOC entry 196 (class 1259 OID 16385)
-- Name: agendamento_areas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agendamento_areas (
    id integer NOT NULL,
    nome_area character varying(512),
    data_cadastro timestamp without time zone
);


ALTER TABLE public.agendamento_areas OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 16391)
-- Name: agendamento_areas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agendamento_areas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agendamento_areas_id_seq OWNER TO postgres;

--
-- TOC entry 3226 (class 0 OID 0)
-- Dependencies: 197
-- Name: agendamento_areas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agendamento_areas_id_seq OWNED BY public.agendamento_areas.id;


--
-- TOC entry 198 (class 1259 OID 16393)
-- Name: agendamento_prestador; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.agendamento_prestador (
    id integer NOT NULL,
    id_area integer,
    titulo text,
    descricao text,
    foto text,
    rating double precision,
    data_cadastro timestamp without time zone,
    ativo integer
);


ALTER TABLE public.agendamento_prestador OWNER TO postgres;

--
-- TOC entry 257 (class 1259 OID 16846)
-- Name: agendamento_prestador_compromisso; Type: TABLE; Schema: public; Owner: fharjwsz
--

CREATE TABLE public.agendamento_prestador_compromisso (
    id integer NOT NULL,
    id_prestador integer,
    id_produto integer,
    id_usuario_solicitante integer,
    descricao text,
    data date,
    horario time without time zone,
    id_status integer,
    data_cadastro timestamp without time zone
);


ALTER TABLE public.agendamento_prestador_compromisso OWNER TO fharjwsz;

--
-- TOC entry 256 (class 1259 OID 16844)
-- Name: agendamento_prestador_compromisso_id_seq; Type: SEQUENCE; Schema: public; Owner: fharjwsz
--

CREATE SEQUENCE public.agendamento_prestador_compromisso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agendamento_prestador_compromisso_id_seq OWNER TO fharjwsz;

--
-- TOC entry 3228 (class 0 OID 0)
-- Dependencies: 256
-- Name: agendamento_prestador_compromisso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fharjwsz
--

ALTER SEQUENCE public.agendamento_prestador_compromisso_id_seq OWNED BY public.agendamento_prestador_compromisso.id;


--
-- TOC entry 199 (class 1259 OID 16399)
-- Name: agendamento_prestador_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.agendamento_prestador_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agendamento_prestador_id_seq OWNER TO postgres;

--
-- TOC entry 3229 (class 0 OID 0)
-- Dependencies: 199
-- Name: agendamento_prestador_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.agendamento_prestador_id_seq OWNED BY public.agendamento_prestador.id;


--
-- TOC entry 255 (class 1259 OID 16830)
-- Name: agendamento_prestador_produto; Type: TABLE; Schema: public; Owner: fharjwsz
--

CREATE TABLE public.agendamento_prestador_produto (
    id integer NOT NULL,
    id_prestador integer,
    nome text,
    descricao text,
    valor double precision,
    ativo integer
);


ALTER TABLE public.agendamento_prestador_produto OWNER TO fharjwsz;

--
-- TOC entry 254 (class 1259 OID 16828)
-- Name: agendamento_prestador_produto_id_seq; Type: SEQUENCE; Schema: public; Owner: fharjwsz
--

CREATE SEQUENCE public.agendamento_prestador_produto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.agendamento_prestador_produto_id_seq OWNER TO fharjwsz;

--
-- TOC entry 3230 (class 0 OID 0)
-- Dependencies: 254
-- Name: agendamento_prestador_produto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fharjwsz
--

ALTER SEQUENCE public.agendamento_prestador_produto_id_seq OWNED BY public.agendamento_prestador_produto.id;


--
-- TOC entry 251 (class 1259 OID 16803)
-- Name: controle_mudancas; Type: TABLE; Schema: public; Owner: fharjwsz
--

CREATE TABLE public.controle_mudancas (
    id integer NOT NULL,
    numero_os text NOT NULL,
    sistema text,
    solicitante text,
    unidade text,
    analista_responsavel text,
    tipo_demanda text,
    descricao text,
    detalhamento text,
    tecnologia text,
    total_alocados integer,
    tempo_gasto double precision,
    aprovado integer,
    data_cadastro timestamp without time zone,
    tempo_gasto_medida text
);


ALTER TABLE public.controle_mudancas OWNER TO fharjwsz;

--
-- TOC entry 253 (class 1259 OID 16814)
-- Name: controle_mudancas_detalhamento; Type: TABLE; Schema: public; Owner: fharjwsz
--

CREATE TABLE public.controle_mudancas_detalhamento (
    id integer NOT NULL,
    id_controle_mudancas integer,
    nome_detalhamento text,
    detalhamento text,
    passo_passo text,
    descricao text,
    tipo text,
    interface text,
    data_cadastro timestamp without time zone
);


ALTER TABLE public.controle_mudancas_detalhamento OWNER TO fharjwsz;

--
-- TOC entry 252 (class 1259 OID 16812)
-- Name: controle_mudancas_detalhamento_id_seq; Type: SEQUENCE; Schema: public; Owner: fharjwsz
--

CREATE SEQUENCE public.controle_mudancas_detalhamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.controle_mudancas_detalhamento_id_seq OWNER TO fharjwsz;

--
-- TOC entry 3231 (class 0 OID 0)
-- Dependencies: 252
-- Name: controle_mudancas_detalhamento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fharjwsz
--

ALTER SEQUENCE public.controle_mudancas_detalhamento_id_seq OWNED BY public.controle_mudancas_detalhamento.id;


--
-- TOC entry 250 (class 1259 OID 16801)
-- Name: controle_mudancas_id_seq; Type: SEQUENCE; Schema: public; Owner: fharjwsz
--

CREATE SEQUENCE public.controle_mudancas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.controle_mudancas_id_seq OWNER TO fharjwsz;

--
-- TOC entry 3232 (class 0 OID 0)
-- Dependencies: 250
-- Name: controle_mudancas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fharjwsz
--

ALTER SEQUENCE public.controle_mudancas_id_seq OWNED BY public.controle_mudancas.id;


--
-- TOC entry 200 (class 1259 OID 16401)
-- Name: empresa; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empresa (
    id integer NOT NULL,
    nome character varying(512) NOT NULL,
    logo character varying(1024),
    id_tipo_login integer,
    servidor_ad character varying(256),
    ativo boolean
);


ALTER TABLE public.empresa OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16407)
-- Name: empresa_categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empresa_categoria (
    id integer NOT NULL,
    descricao character varying(1024),
    id_empresa integer
);


ALTER TABLE public.empresa_categoria OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16413)
-- Name: empresa_categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empresa_categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.empresa_categoria_id_seq OWNER TO postgres;

--
-- TOC entry 3235 (class 0 OID 0)
-- Dependencies: 202
-- Name: empresa_categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empresa_categoria_id_seq OWNED BY public.empresa_categoria.id;


--
-- TOC entry 203 (class 1259 OID 16415)
-- Name: empresa_cliente; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.empresa_cliente (
    id integer NOT NULL,
    nome character varying(1024),
    logo character varying(1024),
    ativo boolean,
    id_empresa integer
);


ALTER TABLE public.empresa_cliente OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 16421)
-- Name: empresa_cliente_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empresa_cliente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.empresa_cliente_id_seq OWNER TO postgres;

--
-- TOC entry 3237 (class 0 OID 0)
-- Dependencies: 204
-- Name: empresa_cliente_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empresa_cliente_id_seq OWNED BY public.empresa_cliente.id;


--
-- TOC entry 205 (class 1259 OID 16423)
-- Name: empresa_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.empresa_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.empresa_id_seq OWNER TO postgres;

--
-- TOC entry 3238 (class 0 OID 0)
-- Dependencies: 205
-- Name: empresa_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.empresa_id_seq OWNED BY public.empresa.id;


--
-- TOC entry 206 (class 1259 OID 16425)
-- Name: financas_bancos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.financas_bancos (
    id integer NOT NULL,
    nome character varying(512),
    img character varying(512),
    tipo json,
    codigo_bacen character varying(6)
);


ALTER TABLE public.financas_bancos OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 16431)
-- Name: financas_bancos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.financas_bancos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.financas_bancos_id_seq OWNER TO postgres;

--
-- TOC entry 3240 (class 0 OID 0)
-- Dependencies: 207
-- Name: financas_bancos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.financas_bancos_id_seq OWNED BY public.financas_bancos.id;


--
-- TOC entry 208 (class 1259 OID 16433)
-- Name: financas_categoria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.financas_categoria (
    id integer NOT NULL,
    nome character varying(512),
    id_pai integer,
    id_empresa integer,
    tipo character varying(1),
    ativo smallint
);


ALTER TABLE public.financas_categoria OWNER TO postgres;

--
-- TOC entry 209 (class 1259 OID 16439)
-- Name: financas_categoria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.financas_categoria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.financas_categoria_id_seq OWNER TO postgres;

--
-- TOC entry 3242 (class 0 OID 0)
-- Dependencies: 209
-- Name: financas_categoria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.financas_categoria_id_seq OWNED BY public.financas_categoria.id;


--
-- TOC entry 210 (class 1259 OID 16441)
-- Name: financas_conta_bancaria; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.financas_conta_bancaria (
    id integer NOT NULL,
    nome character varying(512),
    banco character varying(6),
    agencia character varying(15),
    conta character varying(30),
    id_tipo_conta integer,
    limite double precision,
    saldo_inicial double precision,
    saldo_atual double precision,
    id_empresa integer,
    ativo integer
);


ALTER TABLE public.financas_conta_bancaria OWNER TO postgres;

--
-- TOC entry 211 (class 1259 OID 16447)
-- Name: financas_conta_bancaria2; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.financas_conta_bancaria2 (
    id integer NOT NULL,
    nome character varying(512),
    tipo_conta character varying(512),
    status boolean,
    encerrada boolean DEFAULT false,
    banco json,
    saldo_inicial double precision,
    data_saldo_inicial timestamp without time zone,
    moeda integer,
    liquidez integer,
    saldo_atual double precision,
    id_empresa integer
);


ALTER TABLE public.financas_conta_bancaria2 OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 16454)
-- Name: financas_conta_bancaria2_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.financas_conta_bancaria2_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.financas_conta_bancaria2_id_seq OWNER TO postgres;

--
-- TOC entry 3245 (class 0 OID 0)
-- Dependencies: 212
-- Name: financas_conta_bancaria2_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.financas_conta_bancaria2_id_seq OWNED BY public.financas_conta_bancaria2.id;


--
-- TOC entry 213 (class 1259 OID 16456)
-- Name: financas_conta_bancaria_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.financas_conta_bancaria_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.financas_conta_bancaria_id_seq OWNER TO postgres;

--
-- TOC entry 3246 (class 0 OID 0)
-- Dependencies: 213
-- Name: financas_conta_bancaria_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.financas_conta_bancaria_id_seq OWNED BY public.financas_conta_bancaria.id;


--
-- TOC entry 214 (class 1259 OID 16458)
-- Name: financas_conta_bancaria_saldo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.financas_conta_bancaria_saldo (
    id integer NOT NULL,
    id_conta integer,
    data_saldo timestamp without time zone,
    saldo double precision,
    data_cadastro timestamp without time zone
);


ALTER TABLE public.financas_conta_bancaria_saldo OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16461)
-- Name: financas_conta_bancaria_saldo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.financas_conta_bancaria_saldo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.financas_conta_bancaria_saldo_id_seq OWNER TO postgres;

--
-- TOC entry 3248 (class 0 OID 0)
-- Dependencies: 215
-- Name: financas_conta_bancaria_saldo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.financas_conta_bancaria_saldo_id_seq OWNED BY public.financas_conta_bancaria_saldo.id;


--
-- TOC entry 216 (class 1259 OID 16463)
-- Name: financas_movimentacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.financas_movimentacao (
    id integer NOT NULL,
    descricao character varying(512) NOT NULL,
    data_prevista date NOT NULL,
    valor double precision NOT NULL,
    valor_previsto double precision NOT NULL,
    valor_efetivo double precision,
    tipo character varying(5) NOT NULL,
    status integer NOT NULL,
    data_criacao timestamp without time zone NOT NULL,
    data_baixa timestamp without time zone,
    id_conta_bancaria integer,
    id_categoria integer,
    observacoes text,
    nro_documento character varying(128),
    lembrete integer,
    estornado boolean DEFAULT false,
    conciliado boolean DEFAULT false,
    id_empresa integer
);


ALTER TABLE public.financas_movimentacao OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16471)
-- Name: financas_movimentacao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.financas_movimentacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.financas_movimentacao_id_seq OWNER TO postgres;

--
-- TOC entry 3250 (class 0 OID 0)
-- Dependencies: 217
-- Name: financas_movimentacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.financas_movimentacao_id_seq OWNED BY public.financas_movimentacao.id;


--
-- TOC entry 241 (class 1259 OID 16704)
-- Name: hours; Type: TABLE; Schema: public; Owner: fharjwsz
--

CREATE TABLE public.hours (
    id integer NOT NULL,
    id_usuario integer,
    dia integer,
    mes integer,
    ano integer,
    horario_batida_1 timestamp without time zone NOT NULL,
    horario_batida_2 timestamp without time zone NOT NULL
);


ALTER TABLE public.hours OWNER TO fharjwsz;

--
-- TOC entry 240 (class 1259 OID 16702)
-- Name: hours_id_seq; Type: SEQUENCE; Schema: public; Owner: fharjwsz
--

CREATE SEQUENCE public.hours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.hours_id_seq OWNER TO fharjwsz;

--
-- TOC entry 3251 (class 0 OID 0)
-- Dependencies: 240
-- Name: hours_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fharjwsz
--

ALTER SEQUENCE public.hours_id_seq OWNED BY public.hours.id;


--
-- TOC entry 262 (class 1259 OID 18570)
-- Name: migrations; Type: TABLE; Schema: public; Owner: fharjwsz
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    hash character varying(40) NOT NULL,
    executed_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.migrations OWNER TO fharjwsz;

--
-- TOC entry 261 (class 1259 OID 18564)
-- Name: pgmigrations; Type: TABLE; Schema: public; Owner: fharjwsz
--

CREATE TABLE public.pgmigrations (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    run_on timestamp without time zone NOT NULL
);


ALTER TABLE public.pgmigrations OWNER TO fharjwsz;

--
-- TOC entry 260 (class 1259 OID 18562)
-- Name: pgmigrations_id_seq; Type: SEQUENCE; Schema: public; Owner: fharjwsz
--

CREATE SEQUENCE public.pgmigrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.pgmigrations_id_seq OWNER TO fharjwsz;

--
-- TOC entry 3252 (class 0 OID 0)
-- Dependencies: 260
-- Name: pgmigrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fharjwsz
--

ALTER SEQUENCE public.pgmigrations_id_seq OWNED BY public.pgmigrations.id;


--
-- TOC entry 218 (class 1259 OID 16473)
-- Name: projeto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projeto (
    id integer NOT NULL,
    nome character varying(512),
    descricao text,
    inicio_estimado date,
    termino_estimado date,
    esforco_estimado double precision,
    esforco_real double precision,
    percentual_completo double precision,
    id_responsavel integer,
    id_categoria integer,
    id_cliente integer,
    id_status integer,
    prioridade integer,
    valor_hora double precision,
    receita_estimada double precision,
    gasto_estimado double precision,
    id_empresa integer
);


ALTER TABLE public.projeto OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16479)
-- Name: projeto_atividade; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projeto_atividade (
    id integer NOT NULL,
    id_projeto integer,
    titulo character varying(512),
    descricao text,
    etapa integer,
    inicio_estimado date,
    termino_estimado date,
    esforco_estimado double precision,
    esforco_real double precision,
    percentual_completo double precision,
    id_status_atividade integer,
    id_responsavel integer,
    criado_em date,
    atualizado_em date
);


ALTER TABLE public.projeto_atividade OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16485)
-- Name: projeto_atividade_apontamento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projeto_atividade_apontamento (
    id integer NOT NULL,
    id_atividade integer,
    id_usuario integer,
    esforco double precision,
    observacao text,
    data_apontamento date,
    criado_em date,
    atualizado_em date,
    pago boolean
);


ALTER TABLE public.projeto_atividade_apontamento OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16491)
-- Name: projeto_atividade_apontamento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projeto_atividade_apontamento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projeto_atividade_apontamento_id_seq OWNER TO postgres;

--
-- TOC entry 3256 (class 0 OID 0)
-- Dependencies: 221
-- Name: projeto_atividade_apontamento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projeto_atividade_apontamento_id_seq OWNED BY public.projeto_atividade_apontamento.id;


--
-- TOC entry 222 (class 1259 OID 16493)
-- Name: projeto_atividade_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projeto_atividade_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projeto_atividade_id_seq OWNER TO postgres;

--
-- TOC entry 3257 (class 0 OID 0)
-- Dependencies: 222
-- Name: projeto_atividade_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projeto_atividade_id_seq OWNED BY public.projeto_atividade.id;


--
-- TOC entry 223 (class 1259 OID 16495)
-- Name: projeto_atividade_participante; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projeto_atividade_participante (
    id integer NOT NULL,
    id_atividade integer,
    id_usuario integer
);


ALTER TABLE public.projeto_atividade_participante OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 16498)
-- Name: projeto_atividade_participante_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projeto_atividade_participante_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projeto_atividade_participante_id_seq OWNER TO postgres;

--
-- TOC entry 3259 (class 0 OID 0)
-- Dependencies: 224
-- Name: projeto_atividade_participante_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projeto_atividade_participante_id_seq OWNED BY public.projeto_atividade_participante.id;


--
-- TOC entry 259 (class 1259 OID 16872)
-- Name: projeto_atividade_situacao; Type: TABLE; Schema: public; Owner: fharjwsz
--

CREATE TABLE public.projeto_atividade_situacao (
    id integer NOT NULL,
    nome character varying(512),
    ativo integer,
    id_empresa integer,
    ordem integer
);


ALTER TABLE public.projeto_atividade_situacao OWNER TO fharjwsz;

--
-- TOC entry 258 (class 1259 OID 16870)
-- Name: projeto_atividade_situacao_id_seq; Type: SEQUENCE; Schema: public; Owner: fharjwsz
--

CREATE SEQUENCE public.projeto_atividade_situacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projeto_atividade_situacao_id_seq OWNER TO fharjwsz;

--
-- TOC entry 3260 (class 0 OID 0)
-- Dependencies: 258
-- Name: projeto_atividade_situacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fharjwsz
--

ALTER SEQUENCE public.projeto_atividade_situacao_id_seq OWNED BY public.projeto_atividade_situacao.id;


--
-- TOC entry 225 (class 1259 OID 16500)
-- Name: projeto_comentario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projeto_comentario (
    id integer NOT NULL,
    id_projeto integer,
    id_usuario integer,
    comentario text,
    data_cadastro timestamp without time zone
);


ALTER TABLE public.projeto_comentario OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16506)
-- Name: projeto_comentario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projeto_comentario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projeto_comentario_id_seq OWNER TO postgres;

--
-- TOC entry 3262 (class 0 OID 0)
-- Dependencies: 226
-- Name: projeto_comentario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projeto_comentario_id_seq OWNED BY public.projeto_comentario.id;


--
-- TOC entry 227 (class 1259 OID 16508)
-- Name: projeto_financeiro_despesas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projeto_financeiro_despesas (
    id integer NOT NULL,
    id_projeto integer NOT NULL,
    id_tarefa integer,
    descricao character varying(1024),
    valor double precision,
    data_despesas timestamp without time zone
);


ALTER TABLE public.projeto_financeiro_despesas OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 16514)
-- Name: projeto_financeiro_despesas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projeto_financeiro_despesas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projeto_financeiro_despesas_id_seq OWNER TO postgres;

--
-- TOC entry 3264 (class 0 OID 0)
-- Dependencies: 228
-- Name: projeto_financeiro_despesas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projeto_financeiro_despesas_id_seq OWNED BY public.projeto_financeiro_despesas.id;


--
-- TOC entry 229 (class 1259 OID 16516)
-- Name: projeto_financeiro_pagamentos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projeto_financeiro_pagamentos (
    id integer NOT NULL,
    id_projeto integer NOT NULL,
    id_tarefa integer,
    esforco_pago double precision,
    valor_hora double precision,
    total_pago double precision,
    data_recebimento timestamp without time zone
);


ALTER TABLE public.projeto_financeiro_pagamentos OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 16519)
-- Name: projeto_financeiro_pagamentos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projeto_financeiro_pagamentos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projeto_financeiro_pagamentos_id_seq OWNER TO postgres;

--
-- TOC entry 3266 (class 0 OID 0)
-- Dependencies: 230
-- Name: projeto_financeiro_pagamentos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projeto_financeiro_pagamentos_id_seq OWNED BY public.projeto_financeiro_pagamentos.id;


--
-- TOC entry 231 (class 1259 OID 16521)
-- Name: projeto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projeto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projeto_id_seq OWNER TO postgres;

--
-- TOC entry 3267 (class 0 OID 0)
-- Dependencies: 231
-- Name: projeto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projeto_id_seq OWNED BY public.projeto.id;


--
-- TOC entry 232 (class 1259 OID 16523)
-- Name: projeto_situacao; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projeto_situacao (
    id integer NOT NULL,
    nome character varying(256),
    cor character varying(128),
    visivel integer,
    encerra boolean,
    id_empresa integer,
    datahora timestamp without time zone
);


ALTER TABLE public.projeto_situacao OWNER TO postgres;

--
-- TOC entry 233 (class 1259 OID 16526)
-- Name: projeto_situacao_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projeto_situacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projeto_situacao_id_seq OWNER TO postgres;

--
-- TOC entry 3269 (class 0 OID 0)
-- Dependencies: 233
-- Name: projeto_situacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projeto_situacao_id_seq OWNED BY public.projeto_situacao.id;


--
-- TOC entry 234 (class 1259 OID 16528)
-- Name: projeto_tipo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.projeto_tipo (
    id integer NOT NULL,
    nome character varying(256),
    ativo integer,
    id_empresa integer,
    data_cadastro timestamp without time zone
);


ALTER TABLE public.projeto_tipo OWNER TO postgres;

--
-- TOC entry 235 (class 1259 OID 16531)
-- Name: projeto_tipo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.projeto_tipo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.projeto_tipo_id_seq OWNER TO postgres;

--
-- TOC entry 3271 (class 0 OID 0)
-- Dependencies: 235
-- Name: projeto_tipo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.projeto_tipo_id_seq OWNED BY public.projeto_tipo.id;


--
-- TOC entry 236 (class 1259 OID 16533)
-- Name: rh_batida_ponto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.rh_batida_ponto (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    dia integer,
    mes integer,
    ano integer,
    hora character varying(15),
    data_cadastro timestamp without time zone
);


ALTER TABLE public.rh_batida_ponto OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 16536)
-- Name: rh_batida_ponto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.rh_batida_ponto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.rh_batida_ponto_id_seq OWNER TO postgres;

--
-- TOC entry 3273 (class 0 OID 0)
-- Dependencies: 237
-- Name: rh_batida_ponto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.rh_batida_ponto_id_seq OWNED BY public.rh_batida_ponto.id;


--
-- TOC entry 243 (class 1259 OID 16712)
-- Name: sistema_notificacao; Type: TABLE; Schema: public; Owner: fharjwsz
--

CREATE TABLE public.sistema_notificacao (
    id integer NOT NULL,
    id_usuario integer NOT NULL,
    tipo_notificacao integer NOT NULL,
    titulo character varying(256),
    texto character varying(2048),
    lido integer,
    data_cadastro timestamp without time zone
);


ALTER TABLE public.sistema_notificacao OWNER TO fharjwsz;

--
-- TOC entry 242 (class 1259 OID 16710)
-- Name: sistema_notificacao_id_seq; Type: SEQUENCE; Schema: public; Owner: fharjwsz
--

CREATE SEQUENCE public.sistema_notificacao_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.sistema_notificacao_id_seq OWNER TO fharjwsz;

--
-- TOC entry 3274 (class 0 OID 0)
-- Dependencies: 242
-- Name: sistema_notificacao_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fharjwsz
--

ALTER SEQUENCE public.sistema_notificacao_id_seq OWNED BY public.sistema_notificacao.id;


--
-- TOC entry 245 (class 1259 OID 16753)
-- Name: ticket; Type: TABLE; Schema: public; Owner: fharjwsz
--

CREATE TABLE public.ticket (
    id integer NOT NULL,
    id_usuario integer,
    id_responsavel integer,
    id_situacao integer,
    titulo character varying(1024),
    descricao text,
    data_cadastro timestamp without time zone NOT NULL,
    data_encerramento timestamp without time zone
);


ALTER TABLE public.ticket OWNER TO fharjwsz;

--
-- TOC entry 247 (class 1259 OID 16774)
-- Name: ticket_evento; Type: TABLE; Schema: public; Owner: fharjwsz
--

CREATE TABLE public.ticket_evento (
    id integer NOT NULL,
    id_ticket integer,
    id_usuario integer,
    evento text,
    data_cadastro timestamp without time zone NOT NULL
);


ALTER TABLE public.ticket_evento OWNER TO fharjwsz;

--
-- TOC entry 246 (class 1259 OID 16772)
-- Name: ticket_evento_id_seq; Type: SEQUENCE; Schema: public; Owner: fharjwsz
--

CREATE SEQUENCE public.ticket_evento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ticket_evento_id_seq OWNER TO fharjwsz;

--
-- TOC entry 3275 (class 0 OID 0)
-- Dependencies: 246
-- Name: ticket_evento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fharjwsz
--

ALTER SEQUENCE public.ticket_evento_id_seq OWNED BY public.ticket_evento.id;


--
-- TOC entry 244 (class 1259 OID 16751)
-- Name: ticket_id_seq; Type: SEQUENCE; Schema: public; Owner: fharjwsz
--

CREATE SEQUENCE public.ticket_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ticket_id_seq OWNER TO fharjwsz;

--
-- TOC entry 3276 (class 0 OID 0)
-- Dependencies: 244
-- Name: ticket_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fharjwsz
--

ALTER SEQUENCE public.ticket_id_seq OWNED BY public.ticket.id;


--
-- TOC entry 249 (class 1259 OID 16795)
-- Name: ticket_status; Type: TABLE; Schema: public; Owner: fharjwsz
--

CREATE TABLE public.ticket_status (
    id integer NOT NULL,
    nome character varying(256),
    cor character varying(128),
    ativo integer
);


ALTER TABLE public.ticket_status OWNER TO fharjwsz;

--
-- TOC entry 248 (class 1259 OID 16793)
-- Name: ticket_status_id_seq; Type: SEQUENCE; Schema: public; Owner: fharjwsz
--

CREATE SEQUENCE public.ticket_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ticket_status_id_seq OWNER TO fharjwsz;

--
-- TOC entry 3277 (class 0 OID 0)
-- Dependencies: 248
-- Name: ticket_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: fharjwsz
--

ALTER SEQUENCE public.ticket_status_id_seq OWNED BY public.ticket_status.id;


--
-- TOC entry 238 (class 1259 OID 16538)
-- Name: usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuario (
    id integer NOT NULL,
    nome character varying(512),
    email character varying(512),
    senha character varying(512),
    foto character varying(512),
    id_tipo_login integer,
    is_admin integer,
    ativo boolean,
    id_empresa integer
);


ALTER TABLE public.usuario OWNER TO postgres;

--
-- TOC entry 239 (class 1259 OID 16544)
-- Name: usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuario_id_seq OWNER TO postgres;

--
-- TOC entry 3279 (class 0 OID 0)
-- Dependencies: 239
-- Name: usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuario_id_seq OWNED BY public.usuario.id;


--
-- TOC entry 2890 (class 2604 OID 16546)
-- Name: agendamento_areas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamento_areas ALTER COLUMN id SET DEFAULT nextval('public.agendamento_areas_id_seq'::regclass);


--
-- TOC entry 2891 (class 2604 OID 16547)
-- Name: agendamento_prestador id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamento_prestador ALTER COLUMN id SET DEFAULT nextval('public.agendamento_prestador_id_seq'::regclass);


--
-- TOC entry 2923 (class 2604 OID 16849)
-- Name: agendamento_prestador_compromisso id; Type: DEFAULT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.agendamento_prestador_compromisso ALTER COLUMN id SET DEFAULT nextval('public.agendamento_prestador_compromisso_id_seq'::regclass);


--
-- TOC entry 2922 (class 2604 OID 16833)
-- Name: agendamento_prestador_produto id; Type: DEFAULT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.agendamento_prestador_produto ALTER COLUMN id SET DEFAULT nextval('public.agendamento_prestador_produto_id_seq'::regclass);


--
-- TOC entry 2920 (class 2604 OID 16806)
-- Name: controle_mudancas id; Type: DEFAULT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.controle_mudancas ALTER COLUMN id SET DEFAULT nextval('public.controle_mudancas_id_seq'::regclass);


--
-- TOC entry 2921 (class 2604 OID 16817)
-- Name: controle_mudancas_detalhamento id; Type: DEFAULT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.controle_mudancas_detalhamento ALTER COLUMN id SET DEFAULT nextval('public.controle_mudancas_detalhamento_id_seq'::regclass);


--
-- TOC entry 2892 (class 2604 OID 16548)
-- Name: empresa id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresa ALTER COLUMN id SET DEFAULT nextval('public.empresa_id_seq'::regclass);


--
-- TOC entry 2893 (class 2604 OID 16549)
-- Name: empresa_categoria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresa_categoria ALTER COLUMN id SET DEFAULT nextval('public.empresa_categoria_id_seq'::regclass);


--
-- TOC entry 2894 (class 2604 OID 16550)
-- Name: empresa_cliente id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresa_cliente ALTER COLUMN id SET DEFAULT nextval('public.empresa_cliente_id_seq'::regclass);


--
-- TOC entry 2895 (class 2604 OID 16551)
-- Name: financas_bancos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_bancos ALTER COLUMN id SET DEFAULT nextval('public.financas_bancos_id_seq'::regclass);


--
-- TOC entry 2896 (class 2604 OID 16552)
-- Name: financas_categoria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_categoria ALTER COLUMN id SET DEFAULT nextval('public.financas_categoria_id_seq'::regclass);


--
-- TOC entry 2897 (class 2604 OID 16553)
-- Name: financas_conta_bancaria id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_conta_bancaria ALTER COLUMN id SET DEFAULT nextval('public.financas_conta_bancaria_id_seq'::regclass);


--
-- TOC entry 2898 (class 2604 OID 16554)
-- Name: financas_conta_bancaria2 id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_conta_bancaria2 ALTER COLUMN id SET DEFAULT nextval('public.financas_conta_bancaria2_id_seq'::regclass);


--
-- TOC entry 2900 (class 2604 OID 16555)
-- Name: financas_conta_bancaria_saldo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_conta_bancaria_saldo ALTER COLUMN id SET DEFAULT nextval('public.financas_conta_bancaria_saldo_id_seq'::regclass);


--
-- TOC entry 2901 (class 2604 OID 16556)
-- Name: financas_movimentacao id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_movimentacao ALTER COLUMN id SET DEFAULT nextval('public.financas_movimentacao_id_seq'::regclass);


--
-- TOC entry 2915 (class 2604 OID 16707)
-- Name: hours id; Type: DEFAULT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.hours ALTER COLUMN id SET DEFAULT nextval('public.hours_id_seq'::regclass);


--
-- TOC entry 2925 (class 2604 OID 18567)
-- Name: pgmigrations id; Type: DEFAULT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.pgmigrations ALTER COLUMN id SET DEFAULT nextval('public.pgmigrations_id_seq'::regclass);


--
-- TOC entry 2904 (class 2604 OID 16557)
-- Name: projeto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto ALTER COLUMN id SET DEFAULT nextval('public.projeto_id_seq'::regclass);


--
-- TOC entry 2905 (class 2604 OID 16558)
-- Name: projeto_atividade id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_atividade ALTER COLUMN id SET DEFAULT nextval('public.projeto_atividade_id_seq'::regclass);


--
-- TOC entry 2906 (class 2604 OID 16559)
-- Name: projeto_atividade_apontamento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_atividade_apontamento ALTER COLUMN id SET DEFAULT nextval('public.projeto_atividade_apontamento_id_seq'::regclass);


--
-- TOC entry 2907 (class 2604 OID 16560)
-- Name: projeto_atividade_participante id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_atividade_participante ALTER COLUMN id SET DEFAULT nextval('public.projeto_atividade_participante_id_seq'::regclass);


--
-- TOC entry 2924 (class 2604 OID 16875)
-- Name: projeto_atividade_situacao id; Type: DEFAULT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.projeto_atividade_situacao ALTER COLUMN id SET DEFAULT nextval('public.projeto_atividade_situacao_id_seq'::regclass);


--
-- TOC entry 2908 (class 2604 OID 16561)
-- Name: projeto_comentario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_comentario ALTER COLUMN id SET DEFAULT nextval('public.projeto_comentario_id_seq'::regclass);


--
-- TOC entry 2909 (class 2604 OID 16562)
-- Name: projeto_financeiro_despesas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_financeiro_despesas ALTER COLUMN id SET DEFAULT nextval('public.projeto_financeiro_despesas_id_seq'::regclass);


--
-- TOC entry 2910 (class 2604 OID 16563)
-- Name: projeto_financeiro_pagamentos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_financeiro_pagamentos ALTER COLUMN id SET DEFAULT nextval('public.projeto_financeiro_pagamentos_id_seq'::regclass);


--
-- TOC entry 2911 (class 2604 OID 16564)
-- Name: projeto_situacao id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_situacao ALTER COLUMN id SET DEFAULT nextval('public.projeto_situacao_id_seq'::regclass);


--
-- TOC entry 2912 (class 2604 OID 16565)
-- Name: projeto_tipo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_tipo ALTER COLUMN id SET DEFAULT nextval('public.projeto_tipo_id_seq'::regclass);


--
-- TOC entry 2913 (class 2604 OID 16566)
-- Name: rh_batida_ponto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rh_batida_ponto ALTER COLUMN id SET DEFAULT nextval('public.rh_batida_ponto_id_seq'::regclass);


--
-- TOC entry 2916 (class 2604 OID 16715)
-- Name: sistema_notificacao id; Type: DEFAULT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.sistema_notificacao ALTER COLUMN id SET DEFAULT nextval('public.sistema_notificacao_id_seq'::regclass);


--
-- TOC entry 2917 (class 2604 OID 16756)
-- Name: ticket id; Type: DEFAULT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.ticket ALTER COLUMN id SET DEFAULT nextval('public.ticket_id_seq'::regclass);


--
-- TOC entry 2918 (class 2604 OID 16777)
-- Name: ticket_evento id; Type: DEFAULT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.ticket_evento ALTER COLUMN id SET DEFAULT nextval('public.ticket_evento_id_seq'::regclass);


--
-- TOC entry 2919 (class 2604 OID 16798)
-- Name: ticket_status id; Type: DEFAULT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.ticket_status ALTER COLUMN id SET DEFAULT nextval('public.ticket_status_id_seq'::regclass);


--
-- TOC entry 2914 (class 2604 OID 16567)
-- Name: usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id SET DEFAULT nextval('public.usuario_id_seq'::regclass);


--
-- TOC entry 3151 (class 0 OID 16385)
-- Dependencies: 196
-- Data for Name: agendamento_areas; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.agendamento_areas VALUES (1, 'Informática/TI', '2023-10-30 21:52:00.927');
INSERT INTO public.agendamento_areas VALUES (2, 'Terapia Capilar', '2023-10-30 21:52:02.367');
INSERT INTO public.agendamento_areas VALUES (3, 'Massoterapeuta', '2023-10-30 21:52:03.215');
INSERT INTO public.agendamento_areas VALUES (4, 'Manicure/Pedicure', '2023-10-30 21:52:03.99');


--
-- TOC entry 3153 (class 0 OID 16393)
-- Dependencies: 198
-- Data for Name: agendamento_prestador; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.agendamento_prestador VALUES (1, 1, 'DSJ Consultoria', 'DSJ Consultoria', 'assets/img/avatars/avatar.jpg', 4, '2023-10-30 21:57:28.715', 1);


--
-- TOC entry 3212 (class 0 OID 16846)
-- Dependencies: 257
-- Data for Name: agendamento_prestador_compromisso; Type: TABLE DATA; Schema: public; Owner: fharjwsz
--



--
-- TOC entry 3210 (class 0 OID 16830)
-- Dependencies: 255
-- Data for Name: agendamento_prestador_produto; Type: TABLE DATA; Schema: public; Owner: fharjwsz
--

INSERT INTO public.agendamento_prestador_produto VALUES (1, 1, 'Desenvolvimento Node.JS', 'Desenvolvimento Node.JS', 75, 1);


--
-- TOC entry 3206 (class 0 OID 16803)
-- Dependencies: 251
-- Data for Name: controle_mudancas; Type: TABLE DATA; Schema: public; Owner: fharjwsz
--

INSERT INTO public.controle_mudancas VALUES (1, 'OS573', 'SGI', 'Rafael Queiroz Gonçalves', 'DTI', 'Dilson Sordi Junior', 'Manutenção', 'ESIPROC-2852
Erro na consulta de processos na tela de manutenção de peças processuais 
Passos para replicar: 
Logue com 4509552 (Flávia - SEG); 
Acessar o e-Siproc; 
Menu Autuação -> Manutenção de peças processuais; 
Informe qualquer número de processo e clique em Buscar. ', NULL, 'JAVA', 1, 4, 1, '2023-10-25 14:49:00', 'Hora(s)');
INSERT INTO public.controle_mudancas VALUES (2, 'OS580', 'SGI', 'Rafael Queiroz Gonçalves', 'DTI', 'Dilson Sordi Junior', 'Manutenção', 'ESIPROC-2823
Solicito melhoria na tela de consulta de modelos do Editor TCE para que a busca filtre/restrinja os modelos com data de desativação cadastrada (print anexo). 
Assim como existe um filtro para “modelo padrão”, a solicitação busca otimizar a consulta para que retornem apenas os modelos ativos. 
Uma funcionalidade similar no e-Siproc é na consulta de pessoa jurídica, que só retorna resultado com UGs extintas se marcada a opção (print anexo).
Outra sugestão para estudo de viabilidade é um histórico das versões/atualizações dos modelos. Talvez similar ao “Histórico Manutenção“ e que conste ao menos a data das últimas atualizações e identificador/matrícula. 

Passos para Replicar
Logue com 8031;
Acesse no Menu TCE Virtual > Editor TCE > Cadastro de Modelos;
Tipo Documento todos (exemplo passado - Decisão Singular).', NULL, 'JAVA', 1, 10, 1, '2023-10-25 14:49:00', 'Hora(s)');
INSERT INTO public.controle_mudancas VALUES (3, 'OS583', 'SGI', 'Rafael Queiroz Gonçalves', 'DTI', 'Dilson Sordi Junior', 'Manutenção', 'ESIPROC-2821
O menu Anexos do Relatório/Parecer/Voto não aceita arquivos em xls. Por esse motivo, as áreas técnicas estão juntando arquivos desse tipo, pelo novo menu, Juntada de Anexo.
Porém, esse menu tem algumas diferenças em relação ao Anexos do Relatório/Parecer/Voto. 
São elas:
Pelo menu Juntada de Anexo não é possível vincular os documentos a um relatório que está em elaboração na área técnica, como no Anexos do Relatório/Parecer/Voto.
Então quando um técnico junta pelo menu de juntada, o arquivo fica solto no visualizador e o pessoal do N2 precisa vincular ao relatório em elaboração pra que fique dentro da pastinha do relatório como os demais.
Quando o usuário junta pelo menu Juntada de Anexo, o sistema não deixa os arquivos ordenados da mesma forma que foram adicionados pelo usuário. Então o pessoal do N2 precisa alterar manualmente a hora de todos os arquivos (e tem que ser o minuto, porque se for nos segundos não funciona), pra deixar ordenado conforme solicitado pelo usuário.
Melhorias necessárias
No menu Anexos do Relatório/Parecer/Voto:
Permitir anexar arquivos xls, já que a demanda vem crescendo nos últimos meses.
_____________________________________________________________________________________________________________________________________________
No menu Juntada de Anexo:
Permitir selecionar um relatório que esteja em elaboração. Assim, o próprio usuário pode decidir se o documento juntado é vinculado a um relatório ou não, pois é isso que faz o documento aparecer na pastinha do relatório no visualizador:
Ex.: os anexos juntados por esse menu, não ficam na pastinha do relatório pois o usuário não tem a mesma opção de escolha do outro menu:
No print acima é possível ver que os anexos também ficaram totalmente fora de ordem. Talvez seja interessante ver como a tela do Anexos do Relatório/Parecer/Voto se comporta, pra “copiar”, pois os anexos inseridos por lá, ficam em ordem (pode ser porque tenham assinatura tb lá..)

Passos para Replicar
Logue com 4511867 (Bruno);
Inicie análise de um processo qualquer (e copie o número dele);
Junte arquivos xls pelos menus Anexos do Relatório/Parecer/Voto e Juntada de Anexos.', NULL, 'JAVA', 1, 2, 1, '2023-10-27 15:12:00', 'Dias(s)');
INSERT INTO public.controle_mudancas VALUES (4, 'OS594', 'SGI', 'Rafael Queiroz Gonçalves', 'DTI', 'Dilson Sordi Junior', 'Manutenção', 'ESIPROC-2837
Quando uma pessoa que está substituindo um chefe (e não está na equipe do processo) exclui o elaborador de uma equipe, o sistema atribui automaticamente a função de elaborador para o próximo da equipe (seta o stElaborador pra 1), mas não seta o st_Aprovacao pra 1 na tabela EDT_Equipe.
*No cenário onde a pessoa que está na equipe exclui o elaborador, ela mesma se torna elaboradora e o sistema seta as informações na tabela EDT_Equipe corretamente.
Teste feito em homolog (também acontece em produção)
No vídeo abaixo eu mostro os passos para replicar o problema e como o sistema se comporta.
Também inseri algumas observações importantes durante o vídeo para facilitar o entendimento da demanda.
Passos para replicar
OBS: Todos os passos estão demonstrados no vídeo acima.
Logue com um técnico de alguma diretoria → Ex.: 4513088 - Tiago Viana e Sousa - DLC;
Veja se existem processos para iniciar análise na mesa do técnico;
Inicie o relatório e encaminhe para revisão;
Acesse com o próximo da equipe (pra quem o processo foi encaminhado) e cadastre uma substituição de chefia (isso se o próximo for um chefe, mas normalmente é);
Acesse com o substituto, execute o processo na mesa do chefe de divisão e exclua o elaborador;
Faça a consulta abaixo pelo processo e verifique os últimos registros (se tiver mais de um relatório, vão vir vários resultados, aí pode filtrar pelo identificadorDocumentoTrabalho “dt.identificador”:
SELECT serv.nm_Pessoa,eq. * FROM editor_tce.dbo.EDT_DocumentoTrabalho dt
LEFT JOIN editor_tce.dbo.EDT_Equipe eq ON dt.identificador = eq.identificadorDocumentoTrabalho
LEFT JOIN SERVIDOR serv ON serv.nu_Matricula = eq.matriculaTecnico COLLATE SQL_Latin1_General_CP1_CI_AI
where dt.numeroProcesso = 
--and dt.identificador = 
and eq.dataFim is null
ORDEr by dt.identificador, eq.ordem
Verifique o stAprovacao de quem ficou como elaborador (precisa ser = 1).', NULL, 'JAVA', 1, 1, 1, '2023-10-30 09:58:00', 'Dias(s)');
INSERT INTO public.controle_mudancas VALUES (5, 'OS616', 'SGI', 'Rafael Queiroz Gonçalves', 'DTI', 'Dilson Sordi Junior', 'Manutenção', 'ESIPROC-2894
Quando um usuário interno abre um requerimento ou solicitação da qual ele é parte, se faz necessário que o mesmo possua um registro na interessado_novo. Aplicar correção para que seja efetuado esse cadastro via sistema quando necessário.

Verificar se a correção aplicada à tarefa pai se aplica a assinatura via GOVBR também. Em caso negativo, aplicar a correção necessária. Seguir passos da tarefa pai.
', NULL, 'JAVA', 1, 3, 1, '2023-11-08 17:34:20.485943', 'Dia(s)');


--
-- TOC entry 3208 (class 0 OID 16814)
-- Dependencies: 253
-- Data for Name: controle_mudancas_detalhamento; Type: TABLE DATA; Schema: public; Owner: fharjwsz
--

INSERT INTO public.controle_mudancas_detalhamento VALUES (1, 1, 'Pesquisar Responsáveis', 'Funcionalidade alterada para incluir “Cargo” 
', 'Menu TCE Virtual → Pesquisar Responsável', 'Funcionalidade responsável pela pesquisa de responsáveis cadastrados no sistema. ', 'Inclusão
Alteração
Exclusão', NULL, '2023-10-30 14:18:00');


--
-- TOC entry 3155 (class 0 OID 16401)
-- Dependencies: 200
-- Data for Name: empresa; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.empresa VALUES (1, 'DSJ Consultoria e Desenvolvimento', NULL, 1, NULL, true);


--
-- TOC entry 3156 (class 0 OID 16407)
-- Dependencies: 201
-- Data for Name: empresa_categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3158 (class 0 OID 16415)
-- Dependencies: 203
-- Data for Name: empresa_cliente; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.empresa_cliente VALUES (1, 'Espaço dos Saberes', 'https://espacosaberfloripa.com.br/site/wp-content/uploads/2022/06/espaco-dos-sabores-logo.png', true, 1);
INSERT INTO public.empresa_cliente VALUES (2, 'DSJ Sistemas', NULL, true, 1);
INSERT INTO public.empresa_cliente VALUES (3, 'DLHouse', NULL, true, 1);
INSERT INTO public.empresa_cliente VALUES (4, 'Superlative', NULL, true, 1);
INSERT INTO public.empresa_cliente VALUES (5, 'Condoplay', NULL, true, 1);


--
-- TOC entry 3161 (class 0 OID 16425)
-- Dependencies: 206
-- Data for Name: financas_bancos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.financas_bancos VALUES (1, 'Banco do Brasil S.A.', 'bb-2', '["CONTA CORRENTE","OUTROS","INVESTIMENTO"]', '001');
INSERT INTO public.financas_bancos VALUES (2, 'Caixa Econômica Federal', 'caixa', '["CONTA CORRENTE","OUTROS","INVESTIMENTO"]', '104');
INSERT INTO public.financas_bancos VALUES (3, 'Banco Inter S.A.', 'inter', '["CONTA CORRENTE","OUTROS","INVESTIMENTO"]', '077');
INSERT INTO public.financas_bancos VALUES (6, 'Banco Cooperativo do Brasil S.A. - BANCOOB', 'sicoob', '[
            "CONTA CORRENTE",
            "OUTROS",
            "INVESTIMENTO"
        ]', '756');
INSERT INTO public.financas_bancos VALUES (4, 'Nubank', 'nubank2', '["CARTAOCREDITO","INVESTIMENTOS"]', '260');
INSERT INTO public.financas_bancos VALUES (5, 'C6 Bank', 'c6-2', '["OUTROS"]', '336');
INSERT INTO public.financas_bancos VALUES (7, 'Banco ItauBank S.A.', 'itau', '["CONTA CORRENTE","OUTROS","INVESTIMENTO"]', '479');


--
-- TOC entry 3163 (class 0 OID 16433)
-- Dependencies: 208
-- Data for Name: financas_categoria; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.financas_categoria VALUES (26, 'Saúde', NULL, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (6, 'Saúde / Dentista', 26, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (25, 'Saúde / Farmácia', 26, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (10, 'Compras / Parcelamento Cartão', 5, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (15, 'Compras / Streaming', 5, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (20, 'Compras / Uber', 5, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (21, 'Compras / Viagem', 5, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (27, 'Outras Despesas', NULL, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (13, 'Outras Despesas / Saques', 27, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (17, 'Outras Despesas / Taxas e Tarifas', 27, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (19, 'Outras Despesas / Transferências', 27, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (1, 'Alimentação', NULL, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (18, 'Transferências Crédito', NULL, 1, 'C', 1);
INSERT INTO public.financas_categoria VALUES (24, 'Receitas', NULL, 1, 'C', 1);
INSERT INTO public.financas_categoria VALUES (12, 'Salario', 24, 1, 'C', 1);
INSERT INTO public.financas_categoria VALUES (23, 'Outras Receitas', 24, 1, 'C', 1);
INSERT INTO public.financas_categoria VALUES (16, 'Alimentação / Supermercado', 1, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (22, 'Alimentação / Padaria', 1, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (2, 'Moradia / Condominio', 3, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (3, 'Moradia', NULL, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (8, 'Moradia / Internet', 3, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (9, 'Moradia / Luz', 3, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (4, 'Automovel', NULL, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (11, 'Automovel / Revisão Carro', 4, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (14, 'Automovel / Seguro', 4, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (5, 'Compras', NULL, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (7, 'Compras / EC2 Amazon', 5, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (28, 'Automovel / Combustivel', 4, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (29, 'Alimentação / Almoço', 1, 1, 'D', 1);
INSERT INTO public.financas_categoria VALUES (30, 'Alimentação / Restaurante', 1, 1, 'D', NULL);


--
-- TOC entry 3165 (class 0 OID 16441)
-- Dependencies: 210
-- Data for Name: financas_conta_bancaria; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.financas_conta_bancaria VALUES (1, 'Conta Corrente', '1', '3616-1', '15647-7', 1, NULL, 0, 0, 1, 1);
INSERT INTO public.financas_conta_bancaria VALUES (2, 'Cartão BB Visa', '1', NULL, NULL, 4, 14000, 0, 0, 1, 1);
INSERT INTO public.financas_conta_bancaria VALUES (3, 'Cartão NuBank Mastercard', '4', NULL, NULL, 4, 8900, 0, 0, 1, 1);
INSERT INTO public.financas_conta_bancaria VALUES (4, 'Cartão C6', '5', NULL, NULL, 4, 4500, 0, 0, 1, 1);
INSERT INTO public.financas_conta_bancaria VALUES (9, 'Conta G4F Itau', '7', '0', '0', 1, 0, 0, 0, 1, 1);
INSERT INTO public.financas_conta_bancaria VALUES (10, 'Cartão Itau', '7', NULL, NULL, 4, 12000, 0, 0, 1, 1);


--
-- TOC entry 3166 (class 0 OID 16447)
-- Dependencies: 211
-- Data for Name: financas_conta_bancaria2; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.financas_conta_bancaria2 VALUES (3, 'Conta NuBank', 'CONTA CORRENTE', true, false, '{
            "id": "nubank",
            "nome": "Nubank",
            "img": "nubank2",
            "tipo": [
                "CARTAOCREDITO"
            ]
        }', 0, '2023-08-30 13:17:30.067', 1, 1, 10.69, 1);
INSERT INTO public.financas_conta_bancaria2 VALUES (1, 'Conta C6 Bank', 'CONTA CORRENTE', true, false, '{
            "id": "c6bank",
            "nome": "C6 Bank",
            "img": "c6-2",
            "tipo": [
                "OUTROS"
            ]
        }', 0, '2023-08-30 13:19:20.461', 1, 1, 574.78999999999996, 1);
INSERT INTO public.financas_conta_bancaria2 VALUES (2, 'Conta BB', 'CONTA CORRENTE', true, false, '{
            "id": "1",
            "nome": "Banco do Brasil S.A.",
            "img": "bb-2",
            "tipo": [ "CONTA CORRENTE", "OUTROS", "INVESTIMENTO"]
}', 1.1399999999999999, '2023-07-31 12:26:42.848', 1, 1, 0, 1);


--
-- TOC entry 3169 (class 0 OID 16458)
-- Dependencies: 214
-- Data for Name: financas_conta_bancaria_saldo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.financas_conta_bancaria_saldo VALUES (1, 9, '2023-11-01 00:00:00', 0, '2023-11-03 11:25:00.818');


--
-- TOC entry 3171 (class 0 OID 16463)
-- Dependencies: 216
-- Data for Name: financas_movimentacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.financas_movimentacao VALUES (14, 'Angeloni', '2023-11-02', -117.86, -117.86, -117.86, 'D', 1, '2023-11-03 11:57:13.178', '2023-11-02 03:00:00', 2, 16, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (1, 'Santissima Gula', '2023-08-01', -34.340000000000003, -34.340000000000003, -34.340000000000003, 'D', 1, '2023-08-30 17:50:25.858', '2023-08-30 17:50:30.194', 1, 22, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (2, 'Transferência Dilson Sordi', '2023-08-01', 200, 200, 200, 'C', 1, '2023-08-30 17:50:25.858', '2023-08-30 17:50:25.858', 1, 23, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (3, 'Giassi', '2023-08-01', -31.760000000000002, -31.760000000000002, -31.760000000000002, 'D', 1, '2023-09-04 16:31:16.298', '2023-08-01 03:00:00', 1, 16, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (6, 'Compra com Cart�o - 01/08 20:01 MINI KALZONE', '2023-08-01', -15.5, -15.5, -15.5, 'D', 1, '2023-09-05 11:23:39.274', '2023-08-01 12:00:00', 1, 1, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (5, 'Compra com Cart�o - 01/08 20:00 FARMACIA E DROGARIA', '2023-08-01', -24.780000000000001, -24.780000000000001, -24.780000000000001, 'D', 1, '2023-09-05 11:22:26.312', '2023-08-01 12:00:00', 1, 25, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (7, 'Pix - Enviado - 01/08 14:31 Dilson Sordi Junior', '2023-08-01', -200, -200, -200, 'D', 1, '2023-09-05 11:24:42.489', '2023-08-01 12:00:00', 1, 19, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (8, 'Pix - Enviado - 01/08 14:32 Cristian Scheffel Biacchi', '2023-08-01', -80, -80, -80, 'D', 1, '2023-09-05 11:25:20.79', '2023-08-01 12:00:00', 1, 19, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (9, 'Pix - Enviado - 01/08 14:34 Dilson Sordi Junior (C6)', '2023-08-01', -200, -200, -200, 'D', 1, '2023-09-05 11:25:35.616', '2023-08-01 12:00:00', 1, 19, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (10, 'Resgate BB CDB DI', '2023-08-01', 500, 500, 500, 'C', 1, '2023-09-05 11:25:52.805', '2023-08-01 12:00:00', 1, 23, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (11, 'Pix - Recebido - 02/08 16:15 00000646009982 Silvia Sord', '2023-08-02', 90, 90, 90, 'C', 1, '2023-09-05 11:26:53.485', '2023-08-02 12:00:00', 1, 18, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (12, 'Resgate BB CDB DI - Data balanc.: 01/08/2023', '2023-08-02', 1.3100000000000001, 1.3100000000000001, 1.3100000000000001, 'C', 1, '2023-09-05 16:00:27.22', '2023-08-02 12:00:00', 1, 23, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (13, 'Internet VIVO', '2023-09-15', -134.99000000000001, -134.99000000000001, NULL, 'D', 0, '2023-09-05 16:01:52.504', NULL, 1, 8, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (16, 'Condominio', '2023-11-06', -601.91999999999996, -601.91999999999996, NULL, 'D', 0, '2023-11-03 12:17:42.703277', NULL, 1, 2, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (17, 'Transferencia Pai', '2023-11-01', 200, 200, 200, 'C', 1, '2023-11-03 13:28:18.297569', '2023-11-01 03:00:00', 1, 18, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (18, 'Internet VIVO', '2023-11-15', -134.99000000000001, -134.99000000000001, NULL, 'D', 0, '2023-11-03 15:44:32.379065', NULL, 1, 8, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (19, 'G4F', '2023-11-07', 4000, 4000, 4000, 'C', 1, '2023-11-10 12:02:51.280013', '2023-11-07 03:00:00', 1, 12, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (20, 'Posto Ultra', '2023-11-01', 100, 100, 100, 'D', 1, '2023-11-10 13:37:54.508794', '2023-11-01 03:00:00', 1, 28, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (21, 'Personal Hot Dog', '2023-11-01', 174.78999999999999, 174.78999999999999, 174.78999999999999, 'D', 1, '2023-11-10 13:39:52.826408', '2023-11-01 03:00:00', 1, 30, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (22, 'Pix Jorge', '2023-11-01', 16.75, 16.75, 16.75, 'D', 1, '2023-11-10 13:41:04.279164', '2023-11-01 03:00:00', 1, 19, NULL, NULL, NULL, false, false, 1);
INSERT INTO public.financas_movimentacao VALUES (23, 'Bokas', '2023-11-03', 97.299999999999997, 97.299999999999997, 97.299999999999997, 'D', 1, '2023-11-10 13:41:25.021957', '2023-11-03 03:00:00', 1, 30, NULL, NULL, NULL, false, false, 1);


--
-- TOC entry 3196 (class 0 OID 16704)
-- Dependencies: 241
-- Data for Name: hours; Type: TABLE DATA; Schema: public; Owner: fharjwsz
--

INSERT INTO public.hours VALUES (1, 1, 1, 11, 2023, '2023-11-01 08:23:00', '2023-11-01 11:32:00');
INSERT INTO public.hours VALUES (2, 1, 1, 11, 2023, '2023-11-01 12:33:00', '2023-11-01 17:59:00');


--
-- TOC entry 3217 (class 0 OID 18570)
-- Dependencies: 262
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: fharjwsz
--



--
-- TOC entry 3216 (class 0 OID 18564)
-- Dependencies: 261
-- Data for Name: pgmigrations; Type: TABLE DATA; Schema: public; Owner: fharjwsz
--



--
-- TOC entry 3173 (class 0 OID 16473)
-- Dependencies: 218
-- Data for Name: projeto; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projeto VALUES (2, 'Gerenciamento de Projetos', 'Gerenciamento de Projetos baseado no site artia', '2023-01-01', '2023-12-31', 1300, 19, 1.4615384615384615, 1, 1, 2, 2, 1, 20, 26900, 7400.3928888888886, 1);
INSERT INTO public.projeto VALUES (3, 'Consultoria Destra', 'Consultoria Destra', '2022-05-01', '2023-12-31', 200, 38.460000000000001, 19.23, 1, 2, 4, 2, 1, 46, 20700, 11526.282333333333, 1);
INSERT INTO public.projeto VALUES (1, 'Testes de Psicopedagogia', 'Testes de Psicopedagogia utilizando uma planilha de excel como exemplo para os calculos e entrada de campos.', '2023-05-10', '2023-12-31', 750, 78, 10.4, 1, 1, 1, 2, 1, 20, 8800, 2493.4363333333331, 1);


--
-- TOC entry 3174 (class 0 OID 16479)
-- Dependencies: 219
-- Data for Name: projeto_atividade; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projeto_atividade VALUES (14, 3, 'Outubro 2023', '', 2, '2023-10-01', '2023-10-31', 110, 12.17, 11.063636363636364, 1, 1, '2023-11-03', '2023-11-03');
INSERT INTO public.projeto_atividade VALUES (13, 3, 'Julho 2023', '', 0, '2023-07-01', '2023-07-31', 45, 2.0399999999999996, 4.5333333333333323, 1, 1, '2023-09-06', '2023-09-06');
INSERT INTO public.projeto_atividade VALUES (10, 2, 'Desenvolvimento Frontend (AngularJS)', NULL, 1, '2023-01-01', '2023-12-31', 650, 11, 1.6923076923076923, 1, 1, '2023-08-28', '2023-08-28');
INSERT INTO public.projeto_atividade VALUES (9, 1, 'Ajustes', NULL, 9, '2023-07-15', '2023-09-30', 400, 17, 4.25, 1, 1, '2023-08-28', '2023-08-28');
INSERT INTO public.projeto_atividade VALUES (11, 2, 'Desenvolvimento Backend (NodeJS)', NULL, 1, '2023-01-01', '2023-12-31', 650, 8, 1.2307692307692308, 1, 1, '2023-08-28', '2023-08-28');
INSERT INTO public.projeto_atividade VALUES (12, 3, 'Agosto 2023', '', 1, '2023-08-01', '2023-08-31', 45, 24.25, 53.880000000000003, 1, 1, '2023-09-06', '2023-09-06');
INSERT INTO public.projeto_atividade VALUES (15, 3, 'Novembro/2023', '', 11, '2023-11-01', '2023-11-30', 105, 0, 0, 1, 1, '2023-11-07', '2023-11-07');
INSERT INTO public.projeto_atividade VALUES (16, 3, 'Dezembro/2023', '', 12, '2023-12-01', '2023-12-31', 100, 0, 0, 1, 1, '2023-11-07', '2023-11-07');
INSERT INTO public.projeto_atividade VALUES (2, 1, 'Teste FVL', NULL, 2, '2023-05-30', '2023-06-10', 40, 6, 15, 2, 1, '2023-08-28', '2023-08-28');
INSERT INTO public.projeto_atividade VALUES (3, 1, 'Teste FVF', NULL, 3, '2023-06-10', '2023-06-15', 40, 6, 15, 2, 1, '2023-08-28', '2023-08-28');
INSERT INTO public.projeto_atividade VALUES (4, 1, 'Teste FVS', NULL, 4, '2023-06-15', '2023-06-20', 40, 6, 15, 2, 1, '2023-08-28', '2023-08-28');
INSERT INTO public.projeto_atividade VALUES (5, 1, 'Teste THI', NULL, 5, '2023-06-20', '2023-06-25', 40, 6, 15, 2, 1, '2023-08-28', '2023-08-28');
INSERT INTO public.projeto_atividade VALUES (6, 1, 'Teste GAN', NULL, 6, '2023-06-25', '2023-06-30', 40, 6, 15, 2, 1, '2023-08-28', '2023-08-28');
INSERT INTO public.projeto_atividade VALUES (7, 1, 'Teste DNOI', NULL, 7, '2023-06-30', '2023-07-05', 40, 6, 15, 2, 1, '2023-08-28', '2023-08-28');
INSERT INTO public.projeto_atividade VALUES (8, 1, 'Teste DNEI', NULL, 8, '2023-07-05', '2023-07-10', 40, 7, 17.5, 2, 1, '2023-08-28', '2023-08-28');
INSERT INTO public.projeto_atividade VALUES (1, 1, 'Desenvolvimento Plataforma WEB (Frontend + Backend)', 'Desenvolvimento Plataforma WEB (Frontend + Backend)', 1, '2023-05-10', '2023-05-30', 70, 18, 25.714285714285715, 3, 1, '2023-08-28', '2023-08-28');


--
-- TOC entry 3175 (class 0 OID 16485)
-- Dependencies: 220
-- Data for Name: projeto_atividade_apontamento; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projeto_atividade_apontamento VALUES (1, 1, 1, 6, '', '2023-05-11', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (2, 1, 1, 6, 'AngularJS + PHP 7', '2023-05-11', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (3, 1, 1, 6, 'AngularJS + PHP 7', '2023-05-11', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (4, 1, 1, 1, 'Ajustes', '2023-05-12', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (5, 2, 1, 2, '', '2023-05-30', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (6, 2, 1, 2, '', '2023-06-01', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (7, 1, 1, 1, '', '2023-05-12', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (8, 3, 1, 5, '', '2023-06-10', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (9, 4, 1, 5, '', '2023-05-15', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (10, 5, 1, 5, '', '2023-06-20', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (11, 6, 1, 5, '', '2023-06-25', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (12, 7, 1, 5, '', '2023-06-30', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (13, 8, 1, 5, '', '2023-07-05', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (14, 2, 1, 1, '', '2023-06-02', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (15, 8, 1, 1, '', '2023-08-28', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (16, 1, 1, 4, '', '2023-08-01', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (17, 2, 1, 1, '', '2023-08-07', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (18, 3, 1, 1, '', '2023-08-08', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (19, 4, 1, 1, '', '2023-08-09', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (20, 5, 1, 1, '', '2023-08-10', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (21, 6, 1, 1, '', '2023-08-11', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (22, 7, 1, 1, '', '2023-08-12', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (23, 9, 1, 6, '', '2023-08-02', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (24, 1, 1, 5, '', '2023-07-15', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (25, 9, 1, 5, '', '2023-08-02', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (27, 9, 1, 1, '', '2023-08-04', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (26, 9, 1, 9, '', '2023-08-04', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (28, 1, 1, 1, '', '2023-07-18', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (29, 9, 1, 1, '', '2023-08-02', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (30, 9, 1, 1, '', '2023-08-05', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (31, 10, 1, 10, '', '2023-05-01', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (32, 11, 1, 5, '', '2023-05-01', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (33, 10, 1, 1, '', '2023-05-10', '2023-08-28', '2023-08-28', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (34, 9, 1, 1, '', '2023-09-04', '2023-09-04', '2023-09-04', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (35, 11, 1, 1, 'Testes com arquivos OFX para o módulo financeiro', '2023-09-05', '2023-09-05', '2023-09-05', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (36, 11, 1, 1, 'Ajuste checkToken', '2023-09-04', '2023-09-05', '2023-09-05', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (37, 8, 1, 1, 'Finalização da programação do resultados do teste', '2023-09-06', '2023-09-06', '2023-09-06', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (38, 11, 1, 1, 'Ajustes módulo financeiro', '2023-09-06', '2023-09-06', '2023-09-06', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (39, 12, 1, 24.25, '', '2023-08-31', '2023-09-06', '2023-09-06', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (41, 13, 1, 1, '', '2023-07-31', '2023-09-06', '2023-09-06', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (43, 13, 1, 0.01, '', '2023-07-01', '2023-09-06', '2023-09-06', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (44, 13, 1, 0.01, 'Teste', '2023-07-01', '2023-09-06', '2023-09-06', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (45, 13, 1, 1.01, '', '2023-07-02', '2023-09-06', '2023-09-06', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (47, 13, 1, 8, '', '2023-07-03', '2023-09-06', '2023-09-06', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (48, 14, 1, 6.1699999999999999, '', '2023-10-10', '2023-11-03', '2023-11-03', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (49, 14, 1, 6, '', '2023-10-20', '2023-11-03', '2023-11-03', false);
INSERT INTO public.projeto_atividade_apontamento VALUES (50, 13, 1, 0.01, '', '2023-07-10', '2023-11-03', '2023-11-03', false);


--
-- TOC entry 3178 (class 0 OID 16495)
-- Dependencies: 223
-- Data for Name: projeto_atividade_participante; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projeto_atividade_participante VALUES (1, 10, 2);


--
-- TOC entry 3214 (class 0 OID 16872)
-- Dependencies: 259
-- Data for Name: projeto_atividade_situacao; Type: TABLE DATA; Schema: public; Owner: fharjwsz
--

INSERT INTO public.projeto_atividade_situacao VALUES (1, 'Não Iniciado', 1, 1, 1);
INSERT INTO public.projeto_atividade_situacao VALUES (2, 'Em Execução', 1, 1, 2);
INSERT INTO public.projeto_atividade_situacao VALUES (3, 'Finalizado', 1, 1, 3);
INSERT INTO public.projeto_atividade_situacao VALUES (4, 'Cancelado', 1, 1, 4);


--
-- TOC entry 3180 (class 0 OID 16500)
-- Dependencies: 225
-- Data for Name: projeto_comentario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projeto_comentario VALUES (1, 2, 1, '<p>Teste 1</p>', '2023-08-29 10:46:56.274427');
INSERT INTO public.projeto_comentario VALUES (2, 3, 1, '<p>Teste 1</p>', '2023-11-03 10:46:04.960116');


--
-- TOC entry 3182 (class 0 OID 16508)
-- Dependencies: 227
-- Data for Name: projeto_financeiro_despesas; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3184 (class 0 OID 16516)
-- Dependencies: 229
-- Data for Name: projeto_financeiro_pagamentos; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projeto_financeiro_pagamentos VALUES (1, 5, 18, 40, 46, 1840, '2023-09-25 10:31:55.578');
INSERT INTO public.projeto_financeiro_pagamentos VALUES (2, 5, 13, 41.049999999999997, 46, 1888.3, '2023-09-25 10:43:24.817');
INSERT INTO public.projeto_financeiro_pagamentos VALUES (3, 5, 12, 24.25, 46, 1115.5, '2023-09-25 10:45:41.863');


--
-- TOC entry 3187 (class 0 OID 16523)
-- Dependencies: 232
-- Data for Name: projeto_situacao; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projeto_situacao VALUES (1, 'Na Fila', 'bg-warning', 1, NULL, 1, '2023-08-29 10:51:55.776');
INSERT INTO public.projeto_situacao VALUES (2, 'Em Andamento', 'bg-primary', 1, NULL, 1, '2023-08-29 10:51:56.68');
INSERT INTO public.projeto_situacao VALUES (3, 'Finalizado', 'bg-success', 1, true, 1, '2023-08-29 10:51:57.488');
INSERT INTO public.projeto_situacao VALUES (4, 'Cancelado', 'bg-danger', 1, true, 1, '2023-08-29 10:52:41.745');
INSERT INTO public.projeto_situacao VALUES (5, 'Congelado', NULL, 1, false, 1, '2023-11-07 17:10:38.065534');


--
-- TOC entry 3189 (class 0 OID 16528)
-- Dependencies: 234
-- Data for Name: projeto_tipo; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.projeto_tipo VALUES (1, 'Desenvolvimento', 1, 1, '2023-08-29 11:13:34.108');
INSERT INTO public.projeto_tipo VALUES (2, 'Consultoria', 1, 1, '2023-08-29 11:13:34.94');
INSERT INTO public.projeto_tipo VALUES (3, 'Game Development', 1, 1, '2023-11-07 17:08:42.042053');


--
-- TOC entry 3191 (class 0 OID 16533)
-- Dependencies: 236
-- Data for Name: rh_batida_ponto; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.rh_batida_ponto VALUES (2, 1, 6, 11, 2023, '10:32:35', '2023-11-06 10:32:35');
INSERT INTO public.rh_batida_ponto VALUES (3, 1, 1, 11, 2023, '08:23:00', '2023-11-06 11:23:12.169');
INSERT INTO public.rh_batida_ponto VALUES (4, 1, 1, 11, 2023, '11:32:00', '2023-11-06 11:23:37.224');
INSERT INTO public.rh_batida_ponto VALUES (5, 1, 1, 11, 2023, '12:33:00', '2023-11-06 11:23:37.224');
INSERT INTO public.rh_batida_ponto VALUES (6, 1, 1, 11, 2023, '17:59:00', '2023-11-06 11:23:37.224');
INSERT INTO public.rh_batida_ponto VALUES (7, 1, 6, 11, 2023, '11:36:15', '2023-11-06 11:36:15');
INSERT INTO public.rh_batida_ponto VALUES (8, 1, 6, 11, 2023, '12:38:43', '2023-11-06 12:38:43');
INSERT INTO public.rh_batida_ponto VALUES (1, 1, 6, 11, 2023, '08:27:00', '2023-11-06 09:46:38');
INSERT INTO public.rh_batida_ponto VALUES (9, 1, 3, 11, 2023, '08:43:00', '2023-11-06 12:44:49.707');
INSERT INTO public.rh_batida_ponto VALUES (10, 1, 3, 11, 2023, '11:45:00', '2023-11-06 12:44:49.707');
INSERT INTO public.rh_batida_ponto VALUES (11, 1, 3, 11, 2023, '12:46:00', '2023-11-06 12:44:49.707');
INSERT INTO public.rh_batida_ponto VALUES (12, 1, 3, 11, 2023, '18:01:00', '2023-11-06 12:44:49.707');
INSERT INTO public.rh_batida_ponto VALUES (13, 1, 6, 11, 2023, '18:04:47', '2023-11-06 18:04:47');
INSERT INTO public.rh_batida_ponto VALUES (14, 1, 7, 11, 2023, '08:44:19', '2023-11-07 08:44:19');
INSERT INTO public.rh_batida_ponto VALUES (15, 1, 7, 11, 2023, '13:02:23', '2023-11-07 13:02:23');
INSERT INTO public.rh_batida_ponto VALUES (16, 1, 7, 11, 2023, '12:02:00', '2023-11-07 13:02:48.142');
INSERT INTO public.rh_batida_ponto VALUES (17, 1, 7, 11, 2023, '17:59:47', '2023-11-07 17:59:47');
INSERT INTO public.rh_batida_ponto VALUES (18, 1, 8, 11, 2023, '08:42:42', '2023-11-08 08:42:42');
INSERT INTO public.rh_batida_ponto VALUES (19, 1, 8, 11, 2023, '11:41:16', '2023-11-08 11:41:16');
INSERT INTO public.rh_batida_ponto VALUES (20, 1, 8, 11, 2023, '12:49:34', '2023-11-08 12:49:34');
INSERT INTO public.rh_batida_ponto VALUES (21, 1, 9, 11, 2023, '08:37:38', '2023-11-09 08:37:38');
INSERT INTO public.rh_batida_ponto VALUES (22, 1, 8, 11, 2023, '18:03:00', '2023-11-09 11:00:27.683');
INSERT INTO public.rh_batida_ponto VALUES (23, 1, 9, 11, 2023, '11:43:00', '2023-11-09 13:07:58.396');
INSERT INTO public.rh_batida_ponto VALUES (24, 1, 9, 11, 2023, '12:44:00', '2023-11-09 13:08:13.707');
INSERT INTO public.rh_batida_ponto VALUES (25, 1, 9, 11, 2023, '17:58:09', '2023-11-09 17:58:09');
INSERT INTO public.rh_batida_ponto VALUES (26, 1, 10, 11, 2023, '08:41:00', '2023-11-10 10:34:56.556');


--
-- TOC entry 3198 (class 0 OID 16712)
-- Dependencies: 243
-- Data for Name: sistema_notificacao; Type: TABLE DATA; Schema: public; Owner: fharjwsz
--

INSERT INTO public.sistema_notificacao VALUES (1, 1, 1, 'Login', 'Usuário 1 logou do ip 0.0.0.0', 0, '2023-11-06 13:57:55.071');


--
-- TOC entry 3200 (class 0 OID 16753)
-- Dependencies: 245
-- Data for Name: ticket; Type: TABLE DATA; Schema: public; Owner: fharjwsz
--



--
-- TOC entry 3202 (class 0 OID 16774)
-- Dependencies: 247
-- Data for Name: ticket_evento; Type: TABLE DATA; Schema: public; Owner: fharjwsz
--



--
-- TOC entry 3204 (class 0 OID 16795)
-- Dependencies: 249
-- Data for Name: ticket_status; Type: TABLE DATA; Schema: public; Owner: fharjwsz
--



--
-- TOC entry 3193 (class 0 OID 16538)
-- Dependencies: 238
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.usuario VALUES (1, 'Dilson Sordi Junior', 'dilson@sc.senac.br', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'assets/img/users/dilson_sordi_junior.jpg', 1, 1, true, 1);
INSERT INTO public.usuario VALUES (2, 'Cristian Bianchi', 'cbianchi@sc.senac.br', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'assets/images/users/avatar-1.jpg', 1, 1, true, 1);


--
-- TOC entry 3280 (class 0 OID 0)
-- Dependencies: 197
-- Name: agendamento_areas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agendamento_areas_id_seq', 1, false);


--
-- TOC entry 3281 (class 0 OID 0)
-- Dependencies: 256
-- Name: agendamento_prestador_compromisso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fharjwsz
--

SELECT pg_catalog.setval('public.agendamento_prestador_compromisso_id_seq', 1, false);


--
-- TOC entry 3282 (class 0 OID 0)
-- Dependencies: 199
-- Name: agendamento_prestador_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.agendamento_prestador_id_seq', 1, false);


--
-- TOC entry 3283 (class 0 OID 0)
-- Dependencies: 254
-- Name: agendamento_prestador_produto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fharjwsz
--

SELECT pg_catalog.setval('public.agendamento_prestador_produto_id_seq', 1, true);


--
-- TOC entry 3284 (class 0 OID 0)
-- Dependencies: 252
-- Name: controle_mudancas_detalhamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fharjwsz
--

SELECT pg_catalog.setval('public.controle_mudancas_detalhamento_id_seq', 1, false);


--
-- TOC entry 3285 (class 0 OID 0)
-- Dependencies: 250
-- Name: controle_mudancas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fharjwsz
--

SELECT pg_catalog.setval('public.controle_mudancas_id_seq', 5, true);


--
-- TOC entry 3286 (class 0 OID 0)
-- Dependencies: 202
-- Name: empresa_categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empresa_categoria_id_seq', 1, false);


--
-- TOC entry 3287 (class 0 OID 0)
-- Dependencies: 204
-- Name: empresa_cliente_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empresa_cliente_id_seq', 5, true);


--
-- TOC entry 3288 (class 0 OID 0)
-- Dependencies: 205
-- Name: empresa_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.empresa_id_seq', 1, true);


--
-- TOC entry 3289 (class 0 OID 0)
-- Dependencies: 207
-- Name: financas_bancos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.financas_bancos_id_seq', 1, false);


--
-- TOC entry 3290 (class 0 OID 0)
-- Dependencies: 209
-- Name: financas_categoria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.financas_categoria_id_seq', 30, true);


--
-- TOC entry 3291 (class 0 OID 0)
-- Dependencies: 212
-- Name: financas_conta_bancaria2_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.financas_conta_bancaria2_id_seq', 3, true);


--
-- TOC entry 3292 (class 0 OID 0)
-- Dependencies: 213
-- Name: financas_conta_bancaria_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.financas_conta_bancaria_id_seq', 10, true);


--
-- TOC entry 3293 (class 0 OID 0)
-- Dependencies: 215
-- Name: financas_conta_bancaria_saldo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.financas_conta_bancaria_saldo_id_seq', 1, true);


--
-- TOC entry 3294 (class 0 OID 0)
-- Dependencies: 217
-- Name: financas_movimentacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.financas_movimentacao_id_seq', 23, true);


--
-- TOC entry 3295 (class 0 OID 0)
-- Dependencies: 240
-- Name: hours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fharjwsz
--

SELECT pg_catalog.setval('public.hours_id_seq', 2, true);


--
-- TOC entry 3296 (class 0 OID 0)
-- Dependencies: 260
-- Name: pgmigrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fharjwsz
--

SELECT pg_catalog.setval('public.pgmigrations_id_seq', 1, false);


--
-- TOC entry 3297 (class 0 OID 0)
-- Dependencies: 221
-- Name: projeto_atividade_apontamento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projeto_atividade_apontamento_id_seq', 50, true);


--
-- TOC entry 3298 (class 0 OID 0)
-- Dependencies: 222
-- Name: projeto_atividade_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projeto_atividade_id_seq', 16, true);


--
-- TOC entry 3299 (class 0 OID 0)
-- Dependencies: 224
-- Name: projeto_atividade_participante_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projeto_atividade_participante_id_seq', 1, true);


--
-- TOC entry 3300 (class 0 OID 0)
-- Dependencies: 258
-- Name: projeto_atividade_situacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fharjwsz
--

SELECT pg_catalog.setval('public.projeto_atividade_situacao_id_seq', 4, true);


--
-- TOC entry 3301 (class 0 OID 0)
-- Dependencies: 226
-- Name: projeto_comentario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projeto_comentario_id_seq', 2, true);


--
-- TOC entry 3302 (class 0 OID 0)
-- Dependencies: 228
-- Name: projeto_financeiro_despesas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projeto_financeiro_despesas_id_seq', 1, false);


--
-- TOC entry 3303 (class 0 OID 0)
-- Dependencies: 230
-- Name: projeto_financeiro_pagamentos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projeto_financeiro_pagamentos_id_seq', 1, true);


--
-- TOC entry 3304 (class 0 OID 0)
-- Dependencies: 231
-- Name: projeto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projeto_id_seq', 3, true);


--
-- TOC entry 3305 (class 0 OID 0)
-- Dependencies: 233
-- Name: projeto_situacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projeto_situacao_id_seq', 5, true);


--
-- TOC entry 3306 (class 0 OID 0)
-- Dependencies: 235
-- Name: projeto_tipo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.projeto_tipo_id_seq', 3, true);


--
-- TOC entry 3307 (class 0 OID 0)
-- Dependencies: 237
-- Name: rh_batida_ponto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.rh_batida_ponto_id_seq', 26, true);


--
-- TOC entry 3308 (class 0 OID 0)
-- Dependencies: 242
-- Name: sistema_notificacao_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fharjwsz
--

SELECT pg_catalog.setval('public.sistema_notificacao_id_seq', 1, true);


--
-- TOC entry 3309 (class 0 OID 0)
-- Dependencies: 246
-- Name: ticket_evento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fharjwsz
--

SELECT pg_catalog.setval('public.ticket_evento_id_seq', 1, false);


--
-- TOC entry 3310 (class 0 OID 0)
-- Dependencies: 244
-- Name: ticket_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fharjwsz
--

SELECT pg_catalog.setval('public.ticket_id_seq', 1, false);


--
-- TOC entry 3311 (class 0 OID 0)
-- Dependencies: 248
-- Name: ticket_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: fharjwsz
--

SELECT pg_catalog.setval('public.ticket_status_id_seq', 1, false);


--
-- TOC entry 3312 (class 0 OID 0)
-- Dependencies: 239
-- Name: usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuario_id_seq', 2, true);


--
-- TOC entry 2928 (class 2606 OID 16569)
-- Name: agendamento_areas agendamento_areas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamento_areas
    ADD CONSTRAINT agendamento_areas_pkey PRIMARY KEY (id);


--
-- TOC entry 2988 (class 2606 OID 16854)
-- Name: agendamento_prestador_compromisso agendamento_prestador_compromisso_pkey; Type: CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.agendamento_prestador_compromisso
    ADD CONSTRAINT agendamento_prestador_compromisso_pkey PRIMARY KEY (id);


--
-- TOC entry 2930 (class 2606 OID 16571)
-- Name: agendamento_prestador agendamento_prestador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.agendamento_prestador
    ADD CONSTRAINT agendamento_prestador_pkey PRIMARY KEY (id);


--
-- TOC entry 2986 (class 2606 OID 16838)
-- Name: agendamento_prestador_produto agendamento_prestador_produto_pkey; Type: CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.agendamento_prestador_produto
    ADD CONSTRAINT agendamento_prestador_produto_pkey PRIMARY KEY (id);


--
-- TOC entry 2984 (class 2606 OID 16822)
-- Name: controle_mudancas_detalhamento controle_mudancas_detalhamento_pkey; Type: CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.controle_mudancas_detalhamento
    ADD CONSTRAINT controle_mudancas_detalhamento_pkey PRIMARY KEY (id);


--
-- TOC entry 2982 (class 2606 OID 16811)
-- Name: controle_mudancas controle_mudancas_pkey; Type: CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.controle_mudancas
    ADD CONSTRAINT controle_mudancas_pkey PRIMARY KEY (id);


--
-- TOC entry 2934 (class 2606 OID 16573)
-- Name: empresa_categoria empresa_categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresa_categoria
    ADD CONSTRAINT empresa_categoria_pkey PRIMARY KEY (id);


--
-- TOC entry 2936 (class 2606 OID 16575)
-- Name: empresa_cliente empresa_cliente_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresa_cliente
    ADD CONSTRAINT empresa_cliente_pkey PRIMARY KEY (id);


--
-- TOC entry 2932 (class 2606 OID 16577)
-- Name: empresa empresa_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresa
    ADD CONSTRAINT empresa_pkey PRIMARY KEY (id);


--
-- TOC entry 2938 (class 2606 OID 16579)
-- Name: financas_bancos financas_bancos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_bancos
    ADD CONSTRAINT financas_bancos_pkey PRIMARY KEY (id);


--
-- TOC entry 2940 (class 2606 OID 16581)
-- Name: financas_categoria financas_categoria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_categoria
    ADD CONSTRAINT financas_categoria_pkey PRIMARY KEY (id);


--
-- TOC entry 2944 (class 2606 OID 16583)
-- Name: financas_conta_bancaria2 financas_conta_bancaria2_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_conta_bancaria2
    ADD CONSTRAINT financas_conta_bancaria2_pkey PRIMARY KEY (id);


--
-- TOC entry 2942 (class 2606 OID 16585)
-- Name: financas_conta_bancaria financas_conta_bancaria_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_conta_bancaria
    ADD CONSTRAINT financas_conta_bancaria_pkey PRIMARY KEY (id);


--
-- TOC entry 2946 (class 2606 OID 16587)
-- Name: financas_conta_bancaria_saldo financas_conta_bancaria_saldo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_conta_bancaria_saldo
    ADD CONSTRAINT financas_conta_bancaria_saldo_pkey PRIMARY KEY (id);


--
-- TOC entry 2948 (class 2606 OID 16589)
-- Name: financas_movimentacao financas_movimentacao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_movimentacao
    ADD CONSTRAINT financas_movimentacao_pkey PRIMARY KEY (id);


--
-- TOC entry 2972 (class 2606 OID 16709)
-- Name: hours hours_pkey; Type: CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.hours
    ADD CONSTRAINT hours_pkey PRIMARY KEY (id);


--
-- TOC entry 2994 (class 2606 OID 18577)
-- Name: migrations migrations_name_key; Type: CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_name_key UNIQUE (name);


--
-- TOC entry 2996 (class 2606 OID 18575)
-- Name: migrations migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 2992 (class 2606 OID 18569)
-- Name: pgmigrations pgmigrations_pkey; Type: CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.pgmigrations
    ADD CONSTRAINT pgmigrations_pkey PRIMARY KEY (id);


--
-- TOC entry 2954 (class 2606 OID 16591)
-- Name: projeto_atividade_apontamento projeto_atividade_apontamento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_atividade_apontamento
    ADD CONSTRAINT projeto_atividade_apontamento_pkey PRIMARY KEY (id);


--
-- TOC entry 2956 (class 2606 OID 16593)
-- Name: projeto_atividade_participante projeto_atividade_participante_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_atividade_participante
    ADD CONSTRAINT projeto_atividade_participante_pkey PRIMARY KEY (id);


--
-- TOC entry 2952 (class 2606 OID 16595)
-- Name: projeto_atividade projeto_atividade_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_atividade
    ADD CONSTRAINT projeto_atividade_pkey PRIMARY KEY (id);


--
-- TOC entry 2990 (class 2606 OID 16880)
-- Name: projeto_atividade_situacao projeto_atividade_situacao_pkey; Type: CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.projeto_atividade_situacao
    ADD CONSTRAINT projeto_atividade_situacao_pkey PRIMARY KEY (id);


--
-- TOC entry 2958 (class 2606 OID 16597)
-- Name: projeto_comentario projeto_comentario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_comentario
    ADD CONSTRAINT projeto_comentario_pkey PRIMARY KEY (id);


--
-- TOC entry 2960 (class 2606 OID 16599)
-- Name: projeto_financeiro_despesas projeto_financeiro_despesas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_financeiro_despesas
    ADD CONSTRAINT projeto_financeiro_despesas_pkey PRIMARY KEY (id);


--
-- TOC entry 2962 (class 2606 OID 16601)
-- Name: projeto_financeiro_pagamentos projeto_financeiro_pagamentos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_financeiro_pagamentos
    ADD CONSTRAINT projeto_financeiro_pagamentos_pkey PRIMARY KEY (id);


--
-- TOC entry 2950 (class 2606 OID 16603)
-- Name: projeto projeto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT projeto_pkey PRIMARY KEY (id);


--
-- TOC entry 2964 (class 2606 OID 16605)
-- Name: projeto_situacao projeto_situacao_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_situacao
    ADD CONSTRAINT projeto_situacao_pkey PRIMARY KEY (id);


--
-- TOC entry 2966 (class 2606 OID 16607)
-- Name: projeto_tipo projeto_tipo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_tipo
    ADD CONSTRAINT projeto_tipo_pkey PRIMARY KEY (id);


--
-- TOC entry 2968 (class 2606 OID 16609)
-- Name: rh_batida_ponto rh_batida_ponto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.rh_batida_ponto
    ADD CONSTRAINT rh_batida_ponto_pkey PRIMARY KEY (id);


--
-- TOC entry 2974 (class 2606 OID 16720)
-- Name: sistema_notificacao sistema_notificacao_pkey; Type: CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.sistema_notificacao
    ADD CONSTRAINT sistema_notificacao_pkey PRIMARY KEY (id);


--
-- TOC entry 2978 (class 2606 OID 16782)
-- Name: ticket_evento ticket_evento_pkey; Type: CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.ticket_evento
    ADD CONSTRAINT ticket_evento_pkey PRIMARY KEY (id);


--
-- TOC entry 2976 (class 2606 OID 16761)
-- Name: ticket ticket_pkey; Type: CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_pkey PRIMARY KEY (id);


--
-- TOC entry 2980 (class 2606 OID 16800)
-- Name: ticket_status ticket_status_pkey; Type: CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.ticket_status
    ADD CONSTRAINT ticket_status_pkey PRIMARY KEY (id);


--
-- TOC entry 2970 (class 2606 OID 16611)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 3026 (class 2606 OID 16855)
-- Name: agendamento_prestador_compromisso agendamento_prestador_compromisso_id_prestador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.agendamento_prestador_compromisso
    ADD CONSTRAINT agendamento_prestador_compromisso_id_prestador_fkey FOREIGN KEY (id_prestador) REFERENCES public.agendamento_prestador(id);


--
-- TOC entry 3027 (class 2606 OID 16860)
-- Name: agendamento_prestador_compromisso agendamento_prestador_compromisso_id_produto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.agendamento_prestador_compromisso
    ADD CONSTRAINT agendamento_prestador_compromisso_id_produto_fkey FOREIGN KEY (id_produto) REFERENCES public.agendamento_prestador_produto(id);


--
-- TOC entry 3028 (class 2606 OID 16865)
-- Name: agendamento_prestador_compromisso agendamento_prestador_compromisso_id_usuario_solicitante_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.agendamento_prestador_compromisso
    ADD CONSTRAINT agendamento_prestador_compromisso_id_usuario_solicitante_fkey FOREIGN KEY (id_usuario_solicitante) REFERENCES public.usuario(id);


--
-- TOC entry 3025 (class 2606 OID 16839)
-- Name: agendamento_prestador_produto agendamento_prestador_produto_id_prestador_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.agendamento_prestador_produto
    ADD CONSTRAINT agendamento_prestador_produto_id_prestador_fkey FOREIGN KEY (id_prestador) REFERENCES public.agendamento_prestador(id);


--
-- TOC entry 3024 (class 2606 OID 16823)
-- Name: controle_mudancas_detalhamento controle_mudancas_detalhamento_id_controle_mudancas_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.controle_mudancas_detalhamento
    ADD CONSTRAINT controle_mudancas_detalhamento_id_controle_mudancas_fkey FOREIGN KEY (id_controle_mudancas) REFERENCES public.controle_mudancas(id);


--
-- TOC entry 2997 (class 2606 OID 16612)
-- Name: empresa_categoria empresa_categoria_id_empresa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresa_categoria
    ADD CONSTRAINT empresa_categoria_id_empresa_fkey FOREIGN KEY (id_empresa) REFERENCES public.empresa(id);


--
-- TOC entry 2998 (class 2606 OID 16617)
-- Name: empresa_cliente empresa_cliente_id_empresa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.empresa_cliente
    ADD CONSTRAINT empresa_cliente_id_empresa_fkey FOREIGN KEY (id_empresa) REFERENCES public.empresa(id);


--
-- TOC entry 2999 (class 2606 OID 16622)
-- Name: financas_categoria financas_categoria_id_empresa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_categoria
    ADD CONSTRAINT financas_categoria_id_empresa_fkey FOREIGN KEY (id_empresa) REFERENCES public.empresa(id);


--
-- TOC entry 3000 (class 2606 OID 16627)
-- Name: financas_conta_bancaria financas_conta_bancaria_id_empresa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_conta_bancaria
    ADD CONSTRAINT financas_conta_bancaria_id_empresa_fkey FOREIGN KEY (id_empresa) REFERENCES public.empresa(id);


--
-- TOC entry 3001 (class 2606 OID 16632)
-- Name: financas_conta_bancaria_saldo financas_conta_bancaria_saldo_id_conta_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_conta_bancaria_saldo
    ADD CONSTRAINT financas_conta_bancaria_saldo_id_conta_fkey FOREIGN KEY (id_conta) REFERENCES public.financas_conta_bancaria(id);


--
-- TOC entry 3002 (class 2606 OID 16637)
-- Name: financas_movimentacao financas_movimentacao_id_categoria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_movimentacao
    ADD CONSTRAINT financas_movimentacao_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES public.financas_categoria(id);


--
-- TOC entry 3003 (class 2606 OID 16642)
-- Name: financas_movimentacao financas_movimentacao_id_conta_bancaria_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_movimentacao
    ADD CONSTRAINT financas_movimentacao_id_conta_bancaria_fkey FOREIGN KEY (id_conta_bancaria) REFERENCES public.financas_conta_bancaria(id);


--
-- TOC entry 3004 (class 2606 OID 16647)
-- Name: financas_movimentacao financas_movimentacao_id_empresa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.financas_movimentacao
    ADD CONSTRAINT financas_movimentacao_id_empresa_fkey FOREIGN KEY (id_empresa) REFERENCES public.empresa(id);


--
-- TOC entry 3005 (class 2606 OID 16736)
-- Name: projeto fk_empresa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT fk_empresa FOREIGN KEY (id_empresa) REFERENCES public.empresa(id);


--
-- TOC entry 3018 (class 2606 OID 16746)
-- Name: usuario fk_empresa; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT fk_empresa FOREIGN KEY (id_empresa) REFERENCES public.empresa(id);


--
-- TOC entry 3006 (class 2606 OID 16731)
-- Name: projeto fk_empresa_cliente; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT fk_empresa_cliente FOREIGN KEY (id_cliente) REFERENCES public.empresa_cliente(id);


--
-- TOC entry 3007 (class 2606 OID 16741)
-- Name: projeto fk_projeto_situacao; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT fk_projeto_situacao FOREIGN KEY (id_status) REFERENCES public.projeto_situacao(id);


--
-- TOC entry 3008 (class 2606 OID 16726)
-- Name: projeto fk_projeto_tipo; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT fk_projeto_tipo FOREIGN KEY (id_categoria) REFERENCES public.projeto_tipo(id);


--
-- TOC entry 3012 (class 2606 OID 16652)
-- Name: projeto_atividade_apontamento projeto_atividade_apontamento_id_atividade_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_atividade_apontamento
    ADD CONSTRAINT projeto_atividade_apontamento_id_atividade_fkey FOREIGN KEY (id_atividade) REFERENCES public.projeto_atividade(id);


--
-- TOC entry 3013 (class 2606 OID 16657)
-- Name: projeto_atividade_apontamento projeto_atividade_apontamento_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_atividade_apontamento
    ADD CONSTRAINT projeto_atividade_apontamento_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id);


--
-- TOC entry 3010 (class 2606 OID 16662)
-- Name: projeto_atividade projeto_atividade_id_projeto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_atividade
    ADD CONSTRAINT projeto_atividade_id_projeto_fkey FOREIGN KEY (id_projeto) REFERENCES public.projeto(id);


--
-- TOC entry 3011 (class 2606 OID 16667)
-- Name: projeto_atividade projeto_atividade_id_responsavel_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_atividade
    ADD CONSTRAINT projeto_atividade_id_responsavel_fkey FOREIGN KEY (id_responsavel) REFERENCES public.usuario(id);


--
-- TOC entry 3014 (class 2606 OID 16672)
-- Name: projeto_atividade_participante projeto_atividade_participante_id_atividade_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_atividade_participante
    ADD CONSTRAINT projeto_atividade_participante_id_atividade_fkey FOREIGN KEY (id_atividade) REFERENCES public.projeto_atividade(id);


--
-- TOC entry 3015 (class 2606 OID 16677)
-- Name: projeto_atividade_participante projeto_atividade_participante_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_atividade_participante
    ADD CONSTRAINT projeto_atividade_participante_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id);


--
-- TOC entry 3029 (class 2606 OID 16881)
-- Name: projeto_atividade_situacao projeto_atividade_situacao_id_empresa_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.projeto_atividade_situacao
    ADD CONSTRAINT projeto_atividade_situacao_id_empresa_fkey FOREIGN KEY (id_empresa) REFERENCES public.empresa(id);


--
-- TOC entry 3016 (class 2606 OID 16682)
-- Name: projeto_comentario projeto_comentario_id_projeto_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_comentario
    ADD CONSTRAINT projeto_comentario_id_projeto_fkey FOREIGN KEY (id_projeto) REFERENCES public.projeto(id);


--
-- TOC entry 3017 (class 2606 OID 16687)
-- Name: projeto_comentario projeto_comentario_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto_comentario
    ADD CONSTRAINT projeto_comentario_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id);


--
-- TOC entry 3009 (class 2606 OID 16692)
-- Name: projeto projeto_id_responsavel_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.projeto
    ADD CONSTRAINT projeto_id_responsavel_fkey FOREIGN KEY (id_responsavel) REFERENCES public.usuario(id);


--
-- TOC entry 3019 (class 2606 OID 16721)
-- Name: sistema_notificacao sistema_notificacao_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.sistema_notificacao
    ADD CONSTRAINT sistema_notificacao_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id);


--
-- TOC entry 3022 (class 2606 OID 16783)
-- Name: ticket_evento ticket_evento_id_ticket_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.ticket_evento
    ADD CONSTRAINT ticket_evento_id_ticket_fkey FOREIGN KEY (id_ticket) REFERENCES public.ticket(id);


--
-- TOC entry 3023 (class 2606 OID 16788)
-- Name: ticket_evento ticket_evento_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.ticket_evento
    ADD CONSTRAINT ticket_evento_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id);


--
-- TOC entry 3020 (class 2606 OID 16767)
-- Name: ticket ticket_id_responsavel_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_id_responsavel_fkey FOREIGN KEY (id_responsavel) REFERENCES public.usuario(id);


--
-- TOC entry 3021 (class 2606 OID 16762)
-- Name: ticket ticket_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: fharjwsz
--

ALTER TABLE ONLY public.ticket
    ADD CONSTRAINT ticket_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id);


--
-- TOC entry 3224 (class 0 OID 0)
-- Dependencies: 6
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- TOC entry 3225 (class 0 OID 0)
-- Dependencies: 196
-- Name: TABLE agendamento_areas; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.agendamento_areas TO fharjwsz;


--
-- TOC entry 3227 (class 0 OID 0)
-- Dependencies: 198
-- Name: TABLE agendamento_prestador; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.agendamento_prestador TO fharjwsz;


--
-- TOC entry 3233 (class 0 OID 0)
-- Dependencies: 200
-- Name: TABLE empresa; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.empresa TO fharjwsz;


--
-- TOC entry 3234 (class 0 OID 0)
-- Dependencies: 201
-- Name: TABLE empresa_categoria; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.empresa_categoria TO fharjwsz;


--
-- TOC entry 3236 (class 0 OID 0)
-- Dependencies: 203
-- Name: TABLE empresa_cliente; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.empresa_cliente TO fharjwsz;


--
-- TOC entry 3239 (class 0 OID 0)
-- Dependencies: 206
-- Name: TABLE financas_bancos; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.financas_bancos TO fharjwsz;


--
-- TOC entry 3241 (class 0 OID 0)
-- Dependencies: 208
-- Name: TABLE financas_categoria; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.financas_categoria TO fharjwsz;


--
-- TOC entry 3243 (class 0 OID 0)
-- Dependencies: 210
-- Name: TABLE financas_conta_bancaria; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.financas_conta_bancaria TO fharjwsz;


--
-- TOC entry 3244 (class 0 OID 0)
-- Dependencies: 211
-- Name: TABLE financas_conta_bancaria2; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.financas_conta_bancaria2 TO fharjwsz;


--
-- TOC entry 3247 (class 0 OID 0)
-- Dependencies: 214
-- Name: TABLE financas_conta_bancaria_saldo; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.financas_conta_bancaria_saldo TO fharjwsz;


--
-- TOC entry 3249 (class 0 OID 0)
-- Dependencies: 216
-- Name: TABLE financas_movimentacao; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.financas_movimentacao TO fharjwsz;


--
-- TOC entry 3253 (class 0 OID 0)
-- Dependencies: 218
-- Name: TABLE projeto; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.projeto TO fharjwsz;


--
-- TOC entry 3254 (class 0 OID 0)
-- Dependencies: 219
-- Name: TABLE projeto_atividade; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.projeto_atividade TO fharjwsz;


--
-- TOC entry 3255 (class 0 OID 0)
-- Dependencies: 220
-- Name: TABLE projeto_atividade_apontamento; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.projeto_atividade_apontamento TO fharjwsz;


--
-- TOC entry 3258 (class 0 OID 0)
-- Dependencies: 223
-- Name: TABLE projeto_atividade_participante; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.projeto_atividade_participante TO fharjwsz;


--
-- TOC entry 3261 (class 0 OID 0)
-- Dependencies: 225
-- Name: TABLE projeto_comentario; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.projeto_comentario TO fharjwsz;


--
-- TOC entry 3263 (class 0 OID 0)
-- Dependencies: 227
-- Name: TABLE projeto_financeiro_despesas; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.projeto_financeiro_despesas TO fharjwsz;


--
-- TOC entry 3265 (class 0 OID 0)
-- Dependencies: 229
-- Name: TABLE projeto_financeiro_pagamentos; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.projeto_financeiro_pagamentos TO fharjwsz;


--
-- TOC entry 3268 (class 0 OID 0)
-- Dependencies: 232
-- Name: TABLE projeto_situacao; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.projeto_situacao TO fharjwsz;


--
-- TOC entry 3270 (class 0 OID 0)
-- Dependencies: 234
-- Name: TABLE projeto_tipo; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.projeto_tipo TO fharjwsz;


--
-- TOC entry 3272 (class 0 OID 0)
-- Dependencies: 236
-- Name: TABLE rh_batida_ponto; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.rh_batida_ponto TO fharjwsz;


--
-- TOC entry 3278 (class 0 OID 0)
-- Dependencies: 238
-- Name: TABLE usuario; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.usuario TO fharjwsz;


-- Completed on 2023-11-10 14:56:19

--
-- PostgreSQL database dump complete
--

