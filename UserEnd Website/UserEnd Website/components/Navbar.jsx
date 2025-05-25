import Image from "next/image";
import React from "react";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <div className="fixed top-0 z-[40] w-full h-[100px] bg-transparent flex justify-between items-center px-10 md:px-20">
      <div className="flex flex-row gap-3 items-center">
        <div className="relative">
          {/* <Image
            src="/horseLogo.jpg"
            alt="logo"
            width={40}
            height={40}
            className="w-full h-full object-contain rounded-full"
          /> */}
        </div>
        <h1 className="text-white text-[25px] font-semibold">
          Alert{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-cyan-500">
            {" "}
          Trace{" "}
          </span>
        </h1>
        <div style={{ paddingLeft: '72vw', textAlign: 'right' }}>
      <UserButton />
    </div>
      </div>

      <div className="flex flex-row gap-5 mb-2">
  
      </div>
    </div>
  );
};

export default Navbar;
