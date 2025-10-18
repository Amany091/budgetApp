import { useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { BiSolidTrash } from 'react-icons/bi'
import { useBudget } from '../../budgetContext'
import FromBage from '../../pages/FromBage'

const SingleTransactions = ({ transaction }) => {
    const [status, setStatus] = useState("add")
    const [show, setShow] = useState(false)
    const formatDate = (date)=>{
        const d = new Date(date)
        const formatedDate = d.toLocaleDateString("en-GB");
        return formatedDate;
    }
    const {deleteBudget} = useBudget()

    return (
        <div className='flex my-2'>
            <span className={`rounded-full w-14 h-14 flex items-center justify-center text-xl ${transaction.type === "income" ? "bg-income" : "bg-expanse"} `} >$</span>
            <div className='flex flex-col flex-1 ml-2' >
                <p>{transaction?.title}</p>
                <div className='flex gap-2 ' >
                    <span>{transaction?.amount}</span>
                    <span>{formatDate(transaction?.date)}</span>
                    <span>{transaction?.category}</span>
                </div>
            </div>
            <div className='flex items-center gap-2 ' >
                <button 
                    className='rounded-full bg-income p-2'
                    onClick={()=>{
                        setShow(true);
                        setStatus("edit")
                    }} >
                    <FaEdit/>
                </button>
                <button className='rounded-full bg-expanse p-2' onClick={()=> deleteBudget(transaction?._id)} >
                    <BiSolidTrash/>
                </button>               
            </div>
            {show && <FromBage setShow={setShow} show={show} status={status} transaction={transaction} />}
        </div>
    )
}

export default SingleTransactions
