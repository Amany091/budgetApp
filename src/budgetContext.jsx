/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import {  get, post, del, put } from "./api/clientApi";
import toast from "react-hot-toast";

const BudgetContext = createContext();
export const BudgetProvider = ({ children }) => {
  const [budget, setBudgets] = useState([]);
  const [count, setCount] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ GET all budgets
  const getBudgets = async (params) => {
    try {
      setLoading(true);
      const res = await get(`${import.meta.env.VITE_HOST_URL}/api/v1/budget/budget`, {params});
      setBudgets(res.data?.data);
      setCount({ total: res?.data?.total, income: res?.data?.income, expense: res?.data?.expense });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD a new budget
  const addBudget = async (body) => {
    try {
      const res = await post(`${import.meta.env.VITE_HOST_URL}/api/v1/budget/add`, {body});
      toast.success("Budget added successfully");
      setBudgets((prev) => [...prev, res.data.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ UPDATE a budget
  const updateBudget = async (id, updatedData) => {
    try {
      const res = await put(`${import.meta.env.VITE_HOST_URL}/api/v1/budget/update/${id}`, {body: updatedData});
      setBudgets((prev) =>
        prev.map((item) => (item._id === id ? res.data.data : item))
      );
      toast.success("Budget updated successfully");
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ DELETE a budget
  const deleteBudget = async (id) => {
    try {
      await del(`${import.meta.env.VITE_HOST_URL}/api/v1/budget/delete/${id}`);
      toast.success("Budget deleted successfully");
      setBudgets((prev) => prev?.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Load data on mount
  useEffect(() => {
    getBudgets();
  }, []);

  return (
    <BudgetContext.Provider
      value={{
        budget,
        count,
        setCount,
        loading,
        error,
        getBudgets,
        addBudget,
        updateBudget,
        deleteBudget,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};

// 🔁 Custom hook for easy access
export const useBudget = () => useContext(BudgetContext);
