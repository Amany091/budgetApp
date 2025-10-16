/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { clientApi } from "./api/clientApi";

const BudgetContext = createContext();
export const BudgetProvider = ({ children }) => {
  const [budget, setBudgets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ✅ GET all budgets
  const getBudgets = async () => {
    try {
      setLoading(true);
      const res = await clientApi.get(`${import.meta.env.VITE_API_URL}/api/v1/budget/budget`);
      console.log(res)
      setBudgets(res.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ ADD a new budget
  const addBudget = async (data) => {
    try {
      const res = await clientApi.post(`${import.meta.env.VITE_API_URL}/api/v1/budget/add`, data);
      setBudgets((prev) => [...prev, res.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ UPDATE a budget
  const updateBudget = async (id, updatedData) => {
    try {
      const res = await clientApi.put(`${import.meta.env.VITE_API_URL}/api/v1/budget/update/${id}`, updatedData);
      setBudgets((prev) =>
        prev.map((item) => (item._id === id ? res.data : item))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ DELETE a budget
  const deleteBudget = async (id) => {
    try {
      await clientApi.delete(`${import.meta.env.VITE_API_URL}/api/v1/budget/delete/${id}`);
      setBudgets((prev) => prev.filter((item) => item._id !== id));
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
