import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import Pomocna from './Pomocna';
import Swal from 'sweetalert2';

import 'react-datepicker/dist/react-datepicker.css';
import './../proba.css';
import "./../css/Login.css"

export default class Main extends Component{
  constructor(props){
    super(props);

    this.state={
      startDate:moment(),
      polazni:0,
      dolazni:0
    };
  //  this.handleChange=this.handleChange.bind(this);
    this.onChange=this.onChange.bind(this);
  }

  handleChange= (date)=>{
    if(date<moment()){
    Swal({
                type:'error',
                text:'Datum mora biti posle danasnjeg!'
            });
    return;
    }
    this.setState({
      startDate:date
    });
  }

    onChange=(id, newValue, method) =>{
      
       if(id==='polazni')
        this.setState({polazni:newValue.sifraAerodroma});
        else
        this.setState({dolazni:newValue.sifraAerodroma});
     
  }

  pogledajState=()=>{
      if(this.state.polazni===0 || this.state.dolazni===0){
      Swal({
                type:'error',
                text:'Sva polja su obavezna!'
            });
      return;
    }
    if(this.state.polazni===this.state.dolazni){
      Swal({
                type:'error',
                text:'Dolazni i odlazni aerodrom se poklapaju!'
            });
      return;
    }
    localStorage.setItem("polazniA",this.state.polazni);
    localStorage.setItem("dolazniA",this.state.dolazni);
    localStorage.setItem("datum",this.state.startDate.format('YYYY-MM-DD'));
     this.props.history.push('/prikazletova');
      }

    render(){
        return(
            <div className="login">
              <div className="login-container">
               <p><Pomocna
                className="form-control"
                id="polazni"
                placeholder="Polazni aerodrom"
                onChange={this.onChange}
                /></p>
                <p><DatePicker
                className="form-control"
                selected={this.state.startDate}
                onChange={this.handleChange}
                /></p>
                <p><Pomocna
                className="form-control"
                id="dolazni"
                placeholder="Dolazni aerodrom"
                onChange={this.onChange}
                /></p>
                <p><button 
                className="btn btn-lg btn-primary btn-block"
                onClick={this.pogledajState}>Pronadji let</button></p>
            </div>
            </div>
        );
    }
}
