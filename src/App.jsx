import { useState } from 'react'
import Header from './components/Header'
import Player from './components/Player'
import Sidebar from './components/Sidebar'
import { songs } from './data/songs'
import Home from './pages/Home'

function App() {
  const [selectedSong, setSelectedSong] = useState(songs[0])
  const [busqueda, setBusqueda] = useState('')
  return (
    <div className="flex min-h-screen bg-zinc-900 pb-24 text-white">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header
          busqueda={busqueda}
          onCambiarBusqueda={setBusqueda}
        />

        <main className="flex-1 p-6 md:p-8">
          <Home
            busqueda={busqueda}
            onSelectSong={setSelectedSong}
          />
        </main>
      </div>

      <Player song={selectedSong} />
    </div>
  )
}

export default App