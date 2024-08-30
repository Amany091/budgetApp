import { clientApi } from "../clientApi";

const getTransactions = async() => {
    const response = await clientApi.get("/transactions")
    return response?.data
}

const getCategories =async () => {
    const response = await clientApi.get("/categories")
    return response?.data
}

export const getAllTransactions = async () => {
    const dataTransactionsPromise = getTransactions()
    const dataCategoriesPromise = getCategories()
    const [transactions, categories] = await Promise.all([dataTransactionsPromise, dataCategoriesPromise])
    return { transactions, categories }
}
