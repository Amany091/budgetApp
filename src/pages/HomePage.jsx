import  {useMemo } from 'react'
import MoneyCard from '../components/MoneyCard'
import DataTransactions from '../components/transactions/DataTransactions'
import { useBudget } from '../budgetContext'
import MoneyTab from '../components/MoneyTab'
const HomePage = () => {
    const {count} = useBudget()

    const wallet = useMemo(() => {
        const s = {
            money: count?.total < 0 ? 0 : count?.total || 0,
            income: count?.income  || 0,
            expense: count?.expense  || 0,
        }
        return s
    }, [count])

    return (
        <section >
            <div className="container -translate-y-[5rem] ">
                <div className='grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 ' >
                    <MoneyCard type="money" value={wallet.money} />
                    <MoneyCard type="income" value={wallet.income} />
                    <MoneyCard type="expense" value={wallet.expense} />
                </div>
                <MoneyTab/>
                <DataTransactions/>
            </div>
        </section>
    )
}

export default HomePage
