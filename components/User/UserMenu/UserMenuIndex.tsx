"use client";
import Button from "@/components/UI/Button";
import { LogoutSvg } from "@/components/UI/Icons/App.icons";
import LinkCmp from "@/components/UI/Link";
import { useModel } from "@/hooks/useModel";
import { useUser } from "@/hooks/useUser";
import Image from "next/image";
import { useRef } from "react";

export default function UserMenuIndex() {
  const { user, logout } = useUser();
  const modelRef = useRef(null);
  const [isOpen, setIsOpen] = useModel(modelRef);
  const imgUrl =
    user?.imgUrl ||
    "https://res.cloudinary.com/dyzqa6uuu/image/upload/v1733829566/framer/avatar-default-svgrepo-com_dict7t.svg";

  if (!user) {
    return (
      <LinkCmp
        styleMode="none"
        styleSize="none"
        className="border p-2 rounded"
        href="/signin"
      >
        Sign-In
      </LinkCmp>
    );
  }
  return (
    <div ref={modelRef} className="relative">
      <Button
        styleMode="none"
        styleSize="none"
        className="h-full aspect-square fill-white"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image src={imgUrl} alt="User avatar" width={36} height={36} />
      </Button>
      {isOpen && (
        <ul className=" absolute bg-black top-full right-0 p-4 rounded w-36">
          <Button
            styleMode="none"
            styleSize="none"
            className=" p-2 flex items-center justify-between w-full  border-t border-b"
            onClick={logout}
          >
            <span>Logout</span>
            <LogoutSvg className="h-6 aspect-square fill-none stroke-white rotate-180 " />
          </Button>
          <LinkCmp
            styleMode="none"
            styleSize="none"
            className=" p-2 flex items-center justify-between w-full  border-t border-b"
            href={`profile/${user.id}`}
          >
            <span>Profile</span>
            <LogoutSvg className="h-6 aspect-square fill-none stroke-white rotate-180 " />
          </LinkCmp>
        </ul>
      )}
    </div>
  );
}
