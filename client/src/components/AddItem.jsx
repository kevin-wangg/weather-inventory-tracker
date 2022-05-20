import React, { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Form, Button, Container } from 'react-bootstrap'

import NavComp from './NavComp'

const AddItem = () => {
    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [city, setCity] = useState('')

    const ADD_ITEM = gql`
        mutation addItem($name: String!, $price: Float!, $city: String!) {
            addItem(name: $name, price: $price, city: $city) {
                success
                message
            }
        }
    `
    const [addItem] = useMutation(ADD_ITEM)
    const onChangeName = (e) => {
        setName(e.target.value)
    }
    const onChangePrice = (e) => {
        setPrice(e.target.value)
    }
    const onChangeCity = (e) => {
        console.log(e.target.value)
        setCity(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault()
        if (isNaN(price) || price <= 0) {
            window.alert('Price is invalid')
        }
        else {
            console.log(`Create item ${name} ${price} ${city}`)
            addItem({ variables: { name: name, price: Number(price), city: city } })
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
                        <Form.Control placeholder="Enter item name" value={name} onChange={onChangeName} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Price</Form.Label>
                        <Form.Control placeholder="Enter price" value={price} onChange={onChangePrice} />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>City</Form.Label>
                        <Form.Select aria-label="Default select example" onChange={onChangeCity}>
                            <option>Select city storage location</option>
                            <option value="Toronto">Toronto</option>
                            <option value="Montreal">Montreal</option>
                            <option value="Calgary">Calgary</option>
                            <option value="Winnipeg">Winnipeg</option>
                            <option value="Vancouver">Vancouver</option>
                        </Form.Select>
                    </Form.Group>

                    <Button variant="primary" type="submit" onClick={onSubmit}>
                        Create
                    </Button>
                </Form>
            </Container>
        </>
    )
}

export default AddItem