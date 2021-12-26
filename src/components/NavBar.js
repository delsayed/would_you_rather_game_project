import React, {Component, Fragment } from 'react';
import { NavLink ,Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { clearAuthedUser } from '../actions/authedUser';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from "react-bootstrap/Container";
import Image from 'react-bootstrap/Image';

class NavBar extends Component {
    render() {
        const { user, authedUser,dispatch } = this.props
     
        const handleLogout = () => {
            dispatch(clearAuthedUser());
        };

        return (    
      
       <Navbar bg="secondary" expand="lg" variant='light' className="navbar navbar-expand-sm my-3 border">
       <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
        <Navbar.Collapse id="responsive-navbar-nav">
         <Nav className="mr-auto" variant='light' bg="light">        
         <Button bg="secondary" variant="secondary">
                    <NavLink to='/dashboard' exact style={{color: 'white'}}>
                        Home
                    </NavLink>
                    </Button>
                    <Button bg="secondary" variant="secondary">
                    <NavLink to='/add' exact style={{color: 'white', hover: 'blue'}}>
                        New Question
                    </NavLink>
                    </Button>
                    <Button bg="secondary" variant="secondary">
                    <NavLink to='/leaderboard' exact style={{color: 'white'}}>
                        LeaderBoard
                    </NavLink>
                    </Button>
                         </Nav>             
                {
                    authedUser
                    && <Nav className="align-items-start">
                        	<Navbar.Text style={{color: 'white'}}>{user.name}</Navbar.Text>
                            <NavLink to='/' exact >
                                <div className="nav-user">
                                <Image
                                    src={user.avatarURL}
                                    alt="avatar"
                                    className="mx-3"
                                    roundedCircle
                                    fluid
                                    width="40"
                                    height="40"
                                    />                                   
                                    <Button
                                    variant="outline-dark" size="sm" className="mt-3 mt-lg-0" style={{color: 'white'}}
                                    onClick={handleLogout}
                                    >
                                    Logout
                                   </Button>
                                </div>
                            </NavLink>
                        </Nav>
                }           
     
      </Navbar.Collapse>   
      </Container>  
        </Navbar>
      
    )
    }
}

function mapStateToProps( { authedUser, users}, props) {
    return {
        authedUser,
        users,
        user: users[authedUser]
    }

}
export default connect(mapStateToProps)(NavBar)