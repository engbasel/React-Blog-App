import './App.css'
import HomeView from './views/home_view'
import { BrowserRouter as Router } from 'react-router-dom'
function App() {

  return (
    <>
    <Router>
<HomeView/>
    </Router>
    </>
  )
}

export default App
