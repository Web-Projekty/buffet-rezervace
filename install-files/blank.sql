-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Mar 29, 2025 at 05:22 PM
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
(1, 'Výchozí', '', 'Výchozí kategorie', 0, NULL, NULL),

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
(1, 'Testovací položka', 12345, 'Testovací položka. Stojí 123.45Kč. Vypadá jako kuřecí bageta. Možná. Její alergeny jsou 1, 2, 3.', 'img/items/baguette_chicken.png', '[1,2,3]', 1, 0, '0000-00-00 00:00:00', '0000-00-00 01:00:00'),

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

--
-- Dumping data for table `Orders`
--


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

--
-- Dumping data for table `Payments`
--


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
(0, '{ADMIN_USERNAME}', '{ADMIN_PASSWORD_ENC}', 1, '{ADMIN_FULLNAME}', '{ADMIN_EMAIL}', 'admin', NULL, 0, NULL, NULL),

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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4521;

--
-- AUTO_INCREMENT for table `Payments`
--
ALTER TABLE `Payments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=430;

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
  MODIFY `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `Variants`
--
ALTER TABLE `Variants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=54;

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
