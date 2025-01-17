import React from "react";
import {
  HomeSvg,
  ProfileSvg,
  TraineeSvg,
  TrainerSvg,
} from "../UI/Icons/App.icons";
import NavLinks from "../UI/NavLinks";

export default function Footer() {
  return (
    <NavLinks
      navStyle=" flex w-full justify-between py-2 px-6 h-16 border-t border-white"
      itemStyle="h-full aspect-square fill-white flex flex-col items-center justify-between"
      navLinks={NAV_LINKS}
    />
  );
}

const NAV_LINKS = [
  {
    text: "Home",
    href: "/",
    icon: <HomeSvg />,
  },
  {
    text: "Trainee",
    href: "/trainee",
    icon: <TraineeSvg />,
  },
  {
    text: "Profile",
    href: "/profile",
    icon: <ProfileSvg />,
  },
  {
    text: "Trainer",
    href: "/trainer",
    icon: <TrainerSvg />,
  },
];
