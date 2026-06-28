import Header from './components/Header'
import Sidebar from './components/Sidebar'
import Home from './pages/Home'

function App() {
  return (
    <div className="flex min-h-screen bg-zinc-900 text-white">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1 p-6 md:p-8">
          <Home />
        </main>
      </div>
    </div>
  )
}

export default App