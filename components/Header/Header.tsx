import React from "react";
import { TreadMillSvg } from "../UI/Icons/Training.icons";
import UserMenuIndex from "../User/UserMenu/UserMenuIndex";

export default function Header() {
  return (
    <header className="h-16 p-4  w-full flex justify-between items-center text-white border-b border-white">
      <TreadMillSvg className="h-full aspect-square fill-white" />
      <UserMenuIndex />
    </header>
  );
}
