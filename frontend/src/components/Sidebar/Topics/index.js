import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faHardDrive,
  faSoccerBall,
  faBarChart,
  faMoneyBillAlt,
  faPlayCircle,
  faStar,
  faPlusSquare,
} from "@fortawesome/free-regular-svg-icons";
import TopicOption from "./TopicOption";

function Topics() {
  const topics = [
    {
      title: "Gaming",
      options: [
        "Valheim",
        "Genshin Impact",
        "Minecraft",
        "Call of Duty",
        "Halo Infinite",
      ],
      icon: faHardDrive,
    },
    {
      title: "Sports",
      options: [
        "NFL",
        "NBA",
        "Los Angeles Lakers",
        "Atlanta Hawks",
        "Arsenal F.C",
      ],
      icon: faSoccerBall,
    },
    {
      title: "Business",
      options: ["GameStop", "Pfizer", "Best Buy", "SpaceX", "Novavax"],
      icon: faBarChart,
    },
    {
      title: "Crypto",
      options: ["Cardano", "Dogecoin", "Algorand", "Bitcoin", "Litecoin"],
      icon: faMoneyBillAlt,
    },
    {
      title: "Television",
      options: [
        "The Real Housewives of Atlanta",
        "the Bachelor",
        "Sister Wives",
        "90 Day Fiance",
        "Wife Swap",
      ],
      icon: faPlayCircle,
    },
    {
      title: "Celebrity",
      options: [
        "Kim Kardashian",
        "Doja Cat",
        "Henry Cavill",
        "Keanu Reeves",
        "Tom Holland",
      ],
      icon: faStar,
    },
    {
      title: "More Topics",
      options: [
        "Animals and Pets",
        "Anime",
        "Art",
        "Cars and Vehicles",
        "Tom Holland",
      ],
      icon: faPlusSquare,
    },
  ];
  return (
    <div className="topics">
      <div className="topics-title">TOPICS</div>
      {topics.map((ele, i) => (
        <TopicOption title={ele.title} options={ele.options} icon={ele.icon} />
      ))}
    </div>
  );
}

export default Topics;
