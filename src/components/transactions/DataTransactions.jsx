import { useState } from 'react'
import SingleTransactions from './SingleTransactions'
import { useBudget } from '../../budgetContext'

const DataTransactions = () => {
    const [filter, setFilter] = useState({})
    const categories = ['salary', 'freelance', 'food', 'entertainment', 'investment', 'travel', 'other']
    const {budget, getBudgets, loading} = useBudget()

    const handleSubmit = (e)=>{
        e.preventDefault()
        getBudgets(filter)
    }

    return (
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between md:flex-row gap-2 flex-col">
          <h2>Recent Transactions</h2>
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-1">
              <select
                name="sort"
                id="sort"
                onChange={(e) => {
                  setFilter((prev) => ({ ...prev, sortby: e.target.value }));
                }}
              >
                <option disabled selected value="">Sortby</option>
                <option value="amount">amount</option>
                <option value="date">date</option>
              </select>
              <select
                name="category"
                id="category"
                multiple={false}
                onChange={(e) =>
                  setFilter((prev) => ({ ...prev, category: e.target.value }))
                }
              >
                <option value="" selected disabled> Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <button type="submit">Filter</button>
              <button
                type="button"
                className=" px-3 ml-5"
                onClick={() => getBudgets()}
              >
                All
              </button>
            </div>
          </form>
        </div>
        <div className='my-5'>
          { loading ? <div className='text-center font-bold'>Loading data...</div> : budget?.length > 0 ? (
            budget?.map((transaction) => (
              <SingleTransactions
                key={transaction._id}
                transaction={transaction}
              />
            ))
          ) : (
            <p className="text-center">No transactions found.</p>
          )}
        </div>
      </div>
    );
}

export default DataTransactions
