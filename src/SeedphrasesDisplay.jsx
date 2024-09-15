import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const SeedPhrasesDisplay = ({ mnemonic }) => {
  const [copied, setCopied] = useState(false);



  
  const handleCopy = (word) => {
    navigator.clipboard.writeText(word).then(() => {
      setCopied(true);
      
      toast.success(" SeedPhrases Copied Sucessfully")
      
    });
  };

  const notify = () => toast('Here is your toast.');

  return (
    <div className=' border p-2 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 justify-center  items-center mx-auto my-8 rounded-md w-8/12' >
      {mnemonic.split(' ').map((word, index) => (
        <div
          key={index}
          onClick={() => handleCopy(mnemonic)}
          className=' cursor-pointer md:text-lg bg-foreground/5 hover:bg-foreground/10 transition-all duration-300 rounded-lg p-4'
        >
          {word}
        </div>
      ))}
      {copied &&   <Toaster  />}
    
    </div>
  );
};

export default SeedPhrasesDisplay;

