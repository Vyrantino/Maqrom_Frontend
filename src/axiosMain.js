import axios from "axios";

const apiURL = "http://localhost:3000/" ; 
/* Login  */
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

  export const register = async ( email, username , password ) => {
    await axios.post( apiURL+'auth/register', 
    {
      email: email, 
      username: username, 
      password: password

    } ) 
      .then( ( register ) => console.log( register ) ) 
  }

/* Cards */
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


export const patchCard = async ( idCard , titulo, contenido, imagen , article ) => {
    const patchUrl = `${apiURL}cards/patch/${idCard}`
    console.log( patchUrl );
    const givenArticle = article ? article : 'pagina' ;  
    await axios.patch( patchUrl , 
      { 
        title:titulo,
        content: contenido,
        img: imagen , 
        article: givenArticle
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

/* Photos */
export const uploadPhoto = async ( selectedFile , alt , gallery ) =>{
    const fd = new FormData() ; 
    fd.append( 'image', selectedFile.fileRaw, selectedFile.fileName  ) ; 
    fd.append( 'alt' , alt  ) ;
    fd.append( 'gallery' , gallery  ) ;
    await axios.post( apiURL, fd )
      .then( ( response ) => console.log( response ) )

}

export const getAllImages = async ( setImages , gallery ) =>{
  const getUrl = gallery ? 
    `${apiURL}images/gallery/${gallery}` : `${apiURL}images/` ;
  await axios.get( getUrl )
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


/*Carousels */

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
           setCarouselItems( response.data ) ;
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

export const getCarouselItems = async ( setCarouselItems , route ) =>{
  const getUrl = apiURL+'carouselItems/route/'+route ;
    await axios.get( getUrl )
      .then( ( response ) => setCarouselItems( response.data ) ) ;
 
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



/* Articles  */

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
  const encodedArticleName = encodeURIComponent(articleName);
  if( confirm("Esta seguro que quiere borrar el Articulo?") ){
  
    if( confirm("Esta REALMENTE SEGURO que quiere borrar el Articulo?") ){
      
      await axios.delete( apiURL+"articles/"+encodedArticleName )
        .then( ( response ) => console.log( response ) ) ;  
  
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

/*Galleries */

export const getGalleries = async (  setGalleries   ) =>{
  await axios.get( apiURL+"galleries" ) 
       .then( ( response ) => {
           const allGalleries = response.data ; 
           setGalleries( allGalleries ) ;
       } )
       .catch( error => console.error( "Error: "+error+" " ) ) ;
}

export const patchGallery = async ( gallery, galleryName ) => {
  
  await axios.patch( apiURL+"galleries/patch/"+gallery , 
    { 
      galleryName: galleryName
    })
};

export const deleteGallery = async ( galleryName  ) =>{
  const encodedGalleryName = encodeURIComponent( galleryName );
  if( confirm("Esta seguro que quiere borrar la galería?") ){
  
    if( confirm("Esta REALMENTE SEGURO que quiere borrar el galería?") ){
  
      await axios.delete( apiURL+"galleries/"+encodedGalleryName ); 
  
    }
    else{
      console.log( "no se borro la galería" ) ;
    }

  }
  else{
      console.log( "no se borro la galería" ) ;
  }
}

export const createGallery = async ( galleryName ) =>{

  await axios.post( apiURL+"galleries" , {
    galleryName: galleryName 
  })
    .then( ( response ) => console.log( response.status ) )
}

/* Papers */

export const createNewPaper = async ( paper , route , article ) =>{

  const Article = article ? article : 'pagina' ; 
  const Route = route ? route : 'articulo' ;

  await axios.post( apiURL+"papers" , {
    title: paper.title,
    content: paper.content,
    img: paper.img,
    article: Article,
    link: paper.link,
    route: Route,
  })
    .then( ( response ) => console.log( response.status ) ) ; 
}

export const getPapers = async ( setPapers , route , article ) =>{
  const encodedParam = article === '' ? encodeURI( route ) : encodeURI( article )   ;
  const urlExtension = article === '' ? `route/${encodedParam}` : `article/${encodedParam}`   ; 
  const getUrl = apiURL+'papers/'+urlExtension ;
  await axios.get( getUrl )
    .then( ( response ) =>{
        const papers = response.data ;
        setPapers( papers ) ;
    } ) ; 
}


export const getPaper = async( setPaper , idPaper ) =>{
  const getUrl = apiURL+`papers/${idPaper}` ; 
  await axios.get( getUrl )
    .then( ( response ) => setPaper( response.data )  );

}

export const patchPaper = async ( paper ) => {

  const patchUrl = `${apiURL}papers/patch/${paper.idPaper}`
  const givenArticle = paper.article ? paper.article : 'pagina' ;  
  await axios.patch( patchUrl , 
    { 
       title: paper.title ,
       content: paper.content, 
       img: paper.img , 
       article: givenArticle , 
       link: paper.link , 
       route: paper.route
    })
};

export const deletePaper = async ( idPaper ) =>{
  if( confirm("Esta seguro que quiere borrar esto?") ){
  
   await axios.delete( apiURL+"papers/id/"+idPaper )
     
  }
  else{
    console.log( "no se borro el componente" ) ;
  }
}