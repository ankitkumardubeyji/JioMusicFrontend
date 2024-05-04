
import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios"

import toast from "react-hot-toast";

const isLoggedInString = localStorage.getItem("isLoggedIn");
const isLoggedIn = isLoggedInString ? isLoggedInString === 'true' : false;

let data;
try {
    const dataString = localStorage.getItem("data");
    data = dataString ? JSON.parse(dataString) : {};
} catch (error) {
    console.error("Error parsing data from localStorage:", error);
    data = {};
}

const initialState = {
    isLoggedIn: isLoggedIn,
    data: data,
};





export const createAccount = createAsyncThunk("auth/signup",async(data)=>{
    try{
        let result =""
        const res = axios.post("/api/v1/users/register",data)
        toast.promise(res,{
            loading:"wait! creating your account...",
            success:(data)=>{
                console.log(data)
                result = data?.data?.data.user 
                return data?.data?.message
            },
            error:"failed to create the account"
        })
        await res ;
        return result;
    }
    catch(err){
       toast.error(err?.response?.data?.message)
    }
})


export const validateUserAccount = createAsyncThunk("auth/login",async(data)=>{
    let result ={}
    console.log("came here for the login");
    const res = axios.post("/api/v1/users/login",data)
    toast.promise(res,{
        loading:"wait logging you in!",
        success:(data)=>{
            console.log(data)
            result = data?.data?.data?.user; // data?.data is the api-response coming from the backend , data?.data?.data is the data sent in the apiresponse sent from the backend .
            return data?.data?.message 
        }
    })

    await res;
    return result;
})




export const logout = createAsyncThunk("auth/logout", async () => {  // asyncThunk because this method is handling some of the async data.

    try {
      let res = axios.post("/api/v1/users/logout");
  
      await toast.promise(res, {
        loading: "Loading...",
        success: (data) => {
          console.log(data?.data)
          return data?.data?.message;
        },
        error: "Failed to log out",
      });
  
      // getting response resolved here
      res = await res;
      return res.data;
    } catch (error) {
      toast.error(error.message);
    }
  });

  
        


const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

    },

    extraReducers:(builder) =>{
        builder

        .addCase(createAccount.fulfilled,(state,action)=>{
            console.log(action.payload)
            localStorage.setItem("data",JSON.stringify(action?.payload))
            localStorage.setItem("isLoggedIn",true)
            state.isLoggedIn = true
            state.data = action?.payload 
        })

        .addCase(validateUserAccount.fulfilled,(state,action)=>{
            console.log(action.payload)
            localStorage.setItem("isLoggedIn",true)
            localStorage.setItem("data",JSON.stringify(action.payload))
            state.isLoggedIn = true
            state.data = action?.payload
        })

        .addCase(logout.fulfilled,(state,action)=>{
            console.log(action.payload);
            localStorage.setItem("data",JSON.stringify({}));
            localStorage.setItem("isLoggedIn",false)
            state.isLoggedIn = false
            state.data = {}
        })
    }

    
})



export const {} = authSlice.actions
export default authSlice.reducer;

