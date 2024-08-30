import React from 'react'
import { CiCreditCard1, CiWallet } from 'react-icons/ci'
import { FaCoins } from 'react-icons/fa'

const MoneyCard = ({type="total", value=0}) => {
  return (
      <div
          className={`
            ${type === "money" ? "bg-primary" : ""}
            ${type === "income" ? "bg-income" : ""}
            ${type === "expanse" ? "bg-expanse" : ""}
            flex items-center flex-col justify-center text-center py-6 px-3 gap-4
            `}
      >
      <span className='w-24 h-24 rounded-full bg-white/10 flex items-center justify-center ' >
        {type === "money" ?  <FaCoins size={32}/> :""}
        {type === "income" ? <CiWallet size={32}/> :""}
        {type === "expanse" ? <CiCreditCard1 size={32}/> :""}
      </span>
      <div className="flex flex-col">
        <span className='font-bold text-4xl ' > {value} </span>
        <span className=' ' > Total {type} </span>
      </div>
    </div>
  )
}

export default MoneyCard
