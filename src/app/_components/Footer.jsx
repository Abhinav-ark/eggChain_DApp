"use client";
import { Fot1, Fot2 } from "./";
const Footer = () => {
    const footernavs = [
        {
          href : "#",
          name: "Terms",

        },
        {
          href : "#",
          name: "License",

        },
        {
          href : "#",
          name: "Privacy",

        },
        {
          href : "#",
          name: "About us",

        },
    ];
    return (
      <footer className="pt-10">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="justify-between sm:flex">
            <div className="space-y-6">
              <img src="https://www.floatui.com/logo.svg" className="w-32"/>
              <p className="max-w-md">
                Float UI is a platform that allows you to create a website without writing a single line of code.
              </p>
              <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
                {footernavs.map((item, idx) => {
                  <li className="text-gray-800 hover:text-gray-500 duration-150">
                    <a key={idx} href={item.href}>{item.name}</a>
                  </li>
                })}
              </ul>
            </div>
            {/* <div className="mt-6">
              <p className="text-gray-700 font-semibold">Get the app</p>
              <div className="flex items-center gap-3 mt-3 sm:block">
                <a href="#">
                  <Fot1 />
                </a>
                <a href="#" className="mt-0 block sm:mt-3">
                  <Fot2 />
                </a>
              </div>
            </div> */}
          </div>
          <div className="mt-10 py-10 border-t md:text-center">
            <p>&#169;2024 Egg Chain. All rights reserved</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;