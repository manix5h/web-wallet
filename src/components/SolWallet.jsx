import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import bs58 from "bs58";
import toast, { Toaster } from 'react-hot-toast';

export function SolanaWallet({ mnemonic }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [publicKeys, setPublicKeys] = useState([]);
  const [privateKey, setPrivateKey] = useState([]);

  const [copied, setCopied] = useState(false);
  const handleCopy = (word) => {
  };

  return (
    <div className="w-full border rounded-lg mt-3 pb-4">
     <div className="flex justify-center">
     <div className="">
     <Toaster/>
      <div className="flex justify-center">
      <a
        onClick={async function () {
          const seed = await mnemonicToSeed(mnemonic);
          const path = `m/44'/501'/${currentIndex}'/0'`;
          const derivedSeed = derivePath(path, seed.toString("hex")).key;
          const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
          const keypair = Keypair.fromSecretKey(secret);
          const privatekey = bs58.encode(secret);

          setCurrentIndex(currentIndex + 1);
          setPublicKeys([ keypair.publicKey]);
          setPrivateKey([ privatekey]);
          
         
        }}
        href="#_"
        class="box-border relative z-30 mt-5 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none"
      >
        <span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
        <span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
        <span class="relative z-20 flex items-center text-sm">
          <svg
            class="relative w-5 h-5 mr-2 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"first
              stroke-width="2"
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
          Add SOL wallet
        </span>
      </a>

      </div>
      {publicKeys.map((p) => (
        <div className="cursor-pointer mt-3  text-white" onClick={()=>{
            navigator.clipboard.writeText(p).then(() => {
                setCopied(true);
                
                toast.success(" Public Key Copied Sucessfully")
                
              });
        }}> <span className="m-1 p-1 text-white">Public Key {currentIndex}--- </span> {p.toBase58()}</div>
      ))}
      {privateKey.map((p) => (
        <div className="cursor-pointer mt-3 mb-3   text-white" onClick={()=>{
            navigator.clipboard.writeText(p).then(() => {
                setCopied(true);
                
                toast.success(" Private Key Copied Sucessfully")
                
              });
        }}> <span className="m-1 p-1"> Private Key {currentIndex}--- </span> {p}</div>  
      ))}
      
     </div>
     </div>
    </div>
  );
}