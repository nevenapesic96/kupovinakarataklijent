import React, { Component } from "react";
import axios from 'axios';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css'; 
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import Swal from 'sweetalert2';


export default class osnovniPodaci extends Component{
    constructor(props){
        super(props);

        this.state={
            putnici:[],
            izabraniRed:null,
            isHidden:true
        };

        this.onRowSelect=this.onRowSelect.bind(this);
    }


    componentDidMount(){
    axios.get('http://localhost:8081/putnik/sve')
    .then(res=>{
        const putnici=res.data;
        this.setState({putnici});
     //   console.log(putnici);
    })
    .catch((err) => {
            alert("Nece get");
            console.log("AXIOS ERROR: ", err);
        });
    
  }
    submit(e){
        e.preventDefault();
        alert('Da li ste sigurni da zelite za putnika '+this.state.putnici[this.state.izabraniRed]+' da kupite kartu?');
    }

    dodajNovog(e){
        e.preventDefault();
        this.props.history.push('/putnik');
    }

    promeniStatus(status){
        this.setState({
        isHidden: {status}
        });
    }

    onRowSelect(row, isSelected,e){
        for(const prop in row){
            if(prop==='sifraPutnika'){
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
        axios.delete('http://localhost:8081/putnik/izbrisi/'+sifra)
        .then(res=>{
            Swal({
                type:'error',
                text:'Nije moguce izbrisati ovog putnika, postoji karta na njegovo ime!',
                timer: 1500
            });
           // alert('Uspesno izbrisan putnik');
            window.location.reload();
        })
        .catch(function(error){
            console.log(error);
        })

    }

    izmeniPutnika(e){
        e.preventDefault();
        this.props.history.push({pathname:'/putnik',data:this.state.putnici.find(izabraniPutnik=>izabraniPutnik.sifraPutnika===this.state.izabraniRed)});

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
            <BootstrapTable data={this.state.putnici} selectRow={selectRowProp} hover striped pagination>
                <TableHeaderColumn dataField='sifraPutnika' isKey hidden></TableHeaderColumn>
                <TableHeaderColumn dataField='ime' filter={ { type: 'TextFilter', delay: 1000 } }>Ime</TableHeaderColumn>
                <TableHeaderColumn dataField='prezime' filter={ { type: 'TextFilter', delay: 1000 } }>Prezime</TableHeaderColumn>
                <TableHeaderColumn dataField='telefon'>Telefon</TableHeaderColumn>
                <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                <TableHeaderColumn dataField='brojPasosa'>Broj pasosa</TableHeaderColumn>
                <TableHeaderColumn dataField='adresa'>Adresa</TableHeaderColumn>
            </BootstrapTable>

            <button onClick={e=>this.dodajNovog(e)}>Dodaj novog putnika</button> 
                <button disabled={hidden.display} onClick={(e)=>{if (window.confirm('Da li zaista zelite da izbrisete ovog putnika?')) this.obrisi(e)}}>Obrisi</button>
                <button disabled={hidden.display} onClick={e=>this.izmeniPutnika(e)}>Izmeni</button>
            </div>       
        )
    }
}
