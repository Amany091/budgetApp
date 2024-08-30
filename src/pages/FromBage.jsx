import React, { useEffect, useRef, useState } from 'react'
import FormPortal from '../components/formPortal'
import { useDispatch, useSelector } from 'react-redux'
import { setShowPortal } from '../redux/features/portalSlice'
import { addTransaction, editTransaction } from '../redux/features/transactionsApiSlice'
const FromBage = () => {
    const { transactions, categories, editBud } = useSelector(store => store.transactions)
    const { show, status } = useSelector(store => store.portal)
    const [data, setData] = useState({ title: "", amount: "", type: "", category: "", date: "" });
    let id = String(Math.floor(Math.random() * (1000 - 20 + 1)) + 20);
    const dispatch = useDispatch()
    const formRef = useRef()
    const handleSubmit = (e) => {
        if (status === "add") {
            e.preventDefault()
            let newData = { ...data, id: id };
            dispatch(addTransaction(newData))
            formRef.current.reset()
        }
        if (status === "edit") { 
            e.preventDefault()
            let newData = { ...data, id: editBud.id };
            dispatch(editTransaction(newData, editBud.id))
            formRef.current.reset()
        }
    }
    useEffect(() => {
        if (status === 'edit') {
            formRef.current.title.value = editBud.title
            formRef.current.amount.value = editBud.amount
            formRef.current.type.value = editBud.type
            formRef.current.category.value = editBud.category
            formRef.current.date.value = editBud.date
            setData({
                title: editBud.title,
                amount: editBud.amount,
                type: editBud.type,
                category: editBud.category,
                date: editBud.date
            })
        }
        if(status === 'add') formRef.current.reset()
    }, [status, transactions, editBud, formRef.current])

    return (
        <FormPortal>
            <div className='rounded-full  bg-income float-right w-10 h-10 flex items-center justify-center text-lg cursor-pointer' onClick={() => dispatch(setShowPortal(!show))} >X</div>
            <h2 className='text-center' >Add Budget</h2>
            <form className='flex flex-col gap-2' onSubmit={handleSubmit} ref={formRef} >
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
                            <option id='expanse' value="expanse">expanse</option>
                        </select>
                    </div>
                    <div id="category" className='flex flex-col gap-2 flex-1'>
                        <label htmlFor="category">category</label>
                        <select name="category" id="category" className='p-1' onClick={(e) => setData({ ...data, category: e.target.value })} >
                            <option value="">choose</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <div id="date" className='flex flex-col gap-2'>
                    <label htmlFor="date">date</label>
                    <input type="date" name='date' id='date' placeholder='date...' className=' p-1 text-sm' onChange={(e) => setData({ ...data, date: e.target.value })} />
                </div>
                <button className='p-2 bg-income mx-auto rounded-sm w-52' type='submit' >{status === 'add' ? 'add' : "edit"}</button>
            </form>
        </FormPortal>
    )
}

export default FromBage
