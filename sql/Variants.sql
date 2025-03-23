-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 23, 2025 at 04:04 PM
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
-- Table structure for table `Variants`
--

CREATE TABLE `Variants` (
  `id` int(11) NOT NULL,
  `itemId` int(11) NOT NULL,
  `name` varchar(256) NOT NULL,
  `addedPrice` int(11) NOT NULL,
  `isExclusive` bit(1) NOT NULL,
  `removed` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `Variants`
--

INSERT INTO `Variants` (`id`, `itemId`, `name`, `addedPrice`, `isExclusive`, `removed`) VALUES
(1, 2, '<<<><><><><><><><><.', 213516565, b'1', 1),
(2, 2, 'random', 500, b'1', 0),
(3, 17, 'ketchup', 500, b'1', 0),
(4, 17, 'mustard', 500, b'1', 0),
(5, 17, 'mustard2.. idk what to call this', 500, b'0', 0),
(6, 23, 'super secret variant', 321654987, b'0', 0),
(7, 2, 'test', 750, b'0', 0);

--
-- Indexes for dumped tables
--

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
-- AUTO_INCREMENT for table `Variants`
--
ALTER TABLE `Variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Variants`
--
ALTER TABLE `Variants`
  ADD CONSTRAINT `Variants_ibfk_1` FOREIGN KEY (`itemId`) REFERENCES `Items` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
