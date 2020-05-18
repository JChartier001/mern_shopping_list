import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import {useSelector, useDispatch} from "react-redux";
import { getItems, deleteItem } from '../flux/actions/itemActions';


const ShoppingList = () => {
  const items = useSelector(state => state.item)
  console.log(items.items, "items")
  const dispatch = useDispatch();
  const isAuth = useSelector(state => state.auth.isAuthenticated)
  console.log(isAuth)
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
          {items.items && items.items.length > 0 ? items.items.map(({ _id, name }) => (
            <CSSTransition key={_id} timeout={500} classNames="fade">
              <ListGroupItem>
                {isAuth ? (
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
          )): null}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};



export default ShoppingList;
