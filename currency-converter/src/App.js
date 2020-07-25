import React, {useState, useEffect} from 'react'
import './App.css'
import Currency from './currency'

function App() {

  const [currencylist, setCurrency] = useState([])
  const [fromcurrency, setFromCurrency] = useState('')
  const [tocurrency, setToCurrency] = useState('')
  const [exchangerate, setExchangeRate] =useState('')
  const [amount, setAmount] = useState(1)
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true)
  
  let toAmount, fromAmount
  if(amountInFromCurrency){
    fromAmount = amount
    toAmount = amount * exchangerate
  }else{
    toAmount= amount
    fromAmount = amount /exchangerate
  }


//This useEffect is done once at the beginning 
  useEffect(() => {
    getCurrency();
  },[])

//when from currency or tocurrency changes. this useEffect will run 
  useEffect(()=>{
    if(fromcurrency !=null && tocurrency !=null){
    updateCurrency();}
  },[fromcurrency, tocurrency]) 

  const updateCurrency = async() =>{
    const fetchItem = await fetch (`https://api.exchangeratesapi.io/latest?base=${fromcurrency}&symbols=${tocurrency}`)
    const data = await fetchItem.json()
    setExchangeRate(data.rates[tocurrency])

  }



  const getCurrency = async() => {
    const fetchItem = await fetch(`https://api.exchangeratesapi.io/latest`) 
    const data = await fetchItem.json()
    const firstcurrency = Object.keys(data.rates)[0]
    setCurrency([data.base, ...Object.keys(data.rates)]) //whole list of data in array 
    setFromCurrency(data.base) //setting the first "from" currency.
    setToCurrency(firstcurrency) //setting the first "to" currency
    setExchangeRate(data.rates[firstcurrency])
  }

  function handlefromAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(true)
  }

  function handletoAmountChange(e){
    setAmount(e.target.value)
    setAmountInFromCurrency(false)
  }


  return (
    <div className="App">
      <h1>CONVERT</h1>
      <Currency
      currencylist = {currencylist}
      selectedcurrency = {fromcurrency}
      changecurrency = {e=>setFromCurrency(e.target.value)} //function when currency changes
      amount = {fromAmount}
      changeamount = {handlefromAmountChange}
      />
      <h2>=</h2>
      <Currency 
      currencylist = {currencylist}
      selectedcurrency = {tocurrency} 
      changecurrency = {e=>setToCurrency(e.target.value)}
      amount={toAmount}
      changeamount = {handletoAmountChange}
      />
    </div>
  );
}

export default App;
