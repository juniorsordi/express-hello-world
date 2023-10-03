-- phpMyAdmin SQL Dump
-- version 4.5.4.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: 02-Jun-2021 às 14:48
-- Versão do servidor: 5.7.11
-- PHP Version: 7.2.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sicoob`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `ramais`
--

CREATE TABLE `ramais` (
  `id` int(11) NOT NULL,
  `nome` varchar(512) NOT NULL,
  `ramal` varchar(10) NOT NULL,
  `email` varchar(512) DEFAULT NULL,
  `data_nasc` date DEFAULT NULL,
  `unidade` varchar(256) DEFAULT NULL,
  `setor` varchar(256) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Extraindo dados da tabela `ramais`
--

INSERT INTO `ramais` (`id`, `nome`, `ramal`, `email`, `data_nasc`, `unidade`, `setor`) VALUES
(1, 'Jamila Silva', '220', NULL, NULL, 'Operacional', 'Gerência'),
(2, 'Gabriel', '221', NULL, NULL, 'Operacional', 'Cobrança Adminsitrativa'),
(3, 'Elisandra', '222', NULL, NULL, 'Operacional', 'Cobrança Adminsitrativa'),
(4, 'Aldellin', '223', NULL, NULL, 'Operacional', 'Crédito'),
(5, 'Mayra', '227', NULL, NULL, 'Operacional', 'Crédito'),
(6, 'Rúbia', '228', NULL, NULL, 'Operacional', 'Crédito'),
(7, 'Priscylla', '252', NULL, NULL, 'Operacional', 'Crédito'),
(8, 'Alexandre', '224', NULL, NULL, 'Operacional', 'Cadastro'),
(9, 'Alana', '225', NULL, NULL, 'Operacional', 'Cadastro'),
(10, 'Celina', '226', NULL, NULL, 'Operacional', 'Cadastro'),
(11, 'Aline Teixeira', '234', NULL, NULL, 'Operacional', 'Cadastro'),
(12, 'Ana Karina', '230', NULL, NULL, 'Operacional', 'Produtos'),
(13, 'Viviane', '231', NULL, NULL, 'Operacional', 'Produtos'),
(14, 'Jamila Milchareck', '232', NULL, NULL, 'Operacional', 'Produtos'),
(15, 'Maickon', '233', NULL, NULL, 'Operacional', 'Produtos'),
(16, 'Juliana Santos', '240', NULL, NULL, 'Administrativo', 'Gerência'),
(17, 'Carolina Antunes', '241', NULL, NULL, 'Administrativo', 'Admnistrativo'),
(18, 'Luciana Vilma', '265', NULL, NULL, 'Administrativo', 'Admnistrativo'),
(19, 'Fellipe Ventura', '270', NULL, NULL, 'Administrativo', 'TI'),
(20, 'Deise Nogueira', '244', NULL, NULL, 'Administrativo', 'Comunicação e Marketing'),
(21, 'Daiane', '245', NULL, NULL, 'Administrativo', 'Contabilidade'),
(22, 'Felipe Rodrigues', '246', NULL, NULL, 'Administrativo', 'Financeiro'),
(23, 'Muriel', '243', NULL, NULL, 'Administrativo', 'Tesouraria'),
(24, 'Luciane', '250', NULL, NULL, 'Diretoria', NULL),
(25, 'Jairo', '260', NULL, NULL, 'Diretoria', NULL),
(26, 'Gilmare', '248', NULL, NULL, 'Gestão de Pessoas', NULL),
(27, 'Maria Eduarda', '248', NULL, NULL, 'Gestão de Pessoas', NULL),
(28, 'Gabriela Schmitz', '247', NULL, NULL, 'Controles Internos', NULL),
(29, 'Laura', '210', NULL, NULL, 'SEDE', 'Gerência'),
(30, 'Eduardo', '202', NULL, NULL, 'SEDE', 'Atendimento PJ'),
(31, 'Aline Frasson', '203', NULL, NULL, 'SEDE', 'Atendimento PJ'),
(32, 'Franciele', '204', NULL, NULL, 'SEDE', 'Atendimento PJ'),
(33, 'Andrea', '206', NULL, NULL, 'SEDE', 'Atendimento PF'),
(34, 'Amanda', '207', NULL, NULL, 'SEDE', 'Atendimento PF'),
(35, 'Monique', '208', NULL, NULL, 'SEDE', 'Atendimento PF'),
(36, 'Marina', '209', NULL, NULL, 'SEDE', 'Atendimento PF'),
(37, 'Caroline Calistro', '214', NULL, NULL, 'SEDE', 'Caixa'),
(38, 'Henrique', '214', NULL, NULL, 'SEDE', 'Caixa'),
(39, 'Kátia', '214', NULL, NULL, 'SEDE', 'Caixa'),
(40, 'Conrado', '214', NULL, NULL, 'SEDE', 'Caixa');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `ramais`
--
ALTER TABLE `ramais`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ramais`
--
ALTER TABLE `ramais`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
