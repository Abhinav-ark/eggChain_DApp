"use client";

import Lottie from "react-lottie";
import animationData from "../_lotties/egg";

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

    const defaultOptions = {
      loop: true,
      autoplay: true,
      animationData: animationData,
      rendererSettings: {
        preserveAspectRatio: "xMidYMid slice",
      },
    };


    return (
      <footer className="pt-10">
        <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
          <div className="justify-between sm:flex">
            <div className="space-y-6">
              <img src="./eggChain_logo.png" className="w-32"/>
              <p className="max-w-md">
                A Decentralized solution for tracking Egg supply chain.
              </p>
              <ul className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
                {footernavs.map((item, idx) => {
                  <li className="text-gray-800 hover:text-gray-500 duration-150">
                    <a key={idx} href={item.href}>{item.name}</a>
                  </li>
                })}
              </ul>
            </div>
            <div className="flex items-center justify-end font-bold text-2xl">
              <ul>
                <li>Freshly</li>
                <li>Delivered.</li>
              </ul>
              <Lottie options={defaultOptions} height={100} width={100} />
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
            <p>&#169;2024 eggChain. All rights reserved</p>
          </div>
        </div>
      </footer>
    );
};

export default Footer;