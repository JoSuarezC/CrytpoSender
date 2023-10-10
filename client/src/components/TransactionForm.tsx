import React, { useState } from 'react';
import { Input, Loader } from '.';
import { type TransactionSend } from '../types/transaction';

interface CustomElements extends HTMLFormControlsCollection   {
  addressTo: HTMLInputElement;
  amount: HTMLInputElement;
  keywordName: HTMLInputElement;
  message: HTMLInputElement;
}
 
interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

type Props = {
  onSubmit: (data: TransactionSend) => Promise<void>,
}

const TransactionForm:  React.FC<Props> = ({ onSubmit }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<CustomForm>) => {
    event.preventDefault();
    console.log(event);
    setIsLoading(true);

    const target = event.currentTarget.elements;
    const data = {
      addressTo: target.addressTo.value,
      amount: parseFloat(target.amount.value),
      keyword: target.keywordName.value,
      message: target.message.value,
    };
 
    await onSubmit(data);
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='p-5 sm:w-96 w-full flex flex-col justify-start items-center blue-glassmorphism'
    >
      <Input
        label='Address to'
        name='addressTo'
        type='text'
        onChange={() => {}}
      />
      <Input
        label='Amount (ETH)'
        name='amount'
        type='number'
        onChange={() => {}}
      />
      <Input
        label='Keyword (Gif)'
        name='keywordName'
        type='text'
        onChange={() => {}}
      />
      <Input
        label='Enter Message'
        name='message'
        type='text'
        onChange={() => {}}
      />
      <div className='h-[1px] w-full bg-gray-400 my-2' />

      {isLoading ? (
        <Loader />
      ) : (
        <button
          type='submit'
          className='text-white w-full mt-2 border-[1px] p-2 border-metallic-blue rounded-full'
        >
          Send Now
        </button>
      )}
    </form>
  );
};

export default TransactionForm;
