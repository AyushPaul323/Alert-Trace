import Heatmap from "@/components/Heatmap";
import React from "react";

const Page = () => {

  return (
    
    <div
      style={{ backgroundImage: "url(bgg.jpg)" }}
      className="w-screen h-screen bg-cover bg-center flex items-center justify-center"
    >
      
      <div
        className="h-[70%] w-[60%] relative  bg-center "
      >
          <Heatmap />
        </div>
      </div>
  );
};

export default Page;
