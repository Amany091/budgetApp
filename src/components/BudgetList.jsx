import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown, FaDollarSign } from 'react-icons/fa'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { CiEdit } from 'react-icons/ci'
import { useBudgetContext } from '../context/BudgetContext'
import FormPortal from './formPortal'
import { useDispatch } from 'react-redux'
// import { addBudgetFunction } from '../redux/features/AddBudgetSlice'
import { addBudgetTransctions } from '../redux/features/AddBudgetSlice'
import { deleteBudgetTransctions } from '../redux/features/deleteBudgetSlice'
import { editBudgetTransctions } from '../redux/features/EditBudgetSlice'
import { IoIosCloseCircleOutline } from 'react-icons/io'
const BudgetList = () => {
    const { filterBudget, budget, categories, showModal, setShowModal, setBudget, setStatus, status } = useBudgetContext()

    let data = filterBudget.length === 0 ? budget : filterBudget
    var budgetId = useRef()

    const dispatch = useDispatch()
    const formRef = useRef()

    const [budgetDetails, setBudgetDetails] = useState({
        title: '',
        amount: '',
        category: '',
        type: '',
        date: '',
        id: String(Math.floor(Math.random() * 1000 ))
    })
    const [editBudget, setEditBudget] = useState(null)
console.log(budgetDetails)
    const handleSubmit = (e) => {
        e.preventDefault()
        if (status === 'add') {
            dispatch(addBudgetTransctions(budgetDetails))
            setBudget([...budget, budgetDetails])
            formRef.current.reset()
        } else if (status === 'edit') {
            const updatedBudget = {
                id: budgetId.current,
                title: budgetDetails.title,
                amount: budgetDetails.amount,
                category:budgetDetails.category,
                type: budgetDetails.type,
                date: budgetDetails.date
            }
            dispatch(editBudgetTransctions(budgetId.current,updatedBudget))
            setBudget(budget.map(item => item.id === updatedBudget.id ? updatedBudget : item))
        }
        setShowModal(false)
    }
    const handleDelete = (id) => {
        setBudget(budget.filter(item => item.id !== id))
        dispatch(deleteBudgetTransctions(id))
    }


    const handleEdit = (id) => {
        setStatus('edit')
        setShowModal(true)
        budgetId.current = id
    }
    useEffect(() => {
        const budgetData = budget.find(item => item.id === budgetId.current)
        if (showModal && status === 'edit') {
            formRef.current.title.value = budgetData.title
            formRef.current.amount.value = budgetData.amount
            formRef.current.category.value = budgetData.category
            formRef.current.type.value = budgetData.type
            formRef.current.date.value = budgetData.date
        } 
    }, [budgetId.current, status])
    console.log(status)
    return (
        <>
            <section id='budget_categories ' className='my-5' >
                <div className="filter flex justify-between p-2 ">
                    <p>recent transactions</p>
                    <div className='flex gap-1'>
                        <div className="filter_budget bg-slate-700 p-1 ">
                            sort by
                            <FaAngleDown className='inline ms-1' />
                        </div>
                        <div className="budget_categories bg-slate-700 p-1 border border-violet-600 ">
                            categories
                            <FaAngleDown className='inline ms-1' />

                        </div>
                        <div className="all_budget bg-slate-700 p-1 ">
                            all
                            <FaAngleDown className='inline ms-1' />
                        </div>
                    </div>
                </div>
                <div className="budget_list">
                    {data.map((item) => (
                        <div className="budget_item flex justify-between align-baseline  p-2 my-2 bg-slate-700" key={item.id}>
                            <div className='flex align-baseline'>
                                <div className={`dollar_icon p-3 rounded-full me-2 ${item.type === 'expanse' ? 'bg-red-500' : 'bg-slate-300/25 '} `}>
                                    <FaDollarSign />
                                </div>
                                <div className="budget_info">
                                    <h5 className='font-bold'> {item.title} </h5>
                                    <p className='text-xs' >
                                        {item.amount} , {item.date} ,
                                        {categories.filter(category => parseInt(category.id) === parseInt(item.category)).map(({ name }) => name)[0]}
                                    </p>
                                </div>
                            </div>
                            <div className='control_item flex gap-1' >
                                <CiEdit
                                    onClick={() => handleEdit(item.id)}
                                    className='p-1 rounded-full bg-violet-700 cursor-pointer ' size={20} />
                                <RiDeleteBin6Line
                                    onClick={() => handleDelete(item.id)}
                                    className='p-1 bg-red-500 rounded-full cursor-pointer' size={20} />
                            </div>
                        </div>
                    ))}
                </div>
            </section>
            {showModal &&
                <FormPortal>
                    <div
                        onClick={() => setShowModal(false)}
                        className="close_modal block absolute right-0 top-0  ">
                        <IoIosCloseCircleOutline size={30} />
                    </div>
                    <h5 className='text-center font-bold' >Add new Budget</h5>
                    <form onSubmit={handleSubmit} ref={formRef} >
                        <div id="budgetTitle " className='flex flex-col '>
                            <label htmlFor="title" className='text-sm my-1' >Title</label>
                            <input

                                type="text" id="title" value={budgetDetails.title} name="title" className='text-xs p-1 outline-none ' placeholder="title..."
                                onChange={(e) => setBudgetDetails({ ...budgetDetails, title: e.target.value })}
                            />
                        </div>
                        <div id="budgetAmount " className='flex flex-col my-3'>
                            <label htmlFor="amount" className='text-sm my-1' >Amount</label>
                            <input

                                type="number" id="amount" value={budgetDetails.amount} name="amount" className='text-xs p-1 outline-none ' placeholder="amount..."
                                onChange={(e) => setBudgetDetails({ ...budgetDetails, amount: e.target.value })}
                            />
                        </div>

                        <div className="flex justify-between items-baseline gap-x-5">
                            <div id="budgetType " className='flex flex-col w-full '>
                                <label htmlFor="type" className='text-sm my-1' >Type</label>
                                <select

                                    id="type" name="type" value={budgetDetails.type} className='text-xs p-1 outline-none '
                                    onChange={(e) => setBudgetDetails({ ...budgetDetails, type: e.target.value })}
                                >
                                    {[...new Set(budget.map(({ type }) => type))].map(item => (
                                        <option key={item} value={item}>{item}</option>
                                    ))}
                                </select>
                            </div>
                            <div id="budgetCategory " className='flex flex-col my-3 w-full'>
                                <label htmlFor="category" className='text-sm my-1' >category</label>
                                <select

                                    name="category" id="category" value={budgetDetails.category} className='text-xs p-1 outline-none '
                                    onChange={(e) => setBudgetDetails({ ...budgetDetails, category: e.target.value })}
                                >
                                    <option value="select category">select category</option>
                                    {categories.map(({ id }) => id).map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div id="budgetDate " className='flex flex-col mt-2 '>
                            <label htmlFor="date" className='text-sm my-1' >Date</label>
                            <input

                                type="date" name="date" id="date" value={budgetDetails.date} placeholder="date..." className='text-xs p-1 outline-none '
                                onChange={(e) => setBudgetDetails({ ...budgetDetails, date: e.target.value })}
                            />
                        </div>
                        <button className='bg-green-600 w-full my-5 p-1' type='submit' >{ status === 'add' ? 'add' : 'edit'}</button>
                    </form>

                </FormPortal>
            }

        </>

    )
}

export default BudgetList
