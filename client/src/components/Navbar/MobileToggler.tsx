import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { HiMenuAlt4 } from 'react-icons/hi';

type Props = {
  isMenuOpen: boolean;
  toggleMenu: (toggle: boolean) => void;
};

const MobileToggler: React.FC<Props> = ({ isMenuOpen, toggleMenu }) => {
  return (
    <button
      onClick={() => toggleMenu(!isMenuOpen)}
      aria-label={isMenuOpen ? 'Close Menu' : 'Open Menu'}
      aria-haspopup='menu'
    >
      {isMenuOpen ? (
        <AiOutlineClose
          fontSize={30}
          className='text-white md:hidden'
        />
      ) : (
        <HiMenuAlt4
          fontSize={30}
          className='text-white md:hidden'
        />
      )}
    </button>
  );
};

export default MobileToggler;
