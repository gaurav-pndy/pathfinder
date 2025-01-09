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
        className=" bg-cover bg-center w-full max-w-4xl mx-auto p-6 rounded-lg shadow-lg"
        style={{
          backgroundImage: "url('/image1.jpg')", // Replace with the actual image path
        }}
      >
        <div className="absolute z-10 inset-0 bg-blue-900/20"></div>
        <div className="relative z-50 mx-auto text-center text-white">
          <DrawerHeader>
            <DrawerTitle>
              <div className="text-4xl md:text-6xl mt-4 md:mt-0  font-bold text-blue-800">
                Generating Your Trip...
              </div>
            </DrawerTitle>
          </DrawerHeader>
          <div className="md:mt-4">
            <p className="text-md md:text-xl font-semibold  text-gray-600">
              Sit tight! We're crafting an unforgettable adventure just for you.
            </p>
          </div>

          <div className="mb-10 md:mb-5 flex justify-center">
            <img src="/planeloader2.gif" alt="" />
          </div>
        </div>

        <DrawerFooter></DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default Loader;
