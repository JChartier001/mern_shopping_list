import React, { useState } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import {useDispatch} from "react-redux";
import { addItem } from '../flux/actions/itemActions';


const ItemModal = ( isAuthenticated, addItem ) => {
  const dispatch = useDispatch();
  const [state, setState] = useState({
    modal: false,
    name: ""
  })
  

  const handleToggle = () => setState({...state, modal: !state.modal});

  const onChange = (e) => setState({...state, [e.target.name]:e.target.value});

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name: state.name
    };

    // Add item via addItem action
    dispatch(addItem(newItem));
    // Close modal
    handleToggle();
  };

  return (
    <div>
      {isAuthenticated ? (
        <Button
          color="dark"
          style={{ marginBottom: '2rem' }}
          onClick={handleToggle}
        >
          Add Item
        </Button>
      ) : (
        <h4 className="mb-3 ml-4">Please log in to manage items</h4>
      )}

      <Modal isOpen={state.modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>Add To Shopping List</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleOnSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={onChange}
              />
              <Button type="submit" color="dark" style={{ marginTop: '2rem' }} block>
                Add Item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
