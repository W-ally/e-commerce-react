import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setIsLoading } from "./isLoading.slice";
import getConfig from "../../utils/getConfig";


export const purchaseSlice = createSlice({
    name: 'purchases',
    initialState: [],
    reducers: {
        setPurchases:(state, action)=>{
         return action.payload;
        },

    },
})

export const { setPurchases } = purchaseSlice.actions;

export const getPurchase = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios
        .get("https://ecommerce-api-react.herokuapp.com/api/v1/purchases", getConfig())
        .then((res) => dispatch(res.data))
        .finally(() => dispatch(setIsLoading(false)));
}

export default purchaseSlice.reducer;
