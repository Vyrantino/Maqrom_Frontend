import { createSlice } from "@reduxjs/toolkit";

export const saveToken = createSlice( {
    name: 'adminMode',
    initialState: {
        
        value: true
    },
    reducers: {
        adminMode: ( state  ) =>{
            
                state.value = true 
        }

    }
    

} ) ;

export const { adminMode } = saveToken.actions ;
export default saveToken.reducer ; 