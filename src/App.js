import React from 'react';
import logo from './logo.svg';
import './App.css';
import { TodoList } from './TodoList.js'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import { Login } from "./component/Login";
import { TodoApp } from "./TodoApp";
import  SignUp  from "./component/SignUp";



class App extends React.Component {
    constructor(props) {
        super(props);
    }
    LoggedIn(logged) {
        console.log(logged);
        if (!logged) {
            return (
                <Login />
            );
        }
        else {
            return (
                <TodoApp />
            );
        }



    }
    render() {
        
        if (localStorage.getItem('isLoggedIn') == undefined) {
            localStorage.setItem('isLoggedIn', false);
        }
        const loged = localStorage.getItem('isLoggedin');
        return (
            <div>
                 <Router>
                     <div>
                     
                    <Route component={SignUp} path='/signup'></Route>
                    <Route component={Login} path='/login'></Route>
                    <Route exact component={Login} path='/'></Route>
                    <Route component={TodoApp} path='/app'></Route>
                    </div>
                </Router>
                
            </div>
            
        );
    }


}

export default App;
