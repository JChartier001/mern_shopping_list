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
import { connect } from 'react-redux';
import { addItem } from '../flux/actions/itemActions';


const ItemModal = ( isAuthenticated, addItem ) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState('');

  const handleToggle = () => setModal(!modal);

  const handleChangeName = (e) => setName({[e.target.name]:e.target.value});

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const newItem = {
      name
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

      <Modal isOpen={modal} toggle={handleToggle}>
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
                onChange={handleChangeName}
              />
              <Button color="dark" style={{ marginTop: '2rem' }} block>
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
