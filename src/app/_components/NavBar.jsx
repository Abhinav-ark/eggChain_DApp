import { useEffect, useState, useContext } from 'react'

import { TrackingContext } from "../Conetxt/TrackingContext" ;
import { Navl, Nav2, Nav3 } from "../_components/index" ;
export default () => {
    const [state, setState] = useState(false);
    const { currentUser, connectWallet } = useContext(TrackingContext) ;
    const navigation = [
        { title: "Home ", path: "#" },
        { title: "Services", path: "#" },
        { title: "Contact Us", path: "#" },
        { title: "Erc20", path: "#"},
    ];

    useEffect(() => {
        document.onclick =(e) => {
            const target = e.target;
            if (!target.closest(".menu-btn")) setState(false);
        };
    }, []);

    return (
        <nav
            className={`bg-white pb-5 md:text-sm ${
                state
                    ? "shadow-lg rounded-xl border mx-2 mt-2 md:shadow-none md:border-none md:mx-2 md:mt-0"
                    : ""
            }`}
        >
            <div className="gap-x-14 items-center max-w-screen-xl mx-auto px-4 md:flex md:px-8">
                <div className="flex items-center justify-between py-5 md:block">
                    <a href="javascript:void(0)">
                        <img src="https://www.floatui.com/logo.svg"
                            alt="Float UI Logo"
                            width={120}
                            height={50}
                        />
                    </a>
                    <div className="md:hidden">
                        <button 
                            className="menu-btn text-gray-500 hover:text-gray-800"
                            onClick={() => setState(!state)}
                        >
                            {state ? <Nav1 /> : <Nav2 />}
                        </button>
                    </div>
                </div>
                <div className={`flex-1 items-center mt-8 md:mt-0 md:flex ${
                    state ? "block" : "hidden"
                }`}
                

        




const NavBar = () => {
  return (
    <div>NavBar</div>
  )
}

export default NavBar