import logo from '../../assets/images/logo.png';
import { useState } from 'react';
import NavBarItem from './NavbarItem';
import MobileToggler from './MobileToggler';
//import { useMobile } from '../../hooks';

const menuItems = ['Market', 'Exchange', 'Tutorials', 'Wallets'];

/**
 * Tailwind CSS approach.
 * Approach Using JS conditionals commented below
 */
const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  const listMobileClasses =
    'z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl list-none flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in';
  const listDesktopClasses =
    'md:z-0 md:static md:w-full md:h-auto md:flex-row md:justify-between md:items-center md:flex-initial md:flex-row md:rounded-none';

  const navigationList = (
    <ul
      className={`${listMobileClasses} ${listDesktopClasses} ${
        toggleMenu ? 'flex' : 'hidden md:flex'
      }`}
    >
      <li className='text-xl w-full my-2 md:hidden'>
        <MobileToggler
          isMenuOpen={true}
          toggleMenu={setToggleMenu}
        />
      </li>
      {menuItems.map((item) => (
        <NavBarItem
          key={item}
          title={item}
          classProps='my-2 text-lg md:my-0 md:text-base'
        />
      ))}
      <li className='bg-dark-blue py-2 px-7 mx-4 rounded-full hover:bg-hover-dark-blue'>
        Login
      </li>
    </ul>
  );

  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <img
          src={logo}
          alt='Crypto Logo'
          className='w-32'
        />
      </div>
      <div className='flex relative'>
        {!toggleMenu && (
          <MobileToggler
            isMenuOpen={toggleMenu}
            toggleMenu={setToggleMenu}
          />
        )}
        {navigationList}
      </div>
    </nav>
  );
};

export default Navbar;

/**
 * JS Approach
 * const Navbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const isMobile = useMobile();
  
  const itemMobileClasses = 'my-2 text-lg';
  const listMobileClasses =
    'z-10 fixed top-0 -right-2 p-3 w-[70vw] h-screen shadow-2xl md:hidden list-none flex flex-col justify-start items-end rounded-md blue-glassmorphism text-white animate-slide-in';
  const listDesktopClasses =
    'text-white md:flex hidden list-none flex-row justify-between items-center flex-initial';

  const navigationList = (
    <ul className={isMobile ? listMobileClasses : listDesktopClasses}>
      {isMobile && (
        <li className='text-xl w-full my-2'>
          <MobileToggler
            isMenuOpen={true}
            toggleMenu={setToggleMenu}
          />
        </li>
      )}
      {menuItems.map((item) => (
        <NavBarItem
          key={item}
          title={item}
          classProps={isMobile ? itemMobileClasses : ''}
        />
      ))}
      <li className='bg-dark-blue py-2 px-7 mx-4 rounded-full hover:bg-hover-dark-blue'>
        Login
      </li>
    </ul>
  );

  return (
    <nav className='w-full flex md:justify-center justify-between items-center p-4'>
      <div className='md:flex-[0.5] flex-initial justify-center items-center'>
        <img
          src={logo}
          alt='Crypto Logo'
          className='w-32'
        />
      </div>
      <div className={isMobile ? 'flex relative' : ''}>
        {isMobile && (
          <MobileToggler
            isMenuOpen={toggleMenu}
            toggleMenu={setToggleMenu}
          />
        )}
        {(!isMobile || toggleMenu) && navigationList}
      </div>
    </nav>
  );
};
 */
