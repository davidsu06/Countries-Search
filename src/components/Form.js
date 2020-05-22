import React, { useState, useEffect } from 'react';
import '../styles/Form.css'
import Country from './Country';
import Swal from 'sweetalert2'
import axios from 'axios'

const Form = () => {

    const [search, saveSearch] = useState({
        name: '',
        region: '',
        capital: ''
    });

    const [ error, saveError ] = useState({
        msg: ''
    });

    const [resultAPI, saveResult] = useState([]);
    const [ dataAPI, saveDataAPI ] = useState([]);


    const disableEmpty = () => {
        document.getElementById('namefield').disabled = false;
        document.getElementById('regionfield').disabled = false;
        document.getElementById('capitalfield').disabled = false;
        document.getElementById('buttonsearch').disabled = true;
    }

    const onChange = e => {

        if (e.target.value === '') {
            disableEmpty();
        }
        else
        {
            if (e.target.name === 'name') {
                document.getElementById('regionfield').disabled = true;
                document.getElementById('capitalfield').disabled = true;
                document.getElementById('buttonsearch').disabled = false;
            }
            else if(e.target.name === 'region'){
                document.getElementById('namefield').disabled = true;
                document.getElementById('capitalfield').disabled = true;
                document.getElementById('buttonsearch').disabled = false;
            }
            else{
                document.getElementById('namefield').disabled = true;
                document.getElementById('regionfield').disabled = true;
                document.getElementById('buttonsearch').disabled = false;
            }

        }
        saveSearch({
            ...search,
            [e.target.name]: e.target.value
        })

    }

    useEffect(() => {
        const searchAPI = async () => {
            try {
                const url=`https://restcountries.eu/rest/v2/all`;
                const result = await axios.get(url);
                saveResult(result.data);
                saveDataAPI(result.data);
            } catch (error) {
                saveError({
                    msg: error.response.data.message
                })
            }
        }
        searchAPI();
        

    }, [])

    
    const onSubmit = async e => {
        e.preventDefault();
        let searchFilter, inputSearch;

        if (search.name.trim() !== '') {
            searchFilter = search.name;
            inputSearch = 1;
        }
        else if(search.region.trim() !== ''){
            searchFilter = search.region;
            inputSearch = 2;
        }
        else if(search.capital.trim() !== ''){
            searchFilter = search.capital;
            inputSearch = 3;
        }else{
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter some data',
              })
        }

        if (searchFilter !== undefined && inputSearch !== undefined) {

            if (inputSearch === 1) {

                let cont = 0, refs = [], temp = [];
        
                    for ( cont = 0; cont < resultAPI.length; cont++) {   
        
                        if ( 
                            resultAPI[cont].name.toLowerCase().indexOf(searchFilter.toLowerCase()) === -1 
                        ) 
                        {
                            refs.push(resultAPI[cont].name.toLowerCase());  
                        }
        
                    }                

                    for (let i = 0; i < resultAPI.length; i++) {
                        let ban = 0;
        
                        for (let j = 0; j < refs.length; j++) {
                            
                            if (resultAPI[i].name.toLowerCase() === refs[j]) {
                                ban = 1;
                            }
        
                        }
        
                        if (ban === 0) {
                            temp.push({
                                name: resultAPI[i].name,
                                capital: resultAPI[i].capital,
                                language: resultAPI[i].languages[0].name,
                                region: resultAPI[i].region,
                                subregion: resultAPI[i].subregion,
                                population: resultAPI[i].population,
                                numericCode: resultAPI[i].numericCode,
                                flag: resultAPI[i].flag
                            });
                        }
                    }

                    saveDataAPI(
                        temp
                    );
                    temp = [];

                
            }
            else if ( inputSearch === 2 )
            {
                let cont = 0, refs = [], temp = [];
        
                    for ( cont = 0; cont < resultAPI.length; cont++) {   
        
                        if ( 
                            resultAPI[cont].region.toLowerCase().indexOf(searchFilter.toLowerCase()) === -1 
                        ) 
                        {
                            refs.push(resultAPI[cont].name.toLowerCase());  
                        }
        
                    }                

                    for (let i = 0; i < resultAPI.length; i++) {
                        let ban = 0;
        
                        for (let j = 0; j < refs.length; j++) {
                            
                            if (resultAPI[i].name.toLowerCase() === refs[j]) {
                                ban = 1;
                            }
        
                        }
        
                        if (ban === 0) {
                            temp.push({
                                name: resultAPI[i].name,
                                capital: resultAPI[i].capital,
                                language: resultAPI[i].languages[0].name,
                                region: resultAPI[i].region,
                                subregion: resultAPI[i].subregion,
                                population: resultAPI[i].population,
                                numericCode: resultAPI[i].numericCode,
                                flag: resultAPI[i].flag
                            });
                        }
                    }
        
                    saveDataAPI(
                        temp
                    );
                    temp = [];
            }
            else if ( inputSearch === 3 )
            {
                let cont = 0, refs = [], temp = [];
        
                    for ( cont = 0; cont < resultAPI.length; cont++) {   
        
                        if ( 
                            resultAPI[cont].capital.toLowerCase().indexOf(searchFilter.toLowerCase()) === -1 
                        ) 
                        {
                            refs.push(resultAPI[cont].name.toLowerCase());  
                        }
        
                    }                

                    for (let i = 0; i < resultAPI.length; i++) {
                        let ban = 0;
        
                        for (let j = 0; j < refs.length; j++) {
                            
                            if (resultAPI[i].name.toLowerCase() === refs[j]) {
                                ban = 1;
                            }
        
                        }
        
                        if (ban === 0) {
                            temp.push({
                                name: resultAPI[i].name,
                                capital: resultAPI[i].capital,
                                language: resultAPI[i].languages[0].name,
                                region: resultAPI[i].region,
                                subregion: resultAPI[i].subregion,
                                population: resultAPI[i].population,
                                numericCode: resultAPI[i].numericCode,
                                flag: resultAPI[i].flag
                            });
                        }
                    }
        
                    saveDataAPI(
                        temp
                    );
                    temp = [];
            }
            
        }

        saveSearch({
            name: '',
            region: '',
            capital: ''
        })
        disableEmpty();
        
    }


    return (
        <>
            <form onSubmit={ onSubmit } className="mt-5">

               <div className="container">

                    <div className="my-4 text-center h4">Search a country by name, region or capital</div>

                    <div className="row">

                        <div className="col-sm-12 col-md-4 mt-1">
                            <input type="text" className="form-control" id="namefield" name="name" value={search.name} placeholder="Name" onChange={onChange}></input>
                        </div>
                        

                        <div className="col-sm-12 col-md-4 mt-1">
                            <input type="text" className="form-control" id="regionfield" name="region" value={search.region} placeholder="Region"  onChange={onChange}></input>
                        </div>

                        <div className="col-sm-12 col-md-4 mt-1">
                            <input type="text" className="form-control" id="capitalfield" name="capital" value={search.capital} placeholder="Capital" onChange={onChange}></input>
                        </div>

                    </div>

                    <div className="text-center">
                            <button type="submit" className="btn btn-primary mt-3" id="buttonsearch" disabled >Search</button>
                    </div>
                    
               </div>

            </form>

            <div className="container mt-5">

                {
                    dataAPI.length === 0 &&
                    <h4 className="d-flex justify-content-center">There are no countries</h4>
                }

                {
                    error.msg !== '' ?
                        <div className="alert alert-danger text-center font-weight-bold" role="alert">
                            No se encontraron resultados
                        </div>
                    :
                        <div className="row">
                        {
                            dataAPI.map(country => (
                                <Country key={country.numericCode} country={country} />
                            ))
                        }
                        </div>
                }

                

            </div>
        </>
      );
}
 
export default Form;