import React, { useState } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import { useParams } from 'react-router-dom'
import { Form, Button, Container } from 'react-bootstrap'

import NavComp from './NavComp'

const EditItem = () => {
    const { id } = useParams()
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)

    const UPDATE_ITEM = gql`
        mutation updateItem($id: ID, $name: String, $price: Float) {
            updateItem(_id: $id, name: $name, price: $price) {
                success
                message
            }
        }
    `
    const GET_ITEM = gql`
        query getItem($id: ID) {
            getItem(_id: $id) {
                name
                price
                _id
            }
        }
    `
    useQuery(GET_ITEM, {
        variables: { id: id },
        onCompleted: data => {
            setName(data.getItem.name)
            setPrice(data.getItem.price)
        }
    })
    const [updateItem] = useMutation(UPDATE_ITEM)
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangePrice = (e) => {
        setPrice(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if(isNaN(price) || price <= 0) {
            window.alert('Price is invalid')
        }
        else {
            console.log(`Update item ${id} ${name} ${price}`)
            updateItem({ variables: { id: id, name: name, price: Number(price) } })
                .then(() => {
                    window.location = '/'
                })
        }
    }
    return (
        <>
            <NavComp />
            <Container>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Item name</Form.Label>
                        <Form.Control placeholder="Enter item name" value={name} onChange={onChangeName}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control placeholder="Enter price" value={price} onChange={onChangePrice}/>
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={onSubmit}>
                        Update
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default EditItem