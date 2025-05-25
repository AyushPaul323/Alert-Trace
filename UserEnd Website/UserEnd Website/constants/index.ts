import { RxHome, RxPerson, RxDashboard, RxClipboard } from "react-icons/rx";
import { IoNewspaperOutline } from "react-icons/io5";
import { TbReportSearch } from "react-icons/tb";
import { MdOutlineDangerous } from "react-icons/md";
export const SkillData = 
[
  {
    name: "Low Danger",
    Image: "/1.png",
    width: 100,
    height: 100,
  },
  {
    name: "Moderate Danger",
    Image: "/2.png",
    width: 100,
    height: 100,
  },
  {
    name: "Considerable Danger",
    Image: "/3.png",
    width: 120,
    height: 120,
  },
  {
    name: "High Danger",
    Image: "/4.png",
    width: 140,
    height: 140,
  },
  {
    name: "Extreme Danger",
    Image: "/5.webp",
    width: 140,
    height: 140,
  },
  {
    name: "Level 1 and Level 2 Flag",
    Image: "/1and2.gif",
    width: 110,
    height: 110,
  },
  {
    name: "Level 3 and 4 Flag",
    Image: "/3and4.gif",
    width: 110,
    height: 110,
  },
  {
    name: "Level 5 Flag",
    Image: "/5.gif",
    width: 120,
    height: 120,
  },
  {
    name: "Car Collision",
    Image: "/CarCollision.png",
    width: 90,
    height: 90,
  },
  {
    name: "Stop",
    Image: "/Stop.png",
    width: 90,
    height: 90,
  },
  {
    name: "Wearing Seat Belt",
    Image: "/SeatBelt.png",
    width: 70,
    height: 70,
  },
  {
    name: "School Ahead",
    Image: "/SchoolAhead.jpg",
    width: 90,
    height: 90,
  },
  {
    name: "Slippery Road Ahead",
    Image: "/SlipperyRoad.jpg",
    width: 90,
    height: 90,
  },
  {
    name: "Danger",
    Image: "/Danger.jpg",
    width: 90,
    height: 90,
  },
  {
    name: "Security Check",
    Image: "/SecurityCheck.png",
    width: 90,
    height: 90,
  },
  {
    name: "Accident Prone Area",
    Image: "/AccidentProneArea.png",
    width: 90,
    height: 90,
  },
];

export const Projects = [
  {
    title: "SNOW AVALANCHE ACCIDENT",
    text: "A Russian skier died after being caught in a massive snow avalanche at the ski resort Gulmarg in north Kashmir, while seven others, including a local guide, were successfully rescued after hours of rescue operation, officials said today.",
    src: "/SnowAvalanche.jpg",
  },
  {
    title: "ROCK AVALANCHE ACCIDENT",
    text: "3 climbers have been killed in an avalanche after the lead climber accidentally triggered it while attempting to reach the peak of an 8,705 foot mountain over the weekend!!:From the Chelan County Sheriff’s Office in a statement following the tragedy.",
    src: "/RockAvalanche.jpg",
  },
  {
    title: "ROAD ACCIDENT(Accident During Overtaking)",
    text: "15 tourists from West Bengal were injured in a bus accident on NH-60 in Odisha's Balasore district. The bus, carrying approximately 65 passengers, collided with a truck while overtaking it near Nidhipanda.",
    src: "/RoadAccident.jpg",
  },
  {
    title: "ROAD ACCIDENT(Drunk Driving)",
    text: "An Assistant Sub Inspector (ASI) from Delhi Police has been booked for driving his car drunk and ramming it into an auto rickshaw injuring three auto passengers, police in Gurgaon said on Wednesday.",
    src: "/DrunkDriving.jpg",
  },
];

export const NavLinks = [
  {
    name: "/",
    icon: RxHome,
    link: "/",
  },
  {
    name: "/my-news",
    icon: IoNewspaperOutline,
    link: "/my-news",
  },
  
  {
    name: "/my-enquiry",
    icon: TbReportSearch,
    link: "/my-enquiry",
  },
  {
    name: "/my-precaution",
    icon: MdOutlineDangerous,
    link: "/my-precaution",
  },
  {
    name: "/contact-me",
    icon: RxClipboard,
    link: "/contact-me",
  },
];
