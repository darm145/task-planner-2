import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';


import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
function checkpasswords(){
  
      if(document.getElementById("cpassword").value !== document.getElementById("password").value){
          alert("las contraseñas no coinciden, por favor vuelva a ingresarlas");
      }
      else if(document.getElementById("cpassword").value.length<8){
        alert("la contraseña debe tener al menos 8 caracteres");
      }
      else if(document.getElementById("email").value==='' || document.getElementById("firstName").value===''){
        alert("no deje espacios vacios");
      }
      else{
        const user ={ name:document.getElementById("firstName").value,
                      email:document.getElementById("email").value,
                      password:document.getElementById("password").value}
        axios.post("http://localhost:8080/User", user
        ).then(function(response){
          console.log(response.data);
          axios.post('http://localhost:8080/login', { 
          email:response.data.email,
          name: response.data.name,
          password: response.data.password
      })
          .then(function (response2) {
              console.log(response2.data);
              localStorage.setItem("token",response2.data);
              localStorage.setItem("isLoggedIn", true);
            localStorage.setItem("mailLogged", response.data.email);
            window.location.replace("/app");
          })
          .catch(function (error) {
              alert("datos erroneos");
          });
        });
        
} }

export default function SignUp() {
  const classes = useStyles();
  
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="cpassword"
                label="Confirm Password"
                type="password"
                id="cpassword"
               
              />
            </Grid>
            
          </Grid>
          <Button
            
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={checkpasswords}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      
    </Container>
  );
}
