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
(1, 'Plněná bageta sýr-šunka', 14990, 'Bageta plněná šunkou a sýrem.', 'img/items/baguette_chicken.png', '[1,2,3]', 1),
(2, 'Bageta s kuřecím masem a salátem', 8990, 'Bageta plněná grilovaným kuřecím masem a zeleninou.', 'img/items/baguette_chicken.png', '[1,7,14,11]', 1),
(3, 'Sekaná v housce', 6900, 'Domácí sekaná podávaná v čerstvé housce.', 'img/items/meatloaf_bun.png', '[1,2]', 1),
(4, 'Bageta Caprese', 8500, 'Bageta s mozzarellou, rajčaty a bazalkovým pestem.', 'img/items/baguette_caprese.png', '[1,7]', 1),
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
(23, 'test', 79000, 'hello', 'img/items/default.png', '[1,7]', 2),
(26, 'super secret testing item', 987654321, 'well hello there', 'img/items/default.png', '[1,13]', 2),
(27, 'fdssfsa', 2300, 'dfsdfs', 'img/items/default.png', '[1,169]', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Items`
--
ALTER TABLE `Items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Items`
--
ALTER TABLE `Items`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Items`
--
ALTER TABLE `Items`
  ADD CONSTRAINT `Items_ibfk_1` FOREIGN KEY (`category`) REFERENCES `Categories` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
