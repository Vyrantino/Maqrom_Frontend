import { configureStore } from '@reduxjs/toolkit' ; 
import { counterSlice } from './counterSlice' ;
import { saveToken } from './adminToken';


const store  = configureStore( {
    reducer: { 
        counter: counterSlice.reducer,
        adminMode: saveToken.reducer , 
     } , 
    
} )

export default store ; 