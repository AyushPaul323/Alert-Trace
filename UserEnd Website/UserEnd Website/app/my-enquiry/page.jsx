import Enquiry from "@/components/Enquiry";
import React from "react";

const Page = () => {
  return (
    <div
      style={{ backgroundImage: "url(bgg.jpg)" }}
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
    >
      <div
        style={{ backgroundImage: "url(main-bg.jpg" }}
        className="h-[69%] w-[60%] relative bg-cover bg-center rounded-xl border border-white"
      >
        <div className="absolute right-60 bottom-9 w-[60%] md:w-[40%]">
          <Enquiry />
        </div>
      </div>
    </div>
  );
};

export default Page;