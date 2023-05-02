import axios from "axios";





// export const me = async () => {
//     return isStoredJwt()
//       ? (await get(createUrl("/api/me")).catch(() => null))?.data
//       : null;
//   };

  export const login = async (username, password) => {

    const result = (
      await axios.post( "http://localhost:3000/auth/login" , { username, password }).catch(
        () => null
      )
    )?.data;
  
    if (!result) {
      return alert("Could not login");
    }

    return result;
  };


export async function getAdmin(){
    axios({
        method: 'get',
        url: 'http://localhost:3000/admin'
        
    })
        .then( res =>
            
            console.log( res.data ) )
        .catch( err => console.error( err ) ) ;
   
}


 export const getAllCards = ( { getCards } ) =>{
  axios.get( "http://localhost:3000/cards" ) 
      .then( ( response ) => {
          const allCards = response.data ; 
          getCards( allCards ) ;
          
      } )
      .catch( error => console.error( "Error: "+error+" " ) )
     
}

export const getWithParam = ( { getCards } , param ) =>{
  axios.get( "http://localhost:3000/cards" , { params: { route: param } }) 
      .then( ( response ) => {
           const allCards = response.data ; 
           getCards( allCards ) ;
           console.log( response ) ; 
          
      } )
      .catch( error => console.error( "Error: "+error+" " ) )
     
}

