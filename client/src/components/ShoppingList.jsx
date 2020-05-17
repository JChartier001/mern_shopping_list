import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {useSelector, useDispatch} from "react-redux";
import { getItems, deleteItem } from '../flux/actions/itemActions';


const ShoppingList = () => {
  const item = useSelector(state => state.items)
  const dispatch = useDispatch();
  const isAuth
  useEffect(() => {
    dispatch(getItems());
  }, [getItems]);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  
  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {isAuthenticated ? (
                  <Button
                    className="remove-btn"
                    color="danger"
                    size="sm"
                    onClick={() => handleDelete(_id)}
                  >
                    &times;
                  </Button>
                ) : null}
                {name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};



export default ShoppingList;
