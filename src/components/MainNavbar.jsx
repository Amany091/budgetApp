import { useState } from 'react'
import { BiPlus } from 'react-icons/bi'
import FromBage from '../pages/FromBage'
const MainNavbar = () => {
    const [show, setShow] = useState(false);
    const [status, setStatus] = useState("add");
    return (
        <div className="container mx-auto">
            <nav className="flex p-2">
                <div className="navbar_brand">
                    <p> Budget App </p>
                </div>
                <div className="add_budget ms-auto">
                    <button
                        onClick={() => {
                            setShow(true);
                            setStatus("add");
                        }}
                        className='p-1 bg-violet-600' >
                        <BiPlus size={20} />
                    </button>
                </div>
            </nav>
            {show && <FromBage setShow={setShow} show={show} status={status}/> }
            </div>
    )
}

export default MainNavbar
