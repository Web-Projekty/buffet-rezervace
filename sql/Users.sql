-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Mar 23, 2025 at 03:13 PM
-- Server version: 10.5.28-MariaDB-0+deb11u1
-- PHP Version: 8.2.27

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `buffet`
--

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `id` int(11) UNSIGNED NOT NULL,
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  `fullName` varchar(64) DEFAULT NULL,
  `email` varchar(64) DEFAULT NULL,
  `class` varchar(5) DEFAULT NULL,
  `tel` varchar(64) DEFAULT NULL,
  `credits` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `username`, `password`, `isAdmin`, `fullName`, `email`, `class`, `tel`, `credits`) VALUES
(3, 'admin2', '$2y$10$U8xz2ZP2Icqoyax0IsyHbuS4C5bDKFC1rAcoRNlIOKLe.5iN6CBSm', 0, '0', '0', '0', NULL, 0),
(4, 'admin3', '$2y$10$2IXoBxhJA77UszDSZQqCwO9I/Ra7ulio0XFf43fdeMw/75iVu42pO', 0, '0', '0', '0', NULL, 0),
(5, 'admin4', '$2y$10$Mz6BwxbHiGgUBfNsYHw0Bu4biWQ.0sF1DWNOspdAjWjJQZjABQH2C', 0, '0', '0', NULL, NULL, 0),
(6, 'user4', '$2y$10$.qm8EaBR/xbYBMS7qBdelOrB1ZWH94iRwro9eyy..I8b4L8Pttcxi', 0, 'Jonáš Eduard', 'mailo@doge.gov', '2.Y', '545641231', 655115656),
(7, 'admin', '$2y$10$tK.5Q2ilDw6c0FaubgUaguKa.g4goIgJ9XZ2XuUuUvtHKNIwYR3gG', 1, 'Pepa Novák', 'novak@spseplzen.cz', 'admin', '123156465', 0),
(19, 'user5', '$2y$10$UhANRxQ.d3rb.VPYYTL9XO4wqfG7KQzfDSszEBuh3XDiMr6bg/GdO', 0, 'a', 'b', 'c', NULL, 0),
(20, 'user6', '$2y$10$7G6a6ufndG4Pals9t94BR.uHk16mIH3pRHTDXWsmZcxlYoxAsnakS', 0, 'c', 'd', 'e', NULL, 0),
(25, 'user4df', '$2y$10$BlTadJHWJk9TEzSIl1VXYezOxbb95crDAHa1wIX1KJKQGUy./NDiO', 0, 'idk', 'default@spseplzen.cz', '5.H', NULL, 0),
(26, 'dfa', '$2y$10$yesn4RxklyRvXv7x0JkxO.w/77ib83zXKtviUN./6yRNzd8qft6k.', 0, 'idk', 'default@spseplzen.cz', '5.H', NULL, 0),
(27, 'Oreki', '$2y$10$2O2qcefsYVf.tZ90/MntPOu3yi5y0jLCEhVMYeHUGJcGXbzGzo75q', 0, 'idk', 'default@spseplzen.cz', '5.H', NULL, 0),
(28, 'Hello', '$2y$10$MU7FgHfnJLdXOBQBE4UoWOnwtBMheqZ2m5OIXKbeIXikVLh.xLVRW', 0, 'idk', 'default@spseplzen.cz', '5.H', NULL, 0),
(29, 'lembaj', '$2y$10$qXrgeLp74tEoTLZOBPZxledUCUaHBvp37VyVEXU7whbQPJI2DPtqe', 0, 'idk', 'default@spseplzen.cz', '5.H', NULL, 0),
(30, 'user16', '$2y$10$pFc46onFpdZAl9xbxBnlluYtVLHJBOTxM7h3oSTWLJjmzr7Hs7EL6', 0, 'Wlczak', 'mail@mail.mail', NULL, NULL, 0),
(31, 'user166', '$2y$10$x8UE2KEaryN2GNS3WC.3fucm9GMXzCV1oPSH3WckRgkSJnta4KdZK', 0, 'Wlczak', 'mail@mail.mails', NULL, NULL, 0),
(32, 'user1661', '$2y$10$SIHlgDggX2P/Vu18uSlit.JvxFvXLti6.zw8ZDz.bLWlXVkEVFaEW', 0, 'Wlczak', 'mail@mail.mailso', NULL, NULL, 0),
(33, 'user1661a', '$2y$10$hrDLXr31a1SzdbIetYpTduVCDDzUzs0nqJVckuA29OxoZL1LmaaUG', 0, 'Wlczak', 'mail@mail.mailsos', NULL, '785589695', 0),
(34, 'user48', '$2y$10$3KPYhx0krLpvSlYtnEaCZO27DYl6IxU90HUTDrsBMFXi4ZviNqd9u', 0, 'as', 'dv@d.c', NULL, '', 0),
(35, 'user48s', '$2y$10$/n3dYYjBvLWPuIF/OjWEqex7tRhgmS2fHsyuA8wIgdP2H.sGP7vBa', 0, 'as', 'sdv@d.c', NULL, '', 0),
(36, '123', '$2y$10$kXHXX.748NoKfYmozJ2CTOa5zYtH5PejNcAhZJ35PD5F/7W0bYxI6', 0, '1132', 'e@e.e', NULL, '', 0),
(37, 's', '$2y$10$a7a3gGw9.ogMJ70VYaTIbu4.f3287cR/JunCE6rRievtCx6fUg86W', 0, 's', 's@e.d', NULL, '', 0),
(38, 'asd', '$2y$10$HrYTE448w8Mb5anS5M90MecS3afCbZCACTYVhf.HrmTvdisp44FvG', 0, 'asd', 'asd@as.c', NULL, '2', 0),
(39, 'asds', '$2y$10$BZJmv1qbujiyw6k0A4kOxe78wo3HSpf6a5zXcJjjLHMjVVCe4EvLW', 0, 'assd', 'assd@as.c', NULL, '2', 0),
(40, 'ss', '$2y$10$X1.1ImHFXNFgxsKSsNzOau2xPkT7hy9R6XzIq05Wy3VVnJb4nQ8fe', 0, 's', 's@e.sd', NULL, '', 0),
(41, 'asdasdasd', '$2y$10$CZ/ihJkzvr3Z1I35G3C6cO6iVrzzAYlHiBp6G70Xqhca9XySB22sK', 0, 'ad', 'sd@d.c', NULL, '2', 0),
(42, 'asdassdasd', '$2y$10$dfol001Wr7dufYHsREgLiOX471PiJFeKE9zEiD6i01jr/g/G47aY.', 0, 'ads', 'ssd@d.c', NULL, '', 0),
(43, 'assdassdasd', '$2y$10$8fPewIIvUmzXN.kzAcfz7O9dF9gIYJmxMw0bf95vYNwiShs/jFDPa', 0, 'ads', 'ssds@d.c', NULL, NULL, 0),
(44, '156165151566', '$2y$10$QL458nKgf3oOrwlvqYMc3eINMaYYtziB/PsCd3TDRUewChT3Ff6Ey', 0, 'ad15465', 's5d@d.c', NULL, NULL, 0),
(45, 'betatest', '$2y$10$gAoLNU4EDoO8uRfzKYKK2O6CAZC/pORM5tCWihbNiaGIOtwfcjeUG', 0, 'Beta testíček', 'lol@email.ye', NULL, NULL, 0),
(46, 'beta', '$2y$10$3TVLSpJvdXkTjgnn5HiQ5.ftVEo9sCyR8ICIne6raf52kPkeb2QHm', 0, 'Beta Test', 'lol@lol.lol', NULL, '', 0),
(47, 'beta1', '$2y$10$e5iqTFfVYuRvmLc2EjG4Tu6Bm.aQnuocXUcm0zeN6zJVwP9qaW9cC', 0, 'Beta Test', 'lol1@lol.lol', NULL, '', 0),
(48, 'ka', '$2y$10$uLfnAWP5JP/cklJ2AOrJp.AvJGQo0HBRS69u.e4aDBBlUl1GuH/gO', 0, 'asd', 'ka@se.v', NULL, NULL, 0),
(49, 'jj', '$2y$10$zW7ieozNYCKLjAFMr7oYauj3xvSP3ARgsmTXb2NocDOxPw1NuFoa6', 0, 'asd', 'jj@sd.d', NULL, NULL, 0),
(50, 'fda', '$2y$10$WLhTzFtqvydj3gHfKO4qoe31G8J.Po9N7US1RkFFojVgaUdBjHrjW', 0, 'asdf', 'asdf@asdf.fdsa', NULL, NULL, 0),
(51, 'user35', '$2y$10$oPhZbqbeNlFBIWlEhY7ThO0L0a9IcwWDB7Yj9uH/LmfudrgeWy62i', 0, 'jk', 'sjkdfh@sdf.v', NULL, NULL, 0),
(52, 'beta2', '$2y$10$VPcF4jsrVaG5mT867X7X0.dO/QKGDo8Jk6W6qIpd5rtl0sK4R4ulW', 0, 'Beta Test2', 'lol@lol2.lol', NULL, NULL, 0),
(53, 'test', '$2y$10$iye8PnPa3EoJWbeXWt.gMePWIHbfHGE.0g0iCXQNfRzPrU4krjvCa', 0, 'Test', 'test@example.com', NULL, NULL, 0),
(54, 'beta3', '$2y$10$7d8x3h303QSqm/bhaNbDM.NErZ/hw7yqgE4nggNA/AykciYdDIWr.', 0, 'Beta test', 'example3@example.com', NULL, NULL, 0),
(55, 'testing', '$2y$10$dNZ55a6cW9l4ZSCMa8WfzuvJO4F2J81.rbNe4/gmxf7qpRapx.idW', 0, 'Hello There', '1@2.c', NULL, '+123456789012345', 0),
(56, '321asd31321sad321', '$2y$10$H/S39lCtqCbuu/ObyA6rcODXOO7Kad2LhXy7NMFmjOfWKnKfIUKli', 0, 'a2d1321', 's@s.d', NULL, NULL, 0),
(57, 'wlczak', '$2y$10$JpSUCZAIasl4RnluW3JA/.i9O2GWgznjOSX3AoCeM8VOAIdfmixRu', 0, 'Wlczak', 'wlczak@vlastas.cc', NULL, '123456789', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
