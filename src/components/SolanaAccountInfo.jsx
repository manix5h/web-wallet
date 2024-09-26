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
     <div className='w-8/12 md:w-6/12 border text-black dark:text-white rounded-md' style={{ padding: '20px' }}>
      <h2 >Solana Account Info Fetcher</h2>
      <input
        type="text"
        placeholder="Enter Solana Public Key"
        value={publicKey}
        onChange={(e) => setPublicKey(e.target.value)}
        style={{ width: '400px', padding: '8px' }}
        className='dark:bg-slate-950 block peer'
      />
      <button onClick={fetchAccountInfo} style={{ marginLeft: '10px', padding: '8px 16px' }}>
        Fetch Account Info
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {balance !== null && (
        <div>
          <h3>Account Balance:</h3>
          <p><strong>Total Balance:</strong> {balance} SOL</p>
        </div>
      )}

      {transaction && (
        <div>
          <h3>Latest Transaction Info:</h3>
          <p><strong>Signature:</strong> {transaction.signature}</p>
          <p><strong>Amount Transferred:</strong> {transaction.amount} SOL</p>
          <p><strong>Date:</strong> {transaction.date}</p>
        </div>
      )}
    </div>
   </div>
  );
};

export default SolanaLatestTransaction;
