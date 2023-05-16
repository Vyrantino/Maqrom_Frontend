import { createSlice } from "@reduxjs/toolkit";



export const editForm = createSlice(
    {
    name: 'editForm' , 
    initialState: {
        idCard: 0,
        img: '' ,
        idCarousel : 0 , 

    },
    reducers: {
        loadIdCard: ( state , action ) => {
            state.idCard = action.payload ;

        },
        loadImg: ( state , action ) =>{
            state.img = action.payload ; 

        },
        loadIdCarousel: ( state, action ) =>{
            state.idCarousel = action.payload ; 

        }

    },

}); 

export const { loadIdCard, deleteCard , loadImg , loadIdCarousel } = editForm.actions ;

export default editForm.reducer ; 