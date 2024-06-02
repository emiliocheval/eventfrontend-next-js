import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white py-4 bottom-0 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm mb-2 md:mb-0">
         Event finder. All rights reserved.
        </div>
        <div className="flex gap-4">
          <div className="cursor-pointer hover:underline">Contact Us</div>
          <div className="cursor-pointer hover:underline">About</div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;