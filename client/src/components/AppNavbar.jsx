import React, { useState, Fragment } from 'react';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Container
} from 'reactstrap';
import {useSelector} from "react-redux";
import RegisterModal from './auth/RegisterModal';
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';


const AppNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const auth = useSelector(state => state.auth)
  

  
  

  const handleToggle = () => setIsOpen(!isOpen);

  const authLinks = (
    <div>
      <NavItem>
        <span className="navbar-text mr-3">
          <strong>
            {auth && auth.user ? `Welcome ${auth.user.name}` : ''}
          </strong>
        </span>
      </NavItem>
      <NavItem>
        <Logout />
      </NavItem>
    </div>
  );

  const guestLinks = (  
    <Fragment>
      <NavItem>
        <RegisterModal />
      </NavItem>
      <NavItem>
        <LoginModal />
      </NavItem> 
      </Fragment>   
  );
  console.log(auth)

  return (
    <div>
      <Navbar color="dark" dark expand="sm" className="mb-5">
        <Container>
          <NavbarBrand href="/">ShoppingList</NavbarBrand>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto" navbar>             
             {auth && auth.isAuthenticated == false ? guestLinks : authLinks}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </div>
  );
};



export default AppNavbar;
