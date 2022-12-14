import React, { useState } from "react";
import MapRender from "./Map";
import {  useNavigate } from "react-router-dom";

export function Recommendation(){
    const [results,setResults] = useState([]);

    //Get the recommendations 
    const navigate = useNavigate();
    const handleResults = () => {
        const a = results;
        const cleanedResults = [];
        console.log(a);
          for(var i=0;i<a.length;i++){
            // const base64String = a[i].image ? a[i].image.data : '';
            // console.log('base64String');
            cleanedResults[i]= {
                'image':a[i].image,
                'petDetails':{
                    'Pet name':a[i].name,
                    'Pet owner':a[i].owner,
                    'Pet age':a[i].age,
                    'Pet breed':a[i].breed,
                    'Pet price':a[i].amount
                },
                'map':{'lat':a[i].lat,'lng':a[i].lng},
                'id':a[i].id
            }
          }
          console.log('CleanedResults');
          console.log(cleanedResults);
          return cleanedResults;
    }
    function handleRentPet(details) {
        
        console.log('in handler');
        console.log(details);
        //get the current loggedin username, petid, price 
        navigate('/payment',{state:{ petid: details.id, price:details.petDetails['Pet price']}});
    }
    const RenderResults = () => {
        const res = handleResults();
        const keys = Object.keys(res[0].petDetails);
       return (
        <div>  
        {res.map((index)=>{
            return (
                <div key={index} className='result-container'>
                <div className='result'>
               <div>
             
                {index.image ? <img src={URL.createObjectURL(new Blob(index.image.data, { type: 'image/jpeg' }))} style={{height:'80%', width:'90%', padding:'30px' }}/> : <img src={require('../assets/images/pet-holder-dog.jpeg')} style={{height:'80%', width:'90%', padding:'30px' }}></img>}
                {/* <img src={require('../assets/images/pets-pic.jpeg')} style={{height:'80%', width:'90%', padding:'30px' }}></img> */}
               </div>
               <div>
               {keys.map((k)=> {
                return (
                <div key={k}>
                <h5> {k} : {index.petDetails[k]}<br/></h5> </div>
                )
               })

               }
              </div>
              <div>
                <MapRender lng={index.map.lng} lat={index.map.lat}></MapRender>
                <br/>
                <button type="submit" className="button button-primary button-wide-mobile button-sm" onClick={() => handleRentPet(index)}>Rent the pet</button>
              </div>
              <br/>
              <br/>
              
              </div>
              
              </div>
              
            )
        })}
        </div>
       )

    }

    return (
        <>
        {results.length > 0 ? <RenderResults/> : <h3>No recommendations found! Please check back later!</h3> }
        </>
    )
}
