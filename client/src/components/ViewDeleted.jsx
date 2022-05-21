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
                }
                weather
            }
        }
    `
    useQuery(GET_ITEMS, {
        onCompleted: (data) => {
            console.log(data)
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
                            <Card.Text>
                                <b>Weather: </b> {item.weather}
                            </Card.Text>
                            <Button variant="secondary" href={`/edit/${item.data._id}`}>Edit</Button>{' '}
                            </Card.Body>
                        </Card>
                    })}
                </Row>
            </Container>
        </>
    )
}

export default ViewDeleted