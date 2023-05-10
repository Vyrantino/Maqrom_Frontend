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
        url: 'http://localhost:3000/admin?route=Nosotros',
        params: {
          route: "Nosotros"

        }
        
    })
        .then( res =>
            
            console.log( res.data ) )
        .catch( err => console.error( err ) ) ;
   
}


 export const getAllCards = async (  setCards  , param ) =>{
 await axios.get( apiURL+"cards/"+param ) 
      .then( ( response ) => {
          const allCards = response.data ; 
          setCards( allCards ) ;
          
      } )
      .catch( error => console.error( "Error: "+error+" " ) )
     
  }

export const getCard = async ( setCard  , idCard ) =>{

 await axios.get( apiURL+"cards/id/"+idCard )
    .then( ( response ) =>{
      const card = response.data ; 
      setCard( card ) ;
      console.log(  card  ) ; 
    })
    
}

export const getIdCard = async ( idCard ) =>{

 await axios.get( apiURL+"cards/id/"+idCard )
    .then( ( response ) =>{
      const card = response.data.idCard ; 
      
      console.log(  card  ) ; 
    })

}

export const deleteCard = async ( idCard ) =>{


      if( confirm("Esta seguro que quiere borrar esto?") ){
      
       await axios.delete( apiURL+"cards/id/"+idCard )

      }
      else{
        console.log( "no se borro el componente" ) ;
      }

  
}


export const patchCard = async ( idCard , titulo, contenido, imagen ) => {

    await axios.patch( apiURL+"cards/id/"+idCard , 
      { 
        title:titulo,
        content: contenido,
        img: imagen
      })
      
};

export const newCard = async ( card , route ) =>{
  await axios.post( apiURL+"cards" , {
    route: route ,
    title: card.title,
    content: card.content,
    img: card.img,
    isLocked: card.isLocked

  })

}


export const uploadPhoto = async ( selectedFile , alt = 'alt'  ) =>{
    console.log( selectedFile ) ;
    const fd = new FormData() ; 
    
    
    fd.append( 'image', selectedFile.fileRaw, selectedFile.fileName  ) ; 
    
    const result = await axios.post( apiURL, fd )
      .then( ( response ) => console.log( response ) )

     
    

}
