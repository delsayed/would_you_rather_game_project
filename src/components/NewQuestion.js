import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { handleAddQuestion } from  '../actions/questions'
import { Container } from 'react-bootstrap';

class NewQuestion extends Component {	
	state = {      
    	optionOneValue:'',
		optionTwoValue:'',
		toHome: false
	};

	handleInputChange = (event) => {
		const value = event.target.value;
		const id=event.target.name;
		
		this.setState((state) => {
			return id === 'firstChoice' ? {...state, optionOneValue: value} : {...state, optionTwoValue: value}
		});
			
	}

	handleSubmit = (event) => {   
    	event.preventDefault();

    	const { dispatch } = this.props
    	const { optionOneValue, optionTwoValue} = this.state   
    
    	dispatch(handleAddQuestion(
			optionOneValue,
      		optionTwoValue
    	))

    	this.setState({
        	optionOneValue:'',
			optionTwoValue:'',
			toHome: true
      	})
  	}
 
	render() {
		const { toHome ,optionOneValue,optionTwoValue} = this.state;

		if (toHome) {
			
			return <Redirect to='/dashboard' />
		}

		return (
			<Container>
				<Row className="justify-content-center">
					<Col xs={12} md={10}>
				<Card  className="bg-dark text-white">
				<Card.Body>
					<Card.Title>
					<h2 className="text-center my-3">
		         	<small>Would You Rather Game...</small>
		        </h2>

			</Card.Title>
			<Form onSubmit={this.handleSubmit}>
			<Form.Group controlId="optionOne">
				<Form.Label>Choice One</Form.Label>
				<Form.Control
					type="text"
					name="firstChoice"
					value={optionOneValue}
					onChange={(event) => this.handleInputChange(event)}
				/>
			</Form.Group>
			<h3>
				<small>OR</small>
			</h3>
			<Form.Group controlId="optionTwo">
				<Form.Label>Choice Two</Form.Label>
				<Form.Control
					type="text"
					name="secondChoice"
					value={optionTwoValue}
					onChange={(event) => this.handleInputChange(event)}
				/>
			</Form.Group>
			<Button
				type="submit"
				variant="outline-light"
				disabled={optionOneValue === '' || optionTwoValue === ''}
			>
				Submit
			</Button>
		</Form>
		</Card.Body>
		</Card>
		</Col>
		</Row>
		</Container>
  		)
	}
}

export default connect()(NewQuestion);