import React from 'react'
import './currency.css'


export default function Currency({currencylist, selectedcurrency, changecurrency,amount, changeamount}){
    return(
        <div className="mainpoints">
            <input className="inputarea" type='number' value={amount} onChange = {changeamount}></input>
            <select className = "selectarea" value ={selectedcurrency} onChange = {changecurrency}>
                    {currencylist.map(currencyitem => (
                        <option key = {currencyitem} value={currencyitem}>{currencyitem}</option>
                    ))}
                    
            </select>
        </div>
    )
}
