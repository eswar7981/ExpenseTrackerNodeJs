import {createSlice} from '@reduxjs/toolkit'
const initialAuthState={
    login:'customer'
};

const authSlice=createSlice({
    name:'authentication',
    initialState:initialAuthState,
    reducers:{
        setLogin(state){
           if(state.login=='admin'){
            state.login='customer'
           }
           else{
            if(state.login=='customer'){
                state.login='admin'
               }
           }
           

           console.log(state.login)
        },
   
      

    }
})

export const authActions=authSlice.actions
export default authSlice.reducer;

















