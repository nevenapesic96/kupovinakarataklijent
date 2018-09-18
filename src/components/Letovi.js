import React, { Component } from 'react';
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class Letovi extends Component{
  constructor(props){
        super(props);

        this.state={
            letovi:[],
            izabraniRed:null,
            isHidden:true
        };

        this.onRowSelect=this.onRowSelect.bind(this);
    }
    componentDidMount(){
    axios.get('http://localhost:8081/let/sve')
    .then(res=>{
        const letovi=res.data;
        this.setState({letovi});
        console.log(letovi);
    })
    .catch((err) => {
            alert("Nece get");
            console.log("AXIOS ERROR: ", err);
        });
    
  }

    dodajNovog(e){
        e.preventDefault();
        this.props.history.push('/let');
    }

    promeniStatus(status){
        this.setState({
        isHidden: {status}
        });
    }

    onRowSelect(row, isSelected,e){
        for(const prop in row){
            if(prop==='sifraLeta'){
                //alert(row[prop]);
               // this.props.onIzabraniRedChange(row[prop]);
               if(isSelected){
                this.setState({izabraniRed:row[prop],isHidden:false});
               }else{
                this.setState({izabraniRed:null,isHidden:true});
               }
            }
        }
    }

    obrisi(e){
        e.preventDefault();
        const sifra=this.state.izabraniRed;
        axios.delete('http://localhost:8081/let/izbrisi/'+sifra)
        .then(res=>{
            alert('Uspesno izbrisan let');
            window.location.reload();
        })
        .catch(function(error){
            console.log(error);
        })

    }

    izmeniLet(e){
        e.preventDefault();
        this.props.history.push({pathname:'/let',data:this.state.letovi.find(izabraniLet=>izabraniLet.sifraLeta===this.state.izabraniRed)});

    }

    format(cell, row){
        if(cell.grad!==undefined)
           return (cell.naziv+", "+cell.grad.naziv);
        return (cell.naziv);
        
    }
    render(){
        var selectRowProp = {
                mode: 'radio',
                clickToSelect: true,
                onSelect: this.onRowSelect,
                bgColor: '#fce3c2',
                hideSelectColumn: true
            };

        var hidden={display:this.state.isHidden ? 'true' : ''};

        return(
            <div className="container" style={{marginTop:50}}>
            <BootstrapTable data={this.state.letovi} selectRow={selectRowProp} hover striped pagination>
                <TableHeaderColumn dataField='sifraLeta' isKey hidden></TableHeaderColumn>
                <TableHeaderColumn dataField='datumPolaska'>Datum polaska</TableHeaderColumn>
                <TableHeaderColumn dataField='vremePolaska'>Vreme polaska</TableHeaderColumn>
                <TableHeaderColumn dataField='datumDolaska'>Datum dolaska</TableHeaderColumn>
                <TableHeaderColumn dataField='vremeDolaska'>Vreme dolaska</TableHeaderColumn>
                <TableHeaderColumn dataField='aerodromPolazni' dataFormat={this.format} filter={ { type: 'TextFilter', delay: 1000 } }>Polazni aerodrom</TableHeaderColumn>
                <TableHeaderColumn dataField='aerodromDolazni' dataFormat={this.format} filter={ { type: 'TextFilter', delay: 1000 } }>Dolazni aerodrom</TableHeaderColumn>
                <TableHeaderColumn dataField='terminal'>Terminal</TableHeaderColumn>
                <TableHeaderColumn dataField='brojSlobodnihMesta'>Broj slobodnih mesta</TableHeaderColumn>
                <TableHeaderColumn dataField='tipaviona' dataFormat={this.format}>Tip aviona</TableHeaderColumn>
                <TableHeaderColumn dataField='kompanija' dataFormat={this.format}>Kompanija</TableHeaderColumn>
            </BootstrapTable>

            <button onClick={e=>this.dodajNovog(e)}>Dodaj novi let</button> 
                <button disabled={hidden.display} onClick={(e)=>{if (window.confirm('Da li zaista zelite da izbrisete ovaj let?')) this.obrisi(e)}}>Obrisi</button>
                <button disabled={hidden.display} onClick={e=>this.izmeniLet(e)}>Izmeni</button>
            </div>
        );
    }
}
