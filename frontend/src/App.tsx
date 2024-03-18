import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Header } from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import ClientCreate from './pages/ClientCreate'
import ClientUpdate from './pages/ClientUpdate'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<ClientCreate />} />
        <Route path="/update/:id" element={<ClientUpdate />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={2500} theme="dark" />
      <Footer />
    </>
  )
}

export default App
