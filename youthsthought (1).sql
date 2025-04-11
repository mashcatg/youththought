-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 12, 2024 at 11:46 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `youthsthought`
--

-- --------------------------------------------------------

--
-- Table structure for table `fundings`
--

CREATE TABLE `fundings` (
  `trx_id` int(11) NOT NULL,
  `post_id` int(10) NOT NULL,
  `user_id` int(10) NOT NULL,
  `amount` int(100) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `fundings`
--

INSERT INTO `fundings` (`trx_id`, `post_id`, `user_id`, `amount`, `date`) VALUES
(1, 4259378, 1, 5000, '2024-08-20 16:40:58'),
(2, 4259378, 2, 1200, '2024-08-20 16:40:58');

-- --------------------------------------------------------

--
-- Table structure for table `msg`
--

CREATE TABLE `msg` (
  `id` int(11) NOT NULL,
  `sender` bigint(20) DEFAULT NULL,
  `receiver` bigint(20) DEFAULT NULL,
  `seen` bigint(20) DEFAULT 0,
  `type` bigint(20) DEFAULT NULL,
  `msg_text` text DEFAULT NULL,
  `media` varchar(200) DEFAULT NULL,
  `msg_time` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `msg`
--

INSERT INTO `msg` (`id`, `sender`, `receiver`, `seen`, `type`, `msg_text`, `media`, `msg_time`) VALUES
(1, 2056, 1481, 0, 1, 'THis is a message', NULL, NULL),
(2, 2056, NULL, NULL, NULL, NULL, NULL, '2024-08-26 02:07:46'),
(3, 2056, NULL, NULL, NULL, NULL, NULL, '2024-08-26 02:07:46'),
(4, 2056, NULL, NULL, NULL, 'hi', NULL, '2024-08-26 10:45:01'),
(5, 2056, NULL, NULL, NULL, 'hi', NULL, '2024-08-26 10:45:03'),
(6, 2056, 3002, NULL, NULL, 'hi', NULL, '2024-08-26 10:45:12'),
(7, 2056, NULL, NULL, NULL, 'hi', NULL, '2024-08-26 10:45:13'),
(8, 2056, 1481, NULL, NULL, 'hi', NULL, '2024-08-26 11:34:22'),
(9, 2056, NULL, NULL, NULL, 'hi', NULL, '2024-08-26 11:48:33'),
(10, 5636, 2056, NULL, NULL, 'I am going now', NULL, '2024-08-26 16:05:29'),
(11, 2056, 5636, NULL, NULL, 'hello', NULL, '2024-08-26 16:09:01'),
(12, 2056, 5636, NULL, NULL, 'hello', NULL, '2024-08-26 16:09:05'),
(13, 2056, 1481, NULL, NULL, 'hello', NULL, '2024-08-26 16:12:04'),
(14, 3002, 2056, NULL, NULL, 'this was a great message', NULL, '2024-08-26 16:13:59'),
(20, 2056, 5636, NULL, NULL, 'dasd', NULL, '2024-08-26 17:16:28'),
(21, 2056, 1481, NULL, NULL, 'asdsad', NULL, '2024-08-26 17:31:46'),
(22, 2056, 3002, NULL, NULL, 'asdasd', NULL, '2024-08-26 17:32:45'),
(23, 2056, 3002, NULL, NULL, 'asdsad', NULL, '2024-08-26 17:36:01'),
(24, 2056, 3002, NULL, NULL, 'dasd', NULL, '2024-08-26 17:42:42'),
(25, 2056, 1481, NULL, NULL, 'asdasd', NULL, '2024-08-26 17:42:47'),
(26, 2056, 3002, NULL, NULL, 'asdasd', NULL, '2024-08-26 17:43:23'),
(27, 2056, 1481, NULL, NULL, 'asdasd', NULL, '2024-08-26 17:43:58'),
(28, 2056, 5636, NULL, NULL, 'hi', NULL, '2024-08-26 17:44:10'),
(29, 2056, 5636, NULL, NULL, 'asdasd', NULL, '2024-08-26 17:45:28'),
(30, 2056, 5636, NULL, NULL, 'hi', NULL, '2024-08-26 17:45:32'),
(31, 2056, 1481, NULL, NULL, 'asd', NULL, '2024-08-26 17:58:12'),
(32, 2056, 1481, NULL, NULL, '', NULL, '2024-08-26 17:58:15'),
(33, 2056, 1481, NULL, NULL, 'asdasd', NULL, '2024-08-26 17:58:34'),
(34, 2056, 1481, NULL, NULL, '', NULL, '2024-08-26 18:00:09'),
(35, 2056, 1481, NULL, NULL, '', NULL, '2024-08-26 18:05:10'),
(36, 2056, 1481, NULL, NULL, '', NULL, '2024-08-26 18:06:20'),
(37, 2056, 1481, NULL, NULL, 'hiii', 'medias/iPad Pro 11_ - 1 (1).png', '2024-08-27 08:09:59'),
(38, 2056, 1481, NULL, NULL, 'hiii!!!!', 'medias/iPad Pro 11_ - 1 (1).png', '2024-08-27 08:18:22'),
(39, 2056, 1481, NULL, NULL, 'innobrakes', 'medias/INNOBRAKES.png', '2024-08-27 08:26:15'),
(40, 2056, 1481, NULL, NULL, 'YUP', NULL, '2024-08-27 08:27:53'),
(41, 2056, 1481, NULL, NULL, 'TESTING', 'medias/Black (1).png', '2024-08-27 08:58:22'),
(42, 2056, 1481, NULL, NULL, 'THE BOOK BY MASHCATG', 'medias/BOOK COVER ABRAR.png', '2024-08-27 09:04:28'),
(43, 2056, 1481, NULL, NULL, 'the prize', 'medias/pexels-photo-6120397.jpeg', '2024-08-27 09:09:43'),
(44, 2056, 5636, NULL, NULL, 'masrufaimanmessage', NULL, '2024-08-27 09:38:28'),
(45, 2056, 5636, NULL, NULL, 'YUP', NULL, '2024-08-27 09:38:54'),
(46, 2056, 5636, NULL, NULL, '', 'medias/1724751539_INNOBRAKES (3).png', '2024-08-27 09:38:59'),
(47, 2056, 3002, NULL, NULL, 'hello dost !', NULL, '2024-08-27 09:44:44'),
(48, 2056, 3002, NULL, NULL, 'sadasd', NULL, '2024-08-27 09:46:17'),
(49, 2056, 5636, NULL, NULL, 'asdasd', 'medias/1724756613_BOOK COVER ABRAR (1).png', '2024-08-27 11:03:33'),
(50, 2056, 5636, NULL, NULL, 'hiiiasfafadfadfdasf', NULL, '2024-08-27 11:04:08'),
(51, 2056, 3002, NULL, NULL, 'asdsadasd', NULL, '2024-08-27 11:04:20'),
(52, 2056, 5636, NULL, NULL, 'hi', NULL, '2024-08-27 12:26:46'),
(53, 2056, 3002, NULL, NULL, 'come on', 'medias/1724761623_original-a85c9d12b4bec4ea0b8118558e3e5f26.jpg', '2024-08-27 12:27:03'),
(54, 2056, 3002, NULL, NULL, 'I\'m gonna make it happend', NULL, '2024-08-27 12:27:56'),
(55, 2056, 5636, NULL, NULL, 'YUP', NULL, '2024-08-27 12:28:05'),
(56, 2056, 1481, NULL, NULL, 'great', NULL, '2024-08-27 12:28:14'),
(57, 2056, 3002, NULL, NULL, 'asdasd', NULL, '2024-08-27 12:36:18'),
(58, 2056, 1481, NULL, NULL, 'Hoooo', 'medias/1724766081_original-dac855e2039e25bc6b2bdf34459e4cac.jpg', '2024-08-27 13:41:21'),
(59, 2056, 1481, NULL, NULL, 'asdasd', NULL, '2024-08-27 18:13:09'),
(60, 3002, 2056, 1, 1, 'Testing seen messages', NULL, '2024-08-27 18:16:05'),
(61, 1481, 2056, 1, NULL, 'dasd', NULL, '2024-08-27 18:19:38'),
(62, 1481, 2056, 1, NULL, '', 'medias/1724782790_original-f37cd3255ca4cfeba085e1244b64f1d6.png', '2024-08-27 18:19:50'),
(63, 2056, 1481, 0, 1, '123320210', NULL, '2024-08-27 18:38:53'),
(64, 2056, 1481, 0, 1, '13132', NULL, '2024-08-27 18:45:05'),
(65, 2056, 1481, 0, 1, '7898', NULL, '2024-08-27 18:47:19'),
(66, 2056, 1481, 0, NULL, 'asdasd', NULL, '2024-08-28 06:04:23'),
(67, 2056, 5636, 0, NULL, 'EVOLV', 'medias/1724825186_Minimalist Black Modern Business Logo.png', '2024-08-28 06:06:26'),
(68, 2056, 3002, 0, NULL, 'hiii', NULL, '2024-08-28 06:48:07'),
(69, 2056, 3002, 0, NULL, 'qwer', NULL, '2024-08-28 06:52:04'),
(70, 2056, 1481, 0, NULL, 'HOOOOO', 'medias/1724829124_original-dac855e2039e25bc6b2bdf34459e4cac.jpg', '2024-08-28 07:12:04'),
(71, 2056, NULL, 0, NULL, NULL, NULL, '2024-09-06 12:00:25'),
(72, 2056, NULL, 0, NULL, NULL, NULL, '2024-09-06 12:00:26'),
(73, NULL, 1481, 0, NULL, '1023', NULL, '2024-09-06 12:03:43'),
(74, 2056, 3002, 0, NULL, 'asdasd', 'medias/1725793687_WhatsApp Image 2024-09-07 at 23.18.13_dc19383e.jpg', '2024-09-08 11:08:07'),
(75, 2056, 4155589, 0, NULL, 'asdasd', NULL, '2024-09-08 11:08:22'),
(76, 2056, 4155589, 0, NULL, '2102', NULL, '2024-09-08 11:08:31'),
(77, 2056, 5636, 0, NULL, '031230123', NULL, '2024-09-08 11:09:00'),
(78, 2056, 3002, 0, NULL, '12031203', NULL, '2024-09-08 11:09:16'),
(79, 2056, 3002, 0, NULL, 'asdasdas', NULL, '2024-09-08 11:11:11'),
(80, 2056, 4155589, 0, NULL, '221001', NULL, '2024-09-08 11:14:48'),
(81, 2056, 5636, 0, NULL, 'asdasd', NULL, '2024-09-08 11:23:51'),
(82, 2056, 205612, 0, NULL, 'hiii', NULL, '2024-09-08 11:37:11'),
(83, 2056, 3002, 0, NULL, 'asda2012032', NULL, '2024-09-08 11:43:29'),
(149, 2056, 4155589, 0, NULL, 'asdasd', NULL, '2024-09-08 11:48:19'),
(150, 2056, 4155589, 0, NULL, NULL, 'medias/1725796105_WhatsApp Image 2024-09-02 at 20.13.31_c0a71b12.jpg', '2024-09-08 11:48:25'),
(151, 2056, 3002, 0, NULL, NULL, 'medias/1725796437_BOOK COVER ABRAR.png', '2024-09-08 11:53:57'),
(152, 2056, 3002, 0, NULL, 'YUP', NULL, '2024-09-08 11:54:54'),
(153, 2056, 205612, 0, NULL, NULL, 'medias/1725817353_WhatsApp Image 2024-09-02 at 20.20.56_fdbab555.jpg', '2024-09-08 17:42:33'),
(154, 5636, 2056, 1, NULL, 'Hii! What\'s up!!!', NULL, '2024-09-11 09:21:07'),
(155, 2056, 3002, 0, NULL, NULL, 'medias/1726047738_iPhone 14 & 15 Pro Max - 2 (2).png', '2024-09-11 09:42:18'),
(156, 2056, 5636, 0, NULL, 'hiii', 'medias/1726047750_iPhone 14 & 15 Pro Max - 2 (2).png', '2024-09-11 09:42:30');

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `notification_id` bigint(20) NOT NULL,
  `user_id` bigint(10) NOT NULL,
  `sender` bigint(20) DEFAULT NULL,
  `image` varchar(200) NOT NULL,
  `texts` text NOT NULL,
  `link` varchar(200) DEFAULT NULL,
  `sent_at` datetime NOT NULL,
  `status` varchar(20) NOT NULL DEFAULT 'Unread'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`notification_id`, `user_id`, `sender`, `image`, `texts`, `link`, `sent_at`, `status`) VALUES
(32143247, 4155589, NULL, '2551830.jpg', 'Istiaque Zaman has Supported you', '/posts/2551830', '2024-08-27 10:56:20', 'Read'),
(32143248, 4155589, NULL, '../../public/dp/4155589.jpg', 'Istiaque Zaman has Supported you', '/posts/2551830', '2024-08-27 10:59:42', 'Unread'),
(32143249, 2056, NULL, '../../public/dp/', 'Mash Catg has Supported you', '/post/4048171', '2024-09-06 11:59:19', 'Unread'),
(32143250, 2056, NULL, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551830', '2024-09-08 09:27:42', 'Read'),
(32143251, 2056, NULL, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551301', '2024-09-08 09:27:50', 'Read'),
(32143252, 2056, NULL, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551301', '2024-09-08 11:37:00', 'Unread'),
(32143253, 2056, NULL, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551830', '2024-09-11 07:49:14', 'Read'),
(32143254, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/2551830', '2024-09-11 08:03:58', 'Unread'),
(32143255, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/4048171', '2024-09-11 08:13:56', 'Unread'),
(32143256, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/2551830', '2024-09-11 08:14:10', 'Unread'),
(32143257, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/4048171', '2024-09-11 08:14:20', 'Unread'),
(32143258, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/4048171', '2024-09-11 09:00:48', 'Unread'),
(32143259, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/4048171', '2024-09-11 09:00:56', 'Unread'),
(32143260, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/4048171', '2024-09-11 09:00:58', 'Unread'),
(32143261, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/2551830', '2024-09-11 09:01:06', 'Unread'),
(32143262, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/2551830', '2024-09-11 09:05:31', 'Unread'),
(32143263, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/2551830', '2024-09-11 09:05:36', 'Unread'),
(32143264, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/4048171', '2024-09-11 09:05:39', 'Unread'),
(32143265, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/4048171', '2024-09-11 09:05:42', 'Unread'),
(32143266, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/4048171', '2024-09-11 09:05:44', 'Read'),
(32143267, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/7087184', '2024-09-11 09:07:56', 'Unread'),
(32143268, 5636, NULL, '../../public/dp/default.png', 'Masruf Aiman has Supported you', '/post/7087184', '2024-09-11 09:08:00', 'Unread'),
(32143269, 5636, NULL, '../../public/dp/5636.jpg', 'Masruf Aiman has Supported you', '/post/70871841', '2024-09-11 09:12:59', 'Unread'),
(32143270, 5636, NULL, '../../public/dp/5636.jpg', 'Masruf Aiman has Supported you', '/post/232312', '2024-09-11 09:18:59', 'Unread'),
(32143271, 2056, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/3818170', '2024-09-11 09:46:20', 'Unread'),
(32143272, 2056, 5636, '../../public/dp/5636.jpg', 'Masruf Aiman has Supported you', '/post/3818170', '2024-09-11 09:46:46', 'Unread'),
(32143273, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/25518301', '2024-09-11 09:56:27', 'Unread'),
(32143274, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/25518301', '2024-09-11 09:56:28', 'Unread'),
(32143275, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/25518301', '2024-09-11 09:56:30', 'Unread'),
(32143276, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/25518301', '2024-09-11 09:56:33', 'Unread'),
(32143277, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551830', '2024-09-11 09:58:12', 'Unread'),
(32143278, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551830', '2024-09-11 09:58:14', 'Unread'),
(32143279, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551830', '2024-09-11 09:58:15', 'Unread'),
(32143280, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551830', '2024-09-11 10:01:34', 'Unread'),
(32143281, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551830', '2024-09-11 10:01:36', 'Unread'),
(32143282, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/25518301', '2024-09-11 10:01:38', 'Unread'),
(32143283, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551301', '2024-09-11 10:01:48', 'Unread'),
(32143284, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551301', '2024-09-11 10:01:49', 'Unread'),
(32143285, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/25518301', '2024-09-11 10:02:02', 'Unread'),
(32143286, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551830', '2024-09-11 10:02:08', 'Unread'),
(32143287, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/25518301', '2024-09-11 10:02:11', 'Unread'),
(32143288, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551830', '2024-09-11 10:02:13', 'Unread'),
(32143289, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551301', '2024-09-11 10:02:15', 'Unread'),
(32143290, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/25518301', '2024-09-11 10:02:18', 'Unread'),
(32143291, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551830', '2024-09-11 10:03:21', 'Unread'),
(32143292, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551830', '2024-09-11 10:03:27', 'Unread'),
(32143293, 2056, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/3818170', '2024-09-11 10:04:30', 'Unread'),
(32143294, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/2551830', '2024-09-11 10:04:31', 'Unread'),
(32143295, 4155589, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/25518301', '2024-09-11 10:04:34', 'Unread'),
(32143296, 2056, 2056, '../../public/dp/', 'Mash Catg has Supported you', '/post/4048171', '2024-09-11 10:04:40', 'Unread');

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` bigint(10) NOT NULL,
  `post_type` varchar(255) NOT NULL,
  `post_description` text NOT NULL,
  `attachment_type` enum('image','video') NOT NULL,
  `file_link` varchar(255) DEFAULT NULL,
  `currency` varchar(10) DEFAULT NULL,
  `fund_amount` decimal(10,2) DEFAULT NULL,
  `lat` decimal(9,6) DEFAULT NULL,
  `lng` decimal(9,6) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `post_status` varchar(20) NOT NULL DEFAULT 'Active'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `post_id`, `user_id`, `post_type`, `post_description`, `attachment_type`, `file_link`, `currency`, `fund_amount`, `lat`, `lng`, `created_at`, `post_status`) VALUES
(1, 4534021, 4155589, 'crowdfunding', 'Let\'s build the Bangladesh 2.0', 'image', '4534021.jpg', 'BDT', 10000.00, NULL, NULL, '2024-08-18 10:58:35', 'Active'),
(2, 5855242, 4155589, '1percent', 'Test Post', 'image', '5855242.jpg', '', 0.00, NULL, NULL, '2024-08-18 10:51:17', 'Active'),
(3, 810223513, 300215, '1percent', '2dsf', 'image', '2397107.jpg', '', 0.00, NULL, NULL, '2024-08-18 10:37:55', 'Active'),
(4, 4259378, 3002, 'crowdfunding', 'Let\'s Build Bangladesh and built a great future together.', 'image', '4259378.jpg', 'BDT', 25000.00, NULL, NULL, '2024-08-18 11:05:15', 'Active'),
(5, 2397107, 4155589, 'issue', 'Dakats had attempted cyber attack on my website', 'image', '2397107.jpg', '', 0.00, 22.506303, 91.806537, '2024-08-18 11:09:25', 'Active'),
(6, 7087184, 2056, '1percent', 'In am gonna set Fedora', 'video', 'https://www.youtube.com/watch?v=famhYQAJo_M', '', 0.00, NULL, NULL, '2024-08-18 11:26:54', 'Active'),
(7, 45340212, 5636, 'crowdfunding', 'Let\'s build the Bangladesh 2.0', 'image', '4534021.jpg', 'BDT', 10000.00, NULL, NULL, '2024-08-18 10:58:35', 'Active'),
(8, 58552422, 4155589, '1percent', 'Test Post with Facebook', 'video', 'https://www.facebook.com/watch?v=818240267129602', '', 0.00, NULL, NULL, '2024-08-18 10:51:17', 'Active'),
(9, 8102235, 4155589, '1percent', '2dsf', 'image', '2397107.jpg', '', 0.00, NULL, NULL, '2024-08-18 10:37:55', 'Active'),
(10, 42593782, 3002, 'crowdfunding', 'Let\'s Build Bangladesh and built a great future together.', 'image', '4259378.jpg', 'BDT', 25000.00, NULL, NULL, '2024-08-18 11:05:15', 'Active'),
(11, 23971072, 5636, 'issue', 'Dakats had attempted cyber attack on my website', 'image', '2397107.jpg', '', 0.00, 22.506303, 91.806537, '2024-08-18 11:09:25', 'Active'),
(12, 70871841, 4155589, '1percent', 'In am gonna set Fedora', 'video', 'https://www.youtube.com/watch?v=famhYQAJo_M', '', 0.00, NULL, NULL, '2024-08-18 11:26:54', 'Active'),
(14, 2551830, 4155589, 'crowdfunding', 'Need money for flood', 'image', '2551830.jpg', 'USD', 200000.00, NULL, NULL, '2024-08-25 14:44:52', 'Active'),
(15, 45340211, 2056, 'crowdfunding', 'Let\'s build the Bangladesh 2.0', 'image', '4534021.jpg', 'BDT', 10000.00, NULL, NULL, '2024-08-18 10:58:35', 'Active'),
(16, 58552421, 4155589, '1percent', 'Test Post', 'image', '5855242.jpg', '', 0.00, NULL, NULL, '2024-08-18 10:51:17', 'Active'),
(17, 81022351, 4155589, '1percent', '2dsf', 'image', '2397107.jpg', '', 0.00, NULL, NULL, '2024-08-18 10:37:55', 'Active'),
(18, 42593781, 3002, 'crowdfunding', 'Let\'s Build Bangladesh and built a great future together.', 'image', '4259378.jpg', 'BDT', 25000.00, NULL, NULL, '2024-08-18 11:05:15', 'Active'),
(19, 213, 2056, 'issue', 'Dakats had attempted cyber attack on my website', 'image', '2397107.jpg', '', 0.00, 22.506303, 91.806537, '2024-08-18 11:09:25', 'Active'),
(20, 70871841, 4155589, '1percent', 'In am gonna set Fedora', 'video', 'https://www.youtube.com/watch?v=famhYQAJo_M', '', 0.00, NULL, NULL, '2024-08-18 11:26:54', 'Active'),
(21, 25518301, 4155589, 'crowdfunding', 'Need money for flood', 'image', '2551830.jpg', 'USD', 200000.00, NULL, NULL, '2024-08-25 14:44:52', 'Active'),
(22, 45342111, 4155589, 'crowdfunding', 'Let\'s build the Bangladesh 2.0', 'image', '4534021.jpg', 'BDT', 10000.00, NULL, NULL, '2024-08-18 10:58:35', 'Active'),
(23, 585524211, 4155589, '1percent', 'Test Post', 'image', '5855242.jpg', '', 0.00, NULL, NULL, '2024-08-18 10:51:17', 'Active'),
(24, 810223511, 4155589, '1percent', '2dsf', 'image', '2397107.jpg', '', 0.00, NULL, NULL, '2024-08-18 10:37:55', 'Active'),
(25, 425937811, 3002, 'crowdfunding', 'Let\'s Build Bangladesh and built a great future together.', 'image', '4259378.jpg', 'BDT', 25000.00, NULL, NULL, '2024-08-18 11:05:15', 'Active'),
(26, 239710711, 4155589, 'issue', 'Dakats had attempted cyber attack on my website', 'image', '2397107.jpg', '', 0.00, 22.506303, 91.806537, '2024-08-18 11:09:25', 'Active'),
(27, 232312, 4155589, '1percent', 'In am gonna set Fedora', 'video', 'https://www.youtube.com/watch?v=famhYQAJo_M', '', 0.00, NULL, NULL, '2024-08-18 11:26:54', 'Active'),
(28, 2551301, 4155589, 'crowdfunding', 'Need money for flood', 'image', '2551830.jpg', 'USD', 200000.00, NULL, NULL, '2024-08-25 14:44:52', 'Active'),
(29, 4532111, 4155589, 'crowdfunding', 'Let\'s build the Bangladesh 2.0', 'image', '4534021.jpg', 'BDT', 10000.00, NULL, NULL, '2024-08-18 10:58:35', 'Active'),
(30, 58552211, 4155589, '1percent', 'Test Post', 'image', '5855242.jpg', '', 0.00, NULL, NULL, '2024-08-18 10:51:17', 'Active'),
(31, 81023511, 4155589, '1percent', '2dsf', 'image', '2397107.jpg', '', 0.00, NULL, NULL, '2024-08-18 10:37:55', 'Active'),
(32, 42597811, 3002, 'crowdfunding', 'Let\'s Build Bangladesh and built a great future together.', 'image', '4259378.jpg', 'BDT', 25000.00, NULL, NULL, '2024-08-18 11:05:15', 'Active'),
(33, 23971711, 4155589, 'issue', 'Dakats had attempted cyber attack on my website', 'image', '2397107.jpg', '', 0.00, 22.506303, 91.806537, '2024-08-18 11:09:25', 'Active'),
(34, 4048171, 2056, 'issue', 'This is a test message', 'image', '4048171.jpg', '', 0.00, 23.815448, 90.423918, '2024-09-06 11:52:23', 'Active'),
(35, 3818170, 2056, 'issue', ';lasd;lf woperiop m,xzcv ,xmw9eiru oipsz m,cz', 'image', '3818170.jpg', '', 0.00, 23.799425, 90.427094, '2024-09-11 09:41:06', 'Active');

-- --------------------------------------------------------

--
-- Table structure for table `reactions`
--

CREATE TABLE `reactions` (
  `reaction_id` int(11) NOT NULL,
  `user_id` int(10) NOT NULL,
  `post_id` int(10) NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `reactions`
--

INSERT INTO `reactions` (`reaction_id`, `user_id`, `post_id`, `date`) VALUES
(31, 4155589, 2397107, '2024-08-27 06:41:46'),
(34, 4155589, 7087184, '2024-08-27 10:06:06'),
(35, 4155589, 2551301, '2024-08-27 10:53:29'),
(39, 4155589, 25518301, '2024-08-27 10:58:21'),
(40, 4155589, 232312, '2024-08-27 10:58:43'),
(41, 4155589, 2551830, '2024-08-27 10:59:42'),
(63, 5636, 232312, '2024-09-11 09:18:59'),
(67, 4155589, 25518301, '2024-09-11 09:56:27'),
(68, 4155589, 25518301, '2024-09-11 09:56:28'),
(69, 4155589, 25518301, '2024-09-11 09:56:30'),
(70, 4155589, 25518301, '2024-09-11 09:56:33'),
(71, 4155589, 2551830, '2024-09-11 09:58:12'),
(72, 4155589, 2551830, '2024-09-11 09:58:14'),
(73, 4155589, 2551830, '2024-09-11 09:58:15'),
(74, 4155589, 2551830, '2024-09-11 10:01:34'),
(75, 4155589, 2551830, '2024-09-11 10:01:36'),
(76, 4155589, 25518301, '2024-09-11 10:01:38'),
(77, 4155589, 2551301, '2024-09-11 10:01:48'),
(78, 4155589, 2551301, '2024-09-11 10:01:49'),
(79, 4155589, 25518301, '2024-09-11 10:02:02'),
(80, 4155589, 2551830, '2024-09-11 10:02:08'),
(81, 4155589, 25518301, '2024-09-11 10:02:11'),
(82, 4155589, 2551830, '2024-09-11 10:02:13'),
(83, 4155589, 2551301, '2024-09-11 10:02:15'),
(84, 4155589, 25518301, '2024-09-11 10:02:18'),
(85, 4155589, 2551830, '2024-09-11 10:03:21'),
(86, 4155589, 2551830, '2024-09-11 10:03:27'),
(87, 2056, 3818170, '2024-09-11 10:04:30'),
(88, 4155589, 2551830, '2024-09-11 10:04:31'),
(89, 4155589, 25518301, '2024-09-11 10:04:34'),
(90, 2056, 4048171, '2024-09-11 10:04:40');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `phone` varchar(15) NOT NULL,
  `country_code` varchar(20) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `otp` varchar(200) DEFAULT NULL,
  `otp_expiry` datetime DEFAULT NULL,
  `designation` text DEFAULT NULL,
  `bio` varchar(250) DEFAULT NULL,
  `profile_picture` varchar(200) NOT NULL,
  `cookie` varchar(400) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `account_status` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `user_id`, `name`, `email`, `phone`, `country_code`, `password`, `otp`, `otp_expiry`, `designation`, `bio`, `profile_picture`, `cookie`, `created_at`, `account_status`) VALUES
(1, 2056, 'Mash Catg', 'mashcatg@gmail.com', '01720602864', '+880', '$2y$10$QmCvuvfLAVBq9IxpFuW83eM/7Tjf4SUXi1tOPjNI/Qd7u2BilHMYG', '$2y$10$DGJ1y9fh/gsC4hb93iBRrOkPWCLNfxX6vYuyhTh63Te4Q69AAwabm', '0000-00-00 00:00:00', 'Entrepreneur', 'asdasd asd asd ', '', '2056', '2024-09-11 15:46:58', 'Active'),
(2, 5636, 'Masruf Aiman', 'masrufaiman@gmail.com', '01709138476', '+880', '$2y$10$6518jg1bwy4POVneTiULqutCz85/ayUztuUxOHhi1Ruf9JHhXfQq6', NULL, NULL, 'Entrepreneur', NULL, '5636.jpg', NULL, '2024-09-11 15:46:54', 'Active'),
(3, 7583, 'Demo 1', 'demo1@gmail.com', '32032013', '+880', '$2y$10$4HZEYPPCMMt/ounWcmOOyeqVPHhEKmZnhrxLOeXnV0yfdt/1aHytO', NULL, NULL, NULL, NULL, 'default.png', NULL, '2024-08-19 16:07:44', 'Active'),
(4, 1481, 'demo2', 'demo2@gmail.com', '01546231', '+880', '$2y$10$JS3NDGZXt.giO1HuiSUoG.1j/fOR1jGMU8ld6IK2CQKf17Owu117e', NULL, NULL, NULL, NULL, 'default.png', '1481', '2024-08-19 16:07:47', 'Active'),
(5, 3002, 'demo3', 'demo3@gmail.com', '102020', '+880', '$2y$10$QIFWJkCH1.UsTo8M/njwPOAfOKPdbvYGWvZ02Xc1fpYfITxfyRPL.', NULL, NULL, NULL, NULL, 'default.png', '3002', '2024-08-19 16:07:51', 'Active'),
(7, 4155589, 'Istiaque Zaman', 'istiaquezaman51@gmail.com', '01531702054', '+880', '$2y$10$6t0.SvRHHNxz/9PfPJGBYuXownPvxdXSv3SxQHAxjiMZuzgDw9Rmq', NULL, NULL, 'Entrepreneur', 'This is an bio post description. It\'s a longer text that will be cut off if it exceeds 250 characters. Lorem ipsum dolor sit amet, consectetur adipiss.', '4155589.jpg', '4155589', '2024-08-17 20:27:54', 'Active'),
(8, 20561, 'Mash Catg 2', 'mashcaetg@gmail.com', '01723602864', '+880', '$2y$10$QmCvuvfLAVBq9IxpFuW83eM/7Tjf4SUXi1tOPjNI/Qd7u2BilHMYG', NULL, NULL, NULL, NULL, 'default.png', NULL, '2024-08-19 16:07:37', 'Active'),
(9, 56361, 'Masruf Aiman 2', 'masrufaseiman@gmail.com', '0170913se8476', '+880', '$2y$10$6518jg1bwy4POVneTiULqutCz85/ayUztuUxOHhi1Ruf9JHhXfQq6', NULL, NULL, NULL, NULL, 'default.png', '2', '2024-08-19 16:07:40', 'Active'),
(10, 75831, 'Demo 12', 'dem234o1@gmail.com', '32032342013', '+880', '$2y$10$4HZEYPPCMMt/ounWcmOOyeqVPHhEKmZnhrxLOeXnV0yfdt/1aHytO', NULL, NULL, NULL, NULL, 'default.png', NULL, '2024-08-19 16:07:44', 'Active'),
(11, 14811, 'demo23', 'demo22@gmail.com', '015462313', '+880', '$2y$10$JS3NDGZXt.giO1HuiSUoG.1j/fOR1jGMU8ld6IK2CQKf17Owu117e', NULL, NULL, NULL, NULL, 'default.png', '1481', '2024-08-19 16:07:47', 'Active'),
(12, 30021, 'demo31', 'dem23o3@gmail.com', '1020202', '+880', '$2y$10$QIFWJkCH1.UsTo8M/njwPOAfOKPdbvYGWvZ02Xc1fpYfITxfyRPL.', NULL, NULL, NULL, NULL, 'default.png', '3002', '2024-08-19 16:07:51', 'Active'),
(13, 41555891, 'Istiaque Zaman 2', 'istiaqueza32man51@gmail.com', '0153172302054', '+880', '$2y$10$6t0.SvRHHNxz/9PfPJGBYuXownPvxdXSv3SxQHAxjiMZuzgDw9Rmq', NULL, NULL, 'Entrepreneur', 'This is an bio post description. It\'s a longer text that will be cut off if it exceeds 250 characters. Lorem ipsum dolor sit amet, consectetur adipiss.', '4155589.jpg', '4155589', '2024-08-17 20:27:54', 'Active'),
(14, 41555892, 'Istiaque Zaman', 'istiaquezeraman51@gmail.com', '01531702054', '+880', '$2y$10$6t0.SvRHHNxz/9PfPJGBYuXownPvxdXSv3SxQHAxjiMZuzgDw9Rmq', NULL, NULL, 'Entrepreneur', 'This is an bio post description. It\'s a longer text that will be cut off if it exceeds 250 characters. Lorem ipsum dolor sit amet, consectetur adipiss.', '4155589.jpg', '4155589', '2024-08-17 20:27:54', 'Active'),
(15, 205612, 'Mash Catg 2', 'mashfddscaetg@gmail.com', '01723602864', '+880', '$2y$10$QmCvuvfLAVBq9IxpFuW83eM/7Tjf4SUXi1tOPjNI/Qd7u2BilHMYG', NULL, NULL, NULL, NULL, 'default.png', NULL, '2024-08-19 16:07:37', 'Active'),
(16, 563613, 'Masruf Aiman 2', 'masrsfdufaseiman@gmail.com', '0170913se8476', '+880', '$2y$10$6518jg1bwy4POVneTiULqutCz85/ayUztuUxOHhi1Ruf9JHhXfQq6', NULL, NULL, NULL, NULL, 'default.png', '2', '2024-08-19 16:07:40', 'Active'),
(17, 758314, 'Demo 12', 'dem2sdf34o1@gmail.com', '32032342013', '+880', '$2y$10$4HZEYPPCMMt/ounWcmOOyeqVPHhEKmZnhrxLOeXnV0yfdt/1aHytO', NULL, NULL, NULL, NULL, 'default.png', NULL, '2024-08-19 16:07:44', 'Active'),
(18, 14811, 'demo23', 'demosfd22@gmail.com', '0154623134', '+880', '$2y$10$JS3NDGZXt.giO1HuiSUoG.1j/fOR1jGMU8ld6IK2CQKf17Owu117e', NULL, NULL, NULL, NULL, 'default.png', '1481', '2024-08-19 16:07:47', 'Active'),
(19, 300215, 'demo31', 'dem23sdfo3@gmail.com', '1020202', '+880', '$2y$10$QIFWJkCH1.UsTo8M/njwPOAfOKPdbvYGWvZ02Xc1fpYfITxfyRPL.', NULL, NULL, NULL, NULL, 'default.png', '3002', '2024-08-19 16:07:51', 'Active'),
(20, 415558914, 'Istiaque Zaman 2', 'istiaquesfza32man51@gmail.com', '0153172302054', '+880', '$2y$10$6t0.SvRHHNxz/9PfPJGBYuXownPvxdXSv3SxQHAxjiMZuzgDw9Rmq', NULL, NULL, 'Entrepreneur', 'This is an bio post description. It\'s a longer text that will be cut off if it exceeds 250 characters. Lorem ipsum dolor sit amet, consectetur adipiss.', '4155589.jpg', '4155589', '2024-08-17 20:27:54', 'Active');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `fundings`
--
ALTER TABLE `fundings`
  ADD PRIMARY KEY (`trx_id`);

--
-- Indexes for table `msg`
--
ALTER TABLE `msg`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`notification_id`);

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `reactions`
--
ALTER TABLE `reactions`
  ADD PRIMARY KEY (`reaction_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `fundings`
--
ALTER TABLE `fundings`
  MODIFY `trx_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `msg`
--
ALTER TABLE `msg`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `notification_id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32143297;

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `reactions`
--
ALTER TABLE `reactions`
  MODIFY `reaction_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=91;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
