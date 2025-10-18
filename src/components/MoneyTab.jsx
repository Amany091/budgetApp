import React, { useEffect, useState } from 'react'
import { useBudget } from '../budgetContext'

const MoneyTab = () => {
    const [activeTab, setActiveTab] = useState("")
    const {getBudgets} = useBudget()

    useEffect(()=>{
      let filter = activeTab === "money" ? {} : {type: activeTab}
      getBudgets(filter)
    },[activeTab])

  return (
    <div className='flex gap-1 my-3' >
          <div className={`bg-slate-900 text-center cursor-pointer p-3 flex-1 ${activeTab === "money" ? "transition-all shadow-black/50":" opacity-70"} `}
              onClick={()=> setActiveTab("money")}
          >
              data
          </div>
          <div
              className={`
              bg-slate-900 text-center cursor-pointer p-3 flex-1
                ${activeTab === "income" ? "transition-all shadow-black/50":"opacity-70"}
                `}
              onClick={()=> setActiveTab("income")}
          >
              income
          </div>
          <div
              className={`
              bg-slate-900 text-center cursor-pointer p-3 flex-1
                ${activeTab === "expense" ? "transition-all shadow-black/50":"opacity-70"}
                `}
              onClick={()=> setActiveTab("expense")}
          >
              expense
          </div>
    </div>
  )
}

export default MoneyTab
