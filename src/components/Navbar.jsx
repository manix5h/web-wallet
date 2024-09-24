import Thememode from "./ThemeMode";

export function Navbar(){
    return(
        <div className="w-full flex justify-center bg-slate-100 dark:bg-slate-900">
            <div className="flex  justify-between w-11/12 md:w-8/12 p-3">
            <div className="dark:text-white text-3xl">
            Vaulta
            </div>
            <div>
            <Thememode/>
            </div>
            </div>
        </div>
    )
}