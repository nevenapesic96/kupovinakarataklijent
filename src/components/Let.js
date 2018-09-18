import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import NumberFormat from 'react-number-format';
import Select from 'react-select';
import moment from 'moment';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

import 'react-datepicker/dist/react-datepicker.css';
import "./../css/Login.css"

    var aerodromi=[];
    var kompanije=[];
    var tipoviA=[];

export default class Let extends Component{
  constructor(props){
    super(props);

    this.state={
        datumPolaska:moment(),
        vremePolaska:'',
        datumDolaska:moment(),
        vremeDolaska:'',
        brojSlobodnihMesta:'',
        terminal:'',
        aerodromPolazni:'',
        aerodromDolazni:'',
        kompanija:'',
        tipaviona:'',
        aerodromi:[],
        tipoviA:[],
        kompanije:[],
        ucitao:0,
        cenaKarte:120,
        gotovo:false
    };
  }

    componentDidMount(){
    axios.get('http://localhost:8081/aerodrom/sve')
    .then(res=>{
        this.setState({ucitao:this.state.ucitao+1});
        aerodromi=res.data;
        this.setState({aerodromi});
        console.log(aerodromi);
    })
    .catch((err) => {
            alert("Aerodromi se nisu ucitali");
            console.log("AXIOS ERROR: ", err);
        });
        
        
    axios.get('http://localhost:8081/tipaviona/sve')
    .then(res=>{
        this.setState({ucitao:this.state.ucitao+1});
        tipoviA=res.data;
        this.setState({tipoviA});
        console.log(tipoviA);
    })
    .catch((err) => {
            alert("tipovi aviona se nisu ucitali");
            console.log("AXIOS ERROR: ", err);
        });

    axios.get('http://localhost:8081/kompanija/sve')
    .then(res=>{
        this.setState({ucitao:this.state.ucitao+1});
        kompanije=res.data;
        this.setState({kompanije});
        console.log(kompanije);
    })
    .catch((err) => {
            alert("kompanije se nisu ucitale");
            console.log("AXIOS ERROR: ", err);
        });
    
  }


    submit=e=>{
        e.preventDefault();
        console.log(this.state);
        var headers = {
        'headers': {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    var data = {
                    cenaKarte:this.state.cenaKarte,
                    brojSlobodnihMesta:this.state.brojSlobodnihMesta,
                    terminal:this.state.terminal,
                    aerodromPolazni:this.state.aerodromPolazni.value,
                    aerodromDolazni:this.state.aerodromDolazni.value,
                    kompanija:this.state.kompanija.value,
                    tipAviona:this.state.tipaviona.value,
                    datumP:this.state.datumPolaska.format('YYYY-MM-DD'),
                    datumD:this.state.datumDolaska.format('YYYY-MM-DD'),
                    vremeP:this.state.vremePolaska,
                    vremeD:this.state.vremeDolaska
    }

    console.log(data);

    axios.post('http://localhost:8081/let/dodaj', data, headers)

        .then((res) => {
           
           Swal({
            position: 'center',
            type: 'success',
            title: 'Uspesno dodat novi let',
            showConfirmButton: false,
            timer: 1500
        })
        this.setState({gotovo:true});


        })
        .catch((err) => {
            Swal({
                type:'error',
                text:'Nisu dobro uneti podaci!'
            });
        });
    }

    change=e=>{
    this.setState({
        [e.target.name]:e.target.value
    });
    }

    handleDateChange = (dateName, dateValue) => {
        if(dateValue<moment()){
            alert('Datum mora biti posle danasnjeg!');
            return;
            }
        this.setState({
                [dateName]: dateValue
        })
    }

    handleTimeChange=(timeName,timeValue)=>{
        console.log(timeValue);
        this.setState({
                [timeName]: timeValue
        });
        if(timeName==='tipaviona'){
            let brojSlobodnihMesta=0;
            this.state.tipoviA.map((item)=>{
                if(item.sifraTipa===timeValue.value){
                brojSlobodnihMesta=item.brojSedista;
            }
            })
            this.setState({brojSlobodnihMesta})
        }
    }

    vratiListuA(aerodromi){
        let novaLista=[];
        aerodromi.map((item)=>{
            novaLista.push({value:item.sifraAerodroma,
                            label:item.naziv+", "+item.grad.naziv+" ("+item.grad.drzava+")"});
    });
    return novaLista;
} 
    vratiListuK(kompanije){
        let novaLista=[];
        kompanije.map((item)=>{
            novaLista.push({value:item.sifraKompanije,
                            label:item.naziv});
    });
    return novaLista;
}
    vratiListuT(tipoviA){
        let novaLista=[];
        tipoviA.map((item)=>{
            novaLista.push({value:item.sifraTipa,
                            label:item.naziv});
    });
    return novaLista;
}
    render(){
        if(this.state.gotovo){
            return (<Redirect to="/letovi"/>);
        }
        
    if(this.state.ucitao<3){
        return (<div></div>);
    }else{
    aerodromi=this.vratiListuA(this.state.aerodromi);
    kompanije=this.vratiListuK(this.state.kompanije);
    tipoviA=this.vratiListuT(this.state.tipoviA);
        return(
        <div className="login">
          <h2 className="login-header">Unesite podatke</h2>
          <form className="login-container">
            <p><input 
            type="text"
            className="form-control"
            name="terminal"
            placeholder="terminal"
            required=""
            autoFocus=""
            value={this.state.terminal}
            onChange={e=>this.change(e)}
            /></p>
            <p>Datum polaska:<DatePicker
            selected={this.state.datumPolaska}
            onChange={(value)=>this.handleDateChange("datumPolaska",value)}
            /></p>
            <p>Datum dolaska:<DatePicker
            selected={this.state.datumDolaska}
            onChange={(value)=>this.handleDateChange("datumDolaska",value)}
            /></p>
            <p>Vreme polaska:<NumberFormat 
            format="##:##" 
            placeholder="HH:MM" 
            mask={['H', 'H', 'M', 'M']}
            value={this.state.vremePolaska}
            onValueChange={(values)=>{
                const{formattedValue,value}=values;
                this.setState({vremePolaska:formattedValue});
            }}/></p>
            <p>Vreme dolaska:<NumberFormat 
            format="##:##" 
            placeholder="HH:MM" 
            mask={['H', 'H', 'M', 'M']}
            value={this.state.vremeDolaska}
            onValueChange={(values)=>{
                const{formattedValue,value}=values;
                this.setState({vremeDolaska:formattedValue});
            }}/></p>
            <p><Select
            placeholder="Izaberite polazni aerodrom"
            onChange={(value)=>this.handleTimeChange("aerodromPolazni",value)}
            options={aerodromi}
            /></p>
            <p><Select
            placeholder="Izaberite dolazni aerodrom"
            onChange={(value)=>this.handleTimeChange("aerodromDolazni",value)}
            options={aerodromi}
            /></p>
            <p><Select
            placeholder="Izaberite tip aviona"
            onChange={(value)=>this.handleTimeChange("tipaviona",value)}
            options={tipoviA}
            /></p>
            <p><Select
            placeholder="Izaberite kompaniju"
            onChange={(value)=>this.handleTimeChange("kompanija",value)}
            options={kompanije}
            /></p>
            <p><button 
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={e=>this.submit(e)}>Submit</button></p>
      </form>
      </div>
        );
    }
    }
}
