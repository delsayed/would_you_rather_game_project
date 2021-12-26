import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handleAddAnswer } from '../actions/questions'
import { Redirect } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import NotFoundPage from './NotFoundPage';
import ProgressBar from 'react-bootstrap/ProgressBar';


class QuestionForm extends Component {
    state = {
        selectedAnswer: ''
    }
    handleSaveAnswer(e) {
        e.preventDefault()

        const { dispatch, authedUser, id  } = this.props
        const { selectedAnswer } = this.state
    
        dispatch(handleAddAnswer({
          qid:id,
          authedUser,
          answer: selectedAnswer,
        }))
    }
    chooseAnswer(answer) {
        this.setState((prevState) => {
            return {selectedAnswer: answer}
        })
    }
    render() {
        const { authedUser,question, author } = this.props;
       
        if (!question) {
            return <NotFoundPage />;
        }
        const answered = question ? (question.optionOne.votes.indexOf(authedUser) > -1 || question.optionTwo.votes.indexOf(authedUser) > -1) : false
        const votesOptionOne =  question.optionOne.votes.length 
        const votesOptionTwo =  question.optionTwo.votes.length 
        const totalVotes = votesOptionOne + votesOptionTwo
        const percentOptionOne = Math.round((votesOptionOne / totalVotes) * 100)
        const percentOptionTwo =Math.round ((votesOptionTwo / totalVotes) * 100)
    
       

        return (
        
        <Row className="justify-content-center">
        <Col xs={26} md={26}>
            <Card bg="light" className="m-3 justify-content-center row">
                <Card.Header>
                <Image
			src={`/${author.avatarURL}`}
			roundedCircle
			fluid
			width="40"
			height="40"
			alt="user avatar"
            className="mr-2" 
		    />
            {author.name} asks:
                </Card.Header>

                {!answered ? (
                       <Row style={{ width: '35rem' }} mx-auto className="justify-content-center">
                      
                   <Card.Body className="justify-content-center">
                       <span>
                           Would You Rather ..
                           </span>
							<Form
								onSubmit={(e) => this.handleSaveAnswer(e)}
								ref={(f) => (this.form = f)}
							>
								{true ? (
									<p className="text-danger">{true}</p>
								) : null}


                                <Form.Check
                                onChange={(e) => this.chooseAnswer('optionOne')}
									custom
									type="radio"
									id="optionOne"
									label={question.optionOne.text}
									value="optionOne"
									name="answer"
									className="mb-2"
								/>
								<Form.Check
                                  onChange={(e) => this.chooseAnswer('optionTwo')}
									custom
									type="radio"
									id="optionTwo"
									label={question.optionTwo.text}
									value="optionTwo"
									name="answer"
									className="mb-2"
								/>
                                
                                <Button type="submit" variant="outline-dark" >
									Vote
								</Button>
								
							</Form>
						</Card.Body>
                        
			</Row>
                                      
                   
                   ): (

                <Card.Body className="d-flex justify-content-center">
                    <ul>
                        <li>
                            {question.optionOne.text}
                            {votesOptionOne }
                        </li>
                        <ProgressBar
                            now={percentOptionOne}
                            label={`${percentOptionOne}%`}
                            variant="info"
                        />
                        <Card.Text className="text-muted">
                            chosen by{votesOptionOne}  out of {totalVotes}  {' '}
                            users
                            {' '}
                            Percentage votes: {percentOptionOne}%
                        </Card.Text>
                        <li>
                            {question.optionTwo.text}
                            {votesOptionTwo}
                        </li>
                        <ProgressBar
                            now={percentOptionTwo}
                            label={`${percentOptionTwo}%`}
                            variant="info"
                        />
                        <Card.Text className="text-muted">
                            chosen by {votesOptionTwo} out of {totalVotes}{' '}
                            users
                            {' '}
                            Percentage votes: {percentOptionTwo}%
                        </Card.Text>
                    </ul>
                </Card.Body>
                )}

            </Card>
        </Col>
    </Row>
          
        )
    }
}

function mapStateToProps ({authedUser, users, questions}, { match }) {
    const { id } = match.params
    const question = questions[id]
    const author = question ? users[question.author] : null
    const answer = users[authedUser].answers[id]
  
    return {
        id,
        authedUser,
        question,
        author,
        answer
        
    }
}

export default connect(mapStateToProps)(QuestionForm);