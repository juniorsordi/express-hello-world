-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 19-Abr-2023 às 16:08
-- Versão do servidor: 5.7.11
-- PHP Version: 7.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `artia`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `atividade_situacao`
--

CREATE TABLE `atividade_situacao` (
  `id` int(11) NOT NULL,
  `descricao` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `atividade_situacao`
--

INSERT INTO `atividade_situacao` (`id`, `descricao`) VALUES
(1, 'Pendente'),
(2, 'Encerrado'),
(3, 'Em Espera');

-- --------------------------------------------------------

--
-- Estrutura da tabela `controle_conteudo`
--

CREATE TABLE `controle_conteudo` (
  `id` int(11) NOT NULL,
  `id_curso` int(11) NOT NULL,
  `pagina` int(11) DEFAULT NULL,
  `conteudo` longtext,
  `data_cadastro` datetime DEFAULT NULL,
  `ultima_edicao` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `controle_conteudo`
--

INSERT INTO `controle_conteudo` (`id`, `id_curso`, `pagina`, `conteudo`, `data_cadastro`, `ultima_edicao`) VALUES
(1, 1, 1, '<h1>Contextualizando</h1>\n\n<p><img alt="" src="https://images-na.ssl-images-amazon.com/images/I/51oTKXPVXWL._SY346_.jpg" style="height:346px; width:260px" /></p>\n\n<p>A EAD &eacute; a modalidade educativa na qual alunos e professores est&atilde;o separados f&iacute;sica ou temporalmente e, por isso, faz-se necess&aacute;ria a utiliza&ccedil;&atilde;o de meios e Tecnologias de Informa&ccedil;&atilde;o e Comunica&ccedil;&atilde;o. Essa modalidade &eacute; regulada por uma legisla&ccedil;&atilde;o espec&iacute;fica e pode ser implantada na educa&ccedil;&atilde;o b&aacute;sica (educa&ccedil;&atilde;o de jovens e adultos e educa&ccedil;&atilde;o profissional t&eacute;cnica de n&iacute;vel m&eacute;dio) e na educa&ccedil;&atilde;o superior (BRASIL, 2013).</p>\n\n<p>H&aacute; d&uacute;vidas entre o papel do tutor on-line e do professor on-line?</p>\n\n<p>Vamos iniciar nossos estudos com a defini&ccedil;&atilde;o de EAD e a apresenta&ccedil;&atilde;o de um breve hist&oacute;rico dessa modalidade de educa&ccedil;&atilde;o.</p>\n\n<p>Antes de come&ccedil;ar a desenvolver suas a&ccedil;&otilde;es nas Redes Sociais, voc&ecirc; j&aacute; parou para pensar quem s&atilde;o seus clientes potenciais? Quem est&aacute; do outro lado lendo sua mensagem ou o &uacute;ltimo post publicado?</p>\n\n<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde velit, dignissimos, hic aliquam esse delectus et quae dolor laudantium, facilis totam modi. Similique eveniet nisi quam tempore facere! Aliquid, accusantium!</p>\n\n<hr />\n<p>N&iacute;veis dos T&iacute;tulos</p>\n\n<p>1 T&iacute;tulo N&iacute;vel 1</p>\n\n<p>1.1 T&iacute;tulo N&iacute;vel 2</p>\n\n<p>1.1.1 T&iacute;tulo N&iacute;vel 3</p>\n\n<p>1.1.1 T&iacute;tulo N&iacute;vel 4</p>\n\n<hr />\n<p>Fonte: Elaborado pela autora.</p>\n\n<p>Fonte: Istockphotos (2019).</p>\n', '2020-01-31 11:35:48', '2020-01-31 11:35:48'),
(2, 1, 2, '<div class="pagina">\n	<div class="barra-titulos">\n		<div class="unidade-titulo">Estudando na educação a distância no Senac</div>\n		<div class="borda-titulo"></div>    \n	</div>    \n	<div class="container-fluid conteudo-principal-da-pagina">\n		<div class="col-md-12">\n			<h5><br>Estudando na educação a distância no Senac</h5>\n			<p>Olá! Seja bem-vindo(a) ao curso <mark>“<strong>Assistente de Recursos Humanos UC 1</strong>”</mark>!<br>Teste 1<br></p>\n                        <div class="row">\n                <div class="col-lg-6 col-md-6 col-sm-8 col-xs-12 centraliza-recurso">\n                    <!-- caixa DICA -->\n                    <div class="caixa caixa-estatica" data-type="Dica" data-id="1">\n                        <div class="caixa-botao"><img class="easing" src="images/layout/icones/dica.png"></div>\n                        <div class="caixa-hover-text"></div>\n                        <div class="caixa-conteudo">\n                            <h2 class="titulo-caixa"></h2>\n                            <p>Tenha uma rotina de estudos equilibrada e adequada à sua realidade e à carga horária deste curso.</p>\n                        </div>\n                    </div>\n                 </div>\n            </div>\n\n             <p class="destaque-manuscrito">Antes de dar continuidade a seus estudos, que tal conhecer algumas informações sobre a avaliação e a certificação deste curso Teste?</p>\n\n            <p>Para isso, assista ao vídeo Cursos Rede FIC.</p>\n\n            <div class="row">\n                <div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 centraliza-recurso">\n                    <!-- video embedado -->\n                    <!-- só precisa alterar o ID >>> BGuo4ImcvpU -->\n                      [youtube id="BGuo4ImcvpU "] <br></div><div class="col-lg-10 col-md-10 col-sm-12 col-xs-12 centraliza-recurso"><br></div>\n                </div>\n            </div>\n          \n            <p>Link para videoaula fullscreen no PDF:</p>\n            <p>https://www.youtube.com/embed/II25cRGfsVk?rel=0&amp;showinfo=0</p>\n            <p><strong>Bons estudos!</strong></p>\n		</div>    \n	</div>\n', '2020-01-31 14:14:52', '2020-01-31 14:14:52'),
(7, 1, 3, '<div class="pagina">    <div class="barra-titulos">        <div class="unidade-titulo">Estudando na educação a distância no Senac</div>        <div class="borda-titulo"></div>    </div>    <div class="container-fluid conteudo-principal-da-pagina">        <div class="col-md-12">           <h5>Estudando na educação a distância no Senac</h5>               <p>Olá! Seja bem-vindo(a) ao curso <mark>“<strong>Inserir nome do curso</strong>”</mark>!</p>        </div>    </div></div>', '2020-01-31 15:00:41', '2020-01-31 15:00:41');

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa`
--

CREATE TABLE `empresa` (
  `id` int(11) NOT NULL,
  `nome` varchar(512) NOT NULL,
  `logo` varchar(1024) DEFAULT NULL,
  `ativo` tinyint(4) NOT NULL,
  `id_tipo_login` tinyint(4) DEFAULT '1',
  `servidor_ad` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `empresa`
--

INSERT INTO `empresa` (`id`, `nome`, `logo`, `ativo`, `id_tipo_login`, `servidor_ad`) VALUES
(1, 'SENAC SC - SEAD', 'images/61d65338c96dc1f820a6203ae74806e23845d468.png', 1, 1, 'sc.senac.br');

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa_categoria`
--

CREATE TABLE `empresa_categoria` (
  `id` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `descricao` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `empresa_categoria`
--

INSERT INTO `empresa_categoria` (`id`, `id_empresa`, `descricao`) VALUES
(1, 1, 'Aperfeiçoamento'),
(2, 1, 'Qualificação Profissional'),
(3, 1, 'Programas Instrumentais');

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa_cliente`
--

CREATE TABLE `empresa_cliente` (
  `id` int(11) NOT NULL,
  `nome_cliente` varchar(1024) NOT NULL,
  `logo` varchar(512) DEFAULT NULL,
  `ativo` int(11) NOT NULL DEFAULT '1',
  `id_customer` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `empresa_cliente`
--

INSERT INTO `empresa_cliente` (`id`, `nome_cliente`, `logo`, `ativo`, `id_customer`) VALUES
(8, 'Bloomex/Printevo', NULL, 1, 1),
(9, 'DLHouse', NULL, 1, 1),
(10, 'DSJ Sistemas', NULL, 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa_etapa_projeto`
--

CREATE TABLE `empresa_etapa_projeto` (
  `id` int(11) NOT NULL,
  `id_empresa` int(11) NOT NULL,
  `nome_etapa` varchar(512) NOT NULL,
  `nro_etapa` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `empresa_etapa_projeto`
--

INSERT INTO `empresa_etapa_projeto` (`id`, `id_empresa`, `nome_etapa`, `nro_etapa`) VALUES
(1, 1, 'Etapa 01 - Elaboração do MD', 1),
(2, 1, 'Etapa 02 - Roteirização', 2),
(3, 1, 'Etapa 03 - Revisão Textual', 3),
(4, 1, 'Etapa 05 - Diagramação', 5),
(5, 1, 'Etapa 06 - Validação Interna', 6),
(6, 1, 'Etapa 07 - Incorporação da Validação Interna', 7),
(7, 1, 'Etapa 08 - Entrega do Curso', 8);

-- --------------------------------------------------------

--
-- Estrutura da tabela `empresa_prioridade`
--

CREATE TABLE `empresa_prioridade` (
  `id` int(11) NOT NULL,
  `nome` varchar(256) DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `empresa_prioridade`
--

INSERT INTO `empresa_prioridade` (`id`, `nome`, `ativo`) VALUES
(1, 'Baixa', 1),
(2, 'Normal', 1),
(3, 'Alta', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `financeiro_entrada`
--

CREATE TABLE `financeiro_entrada` (
  `id` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `id_projeto` int(11) NOT NULL,
  `valor_pago` double NOT NULL,
  `data_recebimento` datetime NOT NULL,
  `id_conta` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupo`
--

CREATE TABLE `grupo` (
  `id` int(11) NOT NULL,
  `nome` varchar(512) NOT NULL,
  `logo` varchar(1024) NOT NULL,
  `ativo` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `grupo`
--

INSERT INTO `grupo` (`id`, `nome`, `logo`, `ativo`) VALUES
(1, 'SENAC EAD', 'assets/img/logo_senac.png', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `grupo_projetos`
--

CREATE TABLE `grupo_projetos` (
  `id` int(11) NOT NULL,
  `nome` varchar(1024) NOT NULL,
  `id_uc1` int(11) NOT NULL,
  `id_uc2` int(11) DEFAULT NULL,
  `id_uc3` int(11) DEFAULT NULL,
  `status` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `grupo_projetos`
--

INSERT INTO `grupo_projetos` (`id`, `nome`, `id_uc1`, `id_uc2`, `id_uc3`, `status`) VALUES
(1, 'Garçom', 694939, 713798, 713800, 0),
(2, 'Assistente de Recursos Humanos', 598221, 680661, 680680, 0),
(3, 'Gestão de E-Commerce', 2420647, NULL, NULL, 0),
(4, 'Geografia Turística da Europa', 1722098, NULL, NULL, 0),
(5, 'Consultoria de viagens: estratégias de atendimento e vendas', 2043415, NULL, NULL, 0),
(6, 'Planejamento da Sustentabilidade Organizacional', 1801887, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `pastas`
--

CREATE TABLE `pastas` (
  `id` int(20) NOT NULL,
  `titulo` varchar(512) NOT NULL,
  `created_at` datetime NOT NULL,
  `id_pai` int(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto`
--

CREATE TABLE `projeto` (
  `id` int(11) NOT NULL,
  `nome` varchar(1024) NOT NULL,
  `descricao` longtext,
  `id_situacao` int(11) NOT NULL,
  `id_tipo_projeto` int(11) NOT NULL,
  `id_pasta` int(11) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `categoria` mediumtext,
  `id_prioridade` int(11) DEFAULT NULL,
  `inicio_estimado` date DEFAULT NULL,
  `termino_estimado` date DEFAULT NULL,
  `inicio_real` date DEFAULT NULL,
  `termino_real` date DEFAULT NULL,
  `indicador_prazo` int(11) DEFAULT NULL,
  `dias_atraso` int(11) DEFAULT NULL,
  `esforco_estimado` int(11) DEFAULT NULL,
  `esforco_atual` int(11) DEFAULT NULL,
  `esforco_completo_perc` float DEFAULT NULL,
  `indicador_esforco` int(11) DEFAULT NULL,
  `percentual_completo` float DEFAULT NULL,
  `receita_estimada` double DEFAULT NULL,
  `receita_real` double DEFAULT NULL,
  `custo_estimado` double DEFAULT NULL,
  `custo_real` double DEFAULT NULL,
  `margem_estimada` double DEFAULT NULL,
  `margem_real` double DEFAULT NULL,
  `criado_em` datetime DEFAULT NULL,
  `atualizado_em` datetime DEFAULT NULL,
  `id_proprietario` int(11) DEFAULT NULL,
  `id_responsavel` int(11) DEFAULT NULL,
  `replanejamentos` int(11) DEFAULT NULL,
  `ch` varchar(50) DEFAULT NULL,
  `po` varchar(10) DEFAULT NULL,
  `id_empresa` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `projeto`
--

INSERT INTO `projeto` (`id`, `nome`, `descricao`, `id_situacao`, `id_tipo_projeto`, `id_pasta`, `id_cliente`, `categoria`, `id_prioridade`, `inicio_estimado`, `termino_estimado`, `inicio_real`, `termino_real`, `indicador_prazo`, `dias_atraso`, `esforco_estimado`, `esforco_atual`, `esforco_completo_perc`, `indicador_esforco`, `percentual_completo`, `receita_estimada`, `receita_real`, `custo_estimado`, `custo_real`, `margem_estimada`, `margem_real`, `criado_em`, `atualizado_em`, `id_proprietario`, `id_responsavel`, `replanejamentos`, `ch`, `po`, `id_empresa`) VALUES
(1, 'Atualização Sistema PrintEVO', NULL, 3, 5, NULL, 8, '1', 2, '2021-11-01', '2021-12-31', '2021-11-01', '2021-12-31', 1, NULL, 400, 14, 2, NULL, 2.67, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, 1),
(3, 'Marketplace', NULL, 1, 5, NULL, 9, '1', 1, '2021-11-01', '2022-05-31', NULL, NULL, NULL, NULL, 1000, 13, 0, NULL, 1.29, 0, 0, 0, 0, NULL, NULL, NULL, NULL, 2, NULL, NULL, NULL, NULL, 1),
(4, 'Desenvolvimento Painel', '<p><h1>Teste</h1></p>', 2, 5, NULL, 10, '1', 3, '2023-04-10', '2023-05-31', '2023-04-11', NULL, NULL, NULL, 800, 16, NULL, NULL, 2, 40000, 0, 20000, 500, 50, NULL, '2023-04-12 11:25:54', '2023-04-12 11:25:54', 2, NULL, NULL, NULL, NULL, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_atividade`
--

CREATE TABLE `projeto_atividade` (
  `id` int(11) NOT NULL,
  `id_projeto` int(11) DEFAULT NULL,
  `titulo` varchar(1024) NOT NULL,
  `descricao` longtext,
  `etapa` int(11) DEFAULT NULL,
  `subetapa` int(11) DEFAULT NULL,
  `inicio_estimado` date DEFAULT NULL,
  `termino_estimado` date DEFAULT NULL,
  `inicio_real` date DEFAULT NULL,
  `termino_real` date DEFAULT NULL,
  `indicador_prazo` int(11) DEFAULT NULL,
  `id_status_atividade` int(11) DEFAULT NULL,
  `esforco_estimado` float DEFAULT NULL,
  `esforco_atual` float DEFAULT NULL,
  `esforco_completo_perc` float DEFAULT NULL,
  `indicador_esforco` int(11) DEFAULT NULL,
  `id_responsavel` int(11) NOT NULL,
  `id_criado_por` int(11) DEFAULT NULL,
  `replanejamentos` int(11) DEFAULT NULL,
  `criado_em` datetime DEFAULT NULL,
  `atualizado_em` datetime DEFAULT NULL,
  `solicitante` varchar(1024) DEFAULT NULL,
  `tipo_atividade` varchar(1024) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `projeto_atividade`
--

INSERT INTO `projeto_atividade` (`id`, `id_projeto`, `titulo`, `descricao`, `etapa`, `subetapa`, `inicio_estimado`, `termino_estimado`, `inicio_real`, `termino_real`, `indicador_prazo`, `id_status_atividade`, `esforco_estimado`, `esforco_atual`, `esforco_completo_perc`, `indicador_esforco`, `id_responsavel`, `id_criado_por`, `replanejamentos`, `criado_em`, `atualizado_em`, `solicitante`, `tipo_atividade`) VALUES
(1, 1, 'Desenvolvimento Backend em Node.js', 'Desenvolvimento Backend em Node.js', NULL, NULL, '2021-11-01', '2021-12-15', '2021-11-01', NULL, NULL, 0, 300, 12, 4, NULL, 2, 2, NULL, '2021-11-03 10:40:55', '2021-11-03 10:40:55', NULL, NULL),
(4, 1, 'Desenvolvimento FrontEnd em AngularJS', NULL, NULL, NULL, '2021-11-16', '2021-12-31', NULL, NULL, NULL, 0, 150, 2.02, 1.34667, NULL, 2, 2, NULL, NULL, NULL, NULL, NULL),
(5, 3, 'Desenvolvimento MArketplace estilo Mercado Livre utilizando AngularJS + NodeJS', NULL, NULL, NULL, '2021-11-01', '2022-05-31', NULL, NULL, NULL, 0, 1000, 8, 0.8, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 3, 'Ajustes site DLHouse', NULL, NULL, NULL, '2021-10-01', '2022-05-31', NULL, NULL, NULL, 0, 500, 0, 0, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 3, 'Desenvolvimento Front End', NULL, NULL, NULL, '2023-04-11', '2023-04-30', NULL, NULL, NULL, 0, 115, 3, 2.6087, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL),
(8, 3, 'Desenvolvimento Back End', NULL, NULL, NULL, '2023-04-11', '2023-04-30', NULL, NULL, NULL, 0, 115, 2, 1.73913, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL),
(9, 4, 'Desenvolvimento Front End', NULL, 1, NULL, '2023-04-11', '2023-05-01', NULL, NULL, NULL, 0, 400, 16, 4, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 4, 'Desenvolvimento BackEnd', NULL, 2, NULL, '2023-05-02', '2023-05-31', NULL, NULL, NULL, 0, 400, 0, 0, NULL, 2, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_atividade_apontamento`
--

CREATE TABLE `projeto_atividade_apontamento` (
  `id` int(11) NOT NULL,
  `id_atividade` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `esforco` float DEFAULT NULL,
  `data_apontamento` date DEFAULT NULL,
  `criado_em` datetime DEFAULT NULL,
  `atualizado_em` datetime DEFAULT NULL,
  `observacao` varchar(2048) DEFAULT NULL,
  `pago` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `projeto_atividade_apontamento`
--

INSERT INTO `projeto_atividade_apontamento` (`id`, `id_atividade`, `id_usuario`, `esforco`, `data_apontamento`, `criado_em`, `atualizado_em`, `observacao`, `pago`) VALUES
(1, 1, 2, 3, '2021-11-02', '2021-11-05 12:14:01', '2021-11-05 12:14:01', NULL, 0),
(2, 1, 2, 2, '2021-11-03', '2021-11-05 12:14:12', '2021-11-05 12:14:12', NULL, 0),
(3, 1, 2, 2.5, '2021-11-04', '2021-11-05 12:14:21', '2021-11-05 12:14:21', NULL, 0),
(4, 1, 2, 3, '2021-11-05', '2021-11-05 12:14:28', '2021-11-05 12:14:28', NULL, 0),
(5, 5, 2, 8, '2021-11-01', '2021-11-05 12:15:24', '2021-11-05 12:15:24', NULL, 0),
(6, 1, 2, 1.5, '2021-11-07', '2021-11-09 11:36:57', '2021-11-09 11:36:57', NULL, 0),
(7, 4, 2, 0.02, '2022-05-12', '2022-05-12 10:39:48', '2022-05-12 10:39:48', NULL, 0),
(8, 4, 2, 2, '2022-05-12', '2022-05-12 10:40:18', '2022-05-12 10:40:18', NULL, 0),
(9, 7, 2, 3, '2023-04-11', '2023-04-11 21:50:30', '2023-04-11 21:50:30', NULL, 0),
(10, 8, 2, 2, '2023-04-11', '2023-04-11 21:51:31', '2023-04-11 21:51:31', NULL, 0),
(11, 9, 2, 5, '2023-04-11', '2023-04-12 11:30:01', '2023-04-12 11:30:01', NULL, 0),
(12, 9, 2, 5, '2023-04-12', '2023-04-12 16:18:28', '2023-04-12 16:18:28', 'Teste', 0),
(13, 9, 2, 1, '2023-04-10', '2023-04-12 16:21:05', '2023-04-12 16:21:05', 'teste 1', 0),
(14, 9, 2, 5, '2023-04-17', '2023-04-17 09:00:15', '2023-04-17 09:00:15', NULL, 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_atividade_checklist`
--

CREATE TABLE `projeto_atividade_checklist` (
  `id` int(11) NOT NULL,
  `id_atividade` int(11) NOT NULL,
  `titulo` varchar(1024) DEFAULT NULL,
  `data_cadastro` datetime DEFAULT NULL,
  `concluido` tinyint(4) DEFAULT NULL,
  `prioridade` tinyint(4) DEFAULT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_atividade_comentario`
--

CREATE TABLE `projeto_atividade_comentario` (
  `id` int(11) NOT NULL,
  `id_atividade` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `comentario` longtext,
  `data_cadastro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_atividade_participante`
--

CREATE TABLE `projeto_atividade_participante` (
  `id` int(11) NOT NULL,
  `id_projeto` int(11) NOT NULL,
  `id_atividade` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `data_cadastro` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `projeto_atividade_participante`
--

INSERT INTO `projeto_atividade_participante` (`id`, `id_projeto`, `id_atividade`, `id_usuario`, `data_cadastro`) VALUES
(1, 4, 9, 3, '2023-04-12 14:59:44');

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_comentario`
--

CREATE TABLE `projeto_comentario` (
  `id` int(11) NOT NULL,
  `id_projeto` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `comentario` text NOT NULL,
  `data_cadastro` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_etapa`
--

CREATE TABLE `projeto_etapa` (
  `id` int(11) NOT NULL,
  `nome` varchar(512) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_etapas`
--

CREATE TABLE `projeto_etapas` (
  `id` int(11) NOT NULL,
  `id_projeto` bigint(20) NOT NULL,
  `id_pasta` bigint(20) NOT NULL,
  `nome` varchar(2048) NOT NULL,
  `id_pasta_pai` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_extrainfo`
--

CREATE TABLE `projeto_extrainfo` (
  `id` int(11) NOT NULL,
  `id_projeto` int(11) DEFAULT NULL,
  `responsivo` tinyint(4) DEFAULT NULL,
  `acessibilidade_v` tinyint(4) DEFAULT '0',
  `acessibilidade_a` tinyint(4) DEFAULT '0',
  `id_sequencia` int(11) DEFAULT NULL,
  `status_producao` varchar(512) DEFAULT NULL,
  `classificacao_1` varchar(1024) DEFAULT NULL,
  `id_projeto_pai` int(11) DEFAULT NULL,
  `valor_hora` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `projeto_extrainfo`
--

INSERT INTO `projeto_extrainfo` (`id`, `id_projeto`, `responsivo`, `acessibilidade_v`, `acessibilidade_a`, `id_sequencia`, `status_producao`, `classificacao_1`, `id_projeto_pai`, `valor_hora`) VALUES
(1, 1, 1, 0, 0, NULL, NULL, NULL, NULL, 30),
(3, 3, 1, 0, 0, NULL, NULL, NULL, NULL, 30),
(4, 4, 1, 0, 0, NULL, NULL, NULL, NULL, 30);

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_financeiro`
--

CREATE TABLE `projeto_financeiro` (
  `id` int(11) NOT NULL,
  `id_projeto` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `data_pagamento` date DEFAULT NULL,
  `valor` double DEFAULT NULL,
  `data_cadastro` datetime DEFAULT CURRENT_TIMESTAMP,
  `titulo` varchar(512) DEFAULT NULL,
  `descricao` varchar(1024) DEFAULT NULL,
  `tipo` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `projeto_financeiro`
--

INSERT INTO `projeto_financeiro` (`id`, `id_projeto`, `id_usuario`, `data_pagamento`, `valor`, `data_cadastro`, `titulo`, `descricao`, `tipo`) VALUES
(1, 1, NULL, '2021-11-15', 315, '2021-11-13 09:43:58', 'Pagamento 01', 'Referente aos dias 02/11 a 05/11/2021', 0);

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_financeiro_apontamento`
--

CREATE TABLE `projeto_financeiro_apontamento` (
  `id` int(11) NOT NULL,
  `id_financeiro` int(11) NOT NULL,
  `id_apontamento` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `projeto_financeiro_apontamento`
--

INSERT INTO `projeto_financeiro_apontamento` (`id`, `id_financeiro`, `id_apontamento`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 1, 3),
(4, 1, 4);

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_pai`
--

CREATE TABLE `projeto_pai` (
  `id` int(11) NOT NULL,
  `id_projeto` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_participantes`
--

CREATE TABLE `projeto_participantes` (
  `id` int(11) NOT NULL,
  `id_projeto` int(11) DEFAULT NULL,
  `id_usuario` int(11) DEFAULT NULL,
  `data_inclusao` datetime DEFAULT NULL,
  `ativo` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_sequencia`
--

CREATE TABLE `projeto_sequencia` (
  `id` int(11) NOT NULL,
  `id_projeto` int(11) NOT NULL,
  `id_pai` int(11) NOT NULL,
  `id_sequencia` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_situacao`
--

CREATE TABLE `projeto_situacao` (
  `id` int(11) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `datahora` datetime DEFAULT NULL,
  `id_empresa` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `projeto_situacao`
--

INSERT INTO `projeto_situacao` (`id`, `descricao`, `datahora`, `id_empresa`) VALUES
(1, 'Em Espera', '2020-01-27 17:38:32', 1),
(2, 'Em Produção', '2020-01-27 17:38:33', 1),
(3, 'Finalizado', '2020-01-27 17:38:34', 1),
(4, 'Suspenso', '2020-01-27 17:38:35', 1),
(5, 'Na Fila', '2020-02-04 14:12:40', 1),
(6, 'Planejado', '2020-08-13 11:23:37', 1),
(7, 'Oculto', '2020-08-13 11:24:23', 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_subetapa`
--

CREATE TABLE `projeto_subetapa` (
  `id` int(11) NOT NULL,
  `id_etapa_pai` int(11) NOT NULL,
  `nome` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estrutura da tabela `projeto_tipo`
--

CREATE TABLE `projeto_tipo` (
  `id` int(11) NOT NULL,
  `descricao` varchar(100) DEFAULT NULL,
  `datahora` datetime DEFAULT NULL,
  `id_customer` int(11) NOT NULL DEFAULT '1',
  `ativo` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `projeto_tipo`
--

INSERT INTO `projeto_tipo` (`id`, `descricao`, `datahora`, `id_customer`, `ativo`) VALUES
(1, 'REDE FIC EAD', '2020-01-27 17:20:49', 1, 1),
(2, 'CORPORATIVO', '2020-01-28 15:43:58', 1, 1),
(3, 'DISCIPLINAS 20% EAD', '2020-01-28 15:44:29', 1, 1),
(4, 'EXTRA-PROJETO', '2020-02-06 13:30:26', 1, 0),
(5, 'Desenvolvimento Sistema', '2021-11-03 09:41:58', 1, 1);

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuario`
--

CREATE TABLE `usuario` (
  `id` int(11) NOT NULL,
  `nome` varchar(512) DEFAULT NULL,
  `email` varchar(512) DEFAULT NULL,
  `senha` varchar(1024) DEFAULT NULL,
  `foto` varchar(1024) DEFAULT NULL,
  `id_artia` int(11) DEFAULT NULL,
  `ativo` tinyint(4) DEFAULT NULL,
  `id_empresa` int(11) NOT NULL DEFAULT '1',
  `id_tipo_login` tinyint(4) NOT NULL DEFAULT '1',
  `admin` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Extraindo dados da tabela `usuario`
--

INSERT INTO `usuario` (`id`, `nome`, `email`, `senha`, `foto`, `id_artia`, `ativo`, `id_empresa`, `id_tipo_login`, `admin`) VALUES
(1, 'Alessandro Machado', 'alessandro.machado@sc.senac.br', 'eefaf3f2804e33cf61edc2fac03c5a9eb9e1bd55', 'assets/img/users/alessandro_machado.jpg', 36137, 0, 1, 1, 1),
(2, 'Dilson Sordi Junior', 'dilson@sc.senac.br', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'uploads/photos/64d64b2b3369ff506206a0ae1f206ab3171d1afe.png', 79599, 1, 1, 2, 1),
(3, 'Cristian Scheffel Biacchi', 'csbiacchi@sc.senac.br', NULL, 'https://moodle.sc.senac.br/FTP/Projetos/assets/img/users/cristian_scheffel_biacchi.jpg', 5759, 1, 1, 1, 1),
(4, 'Marcelo Neri da Silva', 'marcelo.silva@sc.senac.br', NULL, 'assets/img/users/marcelo_neri_da_silva.jpg', 39550, 1, 1, 1, 1),
(5, 'Adiles Ana Bof', 'adiles@prof.sc.senac.br', NULL, 'assets/img/users/adiles_ana_bof.jpg', 31401, 0, 1, 1, 0),
(6, 'Alexandre Prazeres', 'alexandre.prazeres@sc.senac.br', NULL, NULL, 18884, 0, 1, 1, 0),
(7, 'Aline Mariê Tatara Hundensky', 'aline.tatara@sc.senac.br', NULL, 'assets/img/users/aline_marie_tatara_hundensky.jpg', 22551, 1, 1, 1, 0),
(8, 'Ana Cláudia Taú', 'ana.tau@prof.sc.senac.br', NULL, 'assets/img/users/ana_claudia_tau.jpg', 39479, 0, 1, 1, 0),
(9, 'Ana Cristina Nunes Gomes', 'ana.muller@prof.sc.senac.br', NULL, 'assets/img/users/ana_cristina_nunes_gomes.jpg', 31400, 0, 1, 1, 0),
(10, 'Ana Paula Budde', 'ana.budde@prof.sc.senac.br', NULL, 'assets/img/users/ana_paula_budde.jpg', 18545, 0, 1, 1, 0),
(11, 'Ana Paula Netto Carneiro', 'anacarneiro@sc.senac.br', NULL, 'assets/img/users/ana_paula_netto_carneiro.jpg', 10613, 0, 1, 1, 0),
(12, 'Anderson Luis Vicente', 'anderson.vicente@sc.senac.br', NULL, 'assets/img/users/anderson_luis_vicente.jpg', 9586, 0, 1, 1, 0),
(13, 'Andreza Gonçalves de Freitas', 'andreza@prof.sc.senac.br', NULL, 'assets/img/users/andreza_goncalves_de_freitas.jpg', 32285, 0, 1, 1, 0),
(14, 'Anelise Thaler', 'anelise.thaler@sc.senac.br', NULL, NULL, 119567, 0, 1, 1, 0),
(15, 'Ariana Elizabete', 'ariana.silva@prof.sc.senac.br', NULL, 'assets/img/users/ariana_elizabete.jpg', 19630, 0, 1, 1, 0),
(17, 'Arthur Henrique Piccoli da Silva Chaves', 'arthur.chaves@sc.senac.br', NULL, 'assets/img/users/arthur_henrique_piccoli_da_silva_chaves.jpg', 24873, 0, 1, 1, 0),
(18, 'Bianca Filgueira', 'bianca.filgueira@sc.senac.br', NULL, 'assets/img/users/bianca_filgueira.jpg', 75798, 0, 1, 1, 0),
(19, 'Fernanda Luisa da Costa França', 'fernanda.franca@prof.sc.senac.br', NULL, NULL, 15452, 0, 1, 1, 0),
(20, 'Caroline Batista Nunes Silva', 'caroline.silva@edu.sc.senac.br', NULL, 'assets/img/users/caroline_batista_nunes_silva.jpg', 102514, 0, 1, 1, 0),
(21, 'Cassiana Mendonça Pottmaier', 'cassiana@prof.sc.senac.br', NULL, 'assets/img/users/cassiana_mendonca_pottmaier.jpg', 30958, 0, 1, 1, 0),
(22, 'Cassiana Mendonça Pottmaier', 'cassianamp@gmail.com', NULL, 'assets/img/users/cassiana_mendonca_pottmaier.jpg', 123960, 0, 1, 1, 0),
(23, 'Cheila P. Zorzan', 'cheila@prof.sc.senac.br', NULL, 'assets/img/users/cheila_p._zorzan.jpg', 34788, 0, 1, 1, 0),
(24, 'Cintia de Souza Lopes', 'cintia.lopes@sc.senac.br', NULL, NULL, 19538, 0, 1, 1, 0),
(25, 'Clayre Montes', 'clayre.montes@sc.senac.br', NULL, 'assets/img/users/clayre_montes.jpg', 151146, 0, 1, 1, 0),
(26, 'Daiana Ferreira Cassanego', 'daiana.ferreira@sc.senac.br', NULL, 'assets/img/users/daiana_ferreira_cassanego.jpg', 35671, 1, 1, 1, 0),
(30, 'Gessica Lehmkuhl', 'gessica@sc.senac.br', NULL, NULL, 40152, 0, 1, 1, 0),
(33, 'Eduardo Drachinski', 'eduardo.drachinski@prof.sc.senac.br', NULL, NULL, 40733, 0, 1, 1, 0),
(36, 'Daniel Priori', 'daniel.priori@prof.sc.senac.br', NULL, NULL, 35323, 0, 1, 1, 0),
(39, 'Jordana Paula Schulka', 'jordana@sc.senac.br', NULL, 'assets/img/users/jordana_paula_schulka.jpg', 40074, 0, 1, 1, 0),
(41, 'João Olívio Neto', 'joao.neto@sc.senac.br', NULL, NULL, 45146, 0, 1, 1, 0),
(43, 'Gabriela Todeschini Lucas', 'gabriela.lucas@prof.sc.senac.br', NULL, NULL, 43187, 0, 1, 1, 0),
(44, 'Denis Diniz', 'denis.diniz@sc.senac.br', NULL, NULL, 46111, 0, 1, 1, 0),
(45, 'Fernando Soares', 'fernando.soares@edu.sc.senac.br', NULL, NULL, 19628, 0, 1, 1, 0),
(46, 'Francielli de Paula', 'francielli.paula@sc.senac.br', NULL, 'assets/img/users/francielli_de_paula.jpg', 32774, 1, 1, 1, 0),
(47, 'Grasiela Mafra', 'grasiela@sc.senac.br', NULL, 'assets/img/users/grasiela_mafra.jpg', 17339, 1, 1, 1, 1),
(49, 'Daniel Ricardo Binda', 'daniel.binda@sc.senac.br', NULL, NULL, 61276, 1, 1, 1, 0),
(50, 'Erica da Silva Martins Valduga', 'erica.valduga@edu.sc.senac.br', NULL, NULL, 32306, 0, 1, 1, 0),
(57, 'Fernanda França', 'fernanda.franca@sc.senac.br', NULL, NULL, 87885, 0, 1, 1, 0),
(58, 'Evelin Bao', 'evelin.bao@sc.senac.br', NULL, 'assets/img/users/evelin_bao.jpg', 88256, 0, 1, 1, 0),
(59, 'Fabianne Christina Marim', 'fabianne@sc.senac.br', NULL, NULL, 24872, 0, 1, 1, 0),
(60, 'Francine Medeiros Vieira', 'francine@prof.sc.senac.br', NULL, NULL, 30964, 0, 1, 1, 0),
(61, 'Gabriela De Leon Nóbrega Reses', 'gabriela@prof.sc.senac.br', NULL, NULL, 15460, 0, 1, 1, 0),
(62, 'Ingrid Souto', 'ingrid@prof.sc.senac.br', NULL, NULL, 31584, 0, 1, 1, 0),
(63, 'Isis Vieira da Silva', 'isis@prof.sc.senac.br', NULL, 'assets/img/users/isis_vieira_da_silva.jpg', 19503, 0, 1, 1, 0),
(64, 'Josiane de Freitas', 'josiane.freitas@prof.sc.senac.br', NULL, NULL, 33128, 0, 1, 1, 0),
(65, 'João Pedro Benin Gehm', 'joao.gehm@sc.senac.br', NULL, 'assets/img/users/joao_pedro_benin_gehm.jpg', 93826, 0, 1, 1, 0),
(66, 'Lidiane Goedert', 'lidiane@sc.senac.br', NULL, NULL, 31403, 0, 1, 1, 0),
(67, 'Luiz Soutes', 'luiz.soutes@prof.sc.senac.br', NULL, NULL, 33393, 0, 1, 1, 0),
(68, 'Lúcia Izabel dos Santos Telexa', 'lucia.tele@sc.senac.br', NULL, 'assets/img/users/lucia_izabel_dos_santos_telexa.jpg', 83211, 0, 1, 1, 0),
(70, 'Mariana Vidal', 'mariana.vidal@prof.sc.senac.br', NULL, NULL, 33392, 0, 1, 1, 0),
(71, 'Marlete Vieira', 'marlete@prof.sc.senac.br', NULL, NULL, 18887, 0, 1, 1, 0),
(72, 'Mateus Ramon Falk Ramalho', 'mateus.ramalho@sc.senac.br', NULL, NULL, 70998, 0, 1, 1, 0),
(73, 'Maíra Marques de Oliveira', 'maira.oliveira@sc.senac.br', NULL, 'assets/img/users/maira_marques_de_oliveira.jpg', 71146, 1, 1, 1, 0),
(74, 'Patrícia Barcelos', 'patibmj@yahoo.com.br', NULL, NULL, 132997, 0, 1, 1, 0),
(75, 'Paula Baretto Barbosa Trivella', 'paula.trivella@prof.sc.senac.br', NULL, NULL, 31402, 0, 1, 1, 0),
(76, 'Rafael Vieira Cabral', 'cabral@sc.senac.br', NULL, NULL, 34610, 0, 1, 1, 0),
(77, 'Raony Rhomberg', 'raony.monteiro@prof.sc.senac.br', NULL, NULL, 36133, 0, 1, 1, 0),
(78, 'Raquel Darelli', 'raquel.darelli@prof.sc.senac.br', NULL, NULL, 33103, 0, 1, 1, 0),
(79, 'Raquel Gularte Queiroz', 'raquel.queiroz@sc.senac.br', NULL, NULL, 9666, 0, 1, 1, 0),
(80, 'Renan Felipe Cascaes', 'renan.cascaes@sc.senac.br', NULL, 'assets/img/users/renan_felipe_cascaes.jpg', 35670, 1, 1, 1, 0),
(81, 'Renata Batista Garcia Fernandes', 'renata.fernandes@sc.senac.br', 'eefaf3f2804e33cf61edc2fac03c5a9eb9e1bd55', 'assets/img/users/renata_batista_garcia_fernandes.jpg', 19295, 1, 1, 2, 1),
(82, 'Responsável CNC', 'leonardofonseca@cnc.org.br', NULL, NULL, 60043, 0, 1, 1, 0),
(83, 'Ricardo Alexsander Branco', 'ricardo.branco@sc.senac.br', NULL, 'assets/img/users/ricardo_alexsander_branco.jpg', 77825, 1, 1, 1, 0),
(84, 'Tiago Kawata', 'tiago.kawata@sc.senac.br', NULL, NULL, 89243, 0, 1, 1, 0),
(85, 'Vivian Staroski', 'vivian.staroski@edu.sc.senac.br', NULL, NULL, 115479, 0, 1, 1, 0),
(86, 'Daniela Viviani', 'daniela.viviani@sc.senac.br', NULL, 'assets/img/users/daniela_viviani.jpg', 168159, 0, 1, 1, 0),
(87, 'Simoni Alexandre', 'simoni@sc.senac.br', NULL, 'assets/img/users/simoni_alexandre.jpg', 167971, 0, 1, 1, 0),
(88, 'Denis Pacher', 'denis.pacher@sc.senac.br', NULL, 'assets/img/users/denis_pacher.jpg', 158257, 0, 1, 1, 0),
(89, 'Adriana Ferreira dos Santos', 'adriana.ferreira@sc.senac.br', NULL, 'assets/img/users/image_2020_12_09T17_26_02_254Z.png', 179614, 1, 1, 1, 0),
(90, 'Test Usesr', 'test@gmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, NULL, 1, 1, 2, 0),
(95, 'Test Usesr2', 'test2@gmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', NULL, NULL, 0, 1, 2, 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `atividade_situacao`
--
ALTER TABLE `atividade_situacao`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `controle_conteudo`
--
ALTER TABLE `controle_conteudo`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_pagina_curso` (`id_curso`,`pagina`);

--
-- Indexes for table `empresa`
--
ALTER TABLE `empresa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `empresa_categoria`
--
ALTER TABLE `empresa_categoria`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `empresa_cliente`
--
ALTER TABLE `empresa_cliente`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `empresa_etapa_projeto`
--
ALTER TABLE `empresa_etapa_projeto`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `empresa_prioridade`
--
ALTER TABLE `empresa_prioridade`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `financeiro_entrada`
--
ALTER TABLE `financeiro_entrada`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grupo`
--
ALTER TABLE `grupo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `grupo_projetos`
--
ALTER TABLE `grupo_projetos`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pastas`
--
ALTER TABLE `pastas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pai` (`id_pai`),
  ADD KEY `titulo` (`titulo`(255));

--
-- Indexes for table `projeto`
--
ALTER TABLE `projeto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_situacao` (`id_situacao`),
  ADD KEY `id_pasta` (`id_pasta`),
  ADD KEY `po` (`po`),
  ADD KEY `id_responsavel` (`id_responsavel`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indexes for table `projeto_atividade`
--
ALTER TABLE `projeto_atividade`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_projeto` (`id_projeto`),
  ADD KEY `etapa` (`etapa`),
  ADD KEY `subetapa` (`subetapa`),
  ADD KEY `id_status_atividade` (`id_status_atividade`),
  ADD KEY `id_projeto_2` (`id_projeto`),
  ADD KEY `etapa_2` (`etapa`),
  ADD KEY `id_responsavel` (`id_responsavel`),
  ADD KEY `criado_em` (`criado_em`);

--
-- Indexes for table `projeto_atividade_apontamento`
--
ALTER TABLE `projeto_atividade_apontamento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projeto_atividade_participante`
--
ALTER TABLE `projeto_atividade_participante`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_projeto` (`id_projeto`),
  ADD KEY `id_atividade` (`id_atividade`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indexes for table `projeto_comentario`
--
ALTER TABLE `projeto_comentario`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projeto_etapas`
--
ALTER TABLE `projeto_etapas`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unq_etapas` (`id_projeto`,`id_pasta`);

--
-- Indexes for table `projeto_extrainfo`
--
ALTER TABLE `projeto_extrainfo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projeto_financeiro`
--
ALTER TABLE `projeto_financeiro`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projeto_financeiro_apontamento`
--
ALTER TABLE `projeto_financeiro_apontamento`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projeto_pai`
--
ALTER TABLE `projeto_pai`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projeto_sequencia`
--
ALTER TABLE `projeto_sequencia`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projeto_situacao`
--
ALTER TABLE `projeto_situacao`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projeto_tipo`
--
ALTER TABLE `projeto_tipo`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_artia` (`id_artia`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `atividade_situacao`
--
ALTER TABLE `atividade_situacao`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `controle_conteudo`
--
ALTER TABLE `controle_conteudo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;
--
-- AUTO_INCREMENT for table `empresa`
--
ALTER TABLE `empresa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `empresa_categoria`
--
ALTER TABLE `empresa_categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `empresa_cliente`
--
ALTER TABLE `empresa_cliente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `empresa_prioridade`
--
ALTER TABLE `empresa_prioridade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `financeiro_entrada`
--
ALTER TABLE `financeiro_entrada`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `pastas`
--
ALTER TABLE `pastas`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `projeto`
--
ALTER TABLE `projeto`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `projeto_atividade`
--
ALTER TABLE `projeto_atividade`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
--
-- AUTO_INCREMENT for table `projeto_atividade_apontamento`
--
ALTER TABLE `projeto_atividade_apontamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;
--
-- AUTO_INCREMENT for table `projeto_atividade_participante`
--
ALTER TABLE `projeto_atividade_participante`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `projeto_comentario`
--
ALTER TABLE `projeto_comentario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `projeto_etapas`
--
ALTER TABLE `projeto_etapas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `projeto_extrainfo`
--
ALTER TABLE `projeto_extrainfo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `projeto_financeiro`
--
ALTER TABLE `projeto_financeiro`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
--
-- AUTO_INCREMENT for table `projeto_financeiro_apontamento`
--
ALTER TABLE `projeto_financeiro_apontamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT for table `projeto_pai`
--
ALTER TABLE `projeto_pai`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `projeto_sequencia`
--
ALTER TABLE `projeto_sequencia`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `projeto_tipo`
--
ALTER TABLE `projeto_tipo`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=96;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


create table financas_contas_pagar (
	id int primary key auto_increment,
	titulo varchar(512) not null,
	valor double not null,
	data_vencto date not null,
	forma_pagamento int,
	pago tinyint default 0 not null,
  id_customer int not null
);
   
create table financas_contas_receber (
	id int primary key auto_increment,
	titulo varchar(512) not null,
	valor double not null,
	data_vencto date not null,
	forma_pagamento int,
	pago tinyint default 0 not null,
	id_customer int not null
);