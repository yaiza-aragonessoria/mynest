import apples from "../assets/cards_images/apples.jpg"
import cinnamon from "../assets/cards_images/cinnamon.jpg"
import broccoli from "../assets/cards_images/broccoli.jpg"
import carrot from "../assets/cards_images/carrot.jpg"
import honey from "../assets/cards_images/honey.jpg"
import kale from "../assets/cards_images/kale.jpg"
import pumpkin from "../assets/cards_images/pumpkin.jpg"
import strawberries from "../assets/cards_images/strawberries.jpg"
import sweet_potato from "../assets/cards_images/sweet_potato.jpg"

export const food_data = [
  {
    id: 1,
    name: "Apples",
    image: <img src={apples} alt="food pick"/>,
    description: "Apples are low in calories, yet high in fiber and water",
  },
  {
    id: 2,
    name: "Cinnamon",
    image: <img src={cinnamon} alt="food pick"/>,
    description:
      "Cinnamon is a strong antioxidant, helping to eliminate toxins from your body",
  },
  {
    id: 3,
    name: "Honey",
    image: <img src={honey} alt="food pick"/>,
    description: "Honey can be used to replace white sugar almost anywhere",
  },
  {
    id: 4,
    name: "Kale",
    image: <img src={kale} alt="food pick"/>,
    description:
      "Kale is a powerful superfood filled with vitamins, minerals, and phytonutrients",
  },
  {
    id: 5,
    name: "Carrot",
    image: <img src={carrot} alt="food pick"/>,
    description: "Beta carotene from carrots helps maintain healthy skin",
  },
  {
    id: 6,
    name: "Pumpkin",
    image: <img src={pumpkin} alt="food pick"/>,
    description: "Pumpkins are low in calories but rich in fiber and water",
  },
  {
    id: 7,
    name: "Sweet potato",
    image: <img src={sweet_potato} alt="food pick"/>,
    description:
      "Sweet potatoes contain a lot of provitamin A which protects your eyes",
  },
  {
    id: 8,
    name: "Strawberries",
    image: <img src={strawberries} alt="food pick"/>,
    description:
      "Strawberries are low in calories and high in vitamins C, B6, K, fiber, folic acid, potassium and amino acids.",
  },
  {
    id: 9,
    name: "Broccoli",
    image: <img src={broccoli} alt="food pick"/>,
    description:
      "Broccoli contains twice the amount of Vitamin C than an orange",
  },
];
