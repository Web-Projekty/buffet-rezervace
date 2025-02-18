-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 18, 2025 at 12:23 PM
-- Server version: 10.5.26-MariaDB-0+deb11u2
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
  `image` varchar(256) NOT NULL,
  `description` varchar(1024) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Categories`
--

INSERT INTO `Categories` (`id`, `name`, `image`, `description`) VALUES
(1, 'Fastfood', '', 'něco rychlého k snědku'),
(2, 'Vegetariánské', '', '');

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
  `category` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Items`
--

INSERT INTO `Items` (`id`, `name`, `price`, `description`, `image`, `allergens`, `category`) VALUES
(1, 'Plněná bageta sýr-šunka', 12000, 'Bageta plněná šunkou a sýrem.', 'img/items/baguette_chicken.png', '[1,7]', 1),
(2, 'Bageta s kuřecím masem', 8900, 'Bageta plněná grilovaným kuřecím masem a zeleninou.', 'img/items/baguette_chicken.png', '[1,7]', 1),
(3, 'Sekaná v housce', 6900, 'Domácí sekaná podávaná v čerstvé housce.', 'img/items/meatloaf_bun.png', '[1,2]', 1),
(4, 'Bageta Caprese', 8500, 'Bageta s mozzarellou, rajčaty a bazalkovým pestem.', 'img/items/baguette_caprese.png', '[1,7]', 2),
(5, 'Tortilla s tuňákem', 9900, 'Plněná tortilla s tuňákem, majonézou a zeleninou.', 'img/items/tuna_tortilla.png', '[1,2]', 1),
(6, 'Bageta s trhaným vepřovým', 10900, 'Bageta s trhaným vepřovým masem a BBQ omáčkou.', 'img/items/baguette_pulled_pork.png', '[1,7]', 1),
(7, 'Vegetariánská bageta', 7500, 'Bageta s grilovanou zeleninou a hummusem.', 'img/items/baguette_veg.png', '[1]', 2),
(8, 'Klobása v housce', 5900, 'Grilovaná klobása podávaná v křupavé housce.', 'img/items/sausage_bun.png', '[1,3]', 1),
(9, 'Bageta s vejcem a slaninou', 8900, 'Bageta plněná vařeným vejcem, slaninou a dresinkem.', 'img/items/baguette_egg_bacon.png', '[1]', 1),
(10, 'Klasický burger', 12900, 'Šťavnatý hovězí burger s čerstvou zeleninou a omáčkou.', 'img/items/burger_classic.png', '[1,3,7]', 1),
(11, 'Vegetariánský burger', 11900, 'Burger s grilovaným portobello houbou a zeleninou.', 'img/items/burger_veg.png', '[1]', 1),
(12, 'Sendvič s krůtím masem', 8900, 'Sendvič s plátky krůtího masa, salátem a majonézou.', 'img/items/turkey_sandwich.png', '[1,7]', 1),
(13, 'Plněná bageta s lososem', 9900, 'Bageta s uzeným lososem a sýrem.', 'img/items/baguette_salmon.png', '[1,4,7]', 1),
(14, 'Toast se šunkou a sýrem', 6900, 'Grilovaný toast se šunkou a sýrem.', 'img/items/toast_ham_cheese.png', '[1,7]', 1),
(15, 'Bageta s avokádem', 8500, 'Bageta s avokádem, rajčaty a limetkovou majonézou.', 'img/items/baguette_avocado_tomato.png', '[1,7]', 2),
(16, 'Falafel wrap', 8900, 'Wrap s falafelem, hummusem a čerstvou zeleninou.', 'img/items/falafel_wrap.png', '[1]', 1),
(17, 'Párky v rohlíku', 4900, 'Tradiční párek v rohlíku s hořčicí a kečupem.', 'img/items/hotdog.png', '[1,3]', 1),
(18, 'Bageta s hovězím roastbeefem', 11500, 'Bageta s tenkými plátky roastbeefu a dijonskou omáčkou.', 'img/items/baguette_roastbeef.png', '[1,7]', 1),
(19, 'Tortilla s grilovaným sýrem', 8900, 'Tortilla plněná grilovaným sýrem a zeleninou.', 'img/items/grilled_cheese_tortilla.png', '[1,7]', 2),
(20, 'Bageta se salámem', 9500, 'Bageta plněná pikantním salámem a čerstvou paprikou.', 'img/items/baguette_spicy_salami.png', '[1,7]', 1),
(21, 'Sýrový mlsoun', 8900, 'Sýr Camembert a eidam s plátky vajec a pikantním dresinkem', 'img/items/default.png', '[1]', 2),
(22, 'Chlebíčkový labužník', 9900, 'Chuť lahůdkových chlebíčků s výběrem salámů na bramborovém salátu', 'img/items/default.png', '[2]', 2),
(23, 'test', 79000, 'hello', 'img/items/default.png', '[1,7]', 2);

-- --------------------------------------------------------

--
-- Table structure for table `Orders`
--

CREATE TABLE `Orders` (
  `id` int(11) UNSIGNED NOT NULL,
  `userId` int(11) UNSIGNED NOT NULL,
  `status` enum('sent','preparing','waiting','done','storno','cancelled') NOT NULL,
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp(),
  `pickupDate` date NOT NULL DEFAULT '0000-00-00',
  `items` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`items`)),
  `startTime` time NOT NULL,
  `endTime` time NOT NULL,
  `pickUpId` varchar(4) NOT NULL,
  `paymentId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Orders`
--

INSERT INTO `Orders` (`id`, `userId`, `status`, `dateCreated`, `pickupDate`, `items`, `startTime`, `endTime`, `pickUpId`, `paymentId`) VALUES
(4213, 6, 'storno', '2025-01-16 18:29:33', '2025-01-16', '[{\"id\":7,\"quantity\":2,\"variants\":[]},{\"id\":15,\"quantity\":3,\"variants\":[]},{\"id\":4,\"quantity\":1,\"variants\":[]},{\"id\":19,\"quantity\":1,\"variants\":[]}]', '09:40:00', '09:45:00', '730', 105),
(4223, 6, 'cancelled', '2025-01-16 19:50:23', '2025-01-16', '[{\"id\":7,\"quantity\":2,\"variants\":[]},{\"id\":15,\"quantity\":3,\"variants\":[]},{\"id\":4,\"quantity\":1,\"variants\":[]},{\"id\":19,\"quantity\":1,\"variants\":[]}]', '09:20:00', '09:25:00', '839', 115),
(4224, 6, 'cancelled', '2025-01-16 20:27:40', '2025-01-16', '[{\"id\":1,\"quantity\":1,\"variants\":[]},{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":3,\"quantity\":1,\"variants\":[]}]', '11:25:00', '11:30:00', '907', 116),
(4225, 6, 'done', '2025-01-16 20:27:42', '2025-01-16', '[{\"id\":7,\"quantity\":2,\"variants\":[]},{\"id\":15,\"quantity\":3,\"variants\":[]},{\"id\":4,\"quantity\":1,\"variants\":[]},{\"id\":19,\"quantity\":1,\"variants\":[]}]', '09:30:00', '09:35:00', '854', 117),
(4313, 6, 'done', '2025-01-17 07:24:53', '2025-01-17', '[{\"id\":1,\"quantity\":1,\"variants\":[]}]', '08:00:00', '08:05:00', '525', 205),
(4314, 6, 'done', '2025-01-17 07:24:53', '2025-01-17', '[{\"id\":1,\"quantity\":1,\"variants\":[]}]', '08:00:00', '08:05:00', '323', 206),
(4315, 6, 'done', '2025-01-17 07:27:48', '2025-01-17', '[{\"id\":1,\"quantity\":1,\"variants\":[]}]', '08:00:00', '08:05:00', '326', 207),
(4316, 6, 'done', '2025-01-17 07:34:30', '2025-01-17', '[{\"id\":1,\"quantity\":1,\"variants\":[]}]', '08:00:00', '08:05:00', '174', 208),
(4317, 6, 'done', '2025-01-17 07:34:31', '2025-01-17', '[{\"id\":1,\"quantity\":1,\"variants\":[]}]', '08:00:00', '08:05:00', '942', 209),
(4318, 6, 'done', '2025-01-17 07:34:31', '2025-01-17', '[{\"id\":1,\"quantity\":1,\"variants\":[]}]', '08:00:00', '08:05:00', '228', 210),
(4319, 6, 'cancelled', '2025-01-17 07:34:31', '2025-01-17', '[{\"id\":1,\"quantity\":1,\"variants\":[]}]', '08:00:00', '08:05:00', '425', 211),
(4320, 6, 'cancelled', '2025-01-17 08:02:02', '2025-01-17', '[{\"id\":1,\"quantity\":1,\"variants\":[]}]', '08:00:00', '08:05:00', '003', 212),
(4321, 6, 'cancelled', '2025-01-17 08:02:11', '2025-01-17', '[{\"id\":1,\"quantity\":1,\"variants\":[]}]', '10:00:00', '10:05:00', '130', 213),
(4322, 6, 'done', '2025-01-17 08:02:17', '2025-01-17', '[{\"id\":1,\"quantity\":1,\"variants\":[]}]', '10:05:00', '10:10:00', '424', 214),
(4323, 6, 'done', '2025-01-17 08:57:41', '2025-01-19', '[{\"id\":5,\"quantity\":4,\"variants\":[]},{\"id\":3,\"quantity\":1,\"variants\":[]},{\"id\":2,\"quantity\":1,\"variants\":[]}]', '09:25:00', '09:30:00', '761', 215),
(4324, 6, 'done', '2025-01-20 07:45:02', '2025-01-20', '[{\"id\":7,\"quantity\":2,\"variants\":[]},{\"id\":15,\"quantity\":3,\"variants\":[]},{\"id\":4,\"quantity\":1,\"variants\":[]},{\"id\":19,\"quantity\":1,\"variants\":[]}]', '11:35:00', '11:40:00', '675', 216),
(4325, 6, 'cancelled', '2025-01-21 11:21:39', '2025-01-23', '[{\"id\":5,\"quantity\":4,\"variants\":[]},{\"id\":3,\"quantity\":1,\"variants\":[]},{\"id\":2,\"quantity\":1,\"variants\":[]}]', '11:40:00', '11:45:00', '411', 217),
(4326, 6, 'done', '2025-01-22 06:53:54', '2025-01-22', '[{\"id\":5,\"quantity\":1,\"variants\":[]},{\"id\":3,\"quantity\":1,\"variants\":[]},{\"id\":2,\"quantity\":1,\"variants\":[]}]', '08:45:00', '08:50:00', '864', 218),
(4327, 6, 'done', '2025-01-22 07:01:26', '2025-01-22', '[{\"id\":5,\"quantity\":4,\"variants\":[]},{\"id\":3,\"quantity\":1,\"variants\":[]},{\"id\":2,\"quantity\":1,\"variants\":[]}]', '09:05:00', '09:10:00', '903', 219),
(4328, 6, 'done', '2025-01-22 13:35:54', '2025-01-26', '[{\"id\":1,\"quantity\":4,\"variants\":[]}]', '13:25:00', '13:30:00', '239', 220),
(4329, 6, 'done', '2025-01-24 09:50:25', '2025-01-24', '[{\"id\":1,\"quantity\":1,\"variants\":[]},{\"id\":4,\"quantity\":1,\"variants\":[]}]', '09:45:00', '09:50:00', '005', 221),
(4330, 6, 'done', '2025-01-24 18:32:08', '2025-01-24', '[{\"id\":22,\"quantity\":1,\"variants\":[]},{\"id\":3,\"quantity\":1,\"variants\":[]}]', '11:25:00', '11:30:00', '645', 222),
(4331, 6, 'done', '2025-01-29 12:19:49', '2025-01-29', '[{\"id\":19,\"quantity\":1,\"variants\":[]},{\"id\":15,\"quantity\":1,\"variants\":[]},{\"id\":21,\"quantity\":1,\"variants\":[]},{\"id\":22,\"quantity\":1,\"variants\":[]}]', '11:35:00', '11:40:00', '913', 223),
(4332, 6, 'cancelled', '2025-02-06 09:10:15', '2025-02-06', '[{\"id\":1,\"quantity\":1,\"variants\":[]}]', '08:35:00', '08:40:00', '490', 224),
(4333, 53, 'cancelled', '2025-02-07 06:44:20', '2025-02-07', '[{\"id\":3,\"quantity\":1,\"variants\":[]}]', '13:35:00', '13:40:00', '476', 225),
(4334, 53, 'cancelled', '2025-02-07 06:46:51', '2025-02-08', '[{\"id\":3,\"quantity\":1,\"variants\":[]}]', '11:25:00', '11:30:00', '591', 226),
(4335, 6, 'done', '2025-02-07 07:59:16', '2025-02-07', '[{\"id\":3,\"quantity\":4,\"variants\":[]}]', '11:15:00', '11:20:00', '763', 227),
(4336, 54, 'done', '2025-02-07 09:27:22', '2025-02-08', '[{\"id\":3,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '10:20:00', '10:25:00', '688', 228),
(4337, 6, 'done', '2025-02-09 13:40:28', '2025-02-09', '[{\"id\":2,\"quantity\":1,\"variants\":[]}]', '11:20:00', '11:25:00', '796', 229),
(4338, 6, 'done', '2025-02-14 06:46:18', '2025-02-15', '[{\"id\":3,\"quantity\":1,\"variants\":[]}]', '09:30:00', '09:35:00', '712', 230),
(4339, 6, 'done', '2025-02-14 06:47:15', '2025-02-15', '[{\"id\":3,\"quantity\":1,\"variants\":[]}]', '13:35:00', '13:40:00', '667', 231),
(4340, 6, 'cancelled', '2025-02-14 07:03:04', '2025-02-16', '[{\"id\":15,\"quantity\":1,\"variants\":[]},{\"id\":21,\"quantity\":1,\"variants\":[]}]', '14:00:00', '14:05:00', '673', 232),
(4341, 6, 'cancelled', '2025-02-14 08:05:54', '2025-01-16', '[{\"id\":6,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]},{\"id\":3,\"quantity\":1,\"variants\":[]}]', '10:30:00', '10:35:00', '569', 233),
(4342, 6, 'storno', '2025-02-14 13:56:16', '2025-01-14', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '13:20:00', '13:25:00', '503', 234),
(4343, 6, 'storno', '2025-02-14 13:56:57', '2025-01-14', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:25:00', '11:30:00', '387', 235),
(4344, 6, 'storno', '2025-02-14 13:57:45', '2025-01-14', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '13:20:00', '13:25:00', '875', 236),
(4345, 6, 'storno', '2025-02-14 14:16:49', '2025-01-14', '[{\"id\":3,\"quantity\":1,\"variants\":[]}]', '14:00:00', '14:05:00', '542', 237),
(4346, 6, 'storno', '2025-02-14 14:17:42', '2025-01-14', '[{\"id\":3,\"quantity\":1,\"variants\":[]}]', '11:10:00', '11:15:00', '583', 238),
(4347, 6, 'storno', '2025-02-14 14:22:36', '2025-01-17', '[{\"id\":3,\"quantity\":1,\"variants\":[]}]', '09:25:00', '09:30:00', '934', 239),
(4348, 6, 'storno', '2025-02-14 14:28:45', '2025-01-14', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:20:00', '11:25:00', '048', 240),
(4349, 6, 'storno', '2025-02-14 14:29:18', '2025-01-14', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '13:35:00', '13:40:00', '825', 241),
(4350, 6, 'done', '2025-02-14 14:31:41', '2025-01-14', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '13:25:00', '13:30:00', '921', 242),
(4351, 6, 'cancelled', '2025-02-15 15:43:34', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:25:00', '11:30:00', '286', 243),
(4352, 6, 'cancelled', '2025-02-15 15:49:31', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:25:00', '11:30:00', '147', 244),
(4353, 6, 'done', '2025-02-15 15:50:25', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:25:00', '11:30:00', '480', 245),
(4354, 6, 'done', '2025-02-15 17:28:17', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '09:25:00', '09:30:00', '844', 246),
(4355, 6, 'done', '2025-02-15 17:34:07', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '09:15:00', '09:20:00', '523', 247),
(4356, 6, 'done', '2025-02-15 17:35:09', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '09:25:00', '09:30:00', '120', 248),
(4357, 6, 'done', '2025-02-15 17:35:18', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '09:25:00', '09:30:00', '367', 249),
(4358, 6, 'done', '2025-02-15 17:35:30', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '09:25:00', '09:30:00', '776', 250),
(4359, 6, 'done', '2025-02-15 17:36:26', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:15:00', '11:20:00', '456', 251),
(4360, 6, 'done', '2025-02-15 17:36:32', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:15:00', '11:20:00', '166', 252),
(4361, 6, 'done', '2025-02-15 17:39:19', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:15:00', '11:20:00', '121', 253),
(4362, 6, 'done', '2025-02-15 17:40:36', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:20:00', '11:25:00', '339', 254),
(4363, 6, 'done', '2025-02-15 17:40:57', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:20:00', '11:25:00', '176', 255),
(4364, 6, 'done', '2025-02-15 17:47:17', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:15:00', '11:20:00', '862', 256),
(4365, 6, 'done', '2025-02-15 17:47:28', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:15:00', '11:20:00', '123', 257),
(4366, 6, 'done', '2025-02-15 17:47:56', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:20:00', '11:25:00', '535', 258),
(4367, 6, 'done', '2025-02-15 17:48:33', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:20:00', '11:25:00', '177', 259),
(4368, 6, 'done', '2025-02-15 17:51:56', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '09:25:00', '09:30:00', '175', 260),
(4369, 6, 'done', '2025-02-15 17:59:45', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]},{\"id\":3,\"quantity\":1,\"variants\":[]}]', '11:35:00', '11:40:00', '679', 261),
(4370, 6, 'done', '2025-02-15 18:02:54', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]}]', '11:20:00', '11:25:00', '545', 262),
(4371, 6, 'done', '2025-02-15 18:06:42', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]},{\"id\":3,\"quantity\":1,\"variants\":[]}]', '13:25:00', '13:30:00', '525', 263),
(4372, 6, 'done', '2025-02-15 18:08:21', '2025-01-15', '[{\"id\":2,\"quantity\":1,\"variants\":[]},{\"id\":5,\"quantity\":1,\"variants\":[]},{\"id\":3,\"quantity\":1,\"variants\":[]}]', '11:35:00', '11:40:00', '960', 264),
(4373, 6, 'done', '2025-02-15 18:34:06', '2025-01-15', '[{\"id\":19,\"quantity\":1,\"variants\":[]}]', '09:35:00', '09:40:00', '046', 265),
(4374, 6, 'done', '2025-02-15 18:36:37', '2025-01-15', '[{\"id\":19,\"quantity\":1,\"variants\":[]}]', '08:15:00', '08:20:00', '417', 266),
(4375, 6, 'done', '2025-02-17 11:37:19', '2025-01-17', '[{\"id\":2,\"quantity\":1,\"variants\":[]}]', '10:20:00', '10:25:00', '467', 267),
(4376, 6, 'sent', '2025-02-17 12:18:44', '2025-01-17', '[{\"id\":2,\"quantity\":1,\"variants\":[]}]', '12:25:00', '12:30:00', '987', 268),
(4377, 6, 'sent', '2025-02-17 14:57:03', '2025-01-17', '[{\"id\":3,\"quantity\":1,\"variants\":[]}]', '11:15:00', '11:20:00', '329', 269),
(4378, 6, 'sent', '2025-02-17 16:26:20', '2025-01-17', '[{\"id\":5,\"quantity\":1,\"variants\":[]}]', '09:25:00', '09:30:00', '530', 270),
(4379, 6, 'sent', '2025-02-17 16:49:51', '2025-01-17', '[{\"id\":3,\"quantity\":1,\"variants\":[]}]', '13:25:00', '13:30:00', '666', 271),
(4380, 6, 'sent', '2025-02-17 16:53:54', '2025-01-17', '[{\"id\":3,\"quantity\":1,\"variants\":[]}]', '13:25:00', '13:30:00', '396', 272),
(4381, 6, 'sent', '2025-02-17 16:54:30', '2025-01-17', '[{\"id\":3,\"quantity\":1,\"variants\":[1]}]', '13:25:00', '13:30:00', '802', 273),
(4382, 6, 'sent', '2025-02-17 16:55:00', '2025-01-17', '[{\"id\":3,\"quantity\":1,\"variants\":[1]}]', '13:25:00', '13:30:00', '201', 274),
(4383, 6, 'sent', '2025-02-17 17:06:40', '2025-01-17', '[{\"id\":3,\"quantity\":1,\"variants\":[1]}]', '13:25:00', '13:30:00', '553', 275),
(4384, 6, 'sent', '2025-02-17 17:10:22', '2025-01-17', '[{\"id\":3,\"quantity\":1,\"variants\":[1]}]', '13:30:00', '13:35:00', '838', 276),
(4385, 6, 'sent', '2025-02-17 17:20:49', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[3]}]', '13:30:00', '13:35:00', '364', 277),
(4386, 6, 'sent', '2025-02-17 17:22:52', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[]}]', '13:30:00', '13:35:00', '479', 278),
(4387, 6, 'sent', '2025-02-17 17:22:58', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[3]}]', '13:30:00', '13:35:00', '743', 279),
(4388, 6, 'sent', '2025-02-17 17:25:30', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[2]}]', '13:30:00', '13:35:00', '212', 280),
(4389, 6, 'sent', '2025-02-17 17:25:52', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[2]}]', '13:35:00', '13:40:00', '124', 281),
(4390, 6, 'sent', '2025-02-17 17:34:12', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[2]}]', '13:35:00', '13:40:00', '007', 282),
(4391, 6, 'sent', '2025-02-17 17:37:55', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[2]}]', '13:35:00', '13:40:00', '785', 283),
(4392, 6, 'sent', '2025-02-17 17:38:28', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[2]}]', '13:35:00', '13:40:00', '114', 284),
(4393, 6, 'sent', '2025-02-17 17:39:54', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[2]}]', '13:35:00', '13:40:00', '203', 285),
(4394, 6, 'sent', '2025-02-17 17:40:14', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[2]}]', '13:40:00', '13:45:00', '162', 286),
(4395, 6, 'sent', '2025-02-17 17:40:35', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[2]}]', '13:40:00', '13:45:00', '029', 287),
(4396, 6, 'sent', '2025-02-17 17:42:06', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[2]}]', '13:40:00', '13:45:00', '960', 288),
(4397, 6, 'sent', '2025-02-17 17:42:14', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[3]}]', '13:40:00', '13:45:00', '097', 289),
(4398, 6, 'sent', '2025-02-17 17:42:21', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[2]}]', '13:40:00', '13:45:00', '544', 290),
(4399, 6, 'sent', '2025-02-17 17:43:14', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[4]}]', '13:45:00', '13:50:00', '486', 291),
(4400, 6, 'sent', '2025-02-17 17:44:43', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[4]}]', '13:45:00', '13:50:00', '910', 292),
(4401, 6, 'sent', '2025-02-17 17:45:12', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[4]}]', '13:45:00', '13:50:00', '427', 293),
(4402, 6, 'sent', '2025-02-17 17:54:22', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[3]}]', '13:45:00', '13:50:00', '895', 294),
(4403, 6, 'sent', '2025-02-17 18:10:19', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[3,4]}]', '13:45:00', '13:50:00', '737', 295),
(4404, 6, 'sent', '2025-02-17 18:10:39', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[4]}]', '13:50:00', '13:55:00', '388', 296),
(4405, 6, 'sent', '2025-02-17 18:11:30', '2025-01-17', '[{\"id\":17,\"quantity\":1,\"variants\":[3,5]}]', '13:50:00', '13:55:00', '593', 297),
(4406, 6, 'sent', '2025-02-18 10:47:01', '2025-01-18', '[{\"id\":3,\"quantity\":1,\"variants\":[]}]', '11:15:00', '11:20:00', '255', 298);

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
  `dateCreated` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Payments`
--

INSERT INTO `Payments` (`id`, `thePayId`, `type`, `useCredits`, `totalAmount`, `creditsAmount`, `paid`, `thePayUrl`, `thePayDetailsUrl`, `dateCreated`) VALUES
(101, 121025713, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/6b4bbc3ff0495eec810ebe1722038912a6f301e624d6010d13dcb3d633535879/pay', 'https://demo.gate.thepay.cz/6b4bbc3ff0495eec810ebe1722038912a6f301e624d6010d13dcb3d633535879/state', '2025-01-16 15:25:42'),
(102, 1867797027, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/164caed839035a431aef27fd93f8dbafcaf29184c2fa136881ad9b0bca5309c6/pay', 'https://demo.gate.thepay.cz/164caed839035a431aef27fd93f8dbafcaf29184c2fa136881ad9b0bca5309c6/state', '2025-01-16 15:51:54'),
(103, 1986760029, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/ecbc6122891314eda96256750f5c81a9fbb62a3b892fa6fbc032d4e0f90be841/pay', 'https://demo.gate.thepay.cz/ecbc6122891314eda96256750f5c81a9fbb62a3b892fa6fbc032d4e0f90be841/state', '2025-01-16 15:52:26'),
(104, 1861616937, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/09603e69c2dd49d7e48cf34fd28a2ddbe833a4f9d01a8e5aed9c628da9cb787e/pay', 'https://demo.gate.thepay.cz/09603e69c2dd49d7e48cf34fd28a2ddbe833a4f9d01a8e5aed9c628da9cb787e/state', '2025-01-16 15:52:51'),
(105, 1432522453, 'thePay', b'0', 57900, 0, b'0', 'https://demo.gate.thepay.cz/158d82500cdc9b17777c7c6377447fe9965ee47b008a9847303409dda2c333cb/pay', 'https://demo.gate.thepay.cz/158d82500cdc9b17777c7c6377447fe9965ee47b008a9847303409dda2c333cb/state', '2025-01-16 18:29:33'),
(106, 816098794, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/aca9669001c48214909a53c0ef7ffbb40981e87085793cd8aec9edc66f562fb7/pay', 'https://demo.gate.thepay.cz/aca9669001c48214909a53c0ef7ffbb40981e87085793cd8aec9edc66f562fb7/state', '2025-01-16 18:49:08'),
(107, 1930651572, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/dc314c3f41f9ad11eedf75a1db48d47af9b17f2a9168ad8373c80eebe773544f/pay', 'https://demo.gate.thepay.cz/dc314c3f41f9ad11eedf75a1db48d47af9b17f2a9168ad8373c80eebe773544f/state', '2025-01-16 18:50:01'),
(108, 1734596567, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/9f061a7f825634439f9c6b31f040180cb0f5bf569f0ab995fd35aa1b86d4a80c/pay', 'https://demo.gate.thepay.cz/9f061a7f825634439f9c6b31f040180cb0f5bf569f0ab995fd35aa1b86d4a80c/state', '2025-01-16 18:50:15'),
(109, 2087399419, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/074064cf0d8b5dfaac78b9d4425de616a6ca6fce6b3f1f2973259adf6bee1806/pay', 'https://demo.gate.thepay.cz/074064cf0d8b5dfaac78b9d4425de616a6ca6fce6b3f1f2973259adf6bee1806/state', '2025-01-16 18:52:55'),
(110, 1050032459, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/9e17d66ea9a6aca8264996e0ed36eb55e77c8cddcba0f1d86c0bd73778cb57bd/pay', 'https://demo.gate.thepay.cz/9e17d66ea9a6aca8264996e0ed36eb55e77c8cddcba0f1d86c0bd73778cb57bd/state', '2025-01-16 19:28:17'),
(111, 972667001, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/71ef2f150ef40996394c508b6933e919298057b48db0028c927115641e110f55/pay', 'https://demo.gate.thepay.cz/71ef2f150ef40996394c508b6933e919298057b48db0028c927115641e110f55/state', '2025-01-16 19:29:25'),
(112, 1197220361, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/3b4511fa1de4a39502de04c741edb8a937db8256eee49c51e18e2bccb3a1f5f1/pay', 'https://demo.gate.thepay.cz/3b4511fa1de4a39502de04c741edb8a937db8256eee49c51e18e2bccb3a1f5f1/state', '2025-01-16 19:30:54'),
(113, 123263630, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/87c3c55637f2733c61011a3854056554d759b29a96e7f95bff2a0558e4badc7b/pay', 'https://demo.gate.thepay.cz/87c3c55637f2733c61011a3854056554d759b29a96e7f95bff2a0558e4badc7b/state', '2025-01-16 19:39:04'),
(114, 373338729, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/44c7adb1da25b31c2387ab6e6af62a07a72bec88b141829e5ae93ae8a2039b3f/pay', 'https://demo.gate.thepay.cz/44c7adb1da25b31c2387ab6e6af62a07a72bec88b141829e5ae93ae8a2039b3f/state', '2025-01-16 19:39:12'),
(115, 599120207, 'thePay', b'0', 57900, 0, b'1', 'https://demo.gate.thepay.cz/b280afab2efc1c167ed3322efb9650844f374043442b69ec925619ae61561853/pay', 'https://demo.gate.thepay.cz/b280afab2efc1c167ed3322efb9650844f374043442b69ec925619ae61561853/state', '2025-01-16 19:50:23'),
(116, 9631598, 'thePay', b'0', 23700, 0, b'1', 'https://demo.gate.thepay.cz/735d79d17669a05d1586ed1fb8536cf48d302a7f98a30b3340421a77b232c3f3/pay', 'https://demo.gate.thepay.cz/735d79d17669a05d1586ed1fb8536cf48d302a7f98a30b3340421a77b232c3f3/state', '2025-01-16 20:27:40'),
(117, 410053954, 'thePay', b'0', 57900, 0, b'0', 'https://demo.gate.thepay.cz/52c2c5d25d7e9c70e31ca8c57034754290ad8e3c8b65bb8628783740f710d28c/pay', 'https://demo.gate.thepay.cz/52c2c5d25d7e9c70e31ca8c57034754290ad8e3c8b65bb8628783740f710d28c/state', '2025-01-16 20:27:42'),
(118, 990399806, 'thePay', b'0', 25700, 0, b'0', 'https://demo.gate.thepay.cz/c9621e04779c65e9f3841731e15b3eb2a34aefcc4c10d68e994874e83c997b88/pay', 'https://demo.gate.thepay.cz/c9621e04779c65e9f3841731e15b3eb2a34aefcc4c10d68e994874e83c997b88/state', '2025-01-17 04:48:02'),
(119, 259794187, 'thePay', b'0', 55400, 0, b'0', 'https://demo.gate.thepay.cz/56139c381d59693d6b04997543d65e500a3b33f4c41a02255d848ec2f236718b/pay', 'https://demo.gate.thepay.cz/56139c381d59693d6b04997543d65e500a3b33f4c41a02255d848ec2f236718b/state', '2025-01-17 05:59:16'),
(120, 2023575959, 'thePay', b'0', 55400, 0, b'0', 'https://demo.gate.thepay.cz/917c4d9fb9be4a51ba0b0f838007caa56b5ac1972819329e64e0860c175554ee/pay', 'https://demo.gate.thepay.cz/917c4d9fb9be4a51ba0b0f838007caa56b5ac1972819329e64e0860c175554ee/state', '2025-01-17 05:59:47'),
(121, 2049705989, 'thePay', b'0', 55400, 0, b'0', 'https://demo.gate.thepay.cz/a3799632be8cc061f8514e8304eac17e6bbbbe35dfb725f94fbb940196b96b3f/pay', 'https://demo.gate.thepay.cz/a3799632be8cc061f8514e8304eac17e6bbbbe35dfb725f94fbb940196b96b3f/state', '2025-01-17 06:00:03'),
(122, 2086575226, 'thePay', b'0', 55400, 0, b'0', 'https://demo.gate.thepay.cz/d67bf37dd243b41f201106eed2c6ddd7a0ef67539b57d21f3ba5e19ebc6a6324/pay', 'https://demo.gate.thepay.cz/d67bf37dd243b41f201106eed2c6ddd7a0ef67539b57d21f3ba5e19ebc6a6324/state', '2025-01-17 06:00:24'),
(123, 845683263, 'thePay', b'0', 9900, 0, b'1', 'https://demo.gate.thepay.cz/2ee86598affda6883b4cb73fa809c55f2e6c246ae00d2dff28d1218e9330e140/pay', 'https://demo.gate.thepay.cz/2ee86598affda6883b4cb73fa809c55f2e6c246ae00d2dff28d1218e9330e140/state', '2025-01-17 06:02:23'),
(124, 31979311, 'thePay', b'0', 9900, 0, b'1', 'https://demo.gate.thepay.cz/a23e497ad9211ebb053987b654db1aeadeb1f07df26eebcfa9db5cff0489efcc/pay', 'https://demo.gate.thepay.cz/a23e497ad9211ebb053987b654db1aeadeb1f07df26eebcfa9db5cff0489efcc/state', '2025-01-17 06:11:49'),
(125, 100980627, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/c95ae28aacd567021a4562322aec29a9fa64038eb25aae60f401e17eee8b056a/pay', 'https://demo.gate.thepay.cz/c95ae28aacd567021a4562322aec29a9fa64038eb25aae60f401e17eee8b056a/state', '2025-01-17 06:13:20'),
(126, 322182397, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/daa8fa35e5727ebb4b2d97812ec5e7e7f7de0dde8cee720e4e026eef3957e487/pay', 'https://demo.gate.thepay.cz/daa8fa35e5727ebb4b2d97812ec5e7e7f7de0dde8cee720e4e026eef3957e487/state', '2025-01-17 06:13:22'),
(127, 1691586626, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/c2eb759d58dedb725eca78c143538e861ed80fa04d459d69793e6f982b57ed5c/pay', 'https://demo.gate.thepay.cz/c2eb759d58dedb725eca78c143538e861ed80fa04d459d69793e6f982b57ed5c/state', '2025-01-17 06:13:24'),
(128, 1593134113, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/c6a402f4e0b555f58c7b934577662bf858882cb02554e42286952f2a8231d465/pay', 'https://demo.gate.thepay.cz/c6a402f4e0b555f58c7b934577662bf858882cb02554e42286952f2a8231d465/state', '2025-01-17 06:13:25'),
(129, 1482253442, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/c64955127439b71e7d095403f9010bf063bf52d2e5d08e18ed4bc3db51b6ed31/pay', 'https://demo.gate.thepay.cz/c64955127439b71e7d095403f9010bf063bf52d2e5d08e18ed4bc3db51b6ed31/state', '2025-01-17 06:13:26'),
(130, 1635523601, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/6281bb48ada2544a835904e0964094f044b35ad9f33010b8dc1d200d7a2ebb1c/pay', 'https://demo.gate.thepay.cz/6281bb48ada2544a835904e0964094f044b35ad9f33010b8dc1d200d7a2ebb1c/state', '2025-01-17 06:13:30'),
(131, 1971615923, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/b0cf5834b1c4335ca4aa497f454118ed2f6bde4d9f14cf85168e79e43cb9687f/pay', 'https://demo.gate.thepay.cz/b0cf5834b1c4335ca4aa497f454118ed2f6bde4d9f14cf85168e79e43cb9687f/state', '2025-01-17 06:13:32'),
(132, 42929008, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/5665b22a4f31c2525a0eedad0dc77971167769fda1164b319eb283be498426df/pay', 'https://demo.gate.thepay.cz/5665b22a4f31c2525a0eedad0dc77971167769fda1164b319eb283be498426df/state', '2025-01-17 06:13:33'),
(133, 575673829, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/f8d1572a046e3d17446a3873b9fc29572b2e6adfd89b8fe673562348b2ec7797/pay', 'https://demo.gate.thepay.cz/f8d1572a046e3d17446a3873b9fc29572b2e6adfd89b8fe673562348b2ec7797/state', '2025-01-17 06:13:33'),
(134, 619665756, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/4caae7962fa9447f04c3e40840f7dd816c0ebe223defd3501d01dbe5420bcb17/pay', 'https://demo.gate.thepay.cz/4caae7962fa9447f04c3e40840f7dd816c0ebe223defd3501d01dbe5420bcb17/state', '2025-01-17 06:13:33'),
(135, 954185666, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/b23771ca1e6bc9906a555e5cc84063253a322046d86cf354ffb8216ba26690a6/pay', 'https://demo.gate.thepay.cz/b23771ca1e6bc9906a555e5cc84063253a322046d86cf354ffb8216ba26690a6/state', '2025-01-17 06:13:39'),
(136, 632406630, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/1a6a7420e7add40e8d1f03fb79735d72edcd68af48b5d3bb898275d0600f2ee3/pay', 'https://demo.gate.thepay.cz/1a6a7420e7add40e8d1f03fb79735d72edcd68af48b5d3bb898275d0600f2ee3/state', '2025-01-17 06:13:40'),
(137, 634482522, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/55143abde20d08ac0f815a6d0de725c6268e5059ec9e2d8c2c23f906cad2fbdd/pay', 'https://demo.gate.thepay.cz/55143abde20d08ac0f815a6d0de725c6268e5059ec9e2d8c2c23f906cad2fbdd/state', '2025-01-17 06:13:51'),
(138, 1835394489, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/03be16cadc2321e7130fea44e82716a966fa11fcfaea54cc08ad1d57b39bc383/pay', 'https://demo.gate.thepay.cz/03be16cadc2321e7130fea44e82716a966fa11fcfaea54cc08ad1d57b39bc383/state', '2025-01-17 06:14:04'),
(139, 926537636, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/c67cfc8bfa3dec23d78d53c603aea0cc26ff161659f1cc830fdd78a6df1512ce/pay', 'https://demo.gate.thepay.cz/c67cfc8bfa3dec23d78d53c603aea0cc26ff161659f1cc830fdd78a6df1512ce/state', '2025-01-17 06:14:06'),
(140, 1272266609, 'thePay', b'0', 16800, 0, b'1', 'https://demo.gate.thepay.cz/d3dd2906e633c7a0cfdc81078ffb4d943df7e52c56fa0215a4b4c633aba68358/pay', 'https://demo.gate.thepay.cz/d3dd2906e633c7a0cfdc81078ffb4d943df7e52c56fa0215a4b4c633aba68358/state', '2025-01-17 06:27:12'),
(141, 1264598259, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/2b7bff61027d3af49f4155b0675fad5b6a3905548a4ecd85e22074ae14ad0805/pay', 'https://demo.gate.thepay.cz/2b7bff61027d3af49f4155b0675fad5b6a3905548a4ecd85e22074ae14ad0805/state', '2025-01-17 06:38:17'),
(142, 1218911693, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/8d92145de395924547a18b105391d014fdaed5fbfb782c560234dcde2b7b6f22/pay', 'https://demo.gate.thepay.cz/8d92145de395924547a18b105391d014fdaed5fbfb782c560234dcde2b7b6f22/state', '2025-01-17 06:41:42'),
(143, 487891320, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/9464f247591ed59dae3d4228de560e4b7d8a661789debc8d7ee249c62c9a678a/pay', 'https://demo.gate.thepay.cz/9464f247591ed59dae3d4228de560e4b7d8a661789debc8d7ee249c62c9a678a/state', '2025-01-17 06:43:09'),
(144, 448508490, 'thePay', b'0', 16800, 0, b'1', 'https://demo.gate.thepay.cz/4a087498aac8e147a3e6c7435e34b0866746e8bed490d7013f238b59b572b905/pay', 'https://demo.gate.thepay.cz/4a087498aac8e147a3e6c7435e34b0866746e8bed490d7013f238b59b572b905/state', '2025-01-17 06:48:19'),
(145, 2045989005, 'thePay', b'0', 6900, 0, b'1', 'https://demo.gate.thepay.cz/baeb3e2e32ca137388caf6ff58f20a2929775e1da234c746f9ee482cb1d28a8b/pay', 'https://demo.gate.thepay.cz/baeb3e2e32ca137388caf6ff58f20a2929775e1da234c746f9ee482cb1d28a8b/state', '2025-01-17 06:58:23'),
(146, 368627516, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/9bab212129fbdaf6a72a08e7b9a03b4a8d4bdaa153a4967c612ce31866802fde/pay', 'https://demo.gate.thepay.cz/9bab212129fbdaf6a72a08e7b9a03b4a8d4bdaa153a4967c612ce31866802fde/state', '2025-01-17 07:19:10'),
(147, 1491581072, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/1b9b19d47ac85d1c069bd10333f60406bf54e787a00bba56a9b6fdcfe9073769/pay', 'https://demo.gate.thepay.cz/1b9b19d47ac85d1c069bd10333f60406bf54e787a00bba56a9b6fdcfe9073769/state', '2025-01-17 07:19:16'),
(148, 1322970281, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/9f2f9d7faf729f6ee46217ce73330ff49c714a3db2be8aaf0c0fceaf16932716/pay', 'https://demo.gate.thepay.cz/9f2f9d7faf729f6ee46217ce73330ff49c714a3db2be8aaf0c0fceaf16932716/state', '2025-01-17 07:20:25'),
(149, 1924003494, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/54c8e76af10b02ed6c388e43cd440092ce183f2ec74d461fdc66f0e3fd390c45/pay', 'https://demo.gate.thepay.cz/54c8e76af10b02ed6c388e43cd440092ce183f2ec74d461fdc66f0e3fd390c45/state', '2025-01-17 07:20:35'),
(150, 1857550674, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/0c5fdd21623ce0122950900848237fa93ee5578512036a6982c2c3f07e35258d/pay', 'https://demo.gate.thepay.cz/0c5fdd21623ce0122950900848237fa93ee5578512036a6982c2c3f07e35258d/state', '2025-01-17 07:22:58'),
(151, 1437451079, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/d123f55a8cd84d8c7665da3206a17a0d5538110c56a664a4dca517c574d9ee1f/pay', 'https://demo.gate.thepay.cz/d123f55a8cd84d8c7665da3206a17a0d5538110c56a664a4dca517c574d9ee1f/state', '2025-01-17 07:23:14'),
(152, 2053558124, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/0c4d694590d6cfa38436176897131eb331de45c3ad1598a290200aeaed9db109/pay', 'https://demo.gate.thepay.cz/0c4d694590d6cfa38436176897131eb331de45c3ad1598a290200aeaed9db109/state', '2025-01-17 07:24:00'),
(153, 1198782820, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/3973da704c39d116867c03dd535271488b3893c15b622a4e447ec5a275f8c4aa/pay', 'https://demo.gate.thepay.cz/3973da704c39d116867c03dd535271488b3893c15b622a4e447ec5a275f8c4aa/state', '2025-01-17 07:24:27'),
(154, 363677534, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/2463d8f537efdf4a98ee594d56094ace44ae1b155513962d3110ee9898911a91/pay', 'https://demo.gate.thepay.cz/2463d8f537efdf4a98ee594d56094ace44ae1b155513962d3110ee9898911a91/state', '2025-01-17 07:24:32'),
(155, 224718533, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/f5e9b9d0d87a70cb75e0425bffc05ba52101dcb912caeaa5f385031fcb856e63/pay', 'https://demo.gate.thepay.cz/f5e9b9d0d87a70cb75e0425bffc05ba52101dcb912caeaa5f385031fcb856e63/state', '2025-01-17 07:24:40'),
(156, 1747807365, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/4563ab6ed9d3af562dbbda148bd650343c24309a6bd3c44d63925addadb3fec9/pay', 'https://demo.gate.thepay.cz/4563ab6ed9d3af562dbbda148bd650343c24309a6bd3c44d63925addadb3fec9/state', '2025-01-17 07:24:41'),
(157, 1532343028, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/2138ef9659049dfcaa131fef0d09949aeae366709529334dd6137ed8274118d8/pay', 'https://demo.gate.thepay.cz/2138ef9659049dfcaa131fef0d09949aeae366709529334dd6137ed8274118d8/state', '2025-01-17 07:24:42'),
(158, 991030816, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/a7767371fa2dcfd9b028ec583c1c6b28fd480300ff5c62d95de08e3aaae48b14/pay', 'https://demo.gate.thepay.cz/a7767371fa2dcfd9b028ec583c1c6b28fd480300ff5c62d95de08e3aaae48b14/state', '2025-01-17 07:24:43'),
(159, 38911928, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/7776368ef47222f000ad11064debead96b70125c350df01afeeabc6571605680/pay', 'https://demo.gate.thepay.cz/7776368ef47222f000ad11064debead96b70125c350df01afeeabc6571605680/state', '2025-01-17 07:24:43'),
(160, 945746288, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/9b4f8ffb26ae96b4c2c3ee0a0a0ed5ac286c9a2d3791fe7a45aa72b7f2891e50/pay', 'https://demo.gate.thepay.cz/9b4f8ffb26ae96b4c2c3ee0a0a0ed5ac286c9a2d3791fe7a45aa72b7f2891e50/state', '2025-01-17 07:24:44'),
(161, 526635307, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/62315f9d2fd556f3db5cf5ce9cb561c232c35bb5bc08a54cc07d8f9e7a333508/pay', 'https://demo.gate.thepay.cz/62315f9d2fd556f3db5cf5ce9cb561c232c35bb5bc08a54cc07d8f9e7a333508/state', '2025-01-17 07:24:44'),
(162, 1842308796, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/a97a9e9f6f4d4c0fd5de528a9002c5b48927a268769c7806d093c8d24ce6e850/pay', 'https://demo.gate.thepay.cz/a97a9e9f6f4d4c0fd5de528a9002c5b48927a268769c7806d093c8d24ce6e850/state', '2025-01-17 07:24:44'),
(163, 930226737, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/169d849a4960a9bb769b57a1174076f073100e5092caba0c63c0d3449d2f3f46/pay', 'https://demo.gate.thepay.cz/169d849a4960a9bb769b57a1174076f073100e5092caba0c63c0d3449d2f3f46/state', '2025-01-17 07:24:44'),
(164, 134196950, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/cb26102ca184f531cc25d95756b2964e90b457dc896a33cda2f6ecb1a7e54449/pay', 'https://demo.gate.thepay.cz/cb26102ca184f531cc25d95756b2964e90b457dc896a33cda2f6ecb1a7e54449/state', '2025-01-17 07:24:45'),
(165, 1074120083, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/7f8e9a7107ff6c783bc1026a05d1b199ed7ab54bbb1130349b9dfd309d21c271/pay', 'https://demo.gate.thepay.cz/7f8e9a7107ff6c783bc1026a05d1b199ed7ab54bbb1130349b9dfd309d21c271/state', '2025-01-17 07:24:45'),
(166, 997620479, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/b4d8881f4dabd2600662aff3f9b429a82727895742a6fd586b81267dba749fbb/pay', 'https://demo.gate.thepay.cz/b4d8881f4dabd2600662aff3f9b429a82727895742a6fd586b81267dba749fbb/state', '2025-01-17 07:24:45'),
(167, 1241922941, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/dacc5a06a5764a3eb6fdd3db78343d61dc53a453b1ed48785792f948ccfd6cbc/pay', 'https://demo.gate.thepay.cz/dacc5a06a5764a3eb6fdd3db78343d61dc53a453b1ed48785792f948ccfd6cbc/state', '2025-01-17 07:24:45'),
(168, 1639447618, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/7c307ce6d28bf39339c7977838e50295a308eb499a8a0e0e557de523303078cd/pay', 'https://demo.gate.thepay.cz/7c307ce6d28bf39339c7977838e50295a308eb499a8a0e0e557de523303078cd/state', '2025-01-17 07:24:46'),
(169, 1444263898, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/3a490799ea598044c5eb03f2f7ec2d50fd5b64df92b12cee99e925e99fc1949e/pay', 'https://demo.gate.thepay.cz/3a490799ea598044c5eb03f2f7ec2d50fd5b64df92b12cee99e925e99fc1949e/state', '2025-01-17 07:24:46'),
(170, 1081574264, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/d35ef1ea2bd798e781464dd563261cf1a0f3514f44a7b5ce56ad3cfea410dffa/pay', 'https://demo.gate.thepay.cz/d35ef1ea2bd798e781464dd563261cf1a0f3514f44a7b5ce56ad3cfea410dffa/state', '2025-01-17 07:24:46'),
(171, 623984549, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/37bcfbab720933f5d7a4d6e6aa860a4c88a053eb95fa9420b8c64ac9eb337bb3/pay', 'https://demo.gate.thepay.cz/37bcfbab720933f5d7a4d6e6aa860a4c88a053eb95fa9420b8c64ac9eb337bb3/state', '2025-01-17 07:24:46'),
(172, 1673703929, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/038f4ab5ebae46b5a2be4152e936d6a854ac1b384c4b07e6455dd2f8e61c5630/pay', 'https://demo.gate.thepay.cz/038f4ab5ebae46b5a2be4152e936d6a854ac1b384c4b07e6455dd2f8e61c5630/state', '2025-01-17 07:24:46'),
(173, 1612008150, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/706196b00b7e91035fb158302980567efb8e07203cc3e1c3c9cb7412f71cf464/pay', 'https://demo.gate.thepay.cz/706196b00b7e91035fb158302980567efb8e07203cc3e1c3c9cb7412f71cf464/state', '2025-01-17 07:24:46'),
(174, 1608890490, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/90fabb138fa2b0003ae9a81a18fa065694138200f2edef78c69dcae793caad86/pay', 'https://demo.gate.thepay.cz/90fabb138fa2b0003ae9a81a18fa065694138200f2edef78c69dcae793caad86/state', '2025-01-17 07:24:47'),
(175, 463349735, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/0bcd673bc03ac991c05c4a01f57be184090e4e173ba6fe1d624520df15ce38f9/pay', 'https://demo.gate.thepay.cz/0bcd673bc03ac991c05c4a01f57be184090e4e173ba6fe1d624520df15ce38f9/state', '2025-01-17 07:24:47'),
(176, 44931853, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/8e9c9aa5548a1343d23a973e1ddeaa2c06b7866072e6ee4e67d825a1514092ec/pay', 'https://demo.gate.thepay.cz/8e9c9aa5548a1343d23a973e1ddeaa2c06b7866072e6ee4e67d825a1514092ec/state', '2025-01-17 07:24:47'),
(177, 1167940322, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/22bfbfa793401bed05e8c5eebe1123b61ecbc810d8198bb5ebf1e54ff5050fc7/pay', 'https://demo.gate.thepay.cz/22bfbfa793401bed05e8c5eebe1123b61ecbc810d8198bb5ebf1e54ff5050fc7/state', '2025-01-17 07:24:47'),
(178, 2099616480, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/5fe8a7e6cbac8db384aadae615cb837d24fe93b307f0fff53cd770e20a8846bd/pay', 'https://demo.gate.thepay.cz/5fe8a7e6cbac8db384aadae615cb837d24fe93b307f0fff53cd770e20a8846bd/state', '2025-01-17 07:24:48'),
(179, 132518318, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/77732cd13b4128a4502f33a3e7ccba142f19bb6a1529c6373d76962a123aa22f/pay', 'https://demo.gate.thepay.cz/77732cd13b4128a4502f33a3e7ccba142f19bb6a1529c6373d76962a123aa22f/state', '2025-01-17 07:24:48'),
(180, 222505110, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/0cee00389fd6edb293b96dd478d5231a7bc1979e350160a1dae5f7e5ea3e4ccc/pay', 'https://demo.gate.thepay.cz/0cee00389fd6edb293b96dd478d5231a7bc1979e350160a1dae5f7e5ea3e4ccc/state', '2025-01-17 07:24:48'),
(181, 712776033, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/d752ce8df0ede06db1d9ec4ed0646ad491c4b625d4e7167c86fd2dbafddbc306/pay', 'https://demo.gate.thepay.cz/d752ce8df0ede06db1d9ec4ed0646ad491c4b625d4e7167c86fd2dbafddbc306/state', '2025-01-17 07:24:48'),
(182, 1006340768, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/8d856155dc0327b079966c787016781feaf709ae77788af076aec93bd0ba3c06/pay', 'https://demo.gate.thepay.cz/8d856155dc0327b079966c787016781feaf709ae77788af076aec93bd0ba3c06/state', '2025-01-17 07:24:48'),
(183, 1150479798, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/c4b8e4eb6ef1d55eb426403c75b60a8a90e69eb56530e562045297ca2eb1ee45/pay', 'https://demo.gate.thepay.cz/c4b8e4eb6ef1d55eb426403c75b60a8a90e69eb56530e562045297ca2eb1ee45/state', '2025-01-17 07:24:49'),
(184, 205003251, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/4db45b77e4069979ea62a570e7dd74485dfa790e66f367017cb8c7652ac178f6/pay', 'https://demo.gate.thepay.cz/4db45b77e4069979ea62a570e7dd74485dfa790e66f367017cb8c7652ac178f6/state', '2025-01-17 07:24:49'),
(185, 1361629021, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/9d3a7af40737a4014a537c986bea2666a9daa91faf96cfd811bf72745fd59579/pay', 'https://demo.gate.thepay.cz/9d3a7af40737a4014a537c986bea2666a9daa91faf96cfd811bf72745fd59579/state', '2025-01-17 07:24:49'),
(186, 1813024518, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/682eeb55bab11941ad237c2aff228fffd2da85786f981511e793efb1ee89022d/pay', 'https://demo.gate.thepay.cz/682eeb55bab11941ad237c2aff228fffd2da85786f981511e793efb1ee89022d/state', '2025-01-17 07:24:49'),
(187, 1590165084, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/f879bb631f52114b9a44f6a017da29ae8cb02e8b18c0a6f2f5f8353d57f53a41/pay', 'https://demo.gate.thepay.cz/f879bb631f52114b9a44f6a017da29ae8cb02e8b18c0a6f2f5f8353d57f53a41/state', '2025-01-17 07:24:49'),
(188, 785979669, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/eea7d7a61cdc7869dd14022afbefe0837d86917f99d64da47b6729b29b4a6a13/pay', 'https://demo.gate.thepay.cz/eea7d7a61cdc7869dd14022afbefe0837d86917f99d64da47b6729b29b4a6a13/state', '2025-01-17 07:24:50'),
(189, 1252497234, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/6bbdd8eb882da309292df3884bee35352f160ea047a5cc42dd63311be65b7889/pay', 'https://demo.gate.thepay.cz/6bbdd8eb882da309292df3884bee35352f160ea047a5cc42dd63311be65b7889/state', '2025-01-17 07:24:50'),
(190, 1799512037, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/fa6c3cdde2d1481a73fb3808f9e6ab628cdf2a18d88fae170ce0d2b66094e9d2/pay', 'https://demo.gate.thepay.cz/fa6c3cdde2d1481a73fb3808f9e6ab628cdf2a18d88fae170ce0d2b66094e9d2/state', '2025-01-17 07:24:50'),
(191, 1304116017, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/968d9c647066c56e5ddd0598c90ebd9b9c7324cf8e6a0c094149e4efab1e293e/pay', 'https://demo.gate.thepay.cz/968d9c647066c56e5ddd0598c90ebd9b9c7324cf8e6a0c094149e4efab1e293e/state', '2025-01-17 07:24:50'),
(192, 772833272, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/ab6d215e13f3e91d575fff63471b40601e02f7585a863198ad12a786f4f70cb5/pay', 'https://demo.gate.thepay.cz/ab6d215e13f3e91d575fff63471b40601e02f7585a863198ad12a786f4f70cb5/state', '2025-01-17 07:24:50'),
(193, 1922795135, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/c46d03e8cb1d7c2e482c3bcb01f9e32085244ded68ff225974d2b33d60de063f/pay', 'https://demo.gate.thepay.cz/c46d03e8cb1d7c2e482c3bcb01f9e32085244ded68ff225974d2b33d60de063f/state', '2025-01-17 07:24:51'),
(194, 897612830, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/0838da9aa7bed2504a91c8d011143e87cba442555c8a5aac6a9d6359a86693b3/pay', 'https://demo.gate.thepay.cz/0838da9aa7bed2504a91c8d011143e87cba442555c8a5aac6a9d6359a86693b3/state', '2025-01-17 07:24:51'),
(195, 668866419, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/ca57dcda600161e04daa04f1f204e80e39ab59f56f124c2e6e02d1ca74a85c73/pay', 'https://demo.gate.thepay.cz/ca57dcda600161e04daa04f1f204e80e39ab59f56f124c2e6e02d1ca74a85c73/state', '2025-01-17 07:24:51'),
(196, 1479970611, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/ca022fd58bb29f9c10ff6f2dd64b49677c98c0a43f055d076ac11a34cbcd1d00/pay', 'https://demo.gate.thepay.cz/ca022fd58bb29f9c10ff6f2dd64b49677c98c0a43f055d076ac11a34cbcd1d00/state', '2025-01-17 07:24:51'),
(197, 1395267573, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/bcfc271fe8e481b65ef58a16bcfed7f64935f71d2352a1def2913d82d8174cea/pay', 'https://demo.gate.thepay.cz/bcfc271fe8e481b65ef58a16bcfed7f64935f71d2352a1def2913d82d8174cea/state', '2025-01-17 07:24:51'),
(198, 2131288489, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/db2057e0ecd2b10843446bd0033bdf71615acd599b589f68d74bda35537b8078/pay', 'https://demo.gate.thepay.cz/db2057e0ecd2b10843446bd0033bdf71615acd599b589f68d74bda35537b8078/state', '2025-01-17 07:24:52'),
(199, 208362075, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/7bad21a46d1a4634e17f402ada5d9f0befe474889eeaf675bcc6209ce6c592f9/pay', 'https://demo.gate.thepay.cz/7bad21a46d1a4634e17f402ada5d9f0befe474889eeaf675bcc6209ce6c592f9/state', '2025-01-17 07:24:52'),
(200, 1586274277, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/58054a9921dd489c851b7cc804adb13be4a116b229f1a6b83db285f4776115d1/pay', 'https://demo.gate.thepay.cz/58054a9921dd489c851b7cc804adb13be4a116b229f1a6b83db285f4776115d1/state', '2025-01-17 07:24:52'),
(201, 1017897534, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/654366a7e0972849db2999d3ebdf6fac7eb6bdf90938c9232865a2a4f3acd402/pay', 'https://demo.gate.thepay.cz/654366a7e0972849db2999d3ebdf6fac7eb6bdf90938c9232865a2a4f3acd402/state', '2025-01-17 07:24:52'),
(202, 817123269, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/abe816af45b31ef229c932dd5c8502ac996b1894c5d0884551dda4a8c072cbce/pay', 'https://demo.gate.thepay.cz/abe816af45b31ef229c932dd5c8502ac996b1894c5d0884551dda4a8c072cbce/state', '2025-01-17 07:24:53'),
(203, 1875981450, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/aaf56ca41d409e03389fd8607c27580615c319edd61c4cf85f89b4a6ef36749c/pay', 'https://demo.gate.thepay.cz/aaf56ca41d409e03389fd8607c27580615c319edd61c4cf85f89b4a6ef36749c/state', '2025-01-17 07:24:53'),
(204, 1628972054, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/14ae06c8e4fb6f60d023a0507c1b0667e9fe4105641854001676bf7e4c038d49/pay', 'https://demo.gate.thepay.cz/14ae06c8e4fb6f60d023a0507c1b0667e9fe4105641854001676bf7e4c038d49/state', '2025-01-17 07:24:53'),
(205, 761395087, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/2a16d5307e97f57aa609db05e5051702da7e4ebc358bf6f130679f57616ad64c/pay', 'https://demo.gate.thepay.cz/2a16d5307e97f57aa609db05e5051702da7e4ebc358bf6f130679f57616ad64c/state', '2025-01-17 07:24:53'),
(206, 1784530505, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/ecd9e47a237187d8e11f3071570f7709df01e82b1c45e104110ff70b5194606a/pay', 'https://demo.gate.thepay.cz/ecd9e47a237187d8e11f3071570f7709df01e82b1c45e104110ff70b5194606a/state', '2025-01-17 07:24:53'),
(207, 1321349472, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/0f87617d03dd4d00ccb0be4722d49da439bb5692fd00016acae59e0fad0cfa0a/pay', 'https://demo.gate.thepay.cz/0f87617d03dd4d00ccb0be4722d49da439bb5692fd00016acae59e0fad0cfa0a/state', '2025-01-17 07:27:48'),
(208, 437188455, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/a2fc133d5123d27fdad3f1068fd02a3131ef238f71ea2988f39551b3e7611f5e/pay', 'https://demo.gate.thepay.cz/a2fc133d5123d27fdad3f1068fd02a3131ef238f71ea2988f39551b3e7611f5e/state', '2025-01-17 07:34:30'),
(209, 762890887, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/bccd77ba0b333021dacb7304848d3ae632b4e030e5701e0d37f26cb06b60b71f/pay', 'https://demo.gate.thepay.cz/bccd77ba0b333021dacb7304848d3ae632b4e030e5701e0d37f26cb06b60b71f/state', '2025-01-17 07:34:31'),
(210, 1308877583, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/8ef3f1fb96f8d9e5065ffaaae3e659317384029d695a5c9d4a41555a84b491ba/pay', 'https://demo.gate.thepay.cz/8ef3f1fb96f8d9e5065ffaaae3e659317384029d695a5c9d4a41555a84b491ba/state', '2025-01-17 07:34:31'),
(211, 970422933, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/6e2cb2a5e8f02f44ac24641c1d042d30cea14077c231792e5f3a13c7eb6b2700/pay', 'https://demo.gate.thepay.cz/6e2cb2a5e8f02f44ac24641c1d042d30cea14077c231792e5f3a13c7eb6b2700/state', '2025-01-17 07:34:31'),
(212, 1088905634, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/0b83756a27d9250016caf4eff09d7190991bc8fb5104d015f91d1c095586daad/pay', 'https://demo.gate.thepay.cz/0b83756a27d9250016caf4eff09d7190991bc8fb5104d015f91d1c095586daad/state', '2025-01-17 08:02:02'),
(213, 1338739675, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/2310edade73d0846adf5fc1601631efeae923e9d938fd88b61ecef99ccb37a8a/pay', 'https://demo.gate.thepay.cz/2310edade73d0846adf5fc1601631efeae923e9d938fd88b61ecef99ccb37a8a/state', '2025-01-17 08:02:11'),
(214, 1426660373, 'thePay', b'0', 7900, 0, b'0', 'https://demo.gate.thepay.cz/93b43cb402f3d5037a6e4794a4a9e10ef379a6c7c3350b67bbc27f884840c81a/pay', 'https://demo.gate.thepay.cz/93b43cb402f3d5037a6e4794a4a9e10ef379a6c7c3350b67bbc27f884840c81a/state', '2025-01-17 08:02:17'),
(215, 354353954, 'thePay', b'0', 55400, 0, b'1', 'https://demo.gate.thepay.cz/f7661f8ca5da475932bc594ca382bf4f7beb9254615348962c49854e1276575c/pay', 'https://demo.gate.thepay.cz/f7661f8ca5da475932bc594ca382bf4f7beb9254615348962c49854e1276575c/state', '2025-01-17 08:57:41'),
(216, 739920963, 'thePay', b'0', 57900, 0, b'0', 'https://demo.gate.thepay.cz/7e36334c0e533dccb8a8cead1a8dbd7a91ead04ea73b8505d5e21c965d06edce/pay', 'https://demo.gate.thepay.cz/7e36334c0e533dccb8a8cead1a8dbd7a91ead04ea73b8505d5e21c965d06edce/state', '2025-01-20 07:45:02'),
(217, 1366014601, 'thePay', b'0', 55400, 0, b'0', 'https://demo.gate.thepay.cz/bf76a7ad67084f802551a88e323e27972de6a54b8578829e896d15bd9f55b8d9/pay', 'https://demo.gate.thepay.cz/bf76a7ad67084f802551a88e323e27972de6a54b8578829e896d15bd9f55b8d9/state', '2025-01-21 11:21:39'),
(218, 1815791257, 'thePay', b'0', 25700, 0, b'1', 'https://demo.gate.thepay.cz/7db38e2236ecd586f234845635d73dfe3781195f39e9eea5690abf0d3292f135/pay', 'https://demo.gate.thepay.cz/7db38e2236ecd586f234845635d73dfe3781195f39e9eea5690abf0d3292f135/state', '2025-01-22 06:53:54'),
(219, 1628577911, 'thePay', b'0', 55400, 0, b'0', 'https://demo.gate.thepay.cz/992825eaac52545ae3b93529a19d97e632157a7dfcfbfcdf3b0f692c91d90f53/pay', 'https://demo.gate.thepay.cz/992825eaac52545ae3b93529a19d97e632157a7dfcfbfcdf3b0f692c91d90f53/state', '2025-01-22 07:01:26'),
(220, 1974457701, 'thePay', b'0', 31600, 0, b'1', 'https://demo.gate.thepay.cz/bf6d1f027e3c51493cc29aff805fd4b221f063f0ff49deac67768e92aa82e86a/pay', 'https://demo.gate.thepay.cz/bf6d1f027e3c51493cc29aff805fd4b221f063f0ff49deac67768e92aa82e86a/state', '2025-01-22 13:35:54'),
(221, 364095797, 'thePay', b'0', 16400, 0, b'1', 'https://demo.gate.thepay.cz/a3dfc70076a127b653f780ff2451281c2966deaab34ccf3261db08cbe98de991/pay', 'https://demo.gate.thepay.cz/a3dfc70076a127b653f780ff2451281c2966deaab34ccf3261db08cbe98de991/state', '2025-01-24 09:50:25'),
(222, 1176010258, 'thePay', b'0', 16800, 0, b'0', 'https://demo.gate.thepay.cz/d89ae4f6fcb2cdbbd4035bf40c7ae0ee3cecad8e481747c4a444f0cd38c20c52/pay', 'https://demo.gate.thepay.cz/d89ae4f6fcb2cdbbd4035bf40c7ae0ee3cecad8e481747c4a444f0cd38c20c52/state', '2025-01-24 18:32:08'),
(223, 678789070, 'thePay', b'0', 36200, 0, b'0', 'https://demo.gate.thepay.cz/5a07960196b3e5016fde3b5ed54d3e0f4ed4cdb3ef0321e1c17a48215c143a9b/pay', 'https://demo.gate.thepay.cz/5a07960196b3e5016fde3b5ed54d3e0f4ed4cdb3ef0321e1c17a48215c143a9b/state', '2025-01-29 12:19:49'),
(224, 1780713637, 'thePay', b'0', 7900, 0, b'1', 'https://demo.gate.thepay.cz/0c875d0afc2f49c408947d5479f901f84936ac9e8b881ebdac4b948743f06fa6/pay', 'https://demo.gate.thepay.cz/0c875d0afc2f49c408947d5479f901f84936ac9e8b881ebdac4b948743f06fa6/state', '2025-02-06 09:10:15'),
(225, 688731800, 'thePay', b'0', 6900, 0, b'1', 'https://demo.gate.thepay.cz/80cd8ad080e2eb778126a6fd958c808a645f65fbae8b3da59ac4b3c8e1b7d133/pay', 'https://demo.gate.thepay.cz/80cd8ad080e2eb778126a6fd958c808a645f65fbae8b3da59ac4b3c8e1b7d133/state', '2025-02-07 06:44:20'),
(226, 1662113119, 'thePay', b'0', 6900, 0, b'1', 'https://demo.gate.thepay.cz/62c3ce3305335358ba4d3393f0d6ac8ed9e8316df0f10536b5dfc002cb3fe52b/pay', 'https://demo.gate.thepay.cz/62c3ce3305335358ba4d3393f0d6ac8ed9e8316df0f10536b5dfc002cb3fe52b/state', '2025-02-07 06:46:51'),
(227, 460212496, 'thePay', b'0', 27600, 0, b'1', 'https://demo.gate.thepay.cz/a3ec75bba4bf7d5e3d9174e708aa1f89697b9c7c56dba33d6b23949dbb813877/pay', 'https://demo.gate.thepay.cz/a3ec75bba4bf7d5e3d9174e708aa1f89697b9c7c56dba33d6b23949dbb813877/state', '2025-02-07 07:59:16'),
(228, 1687534505, 'thePay', b'0', 16800, 0, b'1', 'https://demo.gate.thepay.cz/eafd86712c05062794407f52f55c231fb4a0149b4939aa3df545299169041546/pay', 'https://demo.gate.thepay.cz/eafd86712c05062794407f52f55c231fb4a0149b4939aa3df545299169041546/state', '2025-02-07 09:27:22'),
(229, 49005259, 'thePay', b'0', 8900, 0, b'1', 'https://demo.gate.thepay.cz/895120500bd0e15c359e5559b9c0df6afa60df011cd1e4c4a59141aa3ea374b9/pay', 'https://demo.gate.thepay.cz/895120500bd0e15c359e5559b9c0df6afa60df011cd1e4c4a59141aa3ea374b9/state', '2025-02-09 13:40:28'),
(230, 1565934018, 'thePay', b'0', 6900, 0, b'1', 'https://demo.gate.thepay.cz/951ec8b9f470a5d3f6c563af872516ff7548677b730f2cd29589ccb066196220/pay', 'https://demo.gate.thepay.cz/951ec8b9f470a5d3f6c563af872516ff7548677b730f2cd29589ccb066196220/state', '2025-02-14 06:46:18'),
(231, 670134044, 'thePay', b'0', 6900, 0, b'1', 'https://demo.gate.thepay.cz/a125f40c2174123cb45c363a28c149c6817323a4b939da377708beb0df16a4f0/pay', 'https://demo.gate.thepay.cz/a125f40c2174123cb45c363a28c149c6817323a4b939da377708beb0df16a4f0/state', '2025-02-14 06:47:15'),
(232, 933099504, 'thePay', b'0', 17400, 0, b'1', 'https://demo.gate.thepay.cz/cb68179bcc40e57a9ce88766d79ffc39f91585d00e0add2bfb868757ed90afc5/pay', 'https://demo.gate.thepay.cz/cb68179bcc40e57a9ce88766d79ffc39f91585d00e0add2bfb868757ed90afc5/state', '2025-02-14 07:03:04'),
(233, 1832605546, 'thePay', b'0', 27700, 0, b'1', 'https://demo.gate.thepay.cz/5edbf83c24d979134ff5be2e5c99f5e9900cb6a24eff6b4077c24f84ebafc269/pay', 'https://demo.gate.thepay.cz/5edbf83c24d979134ff5be2e5c99f5e9900cb6a24eff6b4077c24f84ebafc269/state', '2025-02-14 08:05:53'),
(234, 741000472, 'thePay', b'0', 18800, 0, b'1', 'https://demo.gate.thepay.cz/c5299d8d000050c122bc84fbb6fb3b0f2f3b474cf68e8fd2bf4b2db4e5e6837f/pay', 'https://demo.gate.thepay.cz/c5299d8d000050c122bc84fbb6fb3b0f2f3b474cf68e8fd2bf4b2db4e5e6837f/state', '2025-02-14 13:56:16'),
(235, 828465856, 'thePay', b'0', 18800, 0, b'1', 'https://demo.gate.thepay.cz/00de862c7d040efe52c51b6d6fd178cee5832f010b4443be907d03dbc97d57e0/pay', 'https://demo.gate.thepay.cz/00de862c7d040efe52c51b6d6fd178cee5832f010b4443be907d03dbc97d57e0/state', '2025-02-14 13:56:57'),
(236, 1490319314, 'thePay', b'0', 18800, 0, b'1', 'https://demo.gate.thepay.cz/06cbdb2aa5dc1e60b356ea93fae079d9d9442df12930c3fe4387be2cb6960a75/pay', 'https://demo.gate.thepay.cz/06cbdb2aa5dc1e60b356ea93fae079d9d9442df12930c3fe4387be2cb6960a75/state', '2025-02-14 13:57:45'),
(237, 1272524531, 'thePay', b'0', 6900, 0, b'0', 'https://demo.gate.thepay.cz/48adf6b32187721183e4c88ac50f068e81d52211b886ae3af76e27d722a0c967/pay', 'https://demo.gate.thepay.cz/48adf6b32187721183e4c88ac50f068e81d52211b886ae3af76e27d722a0c967/state', '2025-02-14 14:16:49'),
(238, 1342049205, 'thePay', b'0', 6900, 0, b'0', 'https://demo.gate.thepay.cz/8b4eaf0af1775263bd75626a560ab94e4b6f430bbef8da46a8feba03234cfded/pay', 'https://demo.gate.thepay.cz/8b4eaf0af1775263bd75626a560ab94e4b6f430bbef8da46a8feba03234cfded/state', '2025-02-14 14:17:42'),
(239, 1977679844, 'thePay', b'0', 6900, 0, b'0', 'https://demo.gate.thepay.cz/458187ea05e1c57568857c0086f2807d61f549adcd1c75ae0b53fb4c6054278a/pay', 'https://demo.gate.thepay.cz/458187ea05e1c57568857c0086f2807d61f549adcd1c75ae0b53fb4c6054278a/state', '2025-02-14 14:22:36'),
(240, 789954311, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/3c86109dc88a16eae132638021832fa1ef16a13ffd8c6355f0082401843fa942/pay', 'https://demo.gate.thepay.cz/3c86109dc88a16eae132638021832fa1ef16a13ffd8c6355f0082401843fa942/state', '2025-02-14 14:28:45'),
(241, 254785616, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/1c69c61639592645e79b2086b36865e61768af364030361f43f2d95c078e2f2b/pay', 'https://demo.gate.thepay.cz/1c69c61639592645e79b2086b36865e61768af364030361f43f2d95c078e2f2b/state', '2025-02-14 14:29:18'),
(242, 454827838, 'thePay', b'0', 18800, 0, b'1', 'https://demo.gate.thepay.cz/f03bbf4f83f8b11be13eb2a0254257cc5846f1b552f2f98ac9033b9fe884aa79/pay', 'https://demo.gate.thepay.cz/f03bbf4f83f8b11be13eb2a0254257cc5846f1b552f2f98ac9033b9fe884aa79/state', '2025-02-14 14:31:41'),
(243, 1454480811, 'thePay', b'0', 18800, 0, b'1', 'https://demo.gate.thepay.cz/e29b801807a4cfc0b377534c967b00fa04dfce139523a016b8867da7b85a0b66/pay', 'https://demo.gate.thepay.cz/e29b801807a4cfc0b377534c967b00fa04dfce139523a016b8867da7b85a0b66/state', '2025-02-15 15:43:34'),
(244, 687337812, 'thePay', b'0', 18800, 0, b'1', 'https://demo.gate.thepay.cz/5051ad04cfe303e5dddd3262f6bfd70d6bd8111cb7eb346394a220b0815ccf13/pay', 'https://demo.gate.thepay.cz/5051ad04cfe303e5dddd3262f6bfd70d6bd8111cb7eb346394a220b0815ccf13/state', '2025-02-15 15:49:31'),
(245, 1089915262, 'thePay', b'0', 18800, 0, b'1', 'https://demo.gate.thepay.cz/4bbb67bcaf3a4e39341e5d9ff51950f936d6bfb01aa724aeaedd806c246c3a8a/pay', 'https://demo.gate.thepay.cz/4bbb67bcaf3a4e39341e5d9ff51950f936d6bfb01aa724aeaedd806c246c3a8a/state', '2025-02-15 15:50:25'),
(246, 1564475091, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/65f8800b6a2f2ec26debae0d7dceb576a7ee3ab71db0cc3def34bc458a16ca1b/pay', 'https://demo.gate.thepay.cz/65f8800b6a2f2ec26debae0d7dceb576a7ee3ab71db0cc3def34bc458a16ca1b/state', '2025-02-15 17:28:17'),
(247, 1172109414, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/c78063025b4692cae61c52a7111dd74485240b4bcd6040a02645fbc3af90deb3/pay', 'https://demo.gate.thepay.cz/c78063025b4692cae61c52a7111dd74485240b4bcd6040a02645fbc3af90deb3/state', '2025-02-15 17:34:07'),
(248, 1516899377, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/578492661e5a2c111d4b6738a4ab751ff44c5a49a03a598f3649994c44b410e9/pay', 'https://demo.gate.thepay.cz/578492661e5a2c111d4b6738a4ab751ff44c5a49a03a598f3649994c44b410e9/state', '2025-02-15 17:35:08'),
(249, 955055211, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/0e29fabdef7f91599e500be9a7cef6fccf945df4d90fae02cb6d3fb7277209ca/pay', 'https://demo.gate.thepay.cz/0e29fabdef7f91599e500be9a7cef6fccf945df4d90fae02cb6d3fb7277209ca/state', '2025-02-15 17:35:18'),
(250, 1226017010, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/0f9368edd37d36c8bb5c0160f85603edb128bf9d9cf7bb5f86b767bec31f598e/pay', 'https://demo.gate.thepay.cz/0f9368edd37d36c8bb5c0160f85603edb128bf9d9cf7bb5f86b767bec31f598e/state', '2025-02-15 17:35:30'),
(251, 2029896536, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/a98956791dc2a856a30dc8f97bcbc8b89052328a8e8d56436dc528da6f6c0116/pay', 'https://demo.gate.thepay.cz/a98956791dc2a856a30dc8f97bcbc8b89052328a8e8d56436dc528da6f6c0116/state', '2025-02-15 17:36:26'),
(252, 720773125, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/84513c0fdf6908ff736b2c668c6a640dce0d12c6f1ffadfd3378270915859d46/pay', 'https://demo.gate.thepay.cz/84513c0fdf6908ff736b2c668c6a640dce0d12c6f1ffadfd3378270915859d46/state', '2025-02-15 17:36:32'),
(253, 1890571512, 'thePay', b'0', 18800, 0, b'1', 'https://demo.gate.thepay.cz/9acd352f085907b6f08c658355afc39f1a27215c96487d7d4c1ff06f265ed2bf/pay', 'https://demo.gate.thepay.cz/9acd352f085907b6f08c658355afc39f1a27215c96487d7d4c1ff06f265ed2bf/state', '2025-02-15 17:39:19'),
(254, 426999136, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/4813e154451113ecb1507b0b34b5aa6b88ea2c40ccb4654517714a567b73c26f/pay', 'https://demo.gate.thepay.cz/4813e154451113ecb1507b0b34b5aa6b88ea2c40ccb4654517714a567b73c26f/state', '2025-02-15 17:40:36'),
(255, 1548172574, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/31d8c63ea0c4ca3ed6bb059fe0de310b69e1046895188e12db22151edd0d4ab6/pay', 'https://demo.gate.thepay.cz/31d8c63ea0c4ca3ed6bb059fe0de310b69e1046895188e12db22151edd0d4ab6/state', '2025-02-15 17:40:57'),
(256, 1715247448, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/13a56d165a85d7018b96bbc47d9f6ad3e860b2f30235094097eacf53f3029f12/pay', 'https://demo.gate.thepay.cz/13a56d165a85d7018b96bbc47d9f6ad3e860b2f30235094097eacf53f3029f12/state', '2025-02-15 17:47:17'),
(257, 601037633, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/bc0ca65bcdde8165492641bf21e8b27d2b265adebea80e73399f35271d301607/pay', 'https://demo.gate.thepay.cz/bc0ca65bcdde8165492641bf21e8b27d2b265adebea80e73399f35271d301607/state', '2025-02-15 17:47:28'),
(258, 705981442, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/b57600596a647aafa4c9645cf52d1aca0d93d03b860f82bde9d50109555a6ddb/pay', 'https://demo.gate.thepay.cz/b57600596a647aafa4c9645cf52d1aca0d93d03b860f82bde9d50109555a6ddb/state', '2025-02-15 17:47:56'),
(259, 2056414896, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/a2a7ecf3c0310e4f086e3b892002d799a8b801e4b7fe18f49eb7f328f023316d/pay', 'https://demo.gate.thepay.cz/a2a7ecf3c0310e4f086e3b892002d799a8b801e4b7fe18f49eb7f328f023316d/state', '2025-02-15 17:48:33'),
(260, 457736837, 'thePay', b'0', 18800, 0, b'1', 'https://demo.gate.thepay.cz/4681dabe6e955abab69d55f625c9c6055780d41839b53001aacef51982c3ae6c/pay', 'https://demo.gate.thepay.cz/4681dabe6e955abab69d55f625c9c6055780d41839b53001aacef51982c3ae6c/state', '2025-02-15 17:51:56'),
(261, 1744959089, 'thePay', b'0', 25700, 0, b'1', 'https://demo.gate.thepay.cz/3aa5e27a3eb18ded8e96c2d72af78a7015959a114e0ec734b085eb43bcc18edb/pay', 'https://demo.gate.thepay.cz/3aa5e27a3eb18ded8e96c2d72af78a7015959a114e0ec734b085eb43bcc18edb/state', '2025-02-15 17:59:45'),
(262, 283055428, 'thePay', b'0', 18800, 0, b'0', 'https://demo.gate.thepay.cz/696a4402fcd182516b9e307ecdaecbf521eff1d6b73d06e957476be2f50be648/pay', 'https://demo.gate.thepay.cz/696a4402fcd182516b9e307ecdaecbf521eff1d6b73d06e957476be2f50be648/state', '2025-02-15 18:02:54'),
(263, 126112018, 'thePay', b'0', 25700, 0, b'1', 'https://demo.gate.thepay.cz/83134b3414b962d649b8b753ae47cd066552d6da35102dbc2a0e310c42f3e95c/pay', 'https://demo.gate.thepay.cz/83134b3414b962d649b8b753ae47cd066552d6da35102dbc2a0e310c42f3e95c/state', '2025-02-15 18:06:42'),
(264, 608919475, 'thePay', b'0', 25700, 0, b'1', 'https://demo.gate.thepay.cz/f61fa71f1e0e14e5143e811478afc33414c2422bbaa5eaa5f1eaca99eddb022e/pay', 'https://demo.gate.thepay.cz/f61fa71f1e0e14e5143e811478afc33414c2422bbaa5eaa5f1eaca99eddb022e/state', '2025-02-15 18:08:21'),
(265, 296927526, 'thePay', b'0', 8900, 0, b'1', 'https://demo.gate.thepay.cz/cb93367f3be80ea53219626e57bfe6832a0d7a888caec88724939030734f885a/pay', 'https://demo.gate.thepay.cz/cb93367f3be80ea53219626e57bfe6832a0d7a888caec88724939030734f885a/state', '2025-02-15 18:34:06'),
(266, 1476466524, 'thePay', b'0', 8900, 0, b'1', 'https://demo.gate.thepay.cz/cc0699f3ad417d420936e09e62d4cde6537e50dff75003caeab016c4175ecc4d/pay', 'https://demo.gate.thepay.cz/cc0699f3ad417d420936e09e62d4cde6537e50dff75003caeab016c4175ecc4d/state', '2025-02-15 18:36:37'),
(267, 1958613145, 'thePay', b'0', 8900, 0, b'1', 'https://demo.gate.thepay.cz/6cf16cb1bca977e81f657aeabb0fde3add90420685d660e449c09742ac3965af/pay', 'https://demo.gate.thepay.cz/6cf16cb1bca977e81f657aeabb0fde3add90420685d660e449c09742ac3965af/state', '2025-02-17 11:37:19'),
(268, 1041738613, 'thePay', b'0', 8900, 0, b'1', 'https://demo.gate.thepay.cz/8051d456eb7db752ed58a61c730d74bb32cde5353f52592f132dbadb80d589f1/pay', 'https://demo.gate.thepay.cz/8051d456eb7db752ed58a61c730d74bb32cde5353f52592f132dbadb80d589f1/state', '2025-02-17 12:18:44'),
(269, 1793699236, 'thePay', b'0', 6900, 0, b'0', 'https://demo.gate.thepay.cz/77ef27a982db9abedbe24bb4f95c5499f8d2e58a3578fdc44aa38d09f1de9ab9/pay', 'https://demo.gate.thepay.cz/77ef27a982db9abedbe24bb4f95c5499f8d2e58a3578fdc44aa38d09f1de9ab9/state', '2025-02-17 14:57:03'),
(270, 1707687329, 'thePay', b'0', 9900, 0, b'1', 'https://demo.gate.thepay.cz/d02db9cff9d9c175360f88be17585c026eef8089c3491a753496f9adcf11cb71/pay', 'https://demo.gate.thepay.cz/d02db9cff9d9c175360f88be17585c026eef8089c3491a753496f9adcf11cb71/state', '2025-02-17 16:26:20'),
(271, 275037065, 'thePay', b'0', 6900, 0, b'0', 'https://demo.gate.thepay.cz/b895a62f602e408466243b20b85ebf11760f2f1ab81be7d3e1ed225d43f7df7e/pay', 'https://demo.gate.thepay.cz/b895a62f602e408466243b20b85ebf11760f2f1ab81be7d3e1ed225d43f7df7e/state', '2025-02-17 16:49:51'),
(272, 499561804, 'thePay', b'0', 6900, 0, b'0', 'https://demo.gate.thepay.cz/291b5e80850b47c2b0ebfa07888122c6bfa427867046c625a9f778cc016566ca/pay', 'https://demo.gate.thepay.cz/291b5e80850b47c2b0ebfa07888122c6bfa427867046c625a9f778cc016566ca/state', '2025-02-17 16:53:54'),
(273, 409701434, 'thePay', b'0', 6900, 0, b'0', 'https://demo.gate.thepay.cz/2ec707c8759bcefe4f04f2d95f66be719e04da4c8ac14be14dde09ce37c15cc8/pay', 'https://demo.gate.thepay.cz/2ec707c8759bcefe4f04f2d95f66be719e04da4c8ac14be14dde09ce37c15cc8/state', '2025-02-17 16:54:30'),
(274, 1305032514, 'thePay', b'0', 6900, 0, b'0', 'https://demo.gate.thepay.cz/ca616803da7e9fdcfb8630ad476fa4b187e860a88a41a5e347b73da2116be9a6/pay', 'https://demo.gate.thepay.cz/ca616803da7e9fdcfb8630ad476fa4b187e860a88a41a5e347b73da2116be9a6/state', '2025-02-17 16:55:00'),
(275, 2032263588, 'thePay', b'0', 6900, 0, b'0', 'https://demo.gate.thepay.cz/cc0d34ccdebd73b908a1cedcd41bdbfdf69f83bd7f900ba1719e640e48924187/pay', 'https://demo.gate.thepay.cz/cc0d34ccdebd73b908a1cedcd41bdbfdf69f83bd7f900ba1719e640e48924187/state', '2025-02-17 17:06:40'),
(276, 1168609127, 'thePay', b'0', 6900, 0, b'0', 'https://demo.gate.thepay.cz/599fd427e60bca2daf1cd2186afc501c4304864688fc4d977c47b4e22aa36284/pay', 'https://demo.gate.thepay.cz/599fd427e60bca2daf1cd2186afc501c4304864688fc4d977c47b4e22aa36284/state', '2025-02-17 17:10:22'),
(277, 535143785, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/84d1b3240a2cf95db3427e70f8973d0a16dd02feab74f86c9659954858ed8319/pay', 'https://demo.gate.thepay.cz/84d1b3240a2cf95db3427e70f8973d0a16dd02feab74f86c9659954858ed8319/state', '2025-02-17 17:20:49'),
(278, 1862478940, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/f5f84b151dfdb56077b094e739c32a3623c627801ac60983f5213aa1100118a1/pay', 'https://demo.gate.thepay.cz/f5f84b151dfdb56077b094e739c32a3623c627801ac60983f5213aa1100118a1/state', '2025-02-17 17:22:52'),
(279, 1571020588, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/fbc123084ed204b137f058e22efc303fc102e784e187557896f2f3e672b731fd/pay', 'https://demo.gate.thepay.cz/fbc123084ed204b137f058e22efc303fc102e784e187557896f2f3e672b731fd/state', '2025-02-17 17:22:58'),
(280, 2018519924, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/3059441832ac4432eb56bc39f2d04e3638cfeb0cfcfe6c933965e91d2a4c6bed/pay', 'https://demo.gate.thepay.cz/3059441832ac4432eb56bc39f2d04e3638cfeb0cfcfe6c933965e91d2a4c6bed/state', '2025-02-17 17:25:30'),
(281, 1858427979, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/f3c28701864676ece300e91ed8a56e012655f9e10edd548c9992010965795217/pay', 'https://demo.gate.thepay.cz/f3c28701864676ece300e91ed8a56e012655f9e10edd548c9992010965795217/state', '2025-02-17 17:25:52'),
(282, 705504199, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/760463964d58f7aaafc2971caea2ed5ec3de0040584fab5753f11d82d0d900d4/pay', 'https://demo.gate.thepay.cz/760463964d58f7aaafc2971caea2ed5ec3de0040584fab5753f11d82d0d900d4/state', '2025-02-17 17:34:12');
INSERT INTO `Payments` (`id`, `thePayId`, `type`, `useCredits`, `totalAmount`, `creditsAmount`, `paid`, `thePayUrl`, `thePayDetailsUrl`, `dateCreated`) VALUES
(283, 283878494, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/8b84df22fd686d2c2a29a640cc1247800baabc0f31ae6b668b5ef971e4c89685/pay', 'https://demo.gate.thepay.cz/8b84df22fd686d2c2a29a640cc1247800baabc0f31ae6b668b5ef971e4c89685/state', '2025-02-17 17:37:55'),
(284, 1798342662, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/fd1eceadc88ba5d00fa55ffdec2943805d74984bbf4da817f511f5c3e04e6d62/pay', 'https://demo.gate.thepay.cz/fd1eceadc88ba5d00fa55ffdec2943805d74984bbf4da817f511f5c3e04e6d62/state', '2025-02-17 17:38:28'),
(285, 156463821, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/be28eb2b2586605550459038733d42e930f78a368c4ab4ae921ae3c85f62ec14/pay', 'https://demo.gate.thepay.cz/be28eb2b2586605550459038733d42e930f78a368c4ab4ae921ae3c85f62ec14/state', '2025-02-17 17:39:54'),
(286, 1876158647, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/316fdc7f83c7d0441aa005b5be8aa0f01b3cdbce7749c8be0b7501bdf91a24aa/pay', 'https://demo.gate.thepay.cz/316fdc7f83c7d0441aa005b5be8aa0f01b3cdbce7749c8be0b7501bdf91a24aa/state', '2025-02-17 17:40:14'),
(287, 843794736, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/c871f2648e388ee3ce8a6c105a96e3370ae3c259835fc0cce44bbcb9b4d118ff/pay', 'https://demo.gate.thepay.cz/c871f2648e388ee3ce8a6c105a96e3370ae3c259835fc0cce44bbcb9b4d118ff/state', '2025-02-17 17:40:35'),
(288, 1036559773, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/4fc805194ac19626bda0a202cd94387b8cf449dfc699ec53f249e3a27636db1f/pay', 'https://demo.gate.thepay.cz/4fc805194ac19626bda0a202cd94387b8cf449dfc699ec53f249e3a27636db1f/state', '2025-02-17 17:42:06'),
(289, 2048860516, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/cdabaad0985c4d61f53624da65bbb2724465ac3780143ca78d3b257330132d6a/pay', 'https://demo.gate.thepay.cz/cdabaad0985c4d61f53624da65bbb2724465ac3780143ca78d3b257330132d6a/state', '2025-02-17 17:42:14'),
(290, 2040969480, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/94c8955a50de12005e88db8f5169d3a8bb0e2231c61cd06d32c7b769f5b4a459/pay', 'https://demo.gate.thepay.cz/94c8955a50de12005e88db8f5169d3a8bb0e2231c61cd06d32c7b769f5b4a459/state', '2025-02-17 17:42:21'),
(291, 1739428265, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/2b9758b937ae7ae90c2a0a2f65bde34ef09c96f7889f9c97f8e7da3afc28ade9/pay', 'https://demo.gate.thepay.cz/2b9758b937ae7ae90c2a0a2f65bde34ef09c96f7889f9c97f8e7da3afc28ade9/state', '2025-02-17 17:43:14'),
(292, 217173281, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/7ea7ee77809a23ea74bcbe91c1c4e9c390f28381a9496feaccbe3ffea460e1c7/pay', 'https://demo.gate.thepay.cz/7ea7ee77809a23ea74bcbe91c1c4e9c390f28381a9496feaccbe3ffea460e1c7/state', '2025-02-17 17:44:43'),
(293, 1144342346, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/9dd279527c1f55299bc2bff2422a7f87ca6da8c3820959664250adfa92010079/pay', 'https://demo.gate.thepay.cz/9dd279527c1f55299bc2bff2422a7f87ca6da8c3820959664250adfa92010079/state', '2025-02-17 17:45:12'),
(294, 880977145, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/5d7ca7ed34dae4af58e6d3fd71a7911f0cfb7dc0b869b28d630c1e3984896c4e/pay', 'https://demo.gate.thepay.cz/5d7ca7ed34dae4af58e6d3fd71a7911f0cfb7dc0b869b28d630c1e3984896c4e/state', '2025-02-17 17:54:22'),
(295, 661546399, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/5a0df60abb9c8bb207c8a8b910533ec40b6d13aa30b8e539c63ad491988cdb47/pay', 'https://demo.gate.thepay.cz/5a0df60abb9c8bb207c8a8b910533ec40b6d13aa30b8e539c63ad491988cdb47/state', '2025-02-17 18:10:19'),
(296, 63174968, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/bceb3aa9243c2fb5b7eae634431b7423106d84765581955ddbe18b78cb99f276/pay', 'https://demo.gate.thepay.cz/bceb3aa9243c2fb5b7eae634431b7423106d84765581955ddbe18b78cb99f276/state', '2025-02-17 18:10:39'),
(297, 80921995, 'thePay', b'0', 4900, 0, b'0', 'https://demo.gate.thepay.cz/a015dc2347326c2bd51baaa3a32f7f735e136b93948d6e6979c3a6572c60d133/pay', 'https://demo.gate.thepay.cz/a015dc2347326c2bd51baaa3a32f7f735e136b93948d6e6979c3a6572c60d133/state', '2025-02-17 18:11:30'),
(298, 1864956306, 'thePay', b'0', 6900, 0, b'0', 'https://demo.gate.thepay.cz/99506e611eec431de55f5d75f509e3ef65e5006a592b9eec3002a9063688751a/pay', 'https://demo.gate.thepay.cz/99506e611eec431de55f5d75f509e3ef65e5006a592b9eec3002a9063688751a/state', '2025-02-18 10:47:01');

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

--
-- Dumping data for table `Temp`
--

INSERT INTO `Temp` (`id`, `date`, `startTime`, `endTime`, `orderLimit`, `orderCount`) VALUES
(1, '2025-02-18', '08:00:00', '08:05:00', 5, 0),
(2, '2025-02-18', '08:05:00', '08:10:00', 5, 0),
(3, '2025-02-18', '08:10:00', '08:15:00', 5, 0),
(4, '2025-02-18', '08:15:00', '08:20:00', 5, 0),
(5, '2025-02-18', '08:20:00', '08:25:00', 5, 0),
(6, '2025-02-18', '08:25:00', '08:30:00', 5, 0),
(7, '2025-02-18', '08:30:00', '08:35:00', 5, 0),
(8, '2025-02-18', '08:35:00', '08:40:00', 5, 0),
(9, '2025-02-18', '08:40:00', '08:45:00', 5, 0),
(10, '2025-02-18', '08:45:00', '08:50:00', 5, 0),
(11, '2025-02-18', '08:50:00', '08:55:00', 5, 0),
(12, '2025-02-18', '08:55:00', '09:00:00', 5, 0),
(13, '2025-02-18', '09:00:00', '09:05:00', 5, 0),
(14, '2025-02-18', '09:05:00', '09:10:00', 5, 0),
(15, '2025-02-18', '09:10:00', '09:15:00', 5, 0),
(16, '2025-02-18', '09:15:00', '09:20:00', 5, 0),
(17, '2025-02-18', '09:20:00', '09:25:00', 5, 0),
(18, '2025-02-18', '09:25:00', '09:30:00', 5, 0),
(19, '2025-02-18', '09:30:00', '09:35:00', 5, 0),
(20, '2025-02-18', '09:35:00', '09:40:00', 5, 0),
(21, '2025-02-18', '09:40:00', '09:45:00', 5, 0),
(22, '2025-02-18', '09:45:00', '09:50:00', 5, 0),
(23, '2025-02-18', '09:50:00', '09:55:00', 5, 0),
(24, '2025-02-18', '09:55:00', '10:00:00', 5, 0),
(25, '2025-02-18', '10:00:00', '10:05:00', 5, 0),
(26, '2025-02-18', '10:05:00', '10:10:00', 5, 0),
(27, '2025-02-18', '10:10:00', '10:15:00', 5, 0),
(28, '2025-02-18', '10:15:00', '10:20:00', 5, 0),
(29, '2025-02-18', '10:20:00', '10:25:00', 5, 0),
(30, '2025-02-18', '10:25:00', '10:30:00', 5, 0),
(31, '2025-02-18', '10:30:00', '10:35:00', 5, 0),
(32, '2025-02-18', '10:35:00', '10:40:00', 5, 0),
(33, '2025-02-18', '10:40:00', '10:45:00', 5, 0),
(34, '2025-02-18', '10:45:00', '10:50:00', 5, 0),
(35, '2025-02-18', '10:50:00', '10:55:00', 5, 0),
(36, '2025-02-18', '10:55:00', '11:00:00', 5, 0),
(37, '2025-02-18', '11:00:00', '11:05:00', 5, 0),
(38, '2025-02-18', '11:05:00', '11:10:00', 5, 0),
(39, '2025-02-18', '11:10:00', '11:15:00', 5, 0),
(40, '2025-02-18', '11:15:00', '11:20:00', 5, 0),
(41, '2025-02-18', '11:20:00', '11:25:00', 5, 0),
(42, '2025-02-18', '11:25:00', '11:30:00', 5, 0),
(43, '2025-02-18', '11:30:00', '11:35:00', 5, 0),
(44, '2025-02-18', '11:35:00', '11:40:00', 5, 0),
(45, '2025-02-18', '11:40:00', '11:45:00', 5, 0),
(46, '2025-02-18', '11:45:00', '11:50:00', 5, 0),
(47, '2025-02-18', '11:50:00', '11:55:00', 5, 0),
(48, '2025-02-18', '11:55:00', '12:00:00', 5, 0),
(49, '2025-02-18', '12:00:00', '12:05:00', 5, 0),
(50, '2025-02-18', '12:05:00', '12:10:00', 5, 0),
(51, '2025-02-18', '12:10:00', '12:15:00', 5, 0),
(52, '2025-02-18', '12:15:00', '12:20:00', 5, 0),
(53, '2025-02-18', '12:20:00', '12:25:00', 5, 0),
(54, '2025-02-18', '12:25:00', '12:30:00', 5, 0),
(55, '2025-02-18', '12:30:00', '12:35:00', 5, 0),
(56, '2025-02-18', '12:35:00', '12:40:00', 5, 0),
(57, '2025-02-18', '12:40:00', '12:45:00', 5, 0),
(58, '2025-02-18', '12:45:00', '12:50:00', 5, 0),
(59, '2025-02-18', '12:50:00', '12:55:00', 5, 0),
(60, '2025-02-18', '12:55:00', '13:00:00', 5, 0),
(61, '2025-02-18', '13:00:00', '13:05:00', 5, 0),
(62, '2025-02-18', '13:05:00', '13:10:00', 5, 0),
(63, '2025-02-18', '13:10:00', '13:15:00', 5, 0),
(64, '2025-02-18', '13:15:00', '13:20:00', 5, 0),
(65, '2025-02-18', '13:20:00', '13:25:00', 5, 0),
(66, '2025-02-18', '13:25:00', '13:30:00', 5, 0),
(67, '2025-02-18', '13:30:00', '13:35:00', 5, 0),
(68, '2025-02-18', '13:35:00', '13:40:00', 5, 0),
(69, '2025-02-18', '13:40:00', '13:45:00', 5, 0),
(70, '2025-02-18', '13:45:00', '13:50:00', 5, 0),
(71, '2025-02-18', '13:50:00', '13:55:00', 5, 0),
(72, '2025-02-18', '13:55:00', '14:00:00', 5, 0),
(73, '2025-02-18', '14:00:00', '14:05:00', 5, 0),
(74, '2025-02-18', '14:05:00', '14:10:00', 5, 0),
(75, '2025-02-18', '14:10:00', '14:15:00', 5, 0),
(76, '2025-02-18', '14:15:00', '14:20:00', 5, 0),
(77, '2025-02-18', '14:20:00', '14:25:00', 5, 0),
(78, '2025-02-18', '14:25:00', '14:30:00', 5, 0),
(79, '2025-02-18', '14:30:00', '14:35:00', 5, 0),
(80, '2025-02-18', '14:35:00', '14:40:00', 5, 0),
(81, '2025-02-18', '14:40:00', '14:45:00', 5, 0),
(82, '2025-02-18', '14:45:00', '14:50:00', 5, 0),
(83, '2025-02-18', '14:50:00', '14:55:00', 5, 0),
(84, '2025-02-18', '14:55:00', '15:00:00', 5, 0),
(85, '2025-02-19', '08:00:00', '08:05:00', 5, 0),
(86, '2025-02-19', '08:05:00', '08:10:00', 5, 0),
(87, '2025-02-19', '08:10:00', '08:15:00', 5, 0),
(88, '2025-02-19', '08:15:00', '08:20:00', 5, 0),
(89, '2025-02-19', '08:20:00', '08:25:00', 5, 0),
(90, '2025-02-19', '08:25:00', '08:30:00', 5, 0),
(91, '2025-02-19', '08:30:00', '08:35:00', 5, 0),
(92, '2025-02-19', '08:35:00', '08:40:00', 5, 0),
(93, '2025-02-19', '08:40:00', '08:45:00', 5, 0),
(94, '2025-02-19', '08:45:00', '08:50:00', 5, 0),
(95, '2025-02-19', '08:50:00', '08:55:00', 5, 0),
(96, '2025-02-19', '08:55:00', '09:00:00', 5, 0),
(97, '2025-02-19', '09:00:00', '09:05:00', 5, 0),
(98, '2025-02-19', '09:05:00', '09:10:00', 5, 0),
(99, '2025-02-19', '09:10:00', '09:15:00', 5, 0),
(100, '2025-02-19', '09:15:00', '09:20:00', 5, 0),
(101, '2025-02-19', '09:20:00', '09:25:00', 5, 0),
(102, '2025-02-19', '09:25:00', '09:30:00', 5, 0),
(103, '2025-02-19', '09:30:00', '09:35:00', 5, 0),
(104, '2025-02-19', '09:35:00', '09:40:00', 5, 0),
(105, '2025-02-19', '09:40:00', '09:45:00', 5, 0),
(106, '2025-02-19', '09:45:00', '09:50:00', 5, 0),
(107, '2025-02-19', '09:50:00', '09:55:00', 5, 0),
(108, '2025-02-19', '09:55:00', '10:00:00', 5, 0),
(109, '2025-02-19', '10:00:00', '10:05:00', 5, 0),
(110, '2025-02-19', '10:05:00', '10:10:00', 5, 0),
(111, '2025-02-19', '10:10:00', '10:15:00', 5, 0),
(112, '2025-02-19', '10:15:00', '10:20:00', 5, 0),
(113, '2025-02-19', '10:20:00', '10:25:00', 5, 0),
(114, '2025-02-19', '10:25:00', '10:30:00', 5, 0),
(115, '2025-02-19', '10:30:00', '10:35:00', 5, 0),
(116, '2025-02-19', '10:35:00', '10:40:00', 5, 0),
(117, '2025-02-19', '10:40:00', '10:45:00', 5, 0),
(118, '2025-02-19', '10:45:00', '10:50:00', 5, 0),
(119, '2025-02-19', '10:50:00', '10:55:00', 5, 0),
(120, '2025-02-19', '10:55:00', '11:00:00', 5, 0),
(121, '2025-02-19', '11:00:00', '11:05:00', 5, 0),
(122, '2025-02-19', '11:05:00', '11:10:00', 5, 0),
(123, '2025-02-19', '11:10:00', '11:15:00', 5, 0),
(124, '2025-02-19', '11:15:00', '11:20:00', 5, 0),
(125, '2025-02-19', '11:20:00', '11:25:00', 5, 0),
(126, '2025-02-19', '11:25:00', '11:30:00', 5, 0),
(127, '2025-02-19', '11:30:00', '11:35:00', 5, 0),
(128, '2025-02-19', '11:35:00', '11:40:00', 5, 0),
(129, '2025-02-19', '11:40:00', '11:45:00', 5, 0),
(130, '2025-02-19', '11:45:00', '11:50:00', 5, 0),
(131, '2025-02-19', '11:50:00', '11:55:00', 5, 0),
(132, '2025-02-19', '11:55:00', '12:00:00', 5, 0),
(133, '2025-02-19', '12:00:00', '12:05:00', 5, 0),
(134, '2025-02-19', '12:05:00', '12:10:00', 5, 0),
(135, '2025-02-19', '12:10:00', '12:15:00', 5, 0),
(136, '2025-02-19', '12:15:00', '12:20:00', 5, 0),
(137, '2025-02-19', '12:20:00', '12:25:00', 5, 0),
(138, '2025-02-19', '12:25:00', '12:30:00', 5, 0),
(139, '2025-02-19', '12:30:00', '12:35:00', 5, 0),
(140, '2025-02-19', '12:35:00', '12:40:00', 5, 0),
(141, '2025-02-19', '12:40:00', '12:45:00', 5, 0),
(142, '2025-02-19', '12:45:00', '12:50:00', 5, 0),
(143, '2025-02-19', '12:50:00', '12:55:00', 5, 0),
(144, '2025-02-19', '12:55:00', '13:00:00', 5, 0),
(145, '2025-02-19', '13:00:00', '13:05:00', 5, 0),
(146, '2025-02-19', '13:05:00', '13:10:00', 5, 0),
(147, '2025-02-19', '13:10:00', '13:15:00', 5, 0),
(148, '2025-02-19', '13:15:00', '13:20:00', 5, 0),
(149, '2025-02-19', '13:20:00', '13:25:00', 5, 0),
(150, '2025-02-19', '13:25:00', '13:30:00', 5, 0),
(151, '2025-02-19', '13:30:00', '13:35:00', 5, 0),
(152, '2025-02-19', '13:35:00', '13:40:00', 5, 0),
(153, '2025-02-19', '13:40:00', '13:45:00', 5, 0),
(154, '2025-02-19', '13:45:00', '13:50:00', 5, 0),
(155, '2025-02-19', '13:50:00', '13:55:00', 5, 0),
(156, '2025-02-19', '13:55:00', '14:00:00', 5, 0),
(157, '2025-02-19', '14:00:00', '14:05:00', 5, 0),
(158, '2025-02-19', '14:05:00', '14:10:00', 5, 0),
(159, '2025-02-19', '14:10:00', '14:15:00', 5, 0),
(160, '2025-02-19', '14:15:00', '14:20:00', 5, 0),
(161, '2025-02-19', '14:20:00', '14:25:00', 5, 0),
(162, '2025-02-19', '14:25:00', '14:30:00', 5, 0),
(163, '2025-02-19', '14:30:00', '14:35:00', 5, 0),
(164, '2025-02-19', '14:35:00', '14:40:00', 5, 0),
(165, '2025-02-19', '14:40:00', '14:45:00', 5, 0),
(166, '2025-02-19', '14:45:00', '14:50:00', 5, 0),
(167, '2025-02-19', '14:50:00', '14:55:00', 5, 0),
(168, '2025-02-19', '14:55:00', '15:00:00', 5, 0),
(169, '2025-02-20', '08:00:00', '08:05:00', 5, 0),
(170, '2025-02-20', '08:05:00', '08:10:00', 5, 0),
(171, '2025-02-20', '08:10:00', '08:15:00', 5, 0),
(172, '2025-02-20', '08:15:00', '08:20:00', 5, 0),
(173, '2025-02-20', '08:20:00', '08:25:00', 5, 0),
(174, '2025-02-20', '08:25:00', '08:30:00', 5, 0),
(175, '2025-02-20', '08:30:00', '08:35:00', 5, 0),
(176, '2025-02-20', '08:35:00', '08:40:00', 5, 0),
(177, '2025-02-20', '08:40:00', '08:45:00', 5, 0),
(178, '2025-02-20', '08:45:00', '08:50:00', 5, 0),
(179, '2025-02-20', '08:50:00', '08:55:00', 5, 0),
(180, '2025-02-20', '08:55:00', '09:00:00', 5, 0),
(181, '2025-02-20', '09:00:00', '09:05:00', 5, 0),
(182, '2025-02-20', '09:05:00', '09:10:00', 5, 0),
(183, '2025-02-20', '09:10:00', '09:15:00', 5, 0),
(184, '2025-02-20', '09:15:00', '09:20:00', 5, 0),
(185, '2025-02-20', '09:20:00', '09:25:00', 5, 0),
(186, '2025-02-20', '09:25:00', '09:30:00', 5, 0),
(187, '2025-02-20', '09:30:00', '09:35:00', 5, 0),
(188, '2025-02-20', '09:35:00', '09:40:00', 5, 0),
(189, '2025-02-20', '09:40:00', '09:45:00', 5, 0),
(190, '2025-02-20', '09:45:00', '09:50:00', 5, 0),
(191, '2025-02-20', '09:50:00', '09:55:00', 5, 0),
(192, '2025-02-20', '09:55:00', '10:00:00', 5, 0),
(193, '2025-02-20', '10:00:00', '10:05:00', 5, 0),
(194, '2025-02-20', '10:05:00', '10:10:00', 5, 0),
(195, '2025-02-20', '10:10:00', '10:15:00', 5, 0),
(196, '2025-02-20', '10:15:00', '10:20:00', 5, 0),
(197, '2025-02-20', '10:20:00', '10:25:00', 5, 0),
(198, '2025-02-20', '10:25:00', '10:30:00', 5, 0),
(199, '2025-02-20', '10:30:00', '10:35:00', 5, 0),
(200, '2025-02-20', '10:35:00', '10:40:00', 5, 0),
(201, '2025-02-20', '10:40:00', '10:45:00', 5, 0),
(202, '2025-02-20', '10:45:00', '10:50:00', 5, 0),
(203, '2025-02-20', '10:50:00', '10:55:00', 5, 0),
(204, '2025-02-20', '10:55:00', '11:00:00', 5, 0),
(205, '2025-02-20', '11:00:00', '11:05:00', 5, 0),
(206, '2025-02-20', '11:05:00', '11:10:00', 5, 0),
(207, '2025-02-20', '11:10:00', '11:15:00', 5, 0),
(208, '2025-02-20', '11:15:00', '11:20:00', 5, 0),
(209, '2025-02-20', '11:20:00', '11:25:00', 5, 0),
(210, '2025-02-20', '11:25:00', '11:30:00', 5, 0),
(211, '2025-02-20', '11:30:00', '11:35:00', 5, 0),
(212, '2025-02-20', '11:35:00', '11:40:00', 5, 0),
(213, '2025-02-20', '11:40:00', '11:45:00', 5, 0),
(214, '2025-02-20', '11:45:00', '11:50:00', 5, 0),
(215, '2025-02-20', '11:50:00', '11:55:00', 5, 0),
(216, '2025-02-20', '11:55:00', '12:00:00', 5, 0),
(217, '2025-02-20', '12:00:00', '12:05:00', 5, 0),
(218, '2025-02-20', '12:05:00', '12:10:00', 5, 0),
(219, '2025-02-20', '12:10:00', '12:15:00', 5, 0),
(220, '2025-02-20', '12:15:00', '12:20:00', 5, 0),
(221, '2025-02-20', '12:20:00', '12:25:00', 5, 0),
(222, '2025-02-20', '12:25:00', '12:30:00', 5, 0),
(223, '2025-02-20', '12:30:00', '12:35:00', 5, 0),
(224, '2025-02-20', '12:35:00', '12:40:00', 5, 0),
(225, '2025-02-20', '12:40:00', '12:45:00', 5, 0),
(226, '2025-02-20', '12:45:00', '12:50:00', 5, 0),
(227, '2025-02-20', '12:50:00', '12:55:00', 5, 0),
(228, '2025-02-20', '12:55:00', '13:00:00', 5, 0),
(229, '2025-02-20', '13:00:00', '13:05:00', 5, 0),
(230, '2025-02-20', '13:05:00', '13:10:00', 5, 0),
(231, '2025-02-20', '13:10:00', '13:15:00', 5, 0),
(232, '2025-02-20', '13:15:00', '13:20:00', 5, 0),
(233, '2025-02-20', '13:20:00', '13:25:00', 5, 0),
(234, '2025-02-20', '13:25:00', '13:30:00', 5, 0),
(235, '2025-02-20', '13:30:00', '13:35:00', 5, 0),
(236, '2025-02-20', '13:35:00', '13:40:00', 5, 0),
(237, '2025-02-20', '13:40:00', '13:45:00', 5, 0),
(238, '2025-02-20', '13:45:00', '13:50:00', 5, 0),
(239, '2025-02-20', '13:50:00', '13:55:00', 5, 0),
(240, '2025-02-20', '13:55:00', '14:00:00', 5, 0),
(241, '2025-02-20', '14:00:00', '14:05:00', 5, 0),
(242, '2025-02-20', '14:05:00', '14:10:00', 5, 0),
(243, '2025-02-20', '14:10:00', '14:15:00', 5, 0),
(244, '2025-02-20', '14:15:00', '14:20:00', 5, 0),
(245, '2025-02-20', '14:20:00', '14:25:00', 5, 0),
(246, '2025-02-20', '14:25:00', '14:30:00', 5, 0),
(247, '2025-02-20', '14:30:00', '14:35:00', 5, 0),
(248, '2025-02-20', '14:35:00', '14:40:00', 5, 0),
(249, '2025-02-20', '14:40:00', '14:45:00', 5, 0),
(250, '2025-02-20', '14:45:00', '14:50:00', 5, 0),
(251, '2025-02-20', '14:50:00', '14:55:00', 5, 0),
(252, '2025-02-20', '14:55:00', '15:00:00', 5, 0),
(253, '2025-02-21', '08:00:00', '08:05:00', 5, 0),
(254, '2025-02-21', '08:05:00', '08:10:00', 5, 0),
(255, '2025-02-21', '08:10:00', '08:15:00', 5, 0),
(256, '2025-02-21', '08:15:00', '08:20:00', 5, 0),
(257, '2025-02-21', '08:20:00', '08:25:00', 5, 0),
(258, '2025-02-21', '08:25:00', '08:30:00', 5, 0),
(259, '2025-02-21', '08:30:00', '08:35:00', 5, 0),
(260, '2025-02-21', '08:35:00', '08:40:00', 5, 0),
(261, '2025-02-21', '08:40:00', '08:45:00', 5, 0),
(262, '2025-02-21', '08:45:00', '08:50:00', 5, 0),
(263, '2025-02-21', '08:50:00', '08:55:00', 5, 0),
(264, '2025-02-21', '08:55:00', '09:00:00', 5, 0),
(265, '2025-02-21', '09:00:00', '09:05:00', 5, 0),
(266, '2025-02-21', '09:05:00', '09:10:00', 5, 0),
(267, '2025-02-21', '09:10:00', '09:15:00', 5, 0),
(268, '2025-02-21', '09:15:00', '09:20:00', 5, 0),
(269, '2025-02-21', '09:20:00', '09:25:00', 5, 0),
(270, '2025-02-21', '09:25:00', '09:30:00', 5, 0),
(271, '2025-02-21', '09:30:00', '09:35:00', 5, 0),
(272, '2025-02-21', '09:35:00', '09:40:00', 5, 0),
(273, '2025-02-21', '09:40:00', '09:45:00', 5, 0),
(274, '2025-02-21', '09:45:00', '09:50:00', 5, 0),
(275, '2025-02-21', '09:50:00', '09:55:00', 5, 0),
(276, '2025-02-21', '09:55:00', '10:00:00', 5, 0),
(277, '2025-02-21', '10:00:00', '10:05:00', 5, 0),
(278, '2025-02-21', '10:05:00', '10:10:00', 5, 0),
(279, '2025-02-21', '10:10:00', '10:15:00', 5, 0),
(280, '2025-02-21', '10:15:00', '10:20:00', 5, 0),
(281, '2025-02-21', '10:20:00', '10:25:00', 5, 0),
(282, '2025-02-21', '10:25:00', '10:30:00', 5, 0),
(283, '2025-02-21', '10:30:00', '10:35:00', 5, 0),
(284, '2025-02-21', '10:35:00', '10:40:00', 5, 0),
(285, '2025-02-21', '10:40:00', '10:45:00', 5, 0),
(286, '2025-02-21', '10:45:00', '10:50:00', 5, 0),
(287, '2025-02-21', '10:50:00', '10:55:00', 5, 0),
(288, '2025-02-21', '10:55:00', '11:00:00', 5, 0),
(289, '2025-02-21', '11:00:00', '11:05:00', 5, 0),
(290, '2025-02-21', '11:05:00', '11:10:00', 5, 0),
(291, '2025-02-21', '11:10:00', '11:15:00', 5, 0),
(292, '2025-02-21', '11:15:00', '11:20:00', 5, 0),
(293, '2025-02-21', '11:20:00', '11:25:00', 5, 0),
(294, '2025-02-21', '11:25:00', '11:30:00', 5, 0),
(295, '2025-02-21', '11:30:00', '11:35:00', 5, 0),
(296, '2025-02-21', '11:35:00', '11:40:00', 5, 0),
(297, '2025-02-21', '11:40:00', '11:45:00', 5, 0),
(298, '2025-02-21', '11:45:00', '11:50:00', 5, 0),
(299, '2025-02-21', '11:50:00', '11:55:00', 5, 0),
(300, '2025-02-21', '11:55:00', '12:00:00', 5, 0),
(301, '2025-02-21', '12:00:00', '12:05:00', 5, 0),
(302, '2025-02-21', '12:05:00', '12:10:00', 5, 0),
(303, '2025-02-21', '12:10:00', '12:15:00', 5, 0),
(304, '2025-02-21', '12:15:00', '12:20:00', 5, 0),
(305, '2025-02-21', '12:20:00', '12:25:00', 5, 0),
(306, '2025-02-21', '12:25:00', '12:30:00', 5, 0),
(307, '2025-02-21', '12:30:00', '12:35:00', 5, 0),
(308, '2025-02-21', '12:35:00', '12:40:00', 5, 0),
(309, '2025-02-21', '12:40:00', '12:45:00', 5, 0),
(310, '2025-02-21', '12:45:00', '12:50:00', 5, 0),
(311, '2025-02-21', '12:50:00', '12:55:00', 5, 0),
(312, '2025-02-21', '12:55:00', '13:00:00', 5, 0),
(313, '2025-02-21', '13:00:00', '13:05:00', 5, 0),
(314, '2025-02-21', '13:05:00', '13:10:00', 5, 0),
(315, '2025-02-21', '13:10:00', '13:15:00', 5, 0),
(316, '2025-02-21', '13:15:00', '13:20:00', 5, 0),
(317, '2025-02-21', '13:20:00', '13:25:00', 5, 0),
(318, '2025-02-21', '13:25:00', '13:30:00', 5, 0),
(319, '2025-02-21', '13:30:00', '13:35:00', 5, 0),
(320, '2025-02-21', '13:35:00', '13:40:00', 5, 0),
(321, '2025-02-21', '13:40:00', '13:45:00', 5, 0),
(322, '2025-02-21', '13:45:00', '13:50:00', 5, 0),
(323, '2025-02-21', '13:50:00', '13:55:00', 5, 0),
(324, '2025-02-21', '13:55:00', '14:00:00', 5, 0),
(325, '2025-02-21', '14:00:00', '14:05:00', 5, 0),
(326, '2025-02-21', '14:05:00', '14:10:00', 5, 0),
(327, '2025-02-21', '14:10:00', '14:15:00', 5, 0),
(328, '2025-02-21', '14:15:00', '14:20:00', 5, 0),
(329, '2025-02-21', '14:20:00', '14:25:00', 5, 0),
(330, '2025-02-21', '14:25:00', '14:30:00', 5, 0),
(331, '2025-02-21', '14:30:00', '14:35:00', 5, 0),
(332, '2025-02-21', '14:35:00', '14:40:00', 5, 0),
(333, '2025-02-21', '14:40:00', '14:45:00', 5, 0),
(334, '2025-02-21', '14:45:00', '14:50:00', 5, 0),
(335, '2025-02-21', '14:50:00', '14:55:00', 5, 0),
(336, '2025-02-21', '14:55:00', '15:00:00', 5, 0),
(337, '2025-02-22', '08:00:00', '08:05:00', 5, 0),
(338, '2025-02-22', '08:05:00', '08:10:00', 5, 0),
(339, '2025-02-22', '08:10:00', '08:15:00', 5, 0),
(340, '2025-02-22', '08:15:00', '08:20:00', 5, 0),
(341, '2025-02-22', '08:20:00', '08:25:00', 5, 0),
(342, '2025-02-22', '08:25:00', '08:30:00', 5, 0),
(343, '2025-02-22', '08:30:00', '08:35:00', 5, 0),
(344, '2025-02-22', '08:35:00', '08:40:00', 5, 0),
(345, '2025-02-22', '08:40:00', '08:45:00', 5, 0),
(346, '2025-02-22', '08:45:00', '08:50:00', 5, 0),
(347, '2025-02-22', '08:50:00', '08:55:00', 5, 0),
(348, '2025-02-22', '08:55:00', '09:00:00', 5, 0),
(349, '2025-02-22', '09:00:00', '09:05:00', 5, 0),
(350, '2025-02-22', '09:05:00', '09:10:00', 5, 0),
(351, '2025-02-22', '09:10:00', '09:15:00', 5, 0),
(352, '2025-02-22', '09:15:00', '09:20:00', 5, 0),
(353, '2025-02-22', '09:20:00', '09:25:00', 5, 0),
(354, '2025-02-22', '09:25:00', '09:30:00', 5, 0),
(355, '2025-02-22', '09:30:00', '09:35:00', 5, 0),
(356, '2025-02-22', '09:35:00', '09:40:00', 5, 0),
(357, '2025-02-22', '09:40:00', '09:45:00', 5, 0),
(358, '2025-02-22', '09:45:00', '09:50:00', 5, 0),
(359, '2025-02-22', '09:50:00', '09:55:00', 5, 0),
(360, '2025-02-22', '09:55:00', '10:00:00', 5, 0),
(361, '2025-02-22', '10:00:00', '10:05:00', 5, 0),
(362, '2025-02-22', '10:05:00', '10:10:00', 5, 0),
(363, '2025-02-22', '10:10:00', '10:15:00', 5, 0),
(364, '2025-02-22', '10:15:00', '10:20:00', 5, 0),
(365, '2025-02-22', '10:20:00', '10:25:00', 5, 0),
(366, '2025-02-22', '10:25:00', '10:30:00', 5, 0),
(367, '2025-02-22', '10:30:00', '10:35:00', 5, 0),
(368, '2025-02-22', '10:35:00', '10:40:00', 5, 0),
(369, '2025-02-22', '10:40:00', '10:45:00', 5, 0),
(370, '2025-02-22', '10:45:00', '10:50:00', 5, 0),
(371, '2025-02-22', '10:50:00', '10:55:00', 5, 0),
(372, '2025-02-22', '10:55:00', '11:00:00', 5, 0),
(373, '2025-02-22', '11:00:00', '11:05:00', 5, 0),
(374, '2025-02-22', '11:05:00', '11:10:00', 5, 0),
(375, '2025-02-22', '11:10:00', '11:15:00', 5, 0),
(376, '2025-02-22', '11:15:00', '11:20:00', 5, 0),
(377, '2025-02-22', '11:20:00', '11:25:00', 5, 0),
(378, '2025-02-22', '11:25:00', '11:30:00', 5, 0),
(379, '2025-02-22', '11:30:00', '11:35:00', 5, 0),
(380, '2025-02-22', '11:35:00', '11:40:00', 5, 0),
(381, '2025-02-22', '11:40:00', '11:45:00', 5, 0),
(382, '2025-02-22', '11:45:00', '11:50:00', 5, 0),
(383, '2025-02-22', '11:50:00', '11:55:00', 5, 0),
(384, '2025-02-22', '11:55:00', '12:00:00', 5, 0),
(385, '2025-02-22', '12:00:00', '12:05:00', 5, 0),
(386, '2025-02-22', '12:05:00', '12:10:00', 5, 0),
(387, '2025-02-22', '12:10:00', '12:15:00', 5, 0),
(388, '2025-02-22', '12:15:00', '12:20:00', 5, 0),
(389, '2025-02-22', '12:20:00', '12:25:00', 5, 0),
(390, '2025-02-22', '12:25:00', '12:30:00', 5, 0),
(391, '2025-02-22', '12:30:00', '12:35:00', 5, 0),
(392, '2025-02-22', '12:35:00', '12:40:00', 5, 0),
(393, '2025-02-22', '12:40:00', '12:45:00', 5, 0),
(394, '2025-02-22', '12:45:00', '12:50:00', 5, 0),
(395, '2025-02-22', '12:50:00', '12:55:00', 5, 0),
(396, '2025-02-22', '12:55:00', '13:00:00', 5, 0),
(397, '2025-02-22', '13:00:00', '13:05:00', 5, 0),
(398, '2025-02-22', '13:05:00', '13:10:00', 5, 0),
(399, '2025-02-22', '13:10:00', '13:15:00', 5, 0),
(400, '2025-02-22', '13:15:00', '13:20:00', 5, 0),
(401, '2025-02-22', '13:20:00', '13:25:00', 5, 0),
(402, '2025-02-22', '13:25:00', '13:30:00', 5, 0),
(403, '2025-02-22', '13:30:00', '13:35:00', 5, 0),
(404, '2025-02-22', '13:35:00', '13:40:00', 5, 0),
(405, '2025-02-22', '13:40:00', '13:45:00', 5, 0),
(406, '2025-02-22', '13:45:00', '13:50:00', 5, 0),
(407, '2025-02-22', '13:50:00', '13:55:00', 5, 0),
(408, '2025-02-22', '13:55:00', '14:00:00', 5, 0),
(409, '2025-02-22', '14:00:00', '14:05:00', 5, 0),
(410, '2025-02-22', '14:05:00', '14:10:00', 5, 0),
(411, '2025-02-22', '14:10:00', '14:15:00', 5, 0),
(412, '2025-02-22', '14:15:00', '14:20:00', 5, 0),
(413, '2025-02-22', '14:20:00', '14:25:00', 5, 0),
(414, '2025-02-22', '14:25:00', '14:30:00', 5, 0),
(415, '2025-02-22', '14:30:00', '14:35:00', 5, 0),
(416, '2025-02-22', '14:35:00', '14:40:00', 5, 0),
(417, '2025-02-22', '14:40:00', '14:45:00', 5, 0),
(418, '2025-02-22', '14:45:00', '14:50:00', 5, 0),
(419, '2025-02-22', '14:50:00', '14:55:00', 5, 0),
(420, '2025-02-22', '14:55:00', '15:00:00', 5, 0);

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
  `credits` int(11) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_czech_ci;

--
-- Dumping data for table `Users`
--

INSERT INTO `Users` (`id`, `username`, `password`, `isAdmin`, `fullName`, `email`, `class`, `tel`, `credits`) VALUES
(3, 'admin2', '$2y$10$U8xz2ZP2Icqoyax0IsyHbuS4C5bDKFC1rAcoRNlIOKLe.5iN6CBSm', 0, '0', '0', '0', NULL, 0),
(4, 'admin3', '$2y$10$2IXoBxhJA77UszDSZQqCwO9I/Ra7ulio0XFf43fdeMw/75iVu42pO', 0, '0', '0', '0', NULL, 0),
(5, 'admin4', '$2y$10$Mz6BwxbHiGgUBfNsYHw0Bu4biWQ.0sF1DWNOspdAjWjJQZjABQH2C', 0, '0', '0', NULL, NULL, 0),
(6, 'user4', '$2y$10$D4PdVIfNBTWHuuCegl2Zq.Jyy6rRcshqHlza15z/68OKtwuOeKQrC', 0, 'Jonáš Eduard', 'mail@doge.gov', '2.Y', '7321654', 655115656),
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
(56, '321asd31321sad321', '$2y$10$H/S39lCtqCbuu/ObyA6rcODXOO7Kad2LhXy7NMFmjOfWKnKfIUKli', 0, 'a2d1321', 's@s.d', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `Variants`
--

CREATE TABLE `Variants` (
  `id` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `addedPrice` int(11) NOT NULL,
  `isExclusive` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Variants`
--

INSERT INTO `Variants` (`id`, `itemId`, `name`, `addedPrice`, `isExclusive`) VALUES
(1, 2, 'random2/1', 500, b'1'),
(2, 2, 'random', 500, b'1'),
(3, 17, 'ketchup', 500, b'1'),
(4, 17, 'mustard', 500, b'1'),
(5, 17, 'mustard2.. idk what to call this', 500, b'0');

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `Items`
--
ALTER TABLE `Items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `Orders`
--
ALTER TABLE `Orders`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4407;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=299;

--
-- AUTO_INCREMENT for table `Temp`
--
ALTER TABLE `Temp`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=421;

--
-- AUTO_INCREMENT for table `Timeslots`
--
ALTER TABLE `Timeslots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150486;

--
-- AUTO_INCREMENT for table `Users`
--
ALTER TABLE `Users`
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `Variants`
--
ALTER TABLE `Variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
