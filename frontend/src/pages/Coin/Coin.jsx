import { useContext, useEffect, useState } from 'react';
import './coin.css'
import {useParams} from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext';
import LineChart from '../../components/LineChart/LineChart.jsx';
const Coin = () => {
  const {coinId} =useParams();
  const [coinData,setCoindata]=useState();
  const {currency} =useContext(CoinContext);
  const [historicalData,setHistoricalData]=useState();


  const fetchCoinData=async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-sNqtGC9fLEiEG75o9vV25iEY'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(response => response.json())
      .then(response => setCoindata(response))
      .catch(err => console.error(err));

  }
  const fetchHistoricalData=async()=>{
    const options = {
      method: 'GET',
      headers: {accept: 'application/json', 'x-cg-demo-api-key': 'CG-sNqtGC9fLEiEG75o9vV25iEY'}
    };
    
    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=10&interval=daily`, options)
      .then(response => response.json())
      .then(response => setHistoricalData(response))
      .catch(err => console.error(err));
  }

  useEffect(()=>{
    fetchCoinData();
    fetchHistoricalData();
  },[currency])

  // if(coinData){
  // return (
  //   <div className='coin'>
  //     <div className="coin-name">
  //       <img src={coinData.image} alt="" />
  //       <p>{coinData.name} {coinData.symbol.toUpperCase()}</p>
  //     </div>

  //   </div>
  // )}
  // else{
  //   <div className="spinner">
  //     <div className="spin">

  //     </div>
  //   </div>
  // }
  if (!coinData || !historicalData) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  return (
    <div className='coin'>
      <div className="coin-name">
        <img src={coinData.image?.large} alt={coinData.name} />
        <p>{coinData.name} {coinData.symbol?.toUpperCase()}</p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li>{coinData.market_cap_rank}</li>
        </ul>
        <ul>
          <li>Crypto Price</li>
          <li>{currency.symbol}{coinData.market_data.current_price[currency.name].toLocaleString()}</li>
        </ul>
        <ul>
        <li>Market Cap</li>
        <li>{currency.symbol}{coinData.market_data.market_cap[currency.name].toLocaleString()}</li>
   
        </ul>

        <ul>
        <li>24 hour high</li>
        <li>{currency.symbol}{coinData.market_data.high_24h[currency.
        name].toLocaleString()}</li>
        </ul>

        <ul>
        <li>24 hour low</li>
        <li>{currency.symbol}{coinData.market_data.low_24h[currency.
        name].toLocaleString()}</li>
        </ul>
      </div>
    </div>
  );
}

export default Coin
