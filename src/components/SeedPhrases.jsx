import { useState } from "react";

import { generateMnemonic } from "bip39";
import { SolanaWallet } from "../components/SolWallet";
import { EthWallet } from "../components/EthWallet";
import SeedPhrasesDisplay from "../components/SeedphrasesDisplay";


import toast, { Toaster } from 'react-hot-toast';
import { div } from "framer-motion/client";


function SeedPhrases() {
  const [mnemonic, setMnemonic] = useState("");
  const [showInput, setShowInput] = useState(true);
  const [showButton, setShowButton] = useState(true);

  const changeHandle = (event) => {
    setMnemonic(event.target.value);
    if (event.target.value) {
      setShowInput(false); // Input box ko hide karne ke liye
      setShowButton(false);
    }
  };

  return (
    <>
   <div className="w-full h-fit dark:bg-slate-950">
   <div className="flex justify-center">
   <div className="w-8/12 ">
        <div>
        <Toaster/>

<h1 className="text-center font-semibold text-black dark:text-white text-3xl mt-2 ">Create Your Web Wallet</h1>
<p className="text-center text-black dark:text-white mt-4 text-xl">Seed Phrases</p>

  {showInput && (
   <div className="flex justify-center ">
     <div className="relative m-2 border w-full md:w-8/12  ">
     
      <input
        type="text"
        onChange={changeHandle}
        value={mnemonic}
        id="floating_outlined"
        className=" p-4 block h-14 px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
      />
      <label
        for="floating_outlined"
        className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0]  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
      >
       Enter Seed prases if you have otherwise create new seed SeedPhrases
      </label>
    </div>
   </div>
  )}
  {!showInput && <SeedPhrasesDisplay mnemonic={mnemonic} />}

  {showInput ? (
    
    
    <div className="flex justify-center mt-4 ">
        
        <a
      onClick={async function () {
        const mn = generateMnemonic();
        setMnemonic(mn);
        setShowInput(false);
        toast.success("generated")
      }}
      href="#_"
      class="relative p-2 inline-flex items-center w-9/12 md:w-3/12 justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
    >
      <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
        <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
      </span>
      <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
      <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
       Create Seed Phrases
      </span>
    </a>
    </div>
  ) : (
    <div></div>
  )}

  {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
  {mnemonic && <EthWallet mnemonic={mnemonic} />}
        </div>
    </div>
   </div>
   </div>
    </>
  );
}

export default SeedPhrases;
