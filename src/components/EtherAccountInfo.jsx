import React, { useState } from 'react';
import { ethers } from 'ethers';

const EthereumAccountInfo = () => {
  const [publicKey, setPublicKey] = useState('');
  const [transaction, setTransaction] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  // Use ethers.js v6 with Alchemy provider
  const provider = new ethers.AlchemyProvider('mainnet', 'UynFWZ4RJPJFEQYAqDjnQDH4uKM-ZRmK');
  
  

  // Fetch account details (balance and latest transaction)
  const fetchAccountInfo = async () => {
    const apiKey = 'HNZGUUV3PIVSJ4B84GFXF1F9IVDIKYI9MV'; // Yahan apni API key daalo
    const address = publicKey; // Yahan apna wallet address daalo
    const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;
    try {
      setError(''); // Clear any previous errors
      const address = publicKey;
      
     
      // Fetch total balance of the account
      const accountBalance = await provider.getBalance(address);
     
      const balanceETH = ethers.formatEther(accountBalance); // Convert to ETH from wei
    //   const balanceETH = ethers.utils.formatEther(accountBalance);
      setBalance(balanceETH);
      console.log(balance)
      
      

      
 const response = await fetch(url);
      const data = await response.json();
      if (data.status === '1') {
        setTransaction(data.result[0]); // Latest transaction
      } else {
        setError('No transactions found.');
      }
    
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
     
     
    }
  };

  return (
<div className='w-full flex justify-center bg-white dark:bg-slate-950 pt-4'>
<div className='w-11/12 md:w-6/12 text-black dark:text-white rounded-md' style={{ padding: '20px' }}>
      <h2 className=' text-center text-2xl font-semibold text-zinc-600 dark:text-zinc-200'>Ethereum Wallet Info</h2>
     <div className='cursor-pointer mt-1 block w-full  border-gray-300 rounded-md p-2'>
     <input
        type="text"
        placeholder="Enter Ethereum Public Key"
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
        
        className='dark:bg-slate-950 mt-1 block  border dark:border-slate-700 cursor-pointer  border-gray-300 rounded-md p-2 w-full'
      />
     </div>
    

      <div className='flex justify-center pt-4'>
      <div class="relative inline-flex  group pt-3">
        <div
            class="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
        </div>
        <a href="#" title="Get quote now" onClick={fetchAccountInfo} style={{ marginLeft: '10px', padding: '8px 16px' }}
            class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            role="button">Get it now
        </a>
    </div>
      </div>

      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}

      <div className='pt-4'>
      {balance !== null && (
        <div>
          
          <p><strong>Total Balance:</strong> {balance} ETH</p>
        </div>
      )}
      </div>
      <div className='pt-3'>
      
      <div className='pt-3'>{error && <p style={{ color: 'red' }}>{error}</p>}</div>
      {transaction && (
        <div>
          <h1>Latest Transaction</h1>
          <p>Transaction Hash: {transaction.hash}</p>
          <p>Block Number: {transaction.blockNumber}</p>
          <p>From: {transaction.from}</p>
          <p>To: {transaction.to}</p>
          <p>Value: {transaction.value} Wei</p>
        </div>
      )}
    </div>
    </div>
</div>
  );
};

export default EthereumAccountInfo;

// import React, { useEffect, useState } from 'react';

// const LatestTransaction = () => {
//     <div>
//     <h1>Latest Transaction</h1>
//     {error && <p style={{ color: 'red' }}>{error}</p>}
//     {transaction && (
//       <div>
//         <p>Transaction Hash: {transaction.hash}</p>
//         <p>Block Number: {transaction.blockNumber}</p>
//         <p>From: {transaction.from}</p>
//         <p>To: {transaction.to}</p>
//         <p>Value: {transaction.value} Wei</p>
//       </div>
//     )}
//   </div>
//   const [error, setError] = useState('');

//   const fetchLatestTransaction = async () => {
//     const apiKey = 'YOUR_ETHERSCAN_API_KEY'; // Yahan apni API key daalo
//     const address = 'YOUR_WALLET_ADDRESS'; // Yahan apna wallet address daalo
//     const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&sort=desc&apikey=${apiKey}`;

//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       if (data.status === '1') {
//         setTransaction(data.result[0]); // Latest transaction
//       } else {
//         setError('No transactions found.');
//       }
//     } catch (err) {
//       setError(`Error: ${err.message}`);
//     }
//   };

//   useEffect(() => {
//     fetchLatestTransaction();
//   }, []);

//   return (
//     <div>
//       <h1>Latest Transaction</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {transaction && (
//         <div>
//           <p>Transaction Hash: {transaction.hash}</p>
//           <p>Block Number: {transaction.blockNumber}</p>
//           <p>From: {transaction.from}</p>
//           <p>To: {transaction.to}</p>
//           <p>Value: {transaction.value} Wei</p>
//         </div>
//       )}
//     </div>
//   );
// };

