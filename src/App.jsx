import { useMemo, useState } from 'react'
import './App.css'
import {
  MdAdd,
  MdAttachFile,
  MdCheckBoxOutlineBlank,
  MdChevronRight,
  MdCode,
  MdDeleteOutline,
  MdFormatAlignLeft,
  MdFormatBold,
  MdFormatItalic,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatUnderlined,
  MdHorizontalRule,
  MdInsertDriveFile,
  MdKeyboardArrowDown,
  MdLink,
  MdLocalOffer,
  MdLockOutline,
  MdMoreHoriz,
  MdNotes,
  MdOpenInFull,
  MdOutlineChecklist,
  MdOutlineLightbulb,
  MdSearch,
  MdShare,
  MdSort,
  MdTableChart,
  MdTextFields,
} from 'react-icons/md'

const navSections = [
  { icon: MdChevronRight, label: 'Atalhos' },
  { icon: MdNotes, label: 'Todas as notas', active: true },
  { icon: MdInsertDriveFile, label: 'Cadernos' },
  { icon: MdShare, label: 'Compartilhado comigo' },
  { icon: MdLocalOffer, label: 'Etiquetas' },
  { icon: MdDeleteOutline, label: 'Lixeira' },
  { icon: MdOutlineLightbulb, label: 'Upgrade' },
]

const initialNotes = [
  {
    id: '1',
    title: 'Modo escuro do Evernote',
    description: 'O que esperar? O fundo da nota é preto em vez de cinza escuro.',
    date: 'há poucos minutos',
    body: [
      'O fundo das notas é preto em vez de cinza escuro.',
      'A lista de notas é um pouco mais clara.',
      'As cores, por exemplo o botão de nova nota, não são tão intensas.',
    ],
  },
  {
    id: '2',
    title: 'O poder da nota',
    description: 'Bem-vindo ao Evernote. Ele é ótimo para anotar ideias, acompanhar tarefas e mais.',
    date: '18 jan',
    body: ['Capture ideias rapidamente.', 'Organize tarefas e referências em um só lugar.'],
    hasMarker: true,
  },
  {
    id: '3',
    title: 'A maravilha dos anexos',
    description: 'Adicione anexos. Arraste documentos, PDFs, fotos, vídeos e áudios direto para a nota.',
    date: '18 jan',
    body: ['Arraste documentos, PDFs, fotos, vídeos e áudios diretamente para a nota.'],
  },
  {
    id: '4',
    title: 'A alegria do Web Clipping',
    description: 'Salve páginas da web diretamente no Evernote para guardar qualquer coisa da internet.',
    date: '18 jan',
    body: ['Salve páginas da web diretamente no caderno para consultar depois.'],
  },
]

function Sidebar({ search, onSearchChange, onNewNote }) {
  return (
    <aside className="sidebar">
      <div className="account-row">
        <div className="account-avatar">N</div>
        <span>Modo Night Eye dark...</span>
      </div>

      <label className="search-box">
        <input
          type="search"
          placeholder="Pesquisar em todas as notas..."
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <MdSearch size={16} />
      </label>

      <button className="new-note" type="button" onClick={onNewNote}>
        <span className="new-note-icon">
          <MdAdd size={19} />
        </span>
        <strong>Nova nota</strong>
      </button>

      <nav className="sidebar-nav" aria-label="Navegação principal">
        {navSections.map((item) => {
          const Icon = item.icon
          return (
            <button
              className={item.active ? 'nav-link active' : 'nav-link'}
              type="button"
              key={item.label}
            >
              <Icon size={15} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

function NotesPanel({ notes, selectedNoteId, onSelectNote }) {
  return (
    <section className="notes-panel">
      <div className="notes-titlebar">
        <h1>Todas as notas</h1>
        <button className="clipper-button" type="button">
          Web Clipper
        </button>
      </div>

      <div className="notes-count-row">
        <span>{notes.length} notas</span>
        <div>
          <MdSort size={16} />
          <MdLockOutline size={15} />
        </div>
      </div>

      <div className="note-list">
        {notes.map((note) => (
          <button
            className={note.id === selectedNoteId ? 'note-card selected' : 'note-card'}
            type="button"
            key={note.id}
            onClick={() => onSelectNote(note.id)}
          >
            <strong>{note.title}</strong>
            <p>{note.description}</p>
            <span>{note.date}</span>
            {note.hasMarker && <i aria-hidden="true" />}
          </button>
        ))}
      </div>
    </section>
  )
}

function ToolbarButton({ children, wide = false }) {
  return (
    <button className={wide ? 'toolbar-control wide' : 'toolbar-control'} type="button">
      {children}
    </button>
  )
}

function Editor({ note, onUpdateNote }) {
  const bodyText = note.body.join('\n')

  return (
    <section className="editor">
      <header className="document-header">
        <div className="document-left-tools">
          <MdOpenInFull size={13} />
          <span />
          <MdInsertDriveFile size={13} />
          <span>Meu caderno</span>
        </div>
        <div className="document-actions">
          <span>Somente você</span>
          <button type="button" onClick={() => onUpdateNote(note)}>
            Compartilhar
          </button>
          <button className="more-button" type="button">
            <MdMoreHoriz size={17} />
          </button>
        </div>
      </header>

      <div className="editor-toolbar">
        <ToolbarButton wide>
          Padrão
          <MdKeyboardArrowDown size={12} />
        </ToolbarButton>
        <ToolbarButton>
          14
          <MdKeyboardArrowDown size={12} />
        </ToolbarButton>
        <ToolbarButton>
          <MdTextFields size={13} />
          <MdKeyboardArrowDown size={12} />
        </ToolbarButton>
        <ToolbarButton>
          <MdFormatBold size={13} />
        </ToolbarButton>
        <ToolbarButton>
          <MdFormatItalic size={13} />
        </ToolbarButton>
        <ToolbarButton>
          <MdFormatUnderlined size={13} />
        </ToolbarButton>
        <ToolbarButton>
          <MdCode size={13} />
        </ToolbarButton>
        <ToolbarButton>
          <MdAttachFile size={13} />
        </ToolbarButton>
        <ToolbarButton>
          <MdCheckBoxOutlineBlank size={13} />
        </ToolbarButton>
        <ToolbarButton>
          <MdTableChart size={13} />
        </ToolbarButton>
        <ToolbarButton>
          <MdHorizontalRule size={13} />
        </ToolbarButton>
        <ToolbarButton>
          <MdFormatListBulleted size={13} />
        </ToolbarButton>
        <ToolbarButton>
          <MdFormatListNumbered size={13} />
        </ToolbarButton>
        <ToolbarButton>
          <MdOutlineChecklist size={13} />
        </ToolbarButton>
        <ToolbarButton>
          <MdFormatAlignLeft size={13} />
        </ToolbarButton>
        <ToolbarButton>
          <MdLink size={13} />
        </ToolbarButton>
      </div>

      <article className="note-editor">
        <input
          className="editor-title"
          value={note.title}
          onChange={(event) => onUpdateNote({ ...note, title: event.target.value })}
          aria-label="Título da nota"
        />

        <div className="body-label">O que esperar?</div>

        <textarea
          className="editor-body"
          value={bodyText}
          onChange={(event) => onUpdateNote({ ...note, body: event.target.value.split('\n') })}
          aria-label="Conteúdo da nota"
        />
      </article>

      <footer className="editor-footer">
        <MdLocalOffer size={17} />
        <span>Adicionar etiqueta</span>
      </footer>
    </section>
  )
}

function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState(initialNotes)
  const [selectedNoteId, setSelectedNoteId] = useState(initialNotes[0].id)

  const filteredNotes = useMemo(() => {
    const term = search.trim().toLowerCase()
    if (!term) return notes
    return notes.filter((note) => {
      const haystack = `${note.title} ${note.description} ${note.body.join(' ')}`.toLowerCase()
      return haystack.includes(term)
    })
  }, [notes, search])

  const selectedNote = notes.find((note) => note.id === selectedNoteId) || filteredNotes[0] || notes[0]

  const updateNote = (nextNote) => {
    setNotes((current) =>
      current.map((note) =>
        note.id === nextNote.id
          ? {
              ...nextNote,
              description: nextNote.body[0] || note.description,
            }
          : note,
      ),
    )
  }

  const createNote = () => {
    const note = {
      id: `${Date.now()}`,
      title: 'Nota sem título',
      description: 'Comece a escrever...',
      date: 'agora',
      body: [''],
    }
    setNotes((current) => [note, ...current])
    setSelectedNoteId(note.id)
  }

  return (
    <main className="evernote-shell">
      <Sidebar search={search} onSearchChange={setSearch} onNewNote={createNote} />
      <NotesPanel notes={filteredNotes} selectedNoteId={selectedNote?.id} onSelectNote={setSelectedNoteId} />
      <Editor note={selectedNote} onUpdateNote={updateNote} />
    </main>
  )
}

export default App
