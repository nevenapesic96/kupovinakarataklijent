import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

var aerodromi = [];

function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('^' + escapedValue, 'i');
  return aerodromi.filter(aerodrom => regex.test(aerodrom.naziv));
}

function getSuggestionValue(suggestion) {
    return {naziv: suggestion.naziv,
            sifraAerodroma:suggestion.sifraAerodroma};
}

function renderSuggestion(suggestion) {
  return (
    <span>{suggestion.naziv} ({suggestion.skraceniNaziv}), {suggestion.grad.naziv}</span>
  );
}

export default class Pomocna extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      suggestions: []
    };    
  }

  componentWillMount(){
    axios.get('http://localhost:8081/aerodrom/sve')
    .then(res=>{
        aerodromi=res.data;
        this.setState({suggestions:aerodromi});
        console.log(aerodromi);
    })
    .catch((err) => {
            alert("Nece get");
            console.log("AXIOS ERROR: ", err);
        });
    
  }

  onChange = (_, { newValue ,method}) => {
    const { id, onChange } = this.props;
    if(method==='click'){
    this.setState({
      value: newValue.naziv
    });
    onChange(id, newValue);
    }else{
      this.setState({
      value: newValue
    }); 
    }
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { id, placeholder } = this.props;
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder,
      value,
      onChange: this.onChange
    };
    
    return (
      <Autosuggest 
        id={id}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps} 
      />
    );
  }
}