import React from 'react';
import { TodoList } from './TodoList.js'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import DatePicker from 'react-datepicker';
import Card from '@material-ui/core/Card';
import "react-datepicker/dist/react-datepicker.css";
import "./TodoApp.css"
import Drawer from "./Drawer.js"
import MenuItem from '@material-ui/core/MenuItem';
import {Filter} from "./Filter";
import uuid from 'react-uuid';
import axios from 'axios';

const styleCenter = {
  textAlign: "center"
}

export class TodoApp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { items: [], text: '', status: '', dueDate: new Date() };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDate = this.handleDate.bind(this);
    this.handleStatus = this.handleStatus.bind(this);
  }
  updateList(){
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
            
            this.setState({items: tasksList});
        });
  }
  componentDidMount() {
    this.updateList();
}

  render() {

    if (!JSON.parse(localStorage.getItem("isLoggedIn"))) {
      
      window.location.replace("/login");
    }


    const estados = [
      { status: "Completed" }, { status: "In Progress" }, { status: "Ready" }
    ]
    return (
      <div>
        <Drawer></Drawer>
        <h2 style={styleCenter}>Bienvenido {localStorage.getItem("mailLogged")}</h2>
        <h3 style={styleCenter}>Manejador de tareas</h3>
        <div>
          <Card className="insertCard">
            <form onSubmit={this.handleSubmit}>
              <center>
                <TextField
                  id="text-todo"
                  label="Actividad"
                  value={this.state.text}
                  onChange={this.handleChange}
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
                <DatePicker
                  id="date-todo"
                  selected={this.state.dueDate}
                  onChange={this.handleDate} />
                <p></p>
                <Button variant="contained" color="primary" type="button" onClick={this.handleSubmit}>
                  Agregar #{this.state.items.length + 1}
                </Button>
                <Filter/>
              </center>
            </form>
          </Card>
         
          <TodoList items={this.state.items} />
          

          <br className="fix" />
        </div>


        {/** <div id="Login"><Login></Login></div> */}

      </div>
    );
  }


  handleChange(e) {

    this.setState({ text: document.getElementById("text-todo").value });
    //this.setState({ status: document.getElementById("priority-todo").value });

  }
  handleStatus(e) {
    console.log(e.target.value);
    this.setState({ status: e.target.value });
  }

  handleDate(e) {
    this.setState({ dueDate: e });
  }

  handleSubmit(e) {
    //e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      id: uuid(),
      activity: this.state.text,
      state: this.state.status,
      date: this.state.dueDate,
      owner:{email:localStorage.getItem("mailLogged")}

    };
    console.log(newItem);
   axios.post('http://localhost:8080/Task',newItem).then(res=>{
    this.updateList();
   });
   
  }
}

export default TodoApp;