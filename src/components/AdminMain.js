import React, { Component } from 'react';

import "./../css/PrikazLetova.css"
import "./../css/Login.css"

export default class AdminMain extends Component{
  constructor(props){
    super(props);

    this.state={
        username:localStorage.getItem("user")
    };
  }

  goToPage(page,e){
      e.preventDefault();
    this.props.history.push('/'+page);
  }

  odjaviSe(e){
      e.preventDefault();
      localStorage.removeItem("user");
      this.props.history.push("/");

  }
    render(){
        return(
            <div className="login">
                <div className="login-container">
                <h2 className="login-header">{this.state.username}, izaberite opciju:</h2>    
                <hr/>
               <button 
               className="btn btn-lg btn-primary btn-block"
               type="submit"
               onClick={e=>this.goToPage("let",e)}>Dodaj novi let</button>
               <button 
               className="btn btn-lg btn-primary btn-block"
               type="submit"
               onClick={e=>this.goToPage("/",e)}>Pogledaj sve karte</button>
               <button 
               className="btn btn-lg btn-primary btn-block"
               type="submit"
               onClick={e=>this.goToPage("letovi",e)}>Pogledaj sve letove</button>
               <button 
               className="btn btn-lg btn-primary btn-block"
               type="submit"
               onClick={e=>this.goToPage("prikazPutnika",e)}>Pogledaj sve putnike</button>
               <hr/>
               <button 
               className="btn btn-lg btn-primary btn-block"
               type="submit"
               onClick={e=>this.odjaviSe(e)}>Odjavi se</button>
            </div>    
            </div>
        );
    }
}
