import axios from 'axios'
import React, { useCallback, useEffect, useState } from 'react'
import { BiCreditCardFront, BiDollar, BiSolidCreditCard, BiSolidCreditCardFront } from 'react-icons/bi'
import { FaCoins } from 'react-icons/fa'
import { useBudgetContext } from '../context/BudgetContext'


const CurrentBudget = () => {
    const {budget, expanses, income} = useBudgetContext()
    
    return (
        <section id='my_budget' className='-translate-y-10 w-3/4 mx-auto '  >
            <div className=' grid md:grid-cols-3 grid-cols-1'  >
                <div id="total_budget" className=' bg-violet-600 flex justify-center flex-col gap-1 py-2 ' style={{ alignItems: 'center' }} >
                    <div className='rounded-xl bg-slate-300/50  p-2 w-8 ' >
                        <FaCoins />
                    </div>
                    <div className="total_money font-bold">
                        ${budget.map(({amount}) => amount).reduce((curr, acc)=> acc + curr, 0)}
                    </div>
                    <p className='text-slate-400 text-sm' >total money</p>
                </div>
                <div className=' bg-gray-500 flex justify-center flex-col gap-1 py-2 ' style={{ alignItems: 'center' }} id='total_income_budget' >
                    <div className='rounded-xl bg-slate-300/50  p-2 w-8 ' >
                        <BiCreditCardFront />
                    </div>
                    <div className="total_income font-bold">
                        ${income.map(({ amount }) => amount).reduce((curr, acc) => curr + acc, 0)}
                    </div>
                    <p className='text-slate-400 text-sm' >total income</p>
                </div>
                <div id="total_expanse_budget" className=' bg-rose-500 flex justify-center flex-col gap-1 py-2 ' style={{ alignItems: 'center' }}>
                    <div className='rounded-xl bg-slate-300/50  p-2 w-8 '>
                        <BiSolidCreditCard />
                    </div>
                    <div className="total_expanse font-bold">
                        ${expanses.map(({ amount }) => amount).reduce((curr, acc) => curr + acc, 0)}
                    </div>
                    <p className='text-slate-400 text-sm' >total expanse</p>
                </div>
            </div>
        </section>
    )
}

export default CurrentBudget
