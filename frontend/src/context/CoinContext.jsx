import { createContext, useEffect, useState } from "react";


export const CoinContext=createContext();

const CoinContextProvider=(props)=>{
    const [allCoin,setAllCoin]=useState([])
    const [token,setToken]=useState("");
    const url="http://localhost:8002";
    const [currency,setCurrency]=useState({
        name:"usd",
        symbol:"$"
    })
    const[islogged ,setislogged]=useState(false);
    const fetchAllCoin=async()=>{
        const options = {
            method: 'GET',
            headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-sNqtGC9fLEiEG75o9vV25iEY'}
          };
          
          fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency.name}`, options)
            .then(response => response.json())
            .then(response => setAllCoin(response))
            .catch(err => console.error(err));
    }
    useEffect(()=>{
        fetchAllCoin();
    },[currency])

    const contextValue={
        allCoin,currency,setCurrency,islogged ,setislogged,url,token,setToken
    }
    return(
        <CoinContext.Provider value={contextValue} >
            {props.children}
        </CoinContext.Provider>
    )
}

export default CoinContextProvider;