import HomePage from './pages/HomePage'
import './App.css'
import MainHeader from './components/MainHeader/MainHeader'
import { BudgetProvider } from './budgetContext'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <div className="App">
        <Toaster position="top-center" />
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
