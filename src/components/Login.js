import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import "./../css/Login.css"

class Login extends Component {
    state={
            username:'',
            password:'',
            ulogovaniKorisnik:{}
        }

change=e=>{
    this.setState({
        [e.target.name]:e.target.value
    });
}

goToHomePage(){
    localStorage.setItem("user",this.state.username);
    this.props.history.push('/adminmain');
}

submit=e=>{
    e.preventDefault();
if(this.state.username.length>0 && this.state.password.length>0){
    var headers = {
        'headers': {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    var data = {
        "username": this.state.username,
        "password": this.state.password
    }
    axios.post('http://localhost:8081/login', data, headers)

        .then((res) => {
            Swal({
            position: 'center',
            type: 'success',
            title: 'Uspesno ste se ulogovali',
            showConfirmButton: false,
            timer: 1500
        })
        
        //proveri sta se sa ovim ulogovanim korisnikom desava
            const ulogovaniKorisnik = res.data;
            this.setState({ulogovaniKorisnik}, this.goToHomePage);
            console.log("RESPONSE RECEIVED: ", res);
        })
        .catch((err) => {
            Swal({
                type:'error',
                text:'Nisu dobro uneti podaci!'
            });
            this.setState({
                username:'',
                password:''
        });
            console.log("AXIOS ERROR: ", err);
        })
}else{
    Swal({
        type:'error',
        text:'Sva polja su obavezna!'
    });
    
}
}

  render() {

    return (
     <div className="login">
        <div className="login-triangle"></div>
        <h2 className="login-header">Unesite podatke</h2>
        <form className="login-container">
            <p><input 
            type="text"
            className="form-control"
            name="username"
            placeholder="Username"
            required=""
            autoFocus=""
            value={this.state.username}
            onChange={e=>this.change(e)}
            /></p>
            <p><input 
            name="password"
            className="form-control"
            type="password"
            placeholder="Password"
            required=""
            value={this.state.password}
            onChange={e=>this.change(e)}
            /></p>
            <p><button
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={e=>this.submit(e)}>Uloguj se</button></p>
        </form>
      </div>
    );
  }
}

export default Login;