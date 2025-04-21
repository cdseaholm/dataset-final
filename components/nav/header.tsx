"use client";

import Link from "next/link";
import { IoMdHome } from "react-icons/io";

export default function Header() {
  return (
    <header className="flex flex-row justify-between px-8 py-2 items-center w-screen h-content border-b border-black">
      <Link href={"/"}>
        <IoMdHome title="Home" size={22} />
      </Link>
      <p title="By Carl Seaholm">Dataset Project</p>
    </header>
  );
}
