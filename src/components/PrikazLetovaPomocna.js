import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

import "./../css/PrikazLetova.css"

class PrikazLetovaPomocna extends Component {
    constructor(props){
        super(props);
        this.state={
            letS:{},
            loading:'init',
            izabran:false
        }
    }

submit=(e)=>{
  e.preventDefault();
  this.setState({izabran:true});

}

componentDidMount(){

    this.setState({letS:this.props.letJ,
    loading:'false'});
}
  render() {
    var izabran=this.state.izabran;
    if(izabran){
      return <Redirect to={{
        pathname:'/putnik',
        state:{let:this.state.letS}
      }} />;
    }
    if(this.state.loading==='false'){
      return (
      <div className="komponenta">
        <div class="polazakDolazak">{this.state.letS.aerodromPolazni.naziv}, {this.state.letS.aerodromPolazni.grad.naziv} ({this.state.letS.aerodromPolazni.grad.drzava})->
        {this.state.letS.aerodromDolazni.naziv}, {this.state.letS.aerodromDolazni.grad.naziv} ({this.state.letS.aerodromDolazni.grad.drzava})
        </div>
        <div className="divdugme">
          <div className="kompanija">##{this.state.letS.kompanija.naziv}##</div>
          <div className="terminal">Terminal: {this.state.letS.terminal}</div>
        </div>
        <div className="divdugme">
          <div className="polazak">Polazak: {this.state.letS.datumPolaska}, {this.state.letS.vremePolaska}</div>
          <div className="dolazak">Dolazak: {this.state.letS.datumDolaska}, {this.state.letS.vremeDolaska}</div>
        </div>
        <br/>
        <div className="divdugme">
          <button
          className="dugme"
          onClick={e=>this.submit(e)}>Kupi kartu</button>
          <div className="cenaKarte">Cena karte: {this.state.letS.cenaKarte}&euro;</div>
        </div>
      </div>
    );
  }else{
    return (<div></div>);
  }
  }
}

export default PrikazLetovaPomocna;