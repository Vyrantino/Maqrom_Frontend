import { configureStore } from '@reduxjs/toolkit' ; 
import { counterSlice } from './counterSlice' ;
import { saveToken } from './adminToken';
import { editCardForm } from './editCardForm';


const store  = configureStore( {
    reducer: { 
        counter: counterSlice.reducer,
        adminMode: saveToken.reducer , 
        editCardForm: editCardForm.reducer, 
     } , 
    
} )

export default store ; 