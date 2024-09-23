
import React, { useState } from "react";
import "@theme-toggles/react/css/Within.css"
import { IoMoon } from "react-icons/io5";
import { IoSunny } from "react-icons/io5";
import "@theme-toggles/react/css/Classic.css"



function Thememode() {

    const [dark, setDark] = useState(false);

    const darkModeHandler = () => {
        setDark(!dark);
        document.body.classList.toggle("dark");
    }

    return (
        <div className=" dark:text-white text-4xl transition-all duration-900">
            <button onClick={()=> darkModeHandler()}>
                {
                    
                    dark  && <IoSunny />
                }
                {
                    !dark && <IoMoon />
                }
            </button>
          
                
        </div>
    );
}

export default Thememode;