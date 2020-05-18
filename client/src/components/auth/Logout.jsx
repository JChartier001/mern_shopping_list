import React, { Fragment } from 'react';
import { NavLink } from 'reactstrap';
import { logout } from '../../flux/actions/authActions';
import { useDispatch } from 'react-redux';


export const Logout = () => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  }
  return (
    <Fragment>
      <NavLink onClick={onLogout} href="#">
        Logout
      </NavLink>
    </Fragment>
  );
};

export default Logout;
