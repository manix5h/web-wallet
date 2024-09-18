import { useState } from "react";
import { mnemonicToSeed } from "bip39";
import { Wallet, HDNodeWallet } from "ethers";
import toast, { Toaster } from 'react-hot-toast';

export const EthWallet = ({mnemonic}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [addresses, setAddresses] = useState([]);
    const [privateKeys, setPrivateKeys] = useState([]);
    const [copied, setCopied] = useState(false);
    return (
        <div className="w-full">
           <div className="flex justify-center">
           <div className="">
           <Toaster/>
           <div className="  mt-3">
           <a onClick={async function() {
                const seed = await mnemonicToSeed(mnemonic);
                const derivationPath = `m/44'/60'/${currentIndex}'/0'`;
                 const hdNode = HDNodeWallet.fromSeed(seed);
                 const child = hdNode.derivePath(derivationPath);
                 const privateKey = child.privateKey;
                 const wallet = new Wallet(privateKey);
                
                 
               
                 setCurrentIndex(currentIndex + 1);
                setAddresses([wallet.address]);
                setPrivateKeys([ privateKey])
            }} href="#_" class="box-border relative z-30 inline-flex items-center justify-center w-auto px-8 py-3 overflow-hidden font-bold text-white transition-all duration-300 bg-indigo-600 rounded-md cursor-pointer group ring-offset-2 ring-1 ring-indigo-300 ring-offset-indigo-200 hover:ring-offset-indigo-500 ease focus:outline-none">
<span class="absolute bottom-0 right-0 w-8 h-20 -mb-8 -mr-5 transition-all duration-300 ease-out transform rotate-45 translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
<span class="absolute top-0 left-0 w-20 h-8 -mt-1 -ml-12 transition-all duration-300 ease-out transform -rotate-45 -translate-x-1 bg-white opacity-10 group-hover:translate-x-0"></span>
<span class="relative z-20 flex items-center text-sm">
<svg class="relative w-5 h-5 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>
Create Eth wallet
</span>
</a>

            

            {addresses.map(p => <div className="cursor-pointer mt-3 border" onClick={()=>{
            navigator.clipboard.writeText(p).then(() => {
                setCopied(true);
                
                toast.success(" Public Key Copied Sucessfully")
                
              });
        }}>
                <span className="m-1 p-1">Public Key {currentIndex}--- </span> {p}
                <br/>
                
            </div>)}
            {
                    privateKeys.map(key =>
                        <div className="cursor-pointer mt-3 border" onClick={()=>{
                            navigator.clipboard.writeText(key).then(() => {
                                setCopied(true);
                                
                                toast.success(" Private Key Copied Sucessfully")
                                
                              });
                        }}>
                          <span className="m-1 p-1">Private Key {currentIndex}---   </span>  {key}
                        </div>
                    )
            }
            <p className="pt-4">Now enjoy your wallet || Code by Manish Sahu</p>
           </div>
           
           </div>
           </div>
        </div>
    )
}