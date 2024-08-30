import HomePage from './pages/HomePage'
import './App.css'
import MainHeader from './components/MainHeader/MainHeader'
import store from './redux/reduxStore'
import { Provider } from 'react-redux'
function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <MainHeader />
        <main>
          <HomePage />
        </main>
      </Provider>
    </div>
  )
}

export default App
