import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Container from "react-bootstrap/Container";

class Leaderboard extends Component {
    render() {
        const { users} = this.props
        const sortedUsers = users.sort( (a, b) => b.totalScore - a.totalScore)

        return (
            <Container>
                <h2 className="text-center my-3">
					<small>LeaderBoard</small>
				</h2>
           {sortedUsers.map((user) => (
            <Row  key={user.id} className="justify-content-center">
            <Col xs={12} md={6}>
                <Card bg="light" className="m-3">
                    <Card.Header>

             <Image
			src={user.avatarURL}
			roundedCircle
			fluid
			width="40"
			height="40"
			className="mr-2"
			alt="user avatar"	/>
                        {user.name}
                    </Card.Header>
                    <Card.Body className="d-flex justify-content-center">
                        <Card.Text>
                            Answered Questions: {Object.keys(user.answers).length}
                            <br />
                            Created Questions: {user.questions.length}
                        </Card.Text>
                    </Card.Body>
                    <Card.Footer>
                        Score: {user.totalScore}
                    </Card.Footer>
                </Card>
            </Col>
        </Row>
        ))}
        </Container>

        )
    }
}

function mapStateToProps( { users }) {
    const usersList = Object.values(users)
    usersList.map( (user) => user.totalScore = Object.keys(user.answers).length + user.questions.length )
    return {
        users: usersList
    }
}

export default connect(mapStateToProps)(Leaderboard);