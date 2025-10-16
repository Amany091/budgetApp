import HomePage from './pages/HomePage'
import './App.css'
import MainHeader from './components/MainHeader/MainHeader'
import { BudgetProvider } from './budgetContext'

function App() {
  return (
    <div className="App">
      <BudgetProvider>
        <MainHeader />
        <main>
          <HomePage />
        </main>
      </BudgetProvider>
    </div>
  )
}

export default App
