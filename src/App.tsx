import { ChangeEvent, useState } from 'react'
import Logo from './assets/Logo.png'
import { CardNote } from './components/cardNote'
import { NewNote } from './components/newNote'

// Typagem dos props recebidos
interface Nota {
  id: number,
  date: Date,
  text: string
}

function App() {
  const [search, setSearch] = useState('')
  const [notas, setNotas] = useState<Nota[]>(() => {
    // Se localstorage existir, ele sera retornado, se não, retorna um array vazio
    if (localStorage.notes) {
      return JSON.parse(localStorage.notes)
    } else {
      return []
    }
  })

  // Salva nova nota no useState e no localstorage
  function newNota(content: string) {
    setNotas([{ id: notas.length + 1, date: new Date(), text: content }, ...notas])

    localStorage.setItem('notes', JSON.stringify(notas))
  }

  // Muda text de pesquisa
  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    let query = e.target.value
    setSearch(query)
  }

  // Deleta nota do useState e do localstorage
  function handleDeleteNote(id: number){
    let newArray = notas.filter(note => note.id != id)
    setNotas(newArray)

    localStorage.setItem('notes', JSON.stringify(newArray))
  }

  return (
    <div className='mx-auto max-w-6xl my-12 px-5'>
      <img src={Logo} alt="logo rocketseat" />

      <input onChange={handleSearch} className='w-full text-2xl bg-transparent font-bold border-b-2 border-slate-600 py-4 focus:outline-none' type="text" placeholder='Busque em suas notas...' />

      <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <NewNote newNota={newNota} />

        {/* Se uma pesquisa estiver sendo feita, sera filtrado pela pesquisa, se não sera mostrado todas as notas salvas */}
        {notas && search ?
          notas.filter(nota => nota.text.toLocaleLowerCase().includes(search.toLocaleLowerCase())).map((value, key) => {
            return <CardNote key={key} note={{
              id: value.id,
              date: value.date,
              text: value.text
            }} 
            deleteNote={handleDeleteNote}/>
          })
          : notas.map((value, key) => {
            return <CardNote key={key} note={{
              id: value.id,
              date: value.date,
              text: value.text
            }} 
            deleteNote={handleDeleteNote}/>
          })}

      </div>
    </div>
  )
}

export default App
