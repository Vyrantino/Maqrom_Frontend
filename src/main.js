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
    //setStoredJwt(result.accessToken);
    return result.token;
  };

//get request
export async function getCards(){
    axios({
        method: 'get',
        url: 'http://localhost:3000/cards'
        
    })
        .then( res =>
            
            console.log( res.data ) )
        .catch( err => console.error( err ) ) ;
   
}

export async function getAdmin(){
    axios({
        method: 'get',
        url: 'http://localhost:3000/admin'
        
    })
        .then( res =>
            
            console.log( res.data ) )
        .catch( err => console.error( err ) ) ;
   
}

