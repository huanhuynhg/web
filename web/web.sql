-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 09, 2019 at 01:55 AM
-- Server version: 10.1.38-MariaDB
-- PHP Version: 7.1.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `web`
--

-- --------------------------------------------------------

--
-- Table structure for table `khachhang`
--

CREATE TABLE `khachhang` (
  `tendn` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `matkhau` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `hoten` varchar(40) COLLATE utf8_unicode_ci NOT NULL,
  `diachi` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `dienthoai` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `khachhang`
--

INSERT INTO `khachhang` (`tendn`, `matkhau`, `hoten`, `diachi`, `dienthoai`, `email`) VALUES
('huan', '123', 'Huỳnh Hữu Huân', 'ktx khu A', '0983676747', 'huanhuynhg@gmail.com'),
('huan', '222', 'huân', 'ktx khu a', '0983676747', 's@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `loaisp`
--

CREATE TABLE `loaisp` (
  `maloai` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `tenloai` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `loaisp`
--

INSERT INTO `loaisp` (`maloai`, `tenloai`) VALUES
('1', 'movies'),
('2', 'books'),
('3', 'music');

-- --------------------------------------------------------

--
-- Table structure for table `sanpham`
--

CREATE TABLE `sanpham` (
  `masp` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `maloai` varchar(3) COLLATE utf8_unicode_ci DEFAULT NULL,
  `tensp` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `dongia` int(11) DEFAULT NULL,
  `img` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL,
  `mota` varchar(1000) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sanpham`
--

INSERT INTO `sanpham` (`masp`, `maloai`, `tensp`, `dongia`, `img`, `mota`) VALUES
('1', '3', 'Beethovens Masterwork', 30, 'beethoven.jpg', 'no description'),
('2', '2', 'Harry Potter', 20, 'harrypotter.jpg', 'no description'),
('3', '2', 'The Shining', 25, 'shining.jpg', 'no description'),
('4', '3', 'Bob Marleys Classics', 20, 'bobmarley.jpg', 'no description'),
('5', '1', 'Good Fellas', 15, 'goodfellas.jpg', 'no description'),
('6', '2', 'JavaScript for Beginners', 40, 'javascript.jpg', 'no description'),
('7', '1', 'Terminator 3', 10, 'terminator3.jpg', 'no description'),
('8', '3', 'Steve Wonders Evergreens', 20, 'stevewonder.jpg', 'no description'),
('9', '1', 'Star Wars', 20, 'starwars.jpg', 'no description');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `loaisp`
--
ALTER TABLE `loaisp`
  ADD PRIMARY KEY (`maloai`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
