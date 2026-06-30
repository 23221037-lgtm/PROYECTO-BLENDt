import { useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import MobileNav from './components/MobileNav'
import Player from './components/Player'
import Sidebar from './components/Sidebar'
import { useMusic } from './context/MusicContext'
import Home from './pages/Home'
import LibraryPage from './pages/LibraryPage'
import SearchPage from './pages/SearchPage'

function App() {
  const { canciones } = useMusic()
  const [selectedSong, setSelectedSong] = useState(null)
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    if (!selectedSong && canciones.length > 0) {
       // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedSong(canciones[0])
    }
  }, [canciones, selectedSong])

  const cambiarBusqueda = (texto) => {
    setBusqueda(texto)
    navigate('/buscar')
  }

  return (
    <div className="flex min-h-screen bg-zinc-900 pb-[180px] text-white md:pb-24">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          busqueda={busqueda}
          onCambiarBusqueda={cambiarBusqueda}
        />

        <main className="flex-1 p-6 md:p-8">
          <Routes>
            <Route
              path="/"
              element={<Home onSelectSong={setSelectedSong} />}
            />
            <Route
              path="/buscar"
              element={
                <SearchPage
                  busqueda={busqueda}
                  onSelectSong={setSelectedSong}
                />
              }
            />
            <Route
              path="/biblioteca"
              element={<LibraryPage onSelectSong={setSelectedSong} />}
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>

      <MobileNav />
      {selectedSong && <Player song={selectedSong} onSelectSong={setSelectedSong} />}
    </div>
  )
}

export default App