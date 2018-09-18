import React, { Component } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

import Pomocna from './PrikazLetovaPomocna';

class PrikazLetova extends Component {
    constructor(props){
        super(props);
        this.state={
            loading:'initial',
            letovi:[]
        }
    }
    componentDidMount(){
        this.setState({loading:'true'});
        axios.get('http://localhost:8081/let/filtrirane',{params:{
            polazni:localStorage.getItem("polazniA"),
            dolazni:localStorage.getItem("dolazniA"),
            datum:localStorage.getItem("datum")
        }})
        .then(res=>{
            this.setState({
                loading:'false',
                letovi:res.data});
    })
    .catch((err) => {
            Swal({
                type:'error',
                text:'Dogodila se greska prilikom ucitavanja gradova!'
            });
            console.log("AXIOS ERROR: ", err);
        });
    }

  render() {
      if(this.state.loading==='initial'){
          console.log('Initializing');
          return (<h2>Initializing....</h2>)
      }

      if(this.state.loading==='true'){
          console.log('Loading');
          return (<h2>Loading.....</h2>)
      }
      
      console.log(this.state.letovi);
    return (
      <div>
          {this.state.letovi.map((item)=>
          <Pomocna key={item.sifraLeta} letJ={item}></Pomocna>)
        }
      </div>
    );
  }
}

export default PrikazLetova;

