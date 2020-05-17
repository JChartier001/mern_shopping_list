import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { logout } from '../../flux/actions/authActions';


export const Logout = () => {
  return (
    <Fragment>
      <NavLink onClick={logout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default Logout;
