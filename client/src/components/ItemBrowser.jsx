import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import {
    Card,
    Container,
    Button,
    Row,
    Modal,
    Form,
} from 'react-bootstrap'

import NavComp from './NavComp'

const ItemBrowser = () => {
    const [itemList, setItemList] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [message, setMessage] = useState('')
    const [focusedItem, setFocusedItem] = useState('')

    const GET_ITEMS = gql`
        query getAllItems {
            getAllItems {
                data {
                    _id
                    name
                    price
                    city
                    deleted
                }
                weather
            }
        }
    `
    const DELETE_ITEM = gql`
        mutation deleteItem($id: ID!, $message: String) {
            deleteItem(_id: $id, message: $message) {
                success
                message
            }
        }
    `
    useQuery(GET_ITEMS, {
        onCompleted: (data) => {
            setItemList(data.getAllItems.filter(item => item.data.deleted === false))
        }
    })
    const handleMessageChange = (e) => {
        setMessage(e.target.value)
    }
    const onHide = () => {
        setShowModal(false)
        setMessage('')
    }
    const onSubmit = () => {
        onHide()
        deleteItem(focusedItem, message)
    }
    const [deleteItemMutation] = useMutation(DELETE_ITEM)
    const deleteItem = (_id, message) => {
        deleteItemMutation({ variables: { id: _id, message: message } })
        setItemList(oldItemList => oldItemList.filter(item => item.data._id !== _id))
    }
    return (
        <>
            <NavComp />
            <Container>
                <Row>
                    {itemList.map(item => {
                        return <Card style={{ width: '18rem' }} key={item.data._id}>
                            <Card.Body>
                                <Card.Title>{item.data.name}</Card.Title>
                                <Card.Text>
                                    <b>Price:</b> {item.data.price}
                                </Card.Text>
                                <Card.Text>
                                    <b>Storage Location:</b> {item.data.city}
                                </Card.Text>
                                <Card.Text>
                                    <b>Weather: </b> {item.weather}
                                </Card.Text>
                                <Button variant="secondary" href={`/edit/${item.data._id}`}>Edit</Button>{' '}
                                <Button variant="danger" onClick={() => { setShowModal(true); setFocusedItem(item.data._id) }}>
                                    Delete
                                </Button>
                            </Card.Body>
                        </Card>
                    })}
                </Row>
            </Container>
            <Modal
                show={showModal}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Body>
                    <h4>Enter deletion comment</h4>
                    <Form.Group >
                        <Form.Control type="text"
                            onChange={handleMessageChange}
                            value={message}
                            placeholder="Leave blank for no deletion message"
                        />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={onHide}>Cancel</Button>
                    <Button variant="danger" type="submit" onClick={onSubmit}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ItemBrowser