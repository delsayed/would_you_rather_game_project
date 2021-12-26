import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard';
import Login from './Login'
import QuestionForm from './QuestionForm'
import Leaderboard from './Leaderboard'
import Container from 'react-bootstrap/Container';
import NavBar from './NavBar'
import NewQuestion from './NewQuestion';
import ProtectedRoute from './ProtectedRoute'
import NotFoundPage from './NotFoundPage'

class App extends Component {
  	componentDidMount() {
    	this.props.dispatch(handleInitialData())
	}

	render() {
		const { authedUser } = this.props;

			if(authedUser)
			{
		return (

			<Fragment>
			<Router>
				<Container>
						<NavBar />
							<main>
								<Switch>
									<Route path="/" exact component={Dashboard}/>
									<ProtectedRoute path='/dashboard' exact component={Dashboard} />
									<ProtectedRoute path='/add' exact component={NewQuestion} />
									<ProtectedRoute path='/questions/:id' component={QuestionForm} />
									<ProtectedRoute path='/leaderboard' component={Leaderboard} />
									<Route path="/not-found" component={NotFoundPage} />
								</Switch>
								</main>
				</Container>
			</Router>
			</Fragment>
			)
		}
		else
		{
			return <Fragment> <Login /> </Fragment>
		}

	}
		
}

function mapStateToProps({ authedUser }) {
	return {
		authedUser
		
	};
}

export default connect(mapStateToProps)(App);
