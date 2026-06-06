import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar         from './components/Navbar'
import Footer         from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ScrollToTop    from './components/ScrollToTop'
import Home           from './pages/Home'
import Piscinas       from './pages/Piscinas'
import Saunas         from './pages/Saunas'
import Turcos         from './pages/Turcos'
import Spas           from './pages/Spas'
import Complementos   from './pages/Complementos'
import Contactos      from './pages/Contactos'
import Privacidade    from './pages/Privacidade'
import Termos         from './pages/Termos'

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <WhatsAppButton />
      <Routes>
        <Route path="/"              element={<Home />} />
        <Route path="/piscinas"      element={<Piscinas />} />
        <Route path="/saunas"        element={<Saunas />} />
        <Route path="/turcos"        element={<Turcos />} />
        <Route path="/spas"          element={<Spas />} />
        <Route path="/complementos"  element={<Complementos />} />
        <Route path="/contactos"     element={<Contactos />} />
        <Route path="/privacidade"   element={<Privacidade />} />
        <Route path="/termos"        element={<Termos />} />
        <Route path="*"              element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}
