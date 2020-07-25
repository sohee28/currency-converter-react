import React from 'react'


export default function Currency({currencylist, selectedcurrency, changecurrency,amount, changeamount}){
    return(
        <div>
            <input type='number' value={amount} onChange = {changeamount}></input>
            <select value ={selectedcurrency} onChange = {changecurrency}>
                    {currencylist.map(currencyitem => (
                        <option key = {currencyitem} value={currencyitem}>{currencyitem}</option>
                    ))}
                    
            </select>
        </div>
    )
}
