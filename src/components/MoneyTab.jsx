import React from 'react'

const MoneyTab = ({activeTab, setActiveTab}) => {
  return (
    <div className='flex gap-1 my-3' >
          <div className={`
          bg-slate-900 text-center cursor-pointer p-3 flex-1
                ${activeTab === "money" ? "scale-105 transition-all shadow-xl shadow-black/50":"shadow-sm opacity-70"}
            `}
              onClick={()=> setActiveTab("money")}
          >
              {""}
              data{""}
          </div>
          <div
              className={`
              bg-slate-900 text-center cursor-pointer p-3 flex-1
                ${activeTab === "income" ? "scale-105 transition-all shadow-xl shadow-black/50":"shadow-sm opacity-70"}
                `}
              onClick={()=> setActiveTab("income")}
          >
              {""}
              income{""}
          </div>
          <div
              className={`
              bg-slate-900 text-center cursor-pointer p-3 flex-1
                ${activeTab === "expanse" ? "scale-105 transition-all shadow-xl shadow-black/50":"shadow-sm opacity-70"}
                `}
              onClick={()=> setActiveTab("expanse")}
          >
              {""}
              expanse{""}
          </div>
    </div>
  )
}

export default MoneyTab
