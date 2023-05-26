import { createSlice } from "@reduxjs/toolkit";

export const editForm = createSlice(
    {
    name: 'editForm' , 
    initialState: {
        idCard: 0,
        img: '' ,
        loadedArticle : '' ,
        loadedRoute : '' ,  

    },
    reducers: {
        loadIdCard: ( state , action ) => {
            state.idCard = action.payload ;

        },
        loadImg: ( state , action ) =>{
            state.img = action.payload ; 

        },
        loadArticle: ( state, action ) =>{
            state.loadedArticle = action.payload ; 

        },
        loadRoute: ( state , action ) => {
            state.loadedRoute = action.payload ;
        }

    },

}); 

export const { loadIdCard , loadImg , loadArticle , loadRoute } = editForm.actions ;

export default editForm.reducer ; 