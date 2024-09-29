import React, { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';

const SolanaLatestTransaction = () => {
  const [publicKey, setPublicKey] = useState('');
  const [transaction, setTransaction] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  // Set up a connection to the Solana cluster (mainnet)
  const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/UynFWZ4RJPJFEQYAqDjnQDH4uKM-ZRmK');

  // Fetch latest transaction for the given public key and total balance
  const fetchAccountInfo = async () => {
    try {
      setError(''); // Clear any previous errors
      const pubKey = new PublicKey(publicKey);

      // Fetch total balance of the account
      const accountBalance = await connection.getBalance(pubKey);
      const balanceSOL = accountBalance / 1e9; // Convert lamports to SOL
      setBalance(balanceSOL);

      // Fetch confirmed transactions for the public key (latest one)
      const confirmedSignatures = await connection.getSignaturesForAddress(pubKey, { limit: 1 });

      if (confirmedSignatures.length === 0) {
        setError('No transactions found for this public key.');
        setTransaction(null);
        return;
      }

      // Fetch details of the latest transaction
      const latestSignature = confirmedSignatures[0].signature;
      const transactionDetails = await connection.getConfirmedTransaction(latestSignature);

      if (transactionDetails) {
        // Extract lamports (SOL amount transferred) from transaction
        const amountTransferred = transactionDetails.meta.postBalances[0] - transactionDetails.meta.preBalances[0];
        const amountSOL = amountTransferred / 1e9; // Convert lamports to SOL

        setTransaction({
          signature: latestSignature,
          amount: amountSOL,
          date: new Date(transactionDetails.blockTime * 1000).toLocaleString(),
        });
      } else {
        setError('Failed to fetch transaction details.');
        setTransaction(null);
      }
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
      setTransaction(null);
      setBalance(null);
    }
  };

  return (
   <div className='w-full flex justify-center bg-white dark:bg-slate-950 pt-4'>
     <div className='w-11/12 md:w-6/12  text-black dark:text-white  rounded-md' style={{ padding: '20px' }}>
      <h2 className='text-center text-2xl font-semibold text-zinc-600 dark:text-zinc-200'>Solana Wallet Info</h2>

      <div className='cursor-pointer mt-1 block w-full  border-gray-300 rounded-md p-2'>
      <input
        type="text"
        placeholder="Enter Solana Public Key"
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
       
        className='dark:bg-slate-950 mt-1 block  border dark:border-slate-700 cursor-pointer  border-gray-300 rounded-md p-2 w-full'
      />
      </div>
      

   <div className='flex justify-center mt-4'>
   <div class="relative inline-flex  group pt-3 ">
        <div
            class="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
        </div>
        <a href="#" title="Get quote now" onClick={fetchAccountInfo} style={{ marginLeft: '10px', padding: '8px 16px' }}
            class="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            role="button">Get it now
        </a>
    </div>
   </div>
  

    <div className='pt-4'>
    {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>

    <div className='pt-3'>
    {balance !== null && (
        <div>
          <h3>Account Balance:</h3>
          <p className='pt-3'><strong>Total Balance:</strong> {balance} SOL</p>
        </div>
      )}
    </div>

     <div className='pt-3'>
     {transaction && (
        <div className=''>
          <h3>Latest Transaction Info:</h3>
          <p><strong>Signature:</strong> {transaction.signature}</p>
          <p><strong>Amount Transferred:</strong> {transaction.amount} SOL</p>
          <p><strong>Date:</strong> {transaction.date}</p>
        </div>
      )}
     </div>
    </div>
   </div>
  );
};

export default SolanaLatestTransaction;
