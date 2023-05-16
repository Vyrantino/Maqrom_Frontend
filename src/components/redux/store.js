import { configureStore } from '@reduxjs/toolkit' ; 
import { counterSlice } from './counterSlice' ;
import { saveToken } from './adminToken';
import { editForm } from './editForm';


const store  = configureStore( {
    reducer: { 
        counter: counterSlice.reducer,
        adminMode: saveToken.reducer , 
        editForm: editForm.reducer, 
     } , 
    
} )

export default store ; 