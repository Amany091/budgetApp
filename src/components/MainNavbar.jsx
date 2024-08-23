import React from 'react'
import { BiPlus } from 'react-icons/bi'
import { useBudgetContext } from '../context/BudgetContext'

const MainNavbar = () => {
    const { setShowModal, showModal,setStatus } = useBudgetContext()
    return (
        <div className="container mx-auto">
            <nav className="flex p-2">
                <div className="navbar_brand">
                    <p> Budget App </p>
                </div>
                <div className="add_budget ms-auto">
                    <button
                        onClick={() => {
                            setShowModal(!showModal)
                            setStatus('add')
                        }}
                        className='p-1 bg-violet-600' >
                        <BiPlus size={20} />
                    </button>
                </div>
            </nav>
            </div>
    )
}

export default MainNavbar
