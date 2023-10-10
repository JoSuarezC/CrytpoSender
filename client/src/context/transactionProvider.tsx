import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from '../utils/constants';
import { TransactionContext } from './transactionContext';
import { useCallback, useEffect, useState } from 'react';
import { TransactionData } from '../types/transaction';

type TransferStruct = {
  sender: string;
  receiver: string;
  amount: ethers.BigNumber;
  message: string;
  timestamp: ethers.BigNumber;
  keyword: string;
};

interface TransactionContract extends ethers.Contract {
  addToBlockchain: (
    addressTo: string,
    parsedAmount: ethers.BigNumber,
    message: string,
    keywordName: string
  ) => Promise<{ wait: () => Promise<void>; hash: string }>;
  getTransactionCount: () => Promise<ethers.BigNumber>;
  getAllTransactions: () => Promise<TransferStruct[]>;
}

const { ethereum } = window as Window &
  typeof globalThis & { ethereum: ethers.providers.ExternalProvider };

const getEthereumContract = () => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const transactionContract = new ethers.Contract(
    CONTRACT_ADDRESS,
    CONTRACT_ABI,
    signer
  ) as TransactionContract;

  return transactionContract;
};

const TransactionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const [transactionCount, setTransactionCount] = useState(
    Number(localStorage.getItem('transactionCount')) || 0
  );
  const [transactions, setTransactions] = useState<TransactionData[]>([]);

  const getAllTransactions = useCallback(async () => {
    try {
      if (ethereum) {
        const transactionsContract = getEthereumContract();

        const availableTransactions =
          await transactionsContract.getAllTransactions();

        const structuredTransactions = availableTransactions.map(
          (transaction) => ({
            addressTo: transaction.receiver,
            addressFrom: transaction.sender,
            timestamp: new Date(
              transaction.timestamp.toNumber() * 1000
            ).toLocaleString(),
            message: transaction.message,
            keyword: transaction.keyword,
            amount: parseInt(transaction.amount._hex) / 10 ** 18,
          })
        );

        console.log(structuredTransactions);

        setTransactions(structuredTransactions);
      } else {
        throw new Error('Ethereum is not present');
      }
    } catch (error) {
      console.log(error);
      alert(error);
    }
  }, []);

  useEffect(() => {
    const isWalletConnected = async () => {
      try {
        if (!ethereum) throw new Error('Please install metamask wallet');

        const accounts = (await ethereum.request!({
          method: 'eth_accounts',
        })) as string[];

        if (accounts.length) {
          setCurrentAccount(accounts[0]);
          getAllTransactions();
        } else {
          throw new Error('No accounts found');
        }
      } catch (error: unknown) {
        console.log('error', error);
        alert(error);
      }
    };

    isWalletConnected();
  }, [getAllTransactions]);

  const connectWallet = useCallback(async () => {
    try {
      if (!ethereum) throw new Error('Please install metamask wallet');

      const accounts = await ethereum.request!({
        method: 'eth_requestAccounts',
      });
      setCurrentAccount(accounts[0]);
    } catch (error: unknown) {
      console.log(error);
      alert(error);
    }
  }, []);

  const sendTransaction = useCallback(
    async ({
      addressTo,
      amount,
      keyword: keywordName,
      message,
    }: TransactionData) => {
      try {
        if (!ethereum) throw new Error('Please install metamask wallet');

        const contract = getEthereumContract();
        const parsedAmount = ethers.utils.parseEther(amount.toString());

        await ethereum!.request!({
          method: 'eth_sendTransaction',
          params: [
            {
              from: currentAccount,
              to: addressTo,
              gas: '0x5208', // 2100 gwei
              value: parsedAmount._hex,
            },
          ],
        });

        const transactionHash = await contract.addToBlockchain(
          addressTo,
          parsedAmount,
          message,
          keywordName
        );
        await transactionHash.wait();

        const count = (await contract.getTransactionCount()).toNumber();
        setTransactionCount(count);
        localStorage.setItem('transactionCount', count.toString());
      } catch (error) {
        console.log(error);
        alert(error);
      }
    },
    [currentAccount]
  );

  return (
    <TransactionContext.Provider
      value={{
        connectWallet,
        currentAccount,
        sendTransaction,
        transactions,
        transactionCount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export default TransactionProvider;
