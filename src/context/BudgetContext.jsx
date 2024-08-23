import axios from "axios";
import { createContext, useCallback, useContext, useEffect, useState } from "react";


export const BudgetContext = createContext()
export const BudgetContextProvider = ({children}) => {
    const [budget, setBudget] = useState([])
    const [income, setIncome] = useState([])
    const [expanses, setExpanses] = useState([])
    const [categories, setCategories] = useState([])
    const [filterBudget, setFilterBudget] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [status,setStatus] = useState('')

    const getBudget = useCallback(async () => {
        try {
            const transactions = await axios.get("http://localhost:5000/transactions")
            const categories = await axios.get('http://localhost:5000/categories')
            setBudget(transactions.data)
            setCategories(categories.data)
            setIncome(transactions.data.filter((budg => budg.type === 'income')));
            setExpanses(transactions.data.filter((budg => budg.type === 'expanse')))
            
        } catch (error) {
            console.log(error)
        }
    }, [budget])
    
    useEffect(() => {
        getBudget()
        setFilterBudget(budget)
    },[])

    return (
        <BudgetContext.Provider value={{budget,setBudget, income , expanses,filterBudget, setFilterBudget, categories, showModal, setShowModal, status,setStatus}} >
            {children}
        </BudgetContext.Provider>
    )
}

export const useBudgetContext = () => {
    return useContext(BudgetContext)
}