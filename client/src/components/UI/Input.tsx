import React from 'react';

type Props = {
  label: string;
  type: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Input = (props: Props) => {
  return (
    <>
      <label htmlFor={props.name} className='text-white text-sm pt-2'>{props.label}</label>
      <input
        id={props.name}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        step='0.0001'
        className='my-2 w-full text-white rounded-sm p-2 bg-transparent border-none text-sm white-glassmorphism'
      />
    </>
  );
};

export default Input;
