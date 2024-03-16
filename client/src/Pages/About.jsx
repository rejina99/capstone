import React from 'react'
import '../Index.css'
import { Card, Button } from 'react-bootstrap'
import { motion } from 'framer-motion'

export default function About() {
    return (
        <motion.div 
            className='about-container'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <h1 className='about-header'>About Our Marketplace</h1>
            <p className='about-text'>
                Welcome to our marketplace, a platform where you can rent a place at any location. We connect property owners with potential renters, providing a seamless, efficient, and easy-to-use service.
            </p>
            <Card style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>Our Mission</Card.Title>
                    <Card.Text>
                        Our mission is to make the renting process as smooth as possible, providing expert advice, personalized service, and a deep understanding of the local market.
                    </Card.Text>
                    <Button variant="primary">Learn More</Button>
                </Card.Body>
            </Card>
            <p className='about-text'>
                We are committed to helping you find the perfect rental property. Whether you want to rent for a day or a month, we are here to assist you every step of the way.
            </p>
        </motion.div>
    )
}
