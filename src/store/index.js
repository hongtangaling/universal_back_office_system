import { configureStore } from "@reduxjs/toolkit";
import TapReducer from "./reducer/tap.js";

  
export default configureStore({
    reducer:{
        tab: TapReducer
    }
})