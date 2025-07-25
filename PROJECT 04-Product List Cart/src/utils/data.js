import wafflesThumbnail from "../assets/images/image-waffle-thumbnail.jpg";
import wafflesDesktop from "../assets/images/image-waffle-desktop.jpg";

import cremeThumbnail from "../assets/images/image-creme-brulee-thumbnail.jpg";
import cremeDesktop from "../assets/images/image-creme-brulee-desktop.jpg";

import macaronThumbnail from "../assets/images/image-macaron-thumbnail.jpg";
import macaronDesktop from "../assets/images/image-macaron-desktop.jpg";

import tiramisuThumbnail from "../assets/images/image-tiramisu-thumbnail.jpg";
import tiramisuDesktop from "../assets/images/image-tiramisu-desktop.jpg";

import baklavaThumbnail from "../assets/images/image-baklava-thumbnail.jpg";
import baklavaDesktop from "../assets/images/image-baklava-desktop.jpg";

import meringueThumbnail from "../assets/images/image-meringue-thumbnail.jpg";
import meringueDesktop from "../assets/images/image-meringue-desktop.jpg";

import cakeThumbnail from "../assets/images/image-cake-thumbnail.jpg";
import cakeDesktop from "../assets/images/image-cake-desktop.jpg";

import brownieThumbnail from "../assets/images/image-brownie-thumbnail.jpg";
import brownieDesktop from "../assets/images/image-brownie-desktop.jpg";

import pannaThumbnail from "../assets/images/image-panna-cotta-thumbnail.jpg";
import pannaDesktop from "../assets/images/image-panna-cotta-desktop.jpg";

let products = [
  {
    image: {
      thumbnail: wafflesThumbnail,
      desktop: wafflesDesktop,
    },
    name: "Waffle with Berries",
    category: "Waffle",
    price: 6.5,
  },

  {
    image: {
      thumbnail: cremeThumbnail,
      desktop: cremeDesktop,
    },
    name: "Vanilla Bean Crème Brûlée",
    category: "Crème Brûlée",
    price: 7.0,
  },

  {
    image: {
      thumbnail: macaronThumbnail,
      desktop: macaronDesktop,
    },
    name: "Macaron Mix of Five",
    category: "Macaron",
    price: 8.0,
  },

  {
    image: {
      thumbnail: tiramisuThumbnail,
      desktop: tiramisuDesktop,
    },
    name: "Classic Tiramisu",
    category: "Tiramisu",
    price: 5.5,
  },
  {
    image: {
      thumbnail: baklavaThumbnail,
      desktop: baklavaDesktop,
    },
    name: "Pistachio Baklava",
    category: "Baklava",
    price: 4.0,
  },

  {
    image: {
      thumbnail: meringueThumbnail,
      desktop: meringueDesktop,
    },
    name: "Lemon Meringue Pie",
    category: "Pie",
    price: 5.0,
  },
  {
    image: {
      thumbnail: cakeThumbnail,
      desktop: cakeDesktop,
    },
    name: "Red Velvet Cake",
    category: "Cake",
    price: 4.5,
  },

  {
    image: {
      thumbnail: brownieThumbnail,
      desktop: brownieDesktop,
    },
    name: "Salted Caramel Brownie",
    category: "Brownie",
    price: 4.5,
  },
  {
    image: {
      thumbnail: pannaThumbnail,
      desktop: pannaDesktop,
    },
    name: "Vanilla Panna Cotta",
    category: "Panna Cotta",
    price: 6.5,
  },
];

export default products;
