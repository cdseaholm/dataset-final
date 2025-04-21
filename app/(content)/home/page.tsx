"use client";

import Link from "next/dist/client/link";

export default function Home() {
  const buttonClass = `bg-blue-400 rounded-md w-3/5 h-content text-white hover:bg-blue-300 hover:underline text-center p-2`;
  return (
    <main className="flex h-screen flex-col items-center justify-start p-24 w-screen">
      <div className="flex flex-col items-center justify-start text-center w-full h-content">
        <h1 className="text-lg underline font-semibold">
          Welcome to the Dataset Project for CSPB 4122
        </h1>
        <h1 className="text-lg underline font-semibold">
          Wine Quality Edition
        </h1>
        <h2 className="text-md">Project created by Carl Seaholm</h2>
      </div>

      <div className="flex flex-col justify-center items-center w-full h-[80%] space-y-12">
        <Link href={`/story`} className={buttonClass}>
          Dataset Story
        </Link>
        <Link href={`/data`} className={buttonClass}>
          Self Data Analysis Walkthrough
        </Link>
        <Link href={`/test`} className={buttonClass}>
          Test
        </Link>
      </div>
    </main>
  );
}
