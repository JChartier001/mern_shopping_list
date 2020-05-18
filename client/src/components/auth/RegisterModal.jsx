import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
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
import { register } from '../../flux/actions/authActions';
import { clearErrors } from '../../flux/actions/errorActions';

const RegisterModal = () => {
  const dispatch = useDispatch();
  const error = useSelector(state => state.error)
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  const [state, setState] = useState({
    modal: false,
    name: "",
    email: "",
    password: "",
    msg: null
  })

  const toggle = () => {
    dispatch(clearErrors());
    setState({...state, modal: !state.modal})
    console.log(state, "toggle")
  }

 const onChange = e => {
   setState({...state, [e.target.name]: e.target.value})
 }
 
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // Create user object
    const user = {
      name: state.name,
      email: state.email,
      password: state.password
    };

    // Attempt to login
    dispatch(register(user));
  };

  useEffect(() => {
    // Check for register error
    if (error.id === 'REGISTER_FAIL') {
      setState({...state, msg: error.msg.msg});
    } else {
      setState({...state, msg: null});
    }

    // If authenticated, close modal
    if (state.modal) {
      if (isAuth) {
        toggle();
      }
    }
  }, [error, isAuth, state.modal]);

  return (
    <div>
      <NavLink onClick={toggle} href="#">
        Register
      </NavLink>

      <Modal isOpen={state.modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Register</ModalHeader>
        <ModalBody>
          {state.msg ? <Alert color="danger">{state.msg}</Alert> : null}
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                onChange={onChange}
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                onChange={onChange}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
                Register
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};



export default RegisterModal;
