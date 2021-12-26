import React, { Component } from 'react'
import { Container } from 'react-bootstrap'
import { connect } from 'react-redux'
import { Link ,Redirect} from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Question from './Question'
import questions from '../reducers/questions';

class Dashboard extends Component {
    state = {
        showAnswered: false
    }

    filterQuestions = (showAnswered) => {
        this.setState((state) => {
            return { showAnswered: showAnswered }
        })
        
    }
    render() {

        const { showAnswered } = this.state;
        const { authedUser, unAnsweredQuestions, answeredQuestions ,questions} = this.props
       
        const Questions = Object.values(questions).filter(function(question) {
            const included = (
                question.optionOne.votes.indexOf(authedUser) > -1 ||
                question.optionTwo.votes.indexOf(authedUser) > -1
            );
            return showAnswered ? included : !included;
        });
        const sortedQuestions = Questions.sort((a, b) => b.timestamp - a.timestamp);

        
        if (authedUser === null) {
            return <Redirect to='/' />
          }
               
        return (
            <Container>     
                    <Button bg="secondary"  variant={ !showAnswered ? "selected" : "secondary"} 
                    onClick={(e) => this.filterQuestions(false)}>Unanswered Questions</Button>

                    <Button bg="secondary" variant={ showAnswered ? 'selected' : 'secondary'}
                     onClick={(e) => this.filterQuestions(true)}>Answered Questions</Button>
                   {               
                    sortedQuestions.map((question) => (                       
                            <Link to={`questions/${question['id']}`} key={question.id}>
                                <Question key={question.id} id={question.id}/>
                            </Link>
                    ))
                    }

              
                </Container>         
        )
    }
}

function mapStateToProps ({questions, users, authedUser}) {
       
     const unAnsweredQuestions = Object.values(questions).filter((question) => 
     !question.optionOne.votes.includes(authedUser.id) && !question.optionTwo.votes.includes(authedUser.id)); 
  
     const answeredQuestions = Object.values(questions).filter((question) =>
     question.optionOne.votes.includes(authedUser.id) || question.optionTwo.votes.includes(authedUser.id));
  
    return {
      unAnsweredQuestions: unAnsweredQuestions,
      answeredQuestions: Object.values(answeredQuestions),
      users: users,
      authedUser: authedUser,
      questions: questions,
    }
  }


export default connect(mapStateToProps)(Dashboard);