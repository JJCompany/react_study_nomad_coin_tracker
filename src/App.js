import {useEffect, useState} from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([])
  const [usd, setUsd] = useState(0);
  const [exchange, setExchange] = useState(0);
  const [selCoin, setSelCoin] = useState(0);

  const onUsdChange = (e) => {
    setUsd(e.target.value);
  }
  const onCoinChange = (e) => {
    //data-value값 가져오기(for test)
    console.log(e.target.options[e.target.options.selectedIndex].getAttribute("data-value"));

    //그냥 vlaue값 가져오기
    setSelCoin(e.target.value);
  }

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers?limit=10")
      .then(response => response.json())
      .then(json=>{
        setCoins(json)
        setLoading(false);
      });
  },[]);
  
  useEffect(() => {
    if(!loading){
      setExchange(usd/coins[selCoin].quotes.USD.price);
    }
  },[usd, selCoin]);

  return (
    <div>
      <h1>The Coins!{loading ? null : `(${coins.length})`}</h1>
      {loading ? (
        <strong>Loading...</strong>
      ) : (       
      <select id="select" onChange={onCoinChange}>
          {coins.map((coin,index) => <option key={coin.id} data-value={index} value={index}>{coin.name}:{coin.beta_value}/{coin.quotes.USD.price}</option>)}
      </select> 
      )}
      <input value={usd} onChange={onUsdChange}/>코인가치:<span>{exchange}</span>

    </div>
  );
}

export default App;
