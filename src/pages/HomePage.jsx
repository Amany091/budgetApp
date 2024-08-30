import React, { useCallback, useEffect, useMemo, useState } from 'react'
import MoneyCard from '../components/MoneyCard'
import { fetchTransactions } from '../redux/features/transactionsApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import MoneyTab from '../components/MoneyTab'
import DataTransactions from '../components/transactions/DataTransactions'
import FromBage from './FromBage'
const HomePage = () => {
    const { transactions } = useSelector((store) => store.transactions)
    const {show} = useSelector((store)=> store.portal)
    const dispatch = useDispatch()
    const [activeTab, setActiveTab] = useState("")
    let transactionsCopy =[...transactions]

    const getTransactions = useCallback(() => {
        dispatch(fetchTransactions())
    })

    useEffect(() => {
        getTransactions()
    }, [])

    const wallet = useMemo(() => {
        const s = {
            money: 0,
            income: 0,
            expanse: 0
        }
        if (transactionsCopy?.length) {
            [...transactionsCopy].forEach((transaction) => { 
                if(transaction.type === "income") s.income += Number(transaction.amount)
                if(transaction.type === "expanse") s.expanse += Number(transaction.amount)
                s.money = s.income - s.expanse    
                
            })
        }
        return s
    }, [transactionsCopy])

    return (
        <section >
            <div className="container -translate-y-[5rem] ">
                <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 ' >
                    <MoneyCard type="money" value={wallet.money} />
                    <MoneyCard type="income" value={wallet.income} />
                    <MoneyCard type="expanse" value={wallet.expanse} />
                </div>
                <MoneyTab activeTab={activeTab} setActiveTab={setActiveTab} />
                <DataTransactions/>
            </div>
            {show && <FromBage />}
        </section>
    )
}

export default HomePage
