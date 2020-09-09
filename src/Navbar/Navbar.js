import { Navbar as RSNavbar} from 'rsuite';
import React from 'react';

export function Navbar() {
  return (
    <RSNavbar>
      <RSNavbar.Header>
        <a href="/#" className="navbar-brand logo">TCRM</a>
      </RSNavbar.Header>
    </RSNavbar>
  );
}
