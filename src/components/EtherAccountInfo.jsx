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
<div className='w-8/12 md:w-6/12  border text-black dark:text-white rounded-md' style={{ padding: '20px' }}>
      <h2>Ethereum Account Info Fetcherert</h2>
      <input
        type="text"
        placeholder="Enter Ethereum Public Key"
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
        style={{ width: '400px', padding: '8px' }}
        className='dark:bg-slate-950 '
      />
      <button className='' onClick={fetchAccountInfo} style={{ marginLeft: '10px', padding: '8px 16px' }}>
        Fetch Account Info
      </button>

      {/* {error && <p style={{ color: 'red' }}>{error}</p>} */}

      {balance !== null && (
        <div>
          
          <p><strong>Total Balance:</strong> {balance} ETH</p>
        </div>
      )}
      <div>
      <h1>Latest Transaction</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {transaction && (
        <div>
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

