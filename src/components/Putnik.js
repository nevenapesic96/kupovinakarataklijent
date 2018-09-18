import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import moment from 'moment';

import "./../css/Login.css"

class Putnik extends Component {
    constructor(props){
        super(props);

        if(this.props.location.data===undefined){
        this.state={
                sifraPutnika:'',
                ime:'',
                prezime:'',
                telefon:'',
                email:'',
                brojPasosa:'',
                adresa:'',
                let:this.props.history.location.state.let,
                uspesno:false,
                ucitao:true,
                update:false,
                NoviPutnik:{}
        }
    }else{
        this.state={
            ucitao:false,
            update:true
        }
    }
    
    }
   
   change=e=>{
    this.setState({
        [e.target.name]:e.target.value
    });
}

componentDidMount(){
        if(this.props.location.data!==undefined){

            Swal({
            html: 'Ucitavaju se podaci',
            timer: 1000,
            onOpen: () => {
                Swal.showLoading()
            }
        });
                
            this.setState({
                sifraPutnika:this.props.location.data.sifraPutnika,
                ime:this.props.location.data.ime,
                prezime:this.props.location.data.prezime,
                telefon:this.props.location.data.telefon,
                email:this.props.location.data.email,
                brojPasosa:this.props.location.data.brojPasosa,
                adresa:this.props.location.data.adresa,
                uspesno:false,
                ucitao:true
            });

        }
}
submit=e=>{
    e.preventDefault();
    if(this.state.update===false){
    if(this.state.ime.length>0 && this.state.prezime.length>0 && this.state.adresa.length>0 &&
    this.state.telefon.length>0 && this.state.brojPasosa.length>0 && this.state.email.length>0){
        var headers = {
        'headers': {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }
    var data = {
                ime:this.state.ime,
                prezime:this.state.prezime,
                telefon:this.state.telefon,
                email:this.state.email,
                brojPasosa:this.state.brojPasosa,
                adresa:this.state.adresa
    }

    axios.post('http://localhost:8081/putnik/dodaj', data, headers)

        .then((res) => {
           this.setState({uspesno:true,NoviPutnik:res.data});
           
           Swal({
            position: 'center',
            type: 'success',
            title: 'Uspesno kupljena karta',
            showConfirmButton: false,
            timer: 1500
        })
            this.kupiKartu();
           console.log("RESPONSE RECEIVED: ", res);

        })
        .catch((err) => {
            Swal({
                type:'error',
                text:'Nisu dobro uneti podaci!'
            });
        });

    }else{
        Swal({
                type:'error',
                text:'Sva polja su obavezna!'
            });
    }
}else{
    this.update(e);
}
}
kupiKartu(){
    axios.get('http://localhost:8081/karta/dodaj',{params:{
            brojSedista:"xxx"+this.state.let.brojSlobodnihMesta,
            cenaKarte:this.state.let.cenaKarte,
            let:this.state.let.sifraLeta,
            putnik:this.state.NoviPutnik.sifraPutnika
        }})
        .then(res=>{
           // alert('Uspesno kupljena karta');
    })
    .catch((err) => {
          //  alert("Nece ofc");
          //  console.log("AXIOS ERROR: ", err);
        });
}
update(e){
    if(this.state.ime.length>0 && this.state.prezime.length>0 && this.state.adresa.length>0 &&
    this.state.telefon.length>0 && this.state.brojPasosa.length>0 && this.state.email.length>0){
        
    var data = {
                ime:this.state.ime,
                prezime:this.state.prezime,
                telefon:this.state.telefon,
                email:this.state.email,
                brojPasosa:this.state.brojPasosa,
                adresa:this.state.adresa
    }

        const sifraPutnika=this.state.sifraPutnika;

    axios.put('http://localhost:8081/putnik/izmeni/'+sifraPutnika, data)

        .then((res) => {
           this.setState({uspesno:true});

           Swal({
                position: 'center',
                type: 'success',
                title: 'Uspesno izmenjen putnik',
                showConfirmButton: false,
                timer: 1500
            })

           console.log("RESPONSE RECEIVED: ", res);

        })
        .catch((err) => {
            Swal({
                type:'error',
                text:'Nisu dobro uneti podaci!'
            });
        });
    }
}

  render() {
      const gotovo=this.state.uspesno;
      const ucitao=this.state.ucitao;
      const update=this.state.update;
      if (gotovo) {
          if(update)
                return <Redirect to='/prikazPutnika' />;
                return <Redirect to='/main' />;
            }
        if(!ucitao){
            Swal({
            html: 'Ucitavaju se podaci...',
            timer: 2000,
            onOpen: () => {
                Swal.showLoading()
            }
        })
        return (<div></div>);
        }
      return(
          <div className="login">
          <h2 className="login-header">Unesite podatke</h2>
          <form className="login-container">
            <p><input 
            type="text"
            className="form-control"
            name="ime"
            placeholder="ime"
            required=""
            autoFocus=""
            value={this.state.ime}
            onChange={e=>this.change(e)}
            /></p>
            <p><input 
            type="text"
            className="form-control"
            name="prezime"
            placeholder="prezime"
            required=""
            value={this.state.prezime}
            onChange={e=>this.change(e)}
            /></p>
            <p><input 
            type="text"
            className="form-control"
            name="telefon"
            placeholder="telefon"
            required=""
            value={this.state.telefon}
            onChange={e=>this.change(e)}
            /></p>
            <p><input 
            type="text"
            className="form-control"
            name="email"
            placeholder="email"
            required=""
            value={this.state.email}
            onChange={e=>this.change(e)}
            /></p>
            <p><input 
            type="text"
            className="form-control"
            name="brojPasosa"
            placeholder="brojPasosa"
            required=""
            value={this.state.brojPasosa}
            onChange={e=>this.change(e)}
            /></p>
            <p><input 
            type="text"
            className="form-control"
            name="adresa"
            placeholder="adresa"
            required=""
            value={this.state.adresa}
            onChange={e=>this.change(e)}
            /></p>
            <p><button 
            className="btn btn-lg btn-primary btn-block"
            type="submit"
            onClick={e=>this.submit(e)}>Sacuvaj</button></p>
      </form>
      </div>
      );
  }
}

export default Putnik;