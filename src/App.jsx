import { useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import Header from './components/Header'
import Player from './components/Player'
import Sidebar from './components/Sidebar'
import { songs } from './data/songs'
import Home from './pages/Home'
import LibraryPage from './pages/LibraryPage'
import SearchPage from './pages/SearchPage'
import MobileNav from './components/MobileNav'

function App() {
  const [selectedSong, setSelectedSong] = useState(songs[0])
  const [busqueda, setBusqueda] = useState('')
  const navigate = useNavigate()

  const cambiarBusqueda = (texto) => {
    setBusqueda(texto)
    navigate('/buscar')
  }

  return (
    <div className="flex min-h-screen bg-zinc-900 pb-40 text-white md:pb-24">
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
      <Player song={selectedSong} />
    </div>
  )
}

export default App