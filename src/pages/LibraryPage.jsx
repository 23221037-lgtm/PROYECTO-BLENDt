import { Library } from 'lucide-react'

function LibraryPage() {
  return (
    <section>
      <h2 className="text-3xl font-bold">Tu biblioteca</h2>

      <div className="mt-10 text-center text-gray-400">
        <Library size={48} className="mx-auto mb-4" />
        <p>Tu biblioteca todavía está vacía.</p>
      </div>
    </section>
  )
}

export default LibraryPage