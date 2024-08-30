import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaEdit } from 'react-icons/fa'
import { BiSolidTrash } from 'react-icons/bi'
import { deleteTransaction, setEditBud } from '../../redux/features/transactionsApiSlice'
import { setStatus , setShowPortal} from '../../redux/features/portalSlice'

const SingleTransactions = ({ transaction }) => {
    const { categories } = useSelector(store => store.transactions)
    const dispatch = useDispatch()
    return (
        <div className='flex gap-2'>
            <span className={`rounded-full w-14 h-14 flex items-center justify-center text-xl ${transaction.type === "income" ? "bg-income" : "bg-expanse"} `} >$</span>
            <div className='flex flex-col flex-1' >
                <p>{transaction.title}</p>
                <div className='flex gap-2 ' >
                    <span>{transaction.amount}</span>
                    <span>{transaction.date}</span>
                    <span>{categories.find((category) => category.id === transaction.category).name}</span>
                </div>
            </div>
            <div className='flex items-center gap-2 ' >
                <button className='rounded-full bg-income p-2' onClick={() => {
                    dispatch(setShowPortal(true))
                    dispatch(setStatus("edit"))
                    dispatch(setEditBud(transaction))
                }} >
                    <FaEdit/>
                </button>
                <button className='rounded-full bg-expanse p-2' onClick={()=> dispatch(deleteTransaction(transaction.id))} >
                    <BiSolidTrash/>
                </button>
                
            </div>
        </div>
    )
}

export default SingleTransactions
