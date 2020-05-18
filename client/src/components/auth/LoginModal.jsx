import React, { useState, useEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { login } from '../../flux/actions/authActions';
import { clearErrors } from '../../flux/actions/errorActions';


const LoginModal = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.error);
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const [state, setState] = useState({
    modal: false,
    email: "",
    password: "",
    msg: null
  });
  
  const toggle = () => { 
    dispatch(clearErrors());
    setState({...state, modal: !state.modal})
  }

  const handleChange = (e) => {setState({...state, [e.target.name]:e.target.value})};

  const onSubmit = (e) => {
    e.preventDefault();
    const user = {
      email: state.email,
      password: state.password
    };
    // Attempt to login
    dispatch(login(user));
  };

  useEffect(() => {
    // Check for register error
    if (error.id === 'LOGIN_FAIL') {
      setState({...state, msg: error.msg.msg})
    } else {
      setState({...state, msg: null});
    }
    // If authenticated, close modal
    if (state.modal) {
      if (isAuth) {
        toggle();
      }
    }
  }, [error]);

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Login
      </NavLink>
      <Modal isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {state.msg ? <Alert color="danger">{state.msg}</Alert> : null}
          <Form>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={handleChange}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={handleChange}
              />
              <Button
                color="dark"
                style={{ marginTop: '2rem' }}
                block
                onClick={onSubmit}
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}




export default LoginModal;
