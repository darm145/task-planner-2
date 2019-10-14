import React from 'react';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import logo from "./component/images/Logo.png";
import TextField from '@material-ui/core/TextField';



const cardStyle = {
    width: "60%",
    display: "block",
    margin: "auto",
    marginTop: "3%"
}
const imageStyle = {
    display: "flex",
    width: "40%",
    height: "40%",
    margin: "auto"
}
function volver() {
    window.location.replace("/app");
}

export class UserProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = { name: '', mail: '', pw: '', pw2:'' };
        this.handleName = this.handleName.bind(this);
        this.handleMail = this.handleMail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handlePassword2 = this.handlePassword2.bind(this);
        this.actualizar=this.actualizar.bind(this);
      }
    actualizar() {
        console.log(this.state);
        if(this.state.name!==''){
            localStorage.setItem("NameLogged", this.state.name);
        }
        if(this.state.mail!==''){
            localStorage.setItem("mailLogged", this.state.mail);
        }
        if(this.state.pw!=='' && this.state.pw2!==this.state.pw){
            alert("las contraseñas no coinciden");
            return;
        }
        else{
            localStorage.setItem("passwordLogged", this.state.pw);
        }
        window.location.replace("/app");
        
        
        
    }
    render() {
        return (
            <Card style={cardStyle}>
                <CardMedia
                    component="img"
                    alt="Logo"
                    align="center"
                    style={imageStyle}
                    image={logo}
                    title="Logo"
                />
                <center>
                   
                <Typography> Nuevo Nombre: </Typography>
                <TextField
                    id="Nombre"
                    label="Nombre"
                    margin="normal"
                    onChange={this.handleName}
                    
                />
                <Typography> Nuevo Correo: </Typography>
                <TextField
                    id="Correo"
                    label="Correo"
                    margin="normal"
                    onChange={this.handleMail}
                    
                />
                <Typography> Nueva Clave: </Typography>
                <TextField
                    id="clave"
                    label="Clave"
                    margin="normal"
                    onChange={this.handlePassword}
                    type="password"
                    
                />
                <Typography> Confirmar Clave: </Typography>
                <TextField
                    id="clave2"
                    label="Confirmar clave"
                    margin="normal"
                    onChange={this.handlePassword2}
                    type="password"
                />
                </center>
                <center>
                <div>
                <Button
                   
                    variant="contained"
                    color="primary"
                    className="submit"
                    onClick={this.actualizar}
                >
                    Actualizar
                </Button>
                <Button
                    
                    variant="contained"
                    color="primary"
                    onClick={volver}
                >
                    Cancelar
                </Button>
                </div>
                </center>
            </Card>
        );
    }
    handleMail(e){
        
        this.setState({ mail: e.target.value });
    }
    handleName(e){
    
        this.setState({ name: e.target.value });

    }
    handlePassword(e){
      
        this.setState({ pw: e.target.value });
    }
    handlePassword2(e){
      
        this.setState({ pw2: e.target.value });

    }
}

export default UserProfile;