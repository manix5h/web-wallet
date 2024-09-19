import React from "react";
import { Vortex } from "./ui/vortex";

export function VortexDemo() {
  return (
    (<div
      className="w-[calc(100%-4rem)] mx-auto rounded-md  h-[30rem] overflow-hidden -z-50">
      <Vortex
        backgroundColor="black"
        className="flex items-center -z-40 flex-col justify-center px-2 md:px-10 py-4 w-full h-full">
     
      </Vortex>
    </div>)
  );
}