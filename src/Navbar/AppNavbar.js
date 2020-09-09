import { Navbar } from 'rsuite';
import React from 'react';

export function AppNavbar() {
  return (
    <Navbar>
      <Navbar.Header>
        <a href="/" className="navbar-brand logo">
          TCRM
        </a>
      </Navbar.Header>
      <Navbar.Body />
    </Navbar>
  );
}
