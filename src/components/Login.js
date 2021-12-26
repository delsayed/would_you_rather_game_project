import React, { Component } from 'react';
import { connect } from 'react-redux'
import { setAuthedUser, clearAuthedUser } from '../actions/authedUser';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import { Container, Row } from 'react-bootstrap';

class Login extends Component {
	state = {
		userSeleced: null		
	}

	componentDidMount() {
		this.props.dispatch(clearAuthedUser())
	}

	onUserSelected = function(event) {
		const userSeleced = event.target.value;
	
		this.setState(function(previousState) {
		  return {
			...previousState,
			userSeleced,
		  };
		});
	}
	
	handleSelectedUser = function(event) {

		event.preventDefault()
		const { userSeleced } = this.state;
		const { dispatch } = this.props;
	
		if (userSeleced) {
		dispatch(setAuthedUser(userSeleced));
	
		this.setState(function(previousState) {
		  return {
			...previousState		
		  };
		});
	}
	}
	
    render() {
		const { userSeleced } = this.state;
		const { users } = this.props;
		const selected = userSeleced ? userSeleced : -1
        
        return (
<Container className="d-flex vh-100">
<Row className="m-auto align-self-center m-5 border-0 shadow">
<Col style={{ width: '35rem' }}>
<Card  className="bg-dark text-white mx-auto justify-content-center"  >
  <Card.Header  variant="secondary">Would You Rather App</Card.Header>
  <Card.Body>
    <Card.Title> Please Sign in to Continue</Card.Title>
	
		<Form>
  <Form.Group className="mb-5" > 
    <Form.Text className="text-muted">
    Please Select User from List:
    </Form.Text>

	<select id="login-list" value={selected}
	                     onChange={(event) => this.onUserSelected(event)}>
						<option value="-1" disabled>Select user</option>
						{Object.keys(users).map(function(user) {
							return (
								<option value={users[user].id} key={user}>
									{users[user].name}
								</option>
							);
						})}
					</select>
  </Form.Group>
 
  <Button variant="outline-light" type="submit"   disabled={userSeleced === null}
					onClick={(event) => this.handleSelectedUser(event)}>
					Log In
  </Button>
</Form>

</Card.Body>
</Card>
</Col>
</Row>
</Container>
		);  
    }
}



function mapStateToProps ({users}) {  
    return {
      users,
    };
  }

export default connect(mapStateToProps)(Login);