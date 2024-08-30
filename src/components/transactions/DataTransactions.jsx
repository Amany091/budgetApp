import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSortData, setCategoryFilter, setTypeFilter } from '../../redux/features/transactionsApiSlice'
import SingleTransactions from './SingleTransactions'

const DataTransactions = () => {
    const {  categories, transactions, filteredData } = useSelector((store) => store.transactions)
    const sortDataBy = [
        {
            key: 'date',
            label:"Date"
        },
        {
            key: "amount",
            label: "Amount"
        }
    ]
    const dispatch = useDispatch()
    
    return (
        <div className='flex flex-col gap-2' >
            <div className='flex items-center justify-between' >
                <h2>Recent Transactions</h2>
                <div className="flex items-center gap-1  ">
                    <select name="sort" id="sort" onClick={(e)=> dispatch(setSortData(e.target.value.toLowerCase()))} >
                        <option value="">Sortby</option>
                        {sortDataBy.map(data => (
                            <option key={data.key} value={data.key}>{data.label}</option>
                        ))}
                    </select>
                    <select name="categ" id="categ" onClick={(e) => dispatch(setCategoryFilter(e.target.value))} >
                        <option value="">Category</option>
                        {categories.map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                    <select name="type" id="type" onClick={(e) => dispatch(setTypeFilter(e.target.value.toLowerCase()))}>
                        <option value="all">All</option>
                        {[...new Set(transactions.map(({ type }) => type))].map(type => (
                            <option key={type} value={type}>{type}</option>
                       )) }
                    </select>
                </div>
            </div>
            {filteredData.map((transaction) => (
                <SingleTransactions key={transaction.id} transaction = {transaction} />
            ))}
        </div>
    )
}

export default DataTransactions
