import axios from "axios";


const apiURL = "http://localhost:3000/"


// export const me = async () => {
//     return isStoredJwt()
//       ? (await get(createUrl("/api/me")).catch(() => null))?.data
//       : null;
//   };

  export const login = async (username, password) => {

    const result = (
      await axios.post( ""+apiURL+""+"auth/login" , { username, password }).catch(
        () => null
      )
    )?.data;
  
    if (!result) {
      return alert("Could not login");
    }
    console.log( result ) ;
    return result;
  };


export async function getAdmin(){
    axios({
        method: 'get',
        url: 'http://localhost:3000/admin',
        
        
    })
        .then( res =>
            
            console.log( res.data ) )
        .catch( err => console.error( err ) ) ;
   
}


 export const getAllCards = ( { getCards } , param ) =>{
  axios.get( apiURL+"cards/"+param ) 
      .then( ( response ) => {
          const allCards = response.data ; 
          getCards( allCards ) ;
          
      } )
      .catch( error => console.error( "Error: "+error+" " ) )
     
}

