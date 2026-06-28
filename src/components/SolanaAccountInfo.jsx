import React, { useState } from 'react';
import { Connection, PublicKey, LAMPORTS_PER_SOL } from '@solana/web3.js';

const SolanaLatestTransaction = () => {
  const [publicKey, setPublicKey] = useState('');
  const [transaction, setTransaction] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState('');

  const connection = new Connection(
    'https://solana-mainnet.g.alchemy.com/v2/K_F7fxLTFW6EZtDxrciiH'
  );

  const fetchAccountInfo = async () => {
    try {
      setError('');
      setTransaction(null);

      if (!publicKey.trim()) {
        setError('Please enter a Solana public key.');
        return;
      }

      const pubKey = new PublicKey(publicKey.trim());

      // Balance
      const accountBalance = await connection.getBalance(pubKey);
      const balanceSOL = accountBalance / LAMPORTS_PER_SOL;
      setBalance(balanceSOL);

      // Latest signature
      const signatures = await connection.getSignaturesForAddress(pubKey, {
        limit: 1,
      });

      if (signatures.length === 0) {
        setError('No transactions found for this public key.');
        return;
      }

      const latestSignature = signatures[0].signature;

      // Latest transaction details
      const txDetails = await connection.getTransaction(latestSignature, {
        maxSupportedTransactionVersion: 0,
      });

      if (!txDetails) {
        setError('Failed to fetch transaction details.');
        return;
      }

      const preBalance = txDetails.meta?.preBalances?.[0] ?? 0;
      const postBalance = txDetails.meta?.postBalances?.[0] ?? 0;
      const amountSOL = (postBalance - preBalance) / LAMPORTS_PER_SOL;

      setTransaction({
        signature: latestSignature,
        amount: amountSOL,
        date: txDetails.blockTime
          ? new Date(txDetails.blockTime * 1000).toLocaleString()
          : 'N/A',
      });
    } catch (err) {
      setError(`Error fetching data: ${err.message}`);
      setTransaction(null);
      setBalance(null);
    }
  };

  return (
    <div className="w-full flex justify-center bg-white dark:bg-slate-950 pt-4">
      <div
        className="w-11/12 md:w-6/12 text-black dark:text-white rounded-md"
        style={{ padding: '20px' }}
      >
        <h2 className="text-center text-2xl font-semibold text-zinc-600 dark:text-zinc-200">
          Solana Wallet Info
        </h2>

        <div className="cursor-pointer mt-1 block w-full border-gray-300 rounded-md p-2">
          <input
            type="text"
            placeholder="Enter Solana Public Key"
            value={publicKey}
            onChange={(e) => setPublicKey(e.target.value)}
            className="dark:bg-slate-950 mt-1 block border dark:border-slate-700 cursor-pointer border-gray-300 rounded-md p-2 w-full"
          />
        </div>

        <div className="flex justify-center mt-4">
          <div className="relative inline-flex group pt-3">
            <div className="absolute transition-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200"></div>
            <button
              type="button"
              onClick={fetchAccountInfo}
              style={{ marginLeft: '10px', padding: '8px 16px' }}
              className="relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
            >
              Get it now
            </button>
          </div>
        </div>

        <div className="pt-4">
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>

        <div className="pt-3">
          {balance !== null && (
            <div>
              <h3>Account Balance:</h3>
              <p className="pt-3">
                <strong>Total Balance:</strong> {balance} SOL
              </p>
            </div>
          )}
        </div>

        <div className="pt-3">
          {transaction && (
            <div>
              <h3>Latest Transaction Info:</h3>
              <p className="text-sm">
                <strong>Signature:</strong> {transaction.signature}
              </p>
              <p>
                <strong>Amount Transferred:</strong> {transaction.amount} SOL
              </p>
              <p>
                <strong>Date:</strong> {transaction.date}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SolanaLatestTransaction;