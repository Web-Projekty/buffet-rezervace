-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 29, 2025 at 04:34 PM
-- Server version: 11.7.2-MariaDB-ubu2404
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
-- Table structure for table `Allergens`
--

CREATE TABLE `Allergens` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `description` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL DEFAULT 'img/alergens/default.png'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Categories`
--

CREATE TABLE `Categories` (
  `id` int(10) NOT NULL,
  `name` varchar(256) NOT NULL,
  `image` varchar(256) NOT NULL DEFAULT '',
  `description` varchar(1024) NOT NULL,
  `removed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `name`, `image`, `description`, `removed`, `created_at`, `updated_at`) VALUES
(1, 'Fastfood', '', 'Něco rychlého k snědku', 0, NULL, NULL),
(2, 'Vegetariánské', '', 'Zdravá a vyvážená bezmasá strava', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Items`
--

CREATE TABLE `Items` (
  `id` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `price` int(11) NOT NULL,
  `description` varchar(1024) NOT NULL,
  `image` varchar(256) NOT NULL DEFAULT 'img/items/default.png',
  `allergens` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `category` int(11) NOT NULL,
  `removed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Items`
--

INSERT INTO `Items` (`id`, `name`, `price`, `description`, `image`, `allergens`, `category`, `removed`, `created_at`, `updated_at`) VALUES
(1, 'Plněná bageta sýr-šunka', 14990, 'Bageta plněná šunkou a sýrem.', 'img/items/baguette_chicken.png', '[1,2,3]', 1, 1, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'Bageta s kuřecím masem a salátem', 8990, 'Bageta plněná grilovaným kuřecím masem a zeleninou.', 'img/items/baguette_chicken.png', '[1,7,14,11]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(3, 'Sekaná v housce', 6900, 'Domácí sekaná podávaná v čerstvé housce.', 'img/items/meatloaf_bun.png', '[1,2]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(4, 'Bageta Caprese', 8500, 'Bageta s mozzarellou, rajčaty a bazalkovým pestem.', 'img/items/baguette_caprese.png', '[1,7]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(5, 'Tortilla s tuňákem', 9900, 'Plněná tortilla s tuňákem, majonézou a zeleninou.', 'img/items/tuna_tortilla.png', '[1,2]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(6, 'Bageta s trhaným vepřovým', 10900, 'Bageta s trhaným vepřovým masem a BBQ omáčkou.', 'img/items/baguette_pulled_pork.png', '[1,7]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(7, 'Vegetariánská bageta', 7500, 'Bageta s grilovanou zeleninou a hummusem.', 'img/items/baguette_veg.png', '[1]', 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(8, 'Klobása v housce', 5900, 'Grilovaná klobása podávaná v křupavé housce.', 'img/items/sausage_bun.png', '[1,3]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(9, 'Bageta s vejcem a slaninou', 8900, 'Bageta plněná vařeným vejcem, slaninou a dresinkem.', 'img/items/baguette_egg_bacon.png', '[1]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(10, 'Klasický burger', 12900, 'Šťavnatý hovězí burger s čerstvou zeleninou a omáčkou.', 'img/items/burger_classic.png', '[1,3,7]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(11, 'Vegetariánský burger', 11900, 'Burger s grilovaným portobello houbou a zeleninou.', 'img/items/burger_veg.png', '[1]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(12, 'Sendvič s krůtím masem', 8900, 'Sendvič s plátky krůtího masa, salátem a majonézou.', 'img/items/turkey_sandwich.png', '[1,7]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(13, 'Plněná bageta s lososem', 9900, 'Bageta s uzeným lososem a sýrem.', 'img/items/baguette_salmon.png', '[1,4,7]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(14, 'Toast se šunkou a sýrem', 6900, 'Grilovaný toast se šunkou a sýrem.', 'img/items/toast_ham_cheese.png', '[1,7]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(15, 'Bageta s avokádem', 8500, 'Bageta s avokádem, rajčaty a limetkovou majonézou.', 'img/items/baguette_avocado_tomato.png', '[1,7]', 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(16, 'Falafel wrap', 8900, 'Wrap s falafelem, hummusem a čerstvou zeleninou.', 'img/items/falafel_wrap.png', '[1]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(17, 'Párky v rohlíku', 4900, 'Tradiční párek v rohlíku s hořčicí a kečupem.', 'img/items/hotdog.png', '[1,3]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(18, 'Bageta s hovězím roastbeefem', 11500, 'Bageta s tenkými plátky roastbeefu a dijonskou omáčkou.', 'img/items/baguette_roastbeef.png', '[1,7]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(19, 'Tortilla s grilovaným sýrem', 8900, 'Tortilla plněná grilovaným sýrem a zeleninou.', 'img/items/grilled_cheese_tortilla.png', '[1,7]', 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(20, 'Bageta se salámem', 9500, 'Bageta plněná pikantním salámem a čerstvou paprikou.', 'img/items/baguette_spicy_salami.png', '[1,7]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(21, 'Sýrový mlsoun', 8900, 'Sýr Camembert a eidam s plátky vajec a pikantním dresinkem', 'img/items/default.png', '[1]', 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(22, 'Chlebíčkový labužník', 9900, 'Chuť lahůdkových chlebíčků s výběrem salámů na bramborovém salátu', 'img/items/default.png', '[2]', 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(23, 'test', 79000, 'hello', 'img/items/default.png', '[1,7]', 2, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `id` int(11) UNSIGNED NOT NULL,
  `userId` int(11) UNSIGNED NOT NULL,
  `status` enum('sent','preparing','waiting','done','storno','cancelled') NOT NULL,
  `pickupDate` date NOT NULL DEFAULT '0000-00-00',
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `pickUpId` varchar(4) NOT NULL,
  `paymentId` int(11) NOT NULL,
  `dateCreated` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Payments`
--

CREATE TABLE `Payments` (
  `id` int(11) NOT NULL,
  `thePayId` int(11) DEFAULT NULL,
  `type` enum('thePay','cash') NOT NULL,
  `useCredits` bit(1) NOT NULL,
  `totalAmount` int(11) NOT NULL COMMENT 'stored with two decimal places',
  `creditsAmount` int(11) NOT NULL COMMENT 'stored with two decimal places',
  `paid` bit(1) NOT NULL DEFAULT b'0',
  `thePayUrl` varchar(512) DEFAULT NULL,
  `thePayDetailsUrl` varchar(512) DEFAULT NULL,
  `dateCreated` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Temp`
--

CREATE TABLE `Temp` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `orderLimit` int(11) NOT NULL,
  `orderCount` int(11) NOT NULL
) ENGINE=MEMORY DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Timeslots`
--

CREATE TABLE `Timeslots` (
  `id` int(11) NOT NULL,
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `orderLimit` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Timeslots`
--

INSERT INTO `Timeslots` (`id`, `startTime`, `endTime`, `orderLimit`) VALUES
(150402, '08:00:00', '08:05:00', 5),
(150403, '08:05:00', '08:10:00', 5),
(150404, '08:10:00', '08:15:00', 5),
(150405, '08:15:00', '08:20:00', 5),
(150406, '08:20:00', '08:25:00', 5),
(150407, '08:25:00', '08:30:00', 5),
(150408, '08:30:00', '08:35:00', 5),
(150409, '08:35:00', '08:40:00', 5),
(150410, '08:40:00', '08:45:00', 5),
(150411, '08:45:00', '08:50:00', 5),
(150412, '08:50:00', '08:55:00', 5),
(150413, '08:55:00', '09:00:00', 5),
(150414, '09:00:00', '09:05:00', 5),
(150415, '09:05:00', '09:10:00', 5),
(150416, '09:10:00', '09:15:00', 5),
(150417, '09:15:00', '09:20:00', 5),
(150418, '09:20:00', '09:25:00', 5),
(150419, '09:25:00', '09:30:00', 5),
(150420, '09:30:00', '09:35:00', 5),
(150421, '09:35:00', '09:40:00', 5),
(150422, '09:40:00', '09:45:00', 5),
(150423, '09:45:00', '09:50:00', 5),
(150424, '09:50:00', '09:55:00', 5),
(150425, '09:55:00', '10:00:00', 5),
(150426, '10:00:00', '10:05:00', 5),
(150427, '10:05:00', '10:10:00', 5),
(150428, '10:10:00', '10:15:00', 5),
(150429, '10:15:00', '10:20:00', 5),
(150430, '10:20:00', '10:25:00', 5),
(150431, '10:25:00', '10:30:00', 5),
(150432, '10:30:00', '10:35:00', 5),
(150433, '10:35:00', '10:40:00', 5),
(150434, '10:40:00', '10:45:00', 5),
(150435, '10:45:00', '10:50:00', 5),
(150436, '10:50:00', '10:55:00', 5),
(150437, '10:55:00', '11:00:00', 5),
(150438, '11:00:00', '11:05:00', 5),
(150439, '11:05:00', '11:10:00', 5),
(150440, '11:10:00', '11:15:00', 5),
(150441, '11:15:00', '11:20:00', 5),
(150442, '11:20:00', '11:25:00', 5),
(150443, '11:25:00', '11:30:00', 5),
(150444, '11:30:00', '11:35:00', 5),
(150445, '11:35:00', '11:40:00', 5),
(150446, '11:40:00', '11:45:00', 5),
(150447, '11:45:00', '11:50:00', 5),
(150448, '11:50:00', '11:55:00', 5),
(150449, '11:55:00', '12:00:00', 5),
(150450, '12:00:00', '12:05:00', 5),
(150451, '12:05:00', '12:10:00', 5),
(150452, '12:10:00', '12:15:00', 5),
(150453, '12:15:00', '12:20:00', 5),
(150454, '12:20:00', '12:25:00', 5),
(150455, '12:25:00', '12:30:00', 5),
(150456, '12:30:00', '12:35:00', 5),
(150457, '12:35:00', '12:40:00', 5),
(150458, '12:40:00', '12:45:00', 5),
(150459, '12:45:00', '12:50:00', 5),
(150460, '12:50:00', '12:55:00', 5),
(150461, '12:55:00', '13:00:00', 5),
(150462, '13:00:00', '13:05:00', 5),
(150463, '13:05:00', '13:10:00', 5),
(150464, '13:10:00', '13:15:00', 5),
(150465, '13:15:00', '13:20:00', 5),
(150466, '13:20:00', '13:25:00', 5),
(150467, '13:25:00', '13:30:00', 5),
(150468, '13:30:00', '13:35:00', 5),
(150469, '13:35:00', '13:40:00', 5),
(150470, '13:40:00', '13:45:00', 5),
(150471, '13:45:00', '13:50:00', 5),
(150472, '13:50:00', '13:55:00', 5),
(150473, '13:55:00', '14:00:00', 5),
(150474, '14:00:00', '14:05:00', 5),
(150475, '14:05:00', '14:10:00', 5),
(150476, '14:10:00', '14:15:00', 5),
(150477, '14:15:00', '14:20:00', 5),
(150478, '14:20:00', '14:25:00', 5),
(150479, '14:25:00', '14:30:00', 5),
(150480, '14:30:00', '14:35:00', 5),
(150481, '14:35:00', '14:40:00', 5),
(150482, '14:40:00', '14:45:00', 5),
(150483, '14:45:00', '14:50:00', 5),
(150484, '14:50:00', '14:55:00', 5),
(150485, '14:55:00', '15:00:00', 5);

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
  `credits` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `username`, `password`, `isAdmin`, `fullName`, `email`, `class`, `tel`, `credits`, `created_at`, `updated_at`) VALUES
(3, 'admin2', '$2y$10$U8xz2ZP2Icqoyax0IsyHbuS4C5bDKFC1rAcoRNlIOKLe.5iN6CBSm', 0, '0', '0', '0', NULL, 0, NULL, NULL),
(4, 'admin3', '$2y$10$2IXoBxhJA77UszDSZQqCwO9I/Ra7ulio0XFf43fdeMw/75iVu42pO', 0, '0', '0', '0', NULL, 0, NULL, NULL),
(5, 'admin4', '$2y$10$Mz6BwxbHiGgUBfNsYHw0Bu4biWQ.0sF1DWNOspdAjWjJQZjABQH2C', 0, '0', '0', NULL, NULL, 0, NULL, NULL),
(6, 'user4', '$2y$10$.qm8EaBR/xbYBMS7qBdelOrB1ZWH94iRwro9eyy..I8b4L8Pttcxi', 0, 'Jonáš Eduard', 'mailo@doge.gov', '2.Y', '545641231', 655115656, NULL, NULL),
(7, 'admin', '$2y$10$tK.5Q2ilDw6c0FaubgUaguKa.g4goIgJ9XZ2XuUuUvtHKNIwYR3gG', 1, 'Pepa Novák', 'novak@spseplzen.cz', 'admin', '123156465', 0, NULL, NULL),
(19, 'user5', '$2y$10$UhANRxQ.d3rb.VPYYTL9XO4wqfG7KQzfDSszEBuh3XDiMr6bg/GdO', 0, 'a', 'b', 'c', NULL, 0, NULL, NULL),
(20, 'user6', '$2y$10$7G6a6ufndG4Pals9t94BR.uHk16mIH3pRHTDXWsmZcxlYoxAsnakS', 0, 'c', 'd', 'e', NULL, 0, NULL, NULL),
(25, 'user4df', '$2y$10$BlTadJHWJk9TEzSIl1VXYezOxbb95crDAHa1wIX1KJKQGUy./NDiO', 0, 'idk', 'default@spseplzen.cz', '5.H', NULL, 0, NULL, NULL),
(26, 'dfa', '$2y$10$yesn4RxklyRvXv7x0JkxO.w/77ib83zXKtviUN./6yRNzd8qft6k.', 0, 'idk', 'default@spseplzen.cz', '5.H', NULL, 0, NULL, NULL),
(27, 'Oreki', '$2y$10$2O2qcefsYVf.tZ90/MntPOu3yi5y0jLCEhVMYeHUGJcGXbzGzo75q', 0, 'idk', 'default@spseplzen.cz', '5.H', NULL, 0, NULL, NULL),
(28, 'Hello', '$2y$10$MU7FgHfnJLdXOBQBE4UoWOnwtBMheqZ2m5OIXKbeIXikVLh.xLVRW', 0, 'idk', 'default@spseplzen.cz', '5.H', NULL, 0, NULL, NULL),
(29, 'lembaj', '$2y$10$qXrgeLp74tEoTLZOBPZxledUCUaHBvp37VyVEXU7whbQPJI2DPtqe', 0, 'idk', 'default@spseplzen.cz', '5.H', NULL, 0, NULL, NULL),
(30, 'user16', '$2y$10$pFc46onFpdZAl9xbxBnlluYtVLHJBOTxM7h3oSTWLJjmzr7Hs7EL6', 0, 'Wlczak', 'mail@mail.mail', NULL, NULL, 0, NULL, NULL),
(31, 'user166', '$2y$10$x8UE2KEaryN2GNS3WC.3fucm9GMXzCV1oPSH3WckRgkSJnta4KdZK', 0, 'Wlczak', 'mail@mail.mails', NULL, NULL, 0, NULL, NULL),
(32, 'user1661', '$2y$10$SIHlgDggX2P/Vu18uSlit.JvxFvXLti6.zw8ZDz.bLWlXVkEVFaEW', 0, 'Wlczak', 'mail@mail.mailso', NULL, NULL, 0, NULL, NULL),
(33, 'user1661a', '$2y$10$hrDLXr31a1SzdbIetYpTduVCDDzUzs0nqJVckuA29OxoZL1LmaaUG', 0, 'Wlczak', 'mail@mail.mailsos', NULL, '785589695', 0, NULL, NULL),
(34, 'user48', '$2y$10$3KPYhx0krLpvSlYtnEaCZO27DYl6IxU90HUTDrsBMFXi4ZviNqd9u', 0, 'as', 'dv@d.c', NULL, '', 0, NULL, NULL),
(35, 'user48s', '$2y$10$/n3dYYjBvLWPuIF/OjWEqex7tRhgmS2fHsyuA8wIgdP2H.sGP7vBa', 0, 'as', 'sdv@d.c', NULL, '', 0, NULL, NULL),
(36, '123', '$2y$10$kXHXX.748NoKfYmozJ2CTOa5zYtH5PejNcAhZJ35PD5F/7W0bYxI6', 0, '1132', 'e@e.e', NULL, '', 0, NULL, NULL),
(37, 's', '$2y$10$a7a3gGw9.ogMJ70VYaTIbu4.f3287cR/JunCE6rRievtCx6fUg86W', 0, 's', 's@e.d', NULL, '', 0, NULL, NULL),
(38, 'asd', '$2y$10$HrYTE448w8Mb5anS5M90MecS3afCbZCACTYVhf.HrmTvdisp44FvG', 0, 'asd', 'asd@as.c', NULL, '2', 0, NULL, NULL),
(39, 'asds', '$2y$10$BZJmv1qbujiyw6k0A4kOxe78wo3HSpf6a5zXcJjjLHMjVVCe4EvLW', 0, 'assd', 'assd@as.c', NULL, '2', 0, NULL, NULL),
(40, 'ss', '$2y$10$X1.1ImHFXNFgxsKSsNzOau2xPkT7hy9R6XzIq05Wy3VVnJb4nQ8fe', 0, 's', 's@e.sd', NULL, '', 0, NULL, NULL),
(41, 'asdasdasd', '$2y$10$CZ/ihJkzvr3Z1I35G3C6cO6iVrzzAYlHiBp6G70Xqhca9XySB22sK', 0, 'ad', 'sd@d.c', NULL, '2', 0, NULL, NULL),
(42, 'asdassdasd', '$2y$10$dfol001Wr7dufYHsREgLiOX471PiJFeKE9zEiD6i01jr/g/G47aY.', 0, 'ads', 'ssd@d.c', NULL, '', 0, NULL, NULL),
(43, 'assdassdasd', '$2y$10$8fPewIIvUmzXN.kzAcfz7O9dF9gIYJmxMw0bf95vYNwiShs/jFDPa', 0, 'ads', 'ssds@d.c', NULL, NULL, 0, NULL, NULL),
(44, '156165151566', '$2y$10$QL458nKgf3oOrwlvqYMc3eINMaYYtziB/PsCd3TDRUewChT3Ff6Ey', 0, 'ad15465', 's5d@d.c', NULL, NULL, 0, NULL, NULL),
(45, 'betatest', '$2y$10$gAoLNU4EDoO8uRfzKYKK2O6CAZC/pORM5tCWihbNiaGIOtwfcjeUG', 0, 'Beta testíček', 'lol@email.ye', NULL, NULL, 0, NULL, NULL),
(46, 'beta', '$2y$10$3TVLSpJvdXkTjgnn5HiQ5.ftVEo9sCyR8ICIne6raf52kPkeb2QHm', 0, 'Beta Test', 'lol@lol.lol', NULL, '', 0, NULL, NULL),
(47, 'beta1', '$2y$10$e5iqTFfVYuRvmLc2EjG4Tu6Bm.aQnuocXUcm0zeN6zJVwP9qaW9cC', 0, 'Beta Test', 'lol1@lol.lol', NULL, '', 0, NULL, NULL),
(48, 'ka', '$2y$10$uLfnAWP5JP/cklJ2AOrJp.AvJGQo0HBRS69u.e4aDBBlUl1GuH/gO', 0, 'asd', 'ka@se.v', NULL, NULL, 0, NULL, NULL),
(49, 'jj', '$2y$10$zW7ieozNYCKLjAFMr7oYauj3xvSP3ARgsmTXb2NocDOxPw1NuFoa6', 0, 'asd', 'jj@sd.d', NULL, NULL, 0, NULL, NULL),
(50, 'fda', '$2y$10$WLhTzFtqvydj3gHfKO4qoe31G8J.Po9N7US1RkFFojVgaUdBjHrjW', 0, 'asdf', 'asdf@asdf.fdsa', NULL, NULL, 0, NULL, NULL),
(51, 'user35', '$2y$10$oPhZbqbeNlFBIWlEhY7ThO0L0a9IcwWDB7Yj9uH/LmfudrgeWy62i', 0, 'jk', 'sjkdfh@sdf.v', NULL, NULL, 0, NULL, NULL),
(52, 'beta2', '$2y$10$VPcF4jsrVaG5mT867X7X0.dO/QKGDo8Jk6W6qIpd5rtl0sK4R4ulW', 0, 'Beta Test2', 'lol@lol2.lol', NULL, NULL, 0, NULL, NULL),
(53, 'test', '$2y$10$iye8PnPa3EoJWbeXWt.gMePWIHbfHGE.0g0iCXQNfRzPrU4krjvCa', 0, 'Test', 'test@example.com', NULL, NULL, 0, NULL, NULL),
(54, 'beta3', '$2y$10$7d8x3h303QSqm/bhaNbDM.NErZ/hw7yqgE4nggNA/AykciYdDIWr.', 0, 'Beta test', 'example3@example.com', NULL, NULL, 0, NULL, NULL),
(55, 'testing', '$2y$10$dNZ55a6cW9l4ZSCMa8WfzuvJO4F2J81.rbNe4/gmxf7qpRapx.idW', 0, 'Hello There', '1@2.c', NULL, '+123456789012345', 0, NULL, NULL),
(56, '321asd31321sad321', '$2y$10$H/S39lCtqCbuu/ObyA6rcODXOO7Kad2LhXy7NMFmjOfWKnKfIUKli', 0, 'a2d1321', 's@s.d', NULL, NULL, 0, NULL, NULL),
(57, 'wlczak', '$2y$10$JpSUCZAIasl4RnluW3JA/.i9O2GWgznjOSX3AoCeM8VOAIdfmixRu', 0, 'Wlczak', 'wlczak@vlastas.cc', NULL, '123456789', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `Variants`
--

CREATE TABLE `Variants` (
  `id` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `addedPrice` int(11) NOT NULL,
  `isExclusive` bit(1) NOT NULL,
  `removed` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Variants`
--

INSERT INTO `Variants` (`id`, `itemId`, `name`, `addedPrice`, `isExclusive`, `removed`, `created_at`, `updated_at`) VALUES
(2, 2, 'random', 500, b'1', 0, NULL, NULL),
(3, 17, 'ketchup', 500, b'1', 0, NULL, NULL),
(4, 17, 'mustard', 500, b'1', 0, NULL, NULL),
(5, 17, 'mustard2.. idk what to call this', 500, b'0', 0, NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Allergens`
--
ALTER TABLE `Allergens`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Categories`
--
ALTER TABLE `Categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Items`
--
ALTER TABLE `Items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- Indexes for table `Orders`
--
ALTER TABLE `Orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `paymentId` (`paymentId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `Payments`
--
ALTER TABLE `Payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Temp`
--
ALTER TABLE `Temp`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Timeslots`
--
ALTER TABLE `Timeslots`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `Variants`
--
ALTER TABLE `Variants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `itemId` (`itemId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Allergens`
--
ALTER TABLE `Allergens`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Categories`
--
ALTER TABLE `Categories`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `Items`
--
ALTER TABLE `Items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4514;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=423;

--
-- AUTO_INCREMENT for table `Temp`
--
ALTER TABLE `Temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Timeslots`
--
ALTER TABLE `Timeslots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150486;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `Variants`
--
ALTER TABLE `Variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Items`
--
ALTER TABLE `Items`
  ADD CONSTRAINT `Items_ibfk_1` FOREIGN KEY (`category`) REFERENCES `Categories` (`id`);

--
-- Constraints for table `Orders`
--
ALTER TABLE `Orders`
  ADD CONSTRAINT `Orders_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`),
  ADD CONSTRAINT `Orders_ibfk_2` FOREIGN KEY (`paymentId`) REFERENCES `Payments` (`id`);

--
-- Constraints for table `Variants`
--
ALTER TABLE `Variants`
  ADD CONSTRAINT `Variants_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `Items` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
