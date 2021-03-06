import React from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import './Login.css'
import logo from './images/Logo.png';
import axios from 'axios';


export class Login extends React.Component {
    checkdata() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if (email !== "" && password !== "") {
            
            localStorage.setItem("passwordLogged", password);
        }
        axios.post('http://localhost:8080/login', { 
          email:email,
          name: '',
          password: password
      })
          .then(function (response) {
              console.log(response.data);
              localStorage.setItem("token",response.data);
              localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("mailLogged", email);
            window.location.replace("/app");
          })
          .catch(function (error) {
              alert("datos erroneos");
          });
  
        
    }
   
    redirect(){
        window.location.replace("/signup");
    }

    render() {
        if(JSON.parse(localStorage.getItem("isLoggedIn"))){
            window.location.replace("/app");
        }
        return (
            <React.Fragment>
               
                <CssBaseline />
                <main className="layout">
                    <Card className="paper">
                        <CardMedia
                            component="img"
                            alt="Logo"
                            align="center"
                            
                            image={logo}
                            title="Logo"
                        />

                        <Typography className="textolog" variant="h4">Sign in</Typography>
                        <form className="form">
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id="email" name="email" autoComplete="email" autoFocus />
                            </FormControl>
                            <FormControl margin="normal" required fullWidth>
                                <InputLabel htmlFor="password">Password</InputLabel>
                                <Input
                                    name="password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                />
                            </FormControl>
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="submit"
                                onClick={this.checkdata}
                            >
                                Sign in
                            </Button>
                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={this.redirect}

                                
                            >
                                Register
                            </Button>


                        </form>
                    </Card>
                </main>
            </React.Fragment>
        );
    }

}
export default Login;