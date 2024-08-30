import React from 'react'
import { BiPlus } from 'react-icons/bi'
import { setShowPortal, setStatus } from '../redux/features/portalSlice'
import { useDispatch, useSelector } from 'react-redux'
const MainNavbar = () => {
    const dispatch = useDispatch()
    const {show} = useSelector((store) => store.portal)
    return (
        <div className="container mx-auto">
            <nav className="flex p-2">
                <div className="navbar_brand">
                    <p> Budget App </p>
                </div>
                <div className="add_budget ms-auto">
                    <button
                        onClick={() => {
                            dispatch(setShowPortal(!show))
                            dispatch(setStatus("add"))
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
