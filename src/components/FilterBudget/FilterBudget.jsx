import React, { useState } from 'react'
import { useBudgetContext } from '../../context/BudgetContext'
import styles from './FilterBudget.module.css'
const FilterBudget = () => {
  const { budget, setFilterBudget } = useBudgetContext();

  const filter = (type) => {
    if (type !== 'all') {
      setFilterBudget(budget.filter(item => item.type === type))
    } else {
      setFilterBudget(budget)
    }
  }
  return (
      <section id='filter_budget-type' className='w-3/4 mx-auto' >
          <div className='flex justify-between gap-1 bg-slate-800 p-2 ' >
        <button
          className={`w-full p-1 bg-slate-700 btn_tab ${styles.btn_tab} `}
          onClick={() => filter('all')}
        >data</button>
        <button
          className={`w-full p-1 bg-slate-700 btn_tab ${styles.btn_tab} `}
          onClick={() => filter('income')}
        >income</button>
        <button
          className={`w-full p-1 bg-slate-700 btn_tab ${styles.btn_tab} `}
          onClick={() => filter('expanse')}
        >expanse</button>
          </div>
    </section>
  )
}

export default FilterBudget
