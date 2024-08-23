import './App.css'
import BudgetList from './components/BudgetList'
import CurrentBudget from './components/CurrentBudget'
import FilterBudget from './components/FilterBudget/FilterBudget'
import MainHeader from './components/MainHeader/MainHeader'
import { BudgetContextProvider } from './context/BudgetContext'
import store from './redux/reduxStore'
import { Provider } from 'react-redux'
function App() {

  return (
    <div className="App">
      <BudgetContextProvider>
        <Provider store={store}>
          <MainHeader />
          <CurrentBudget />
          <FilterBudget />
          <BudgetList />
        </Provider>
      </BudgetContextProvider>
    </div>
  )
}

export default App
