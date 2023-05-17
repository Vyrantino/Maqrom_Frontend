import { createSlice } from "@reduxjs/toolkit";

export const editForm = createSlice(
    {
    name: 'editForm' , 
    initialState: {
        idCard: 0,
        img: '' ,
        loadedArticle : '' , 

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

        }

    },

}); 

export const { loadIdCard , loadImg , loadArticle } = editForm.actions ;

export default editForm.reducer ; 