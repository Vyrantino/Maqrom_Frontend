import { createSlice } from "@reduxjs/toolkit";



export const editCardForm = createSlice(
    {
    name: 'editCardForm' , 
    initialState: {
        idCard: 0,
        img: '' 
    },
    reducers: {
        loadIdCard: ( state , action ) => {
            state.idCard = action.payload ;

        },
        loadImg: ( state , action ) =>{
            state.img = action.payload ; 

        }

        
        
    },

}); 

export const { loadIdCard, deleteCard , loadImg } = editCardForm.actions ;

export default editCardForm.reducer ; 