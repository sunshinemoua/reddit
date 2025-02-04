"use client";
import Image from "next/image";
import React from "react";
import logo from "../logos/logo.svg";
import sign from "../logos/sign.svg";
import { CiSearch } from "react-icons/ci";
import { LuMessageCircleMore } from "react-icons/lu";
import { FiPlus } from "react-icons/fi";
import { DarkModeToggle } from "./DarkModeToggle";
import { GoBell } from "react-icons/go";
import { AiOutlineMenu } from "react-icons/ai";
import UserAvatar from "./UserAvatar";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import UserButton from "./UserButton";

const Header = () => {
  const { data: session } = useSession();
  return (
    <div className="sticky top-0 z-50 flex justify-between bg-transparent px-4 py-3 shadow-sm">
      {/* Logo */}

      <div className="flex w-fit items-center cursor-pointer">
        <AiOutlineMenu
          className="m-auto mr-4 dark:text-gray-500 lg:hidden"
          size={22}
        />
        <Image
          src={logo}
          alt="Reddit Icon"
          className="mr-2 "
          width={32}
          height={32}
        />
        <Image
          src={sign}
          alt="Reddit Sign"
          className="sign ml-2 hidden lg:flex"
          width={72}
          height={32}
        />
      </div>

      {/* Search Box */}
      <form className="hidden lg:flex items-center space-x-2 w-1/2 text-sm border-none dark:bg-gray-750 rounded-full">
        <CiSearch className="h-6 w-6 text-gray-400 ml-2" />
        <input
          type="text"
          placeholder="Search Reddit"
          className="bg-transparent outline-none w-full pr-4"
        />
        <button type="submit" hidden />
      </form>
      {/* Right Side of Nav */}
      {session ? (
        <div className="flex items-center text-gray-400 mx-1 lg:mx-5 space-x-2 lg:space-x-4">
          <CiSearch size={30} className="icon lg:hidden" />
          <LuMessageCircleMore size={30} className="icon hidden lg:flex" />
          <div className="flex items-center text-sm lg:pr-2 rounded-full hover:bg-gray-750">
            <FiPlus size={30} className="p-1" />
            <span className="hidden lg:flex"> Create</span>
          </div>
          <GoBell size={30} className="icon " />

          <UserButton />
        </div>
      ) : (
        <Button
          onClick={() => signIn()}
          className="dark:bg-reddit-red dark:text-white rounded-full"
        >
          Log In
        </Button>
      )}
    </div>
  );
};

export default Header;
