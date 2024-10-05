import Thememode from "./ThemeMode";
import { FaGithub } from "react-icons/fa6";
export function Navbar(){
    return(
        <div className="w-full flex justify-center bg-slate-100 dark:bg-slate-900">
            <div className="flex  justify-between w-11/12 md:w-8/12 p-3">
            <div className="dark:text-white text-3xl cursor-pointer">
            Vaulta
            </div>
           
            <div className="flex ">
                <div className="text-4xl dark:text-white text-black pr-4  md:pr-10 cursor-pointer">
                    <a href="https://github.com/manix5h/web-wallet">
                    <FaGithub />
                    </a>
               
                </div>
            <div>
            <Thememode/>
            </div>
            </div>
            </div>
        </div>
    )
}