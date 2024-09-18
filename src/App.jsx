import { useState } from "react";
import "./App.css";
import { generateMnemonic } from "bip39";
import { SolanaWallet } from "./SolanaWallet";
import { EthWallet } from "./EthWallet";
import SeedPhrasesDisplay from "./SeedphrasesDisplay";
import { BackgroundLinesDemo } from "./BacgroundLinesDemo";

import toast, { Toaster } from 'react-hot-toast';


function App() {
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
    <Toaster/>

    <h1 className="text-center font-semibold text-zinc-700 text-3xl mt-2 mb-3">Create Your Web Wallet</h1>
      {showInput && (
        <div className="relative m-2 border ">
          <input
            type="text"
            onChange={changeHandle}
            value={mnemonic}
            id="floating_outlined"
            className=" p-2 block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
          />
          <label
            for="floating_outlined"
            className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
          >
           Enter Seed prases if you have otherwise create new seed SeedPhrases
          </label>
        </div>
      )}
      {!showInput && <SeedPhrasesDisplay mnemonic={mnemonic} />}

      {showInput ? (
        <a
          onClick={async function () {
            const mn = generateMnemonic();
            setMnemonic(mn);
            setShowInput(false);
            toast.success("generated")
          }}
          href="#_"
          class="relative p-2 inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
        >
          <span class="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
            <span class="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
          </span>
          <span class="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
          <span class="relative w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
           Create Seed Phrases
          </span>
        </a>
      ) : (
        <div></div>
      )}

      {mnemonic && <SolanaWallet mnemonic={mnemonic} />}
      {mnemonic && <EthWallet mnemonic={mnemonic} />}
    </>
  );
}

export default App;
