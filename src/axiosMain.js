import axios from "axios";

const apiURL = "http://localhost:3000/" ; 

  export const login = async (username, password) => {

    const result = (
      await axios.post( ""+apiURL+""+"auth/login" , { username, password }).catch(
        () => null
      )
    )?.data;
  
    if (!result) {
      return alert("Could not login");
    }
    return result;
  };



  export const getCards = async (  setCards , route   ) =>{
    await axios.get( apiURL+"cards/route/"+route  ) 
         .then( ( response ) => {
             const allCards = response.data ; 
             setCards( allCards ) ;
         } )
         .catch( error => console.error( "Error: "+error+" " ) ) ;
  }
  

export const getCard = async ( setCard  , idCard ) =>{

 await axios.get( apiURL+"cards/id/"+idCard )
    .then( ( response ) =>{
      const card = response.data ; 
      setCard( card ) ;
    })
    
}

export const getIdCard = async ( idCard ) =>{

 await axios.get( apiURL+"cards/id/"+idCard )
    .then( ( response ) =>{
      const card = response.data.idCard ; 
    })

}

export const deleteCard = async ( idCard , setCards , param ) =>{
      if( confirm("Esta seguro que quiere borrar esto?") ){
      
       await axios.delete( apiURL+"cards/id/"+idCard )
        .then( getCards( setCards , param ) ) ;
       
      }
      else{
        console.log( "no se borro el componente" ) ;
      }
}


export const patchCard = async ( idCard , titulo, contenido, imagen ) => {
    const patchUrl = `${apiURL}cards/patch/${idCard}`
    console.log( patchUrl );
    await axios.patch( patchUrl , 
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
    isLocked: card.isLocked ,
    article: card.article 
  })

}


export const uploadPhoto = async ( selectedFile , alt  ) =>{
    const fd = new FormData() ; 
    fd.append( 'image', selectedFile.fileRaw, selectedFile.fileName  ) ; 
    fd.append( 'alt' , alt )
    const result = await axios.post( apiURL, fd )
      .then( ( response ) => console.log( response ) )

}

export const getAllImages = async ( setImages ) =>{
  await axios.get( apiURL+'images' )
    .then( ( response ) => {
      const allImages = response.data ; 
      setImages( allImages ) ;
  } )
  .catch( error => console.error( "Error: "+error+" " ) )
}



export const getImageList = async (  ) =>{
  try{
    const result = await axios.get( apiURL+'images' ) ;
    return result.data ;
  }
  catch{
    console.error( error ) ;
  }
}

export const deleteImage = async ( image  ) =>{
  if( confirm("Esta seguro que quiere borrar esto?") ){
  
    await axios.delete( apiURL+'images/name/'+image ) ; 
  
  }
  else{
    console.log( "no se borro el componente" ) ;
  }
}


export const patchCarousel = async ( idCarouselItem , titulo, contenido , img ) => {
  await axios.patch( apiURL+"carouselItems/id/"+idCarouselItem , 
    { 
      title: titulo,
      content: contenido,
      img: img
    })
};



export const getAllCarouselItems = async (  setCarouselItems  , route ) =>{
  await axios.get( apiURL+"carouselItems/route/"+route ) 
       .then( ( response ) => {
           const allItems = response.data ; 
           setCarouselItems( allItems ) ;
       } )
       .catch( error => console.error( "Error: "+error+" " ) ) ;
      
}

export const getCarouselItem = async ( setCarouselItem  , idCarouselItem ) =>{

  await axios.get( apiURL+"carouselItems/id/"+idCarouselItem )
     .then( ( response ) =>{
       const carouselItem = response.data ; 
       setCarouselItem( carouselItem ) ;
      
     })
     
 }

export const deleteCarouselItem = async ( idCarouselItem  ) =>{
  if( confirm("Esta seguro que quiere borrar esto?") ){
  
    await axios.delete( apiURL+"carouselItems/id/"+idCarouselItem ); 

  }
  else{
    console.log( "no se borro el componente" ) ;
  }
}

export const getCarouselItems = async ( route ) =>{
  const getUrl = apiURL+'carouselItems/route/'+route ;
  try{
    const result = await axios.get( getUrl ) ;
    return result.data ; 
  }
  catch{
    console.error( error ) ; 
  }
}



export const createNewCarouselItem = async ( carouselItem , route ) =>{

  await axios.post( apiURL+"carouselItems" , {
    route ,
    title: carouselItem.title,
    content: carouselItem.content,
    img: carouselItem.img,
    article: carouselItem.article
  })
    .then( ( response ) => console.log( response.status ) )
}



/* Peticiones Article  */
export const getArticles = async (  setArticles   ) =>{
  await axios.get( apiURL+"articles" ) 
       .then( ( response ) => {
           const allArticles = response.data ; 
           setArticles( allArticles ) ;
       } )
       .catch( error => console.error( "Error: "+error+" " ) ) ;
}

export const patchArticle = async ( article, articleName ) => {
  
  await axios.patch( apiURL+"articles/patch/"+article , 
    { 
      articleName: articleName
    })
};

export const deleteArticle = async ( articleName  ) =>{
  if( confirm("Esta seguro que quiere borrar el Articulo?") ){
  
    if( confirm("Esta REALMENTE SEGURO que quiere borrar el Articulo?") ){
  
      await axios.delete( apiURL+"articles/"+articleName ); 
  
    }
    else{
      console.log( "no se borro el componente" ) ;
    }

  }
  else{
    console.log( "no se borro el componente" ) ;
  }
}

export const createArticle = async ( articleName ) =>{

  await axios.post( apiURL+"articles" , {
    articleName: articleName 
  })
    .then( ( response ) => console.log( response.status ) )
}

export const createNewArticleCarouselItem = async ( carouselItem , article ) =>{

  await axios.post( apiURL+"carouselItems" , {
    route: carouselItem.route,
    title: carouselItem.title,
    content: carouselItem.content,
    img: carouselItem.img,
    article: article
  })
    .then( ( response ) => console.log( response.status ) )
}

export const getArticleCarouselItems = async ( setArticleCarouselItems , article ) =>{
  const getUrl = apiURL+'carouselItems/article/'+article ;
  await axios.get( getUrl )
    .then( ( response ) =>{
        const allArticleCarouselItems = response.data ;
        setArticleCarouselItems( allArticleCarouselItems ) ;
    } ) ; 
}

export const newArticleCard = async ( card , article ) =>{
  await axios.post( apiURL+"cards" , {
    route: card.route ,
    title: card.title,
    content: card.content,
    img: card.img,
    isLocked: card.isLocked ,
    article: article 
  })

}

export const getArticleCards = async (  setArticleCards , article   ) =>{
  await axios.get( apiURL+"cards/article/"+article  ) 
       .then( ( response ) => {
           const allCards = response.data ; 
           setArticleCards( allCards ) ;
       } )
       .catch( error => console.error( "Error: "+error+" " ) ) ;
}

