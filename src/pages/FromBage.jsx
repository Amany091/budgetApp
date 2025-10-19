import { useEffect, useRef, useState } from 'react'
import FormPortal from '../components/formPortal'
import { useBudget } from '../budgetContext'

const FromBage = ({setShow, show, status, transaction}) => {
    const categories = ['salary', 'freelance', 'food', 'entertainment', 'investment', 'travel', 'other']
    const [data, setData] = useState({ title: "", amount: "", type: "", category: "", date: "" });
    const {addBudget, updateBudget} = useBudget()
    const formRef = useRef()
    const transactionDate = transaction?.date ? new Date(transaction?.date) : null;
    const formatedDate = transactionDate?.toISOString().split('T')[0] || '';

    const handleSubmit = (e) => {
        e.preventDefault()
        if (status === "add") {
            addBudget(data)
            formRef.current.reset()
        }
        if (status === "edit") { 
            e.preventDefault()
            let newData = { ...data };
            updateBudget(transaction._id, newData)
        }
        formRef.current.reset()
        setShow(false)
    }

    useEffect(() => {
        if (status === 'edit') {
            formRef.current.title.value = transaction?.title
            formRef.current.amount.value = transaction?.amount
            formRef.current.type.value = transaction?.type
            formRef.current.category.value = transaction?.category
            formRef.current.date.value = formatedDate
            setData({
                title: transaction?.title,
                amount: transaction?.amount,
                type: transaction?.type,
                category: transaction?.category,
                date: formatedDate
            })
        }
        if(status === 'add') formRef.current.reset()
    }, [status, formRef.current, transaction])

    return (
        <FormPortal>
            <div className='rounded-full  bg-income float-right w-10 h-10 flex items-center justify-center text-lg cursor-pointer' onClick={() => setShow(false)} >X</div>
            <h2 className='text-center' >Add Budget</h2>
            <form className='flex flex-col gap-2' ref={formRef} onSubmit={handleSubmit}>
                <div id="budgetTitle" className='flex flex-col gap-2'>
                    <label htmlFor="title">title</label>
                    <input type="text" name='title' id='title' placeholder='title...' className='  focus:otline-income  p-1 text-sm' onChange={(e) => setData({ ...data, title: e.target.value })} />
                </div>
                <div id="budgetAmount" className='flex flex-col ga1'>
                    <label htmlFor="amount">amount</label>
                    <input type="number" name='amount' id='amount' placeholder='amount...' className=' p-1 text-sm' onChange={(e) => setData({ ...data, amount: e.target.value })} />
                </div>
                <div className='flex justify-between my-2 gap-x-1' >
                    <div id="type" className='flex flex-col gap-2 flex-1'>
                        <label htmlFor="type">type</label>
                        <select name="type" id="type" className='p-1' onChange={(e) => setData({ ...data, type: e.target.value })} >
                            <option value="">choose</option>
                            <option id='income' value="income">income</option>
                            <option id='expense' value="expense">expense</option>
                        </select>
                    </div>
                    <div id="category" className='flex flex-col gap-2 flex-1'>
                        <label htmlFor="category">category</label>
                        <select name="category" id="category" className='p-1' onClick={(e) => setData({ ...data, category: e.target.value })} >
                            <option value="">choose</option>
                            {categories.map(category => (
                                <option key={category} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div id="date" className='flex flex-col gap-2'>
                    <label htmlFor="date">date</label>
                    <input type="date" name='date' id='date' placeholder='date...' className=' p-1 text-sm' onChange={(e) => setData({ ...data, date: e.target.value })} />
                </div>
                <button className='p-2 bg-income mx-auto rounded-sm w-52' type='submit' >submit</button>
            </form>
        </FormPortal>
    )
}

export default FromBage
