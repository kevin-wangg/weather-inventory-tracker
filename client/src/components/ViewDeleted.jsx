import React, { useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Card, Container, Button, Row } from 'react-bootstrap'

import NavComp from './NavComp'

const ViewDeleted = () => {
    const [itemList, setItemList] = useState([])

    const GET_ITEMS = gql`
        query getAllItems {
            getAllItems {
                data {
                    _id
                    name
                    price
                    city
                    deleted
                    message
                }
            }
        }
    `
    const UNDELETE_ITEM = gql`
        mutation undeleteItem($id: ID!) {
            undeleteItem(_id: $id) {
                success
                message
            }
        }
    `
    const [undeleteItemMutation] = useMutation(UNDELETE_ITEM)
    const undeleteItem = (_id) => {
        undeleteItemMutation({ variables: { id: _id } })
        setItemList(oldItemList => oldItemList.filter(item => item.data._id !== _id))
    }
    useQuery(GET_ITEMS, {
        onCompleted: (data) => {
            setItemList(data.getAllItems.filter(item => item.data.deleted === true))
        }
    })
    return (
        <>
            <NavComp />
            <Container>
                <Row>
                    { itemList.map(item => {
                        return <Card style={{ width: '18rem' }} key={item.data._id}>
                            <Card.Body>
                            <Card.Title>{item.data.name}</Card.Title>
                            <Card.Text>
                                <b>Price:</b> {item.data.price}
                            </Card.Text>
                            <Card.Text>
                                <b>Storage Location:</b> {item.data.city}
                            </Card.Text>
                            {item.data.message !== "" &&
                                <Card.Text>
                                    <b>Deletion comment: </b> {item.data.message}
                                </Card.Text>
                            }
                            <Button variant="secondary" onClick={() => {undeleteItem(item.data._id)}}>Undelete</Button>{' '}
                            </Card.Body>
                        </Card>
                    })}
                </Row>
            </Container>
        </>
    )
}

export default ViewDeleted