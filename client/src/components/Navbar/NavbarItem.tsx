import React from 'react';

type Props = {
  title: string;
  classProps: string;
};

const NavBarItem: React.FC<Props> = ({ title, classProps }) => {
  return <li className={`mx-4 ${classProps}`}>{title}</li>;
};

export default NavBarItem;