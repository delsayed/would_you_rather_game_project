import React, { Component } from 'react'
import { connect } from 'react-redux'
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import NotFoundPage from './NotFoundPage'

class Question extends Component {
    render() {
        const { question, author } = this.props;

		if (!question) {return <NotFoundPage />;}

        return (

<Row className="justify-content-center">
				<Col xs={12} md={6}>
					<Card bg="light" className="m-3">
						<Card.Header>
                        <Image
			src={`/${author.avatarURL}`}
			roundedCircle
			fluid
			width="70"
			height="70"
			className="mr-2" 
			alt="user avatar"
		/>
				
           {author.name}{' '} Asks:
						</Card.Header>
						<Card.Body className="text-center">
							<Card.Text>{question.optionOne.text.slice(0, 100)}...?</Card.Text>
							<Button viant="outline-dark">Show Question</Button>
						</Card.Body>
						
					</Card>
				</Col>
			</Row>
          
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { id }) {
    const question = questions[id]
    const author = question ? users[question.author] : null
  
    return {
        authedUser,
        question,
        author
    }
}

export default connect(mapStateToProps)(Question);