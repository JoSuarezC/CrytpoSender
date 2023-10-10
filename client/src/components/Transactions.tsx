import React from 'react';
import { useTransactionContext } from '../context/transactionContext';
//import dummyData from '../utils/dummy-data';
import { shortenAddress } from '../utils/shorten-address';
import { useFetchGif } from '../hooks';
import { TransactionData } from '../types/transaction';


const TransactionCard: React.FC<TransactionData> = ({
  message,
  timestamp,
  addressFrom,
  amount,
  addressTo,
  keyword,
}) => {
  const gifUrl = useFetchGif(keyword || '');

  return (
    <section
      className='bg-dark-gray m-4 flex flex-1
      2xl:min-w-[450px]
      2xl:max-w-[500px]
      sm:min-w-[270px]
      sm:max-w-[300px]
      flex-col p-3 rounded-md hover:shadow-2xl'
    >
      <div className='flex flex-col items-center w-full mt-3'>
        <div className='w-full mb-6 p-2'>
          <a
            href={`https://goerli.etherscan.io/address/${addressFrom}`}
            target='blank'
            rel='noopener noreferer'
          >
            <span className='text-white text-base'>
              From: {shortenAddress(addressFrom)}
            </span>
          </a>
          <a
            href={`https://goerli.etherscan.io/address/${addressTo}`}
            target='blank'
            rel='noopener noreferer'
          >
            <span className='text-white text-base'>
              To: {shortenAddress(addressTo)}
            </span>
          </a>
          <p className='text-white text-base'>Amount: {amount} ETH</p>
          {message && (
            <>
              <br />
              <p className='text-white text-base'>Message: {message}</p>
            </>
          )}
        </div>
        <img
          src={gifUrl}
          alt={keyword}
          className='w-full h-64 2xl:h-96 rounded-md shadhow-lg object-cover'
        />

        <div className='bg-black p-3 px-5 w-max rounded-3xl -mt-5 shadow-2xl'>
          <time
            className='text-turquoise font-bold'
            dateTime={timestamp}
          >
            {timestamp}
          </time>
        </div>
      </div>
    </section>
  );
};

const Transactions = () => {
  const { transactions, currentAccount } = useTransactionContext();

  console.log('transactions', transactions);

  return (
    <div className='flex w-full justify-center items-center 2xl:px-20 gradient-bg-transactions'>
      <div className='flex flex-col md:p-12 py-12 px-4'>
        <h2 className='text-white text-3xl text-center my-2'>
          {currentAccount
            ? 'Latest Transactions'
            : 'Connect your account to see the lastest transactions'}
        </h2>

        <div className='flex flex-wrap justify-center items-center mt-10'>
          {[...transactions].reverse().map((transaction) => (
            <TransactionCard
              key={transaction.timestamp + transaction.addressFrom}
              {...transaction}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
