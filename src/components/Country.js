import React from 'react';

const Country = ({country}) => {

    const {name, capital, region, subregion, population} = country;
    let language;
    if (country.language === undefined) {
        language = country.languages[0].name;
    }else {
        language = country.language;
    }
    

    return ( 
        <>
            <div className="col-sm-6 col-md-4">

                <div className="card mb-4">
                
                    <img src={country.flag} className="card-img-top" alt="..." style={{height:'200px'}}/>

                    <div className="card-body bg-light">

                        <h5 className="card-title">{name}</h5>

                        <p className="card-text">
                            Capital: {capital}
                        </p>
                        <p className="card-text">
                            Language: {language}
                        </p>
                        <p className="card-text">
                            Region: {region}
                        </p>
                        <p className="card-text">
                            Subregion: {subregion}
                        </p>
                        <p className="card-text">
                            Population: {population} inhabitants
                        </p>
  
                    </div>

                </div>

            </div>
        </>
     );
}
 
export default Country;