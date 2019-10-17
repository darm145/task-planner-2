import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DatePicker from 'react-datepicker';
import MenuItem from '@material-ui/core/MenuItem';
import { TodoList } from './TodoList.js';


export class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {fitered:[] , status: '', dueDate: '',open : false, owner:'' };
        this.handleDate = this.handleDate.bind(this);
        this.handleStatus = this.handleStatus.bind(this);
        this.handleClickOpen= this.handleClickOpen.bind(this);
        this.handleClose= this.handleClose.bind(this);
        this.handleOwner=this.handleOwner.bind(this);
        this.filter=this.filter.bind(this);
    }
    render() {
        const estados = [
            { status: "Completed" }, { status: "In Progress" }, { status: "Ready" }
        ]
        return (
            <div>
                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                    Filtrar
              </Button>
                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Filtro</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            escriba a continuacion los criterios de filtrado
                  </DialogContentText>
                  <TextField
                  id="text-todo"
                  label="Dueño"
                  value={this.state.owner}
                  onChange={this.handleOwner}
                  margin="normal"

                />
                <p></p>
                        <TextField
                            id="priority-todo"
                            select
                            label="Seleccione"
                            value={this.state.status}
                            onChange={this.handleStatus}
                            helperText="Por favor seleccione el estado"
                            margin="normal"
                        >
                            {estados.map(option => (
                                <MenuItem key={option.status} value={option.status}>
                                    {option.status}
                                </MenuItem>
                            ))}
                        </TextField>
                        <p></p>
                        <DialogContentText>
                            Seleccione la fecha limite
                  </DialogContentText>
                        <p></p>
                        <DatePicker
                            id="date-todo"
                            selected={this.state.dueDate}
                            onChange={this.handleDate} />
                        <p></p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancelar
                  </Button>
                        <Button onClick={this.filter} color="primary">
                            Filtrar
                  </Button>
                    </DialogActions>
                    <TodoList items={this.state.fitered}></TodoList>
                </Dialog>
            </div>
        );
    }


    handleStatus(e) {
        console.log(e.target.value);
        this.setState({ status: e.target.value });
        //state.status= e.target.value;
        
      
    }
    handleOwner(e){
        console.log(e.target.value);
        this.setState({owner:e.target.value});
    }
    handleDate(e) {
        this.setState({ dueDate: e });
    }
     handleClickOpen = () => {
        this.setState({open: true});
        
    };

     handleClose = () => {
        this.setState({open: false});
    };

    filter(){
        
        fetch('http://localhost:8080/Task')
        .then(response => response.json())
        .then(data => {
            let tasksList = [];
            data.forEach(function (task) {

                tasksList.push({
                   id:task.id,
                   text:task.activity,
                   status:task.state,
                   dueDate:task.date,
                   owner:task.owner
                })

            });
            console.log(data);
            if(this.state.status!==''){
                let temp=[];
                for(const task of tasksList){
                    if(task.status=== this.state.status){
                        temp.push(task);
                    }
                }
                tasksList=temp;
            }
            if(this.state.owner!==''){
                let temp=[];
                for(const task of tasksList){
                    if(task.owner.email=== this.state.owner){
                        temp.push(task);
                    }
                }
                tasksList=temp;
            }
            if(this.state.dueDate!==''){
                let temp=[];
                for(const task of tasksList){
                    if(new Date(task.dueDate) < new Date(this.state.dueDate)){
                        temp.push(task);
                    }
                }
                tasksList=temp;
            }
            
            this.setState({fitered: tasksList});
        });
    };



}
