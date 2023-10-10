import { createContext, useContext } from 'react';
import { type TransactionData, type TransactionSend } from '../types/transaction';

type TransactionContextT = {
  transactions: TransactionData[];
  transactionCount: number;
  connectWallet: () => Promise<void>;
  currentAccount: string | null;
  sendTransaction: (formData: TransactionSend) => Promise<void>;
};

export const TransactionContext = createContext<TransactionContextT | null>(null);

export const useTransactionContext = () => {
  const context = useContext(TransactionContext);

  if (!context) {
    throw new Error('Transactional Context is not created');
  }

  return context;
};
