import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import GenerateBtn from "./GenerateBtn";

const Loader = ({ loading, onGenerateTrip }) => {
  return (
    <Drawer open={loading}>
      <DrawerTrigger asChild>
        <GenerateBtn onGenerateTrip={onGenerateTrip} loading={loading} />
      </DrawerTrigger>
      <DrawerContent
        className=" bg-cover bg-center w-full max-w-5xl mx-auto  md:p-3 rounded-lg shadow-lg"
        style={{
          backgroundImage: "url('/image1.jpg')",
        }}
      >
        <div className="absolute z-10 inset-0 bg-blue-900/30"></div>
        <div className="relative z-50 mx-auto text-center text-white">
          <DrawerHeader>
            <DrawerTitle>
              <div className="text-3xl sm:text-4xl md:text-6xl  md:mt-0  font-bold text-blue-800">
                Generating Your Trip...
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <div className="md:mt-4">
            <p className="text-sm sm:text-md md:text-xl font-semibold px-2 text-gray-600">
              Sit tight! We're crafting an unforgettable adventure just for you.
            </p>
          </div>

          <div className="mb-24 md:mb-14 flex justify-center">
            <img src="/planeloader2.gif" alt="" className=" md:w-[50%]" />
          </div>
        </div>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Loader;
