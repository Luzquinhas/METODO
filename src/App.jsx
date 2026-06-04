import { useState } from 'react'
import './App.css'
import {
  MdHome,
  MdLink,
  MdNoteAlt,
  MdCheckBox,
  MdAttachFile,
  MdCalendarToday,
  MdSquare,
  MdLibraryBooks,
  MdLocalOffer,
  MdShare,
  MdApps,
  MdMoreHoriz,
} from 'react-icons/md'

const notes = []

const navItems = [
  { icon: MdHome, label: 'Início' },
  { icon: MdLink, label: 'Atalhos' },
  { icon: MdNoteAlt, label: 'Notas' },
  { icon: MdCheckBox, label: 'Tarefas' },
  { icon: MdAttachFile, label: 'Arquivos' },
  { icon: MdCalendarToday, label: 'Calendário' },
  { icon: MdSquare, label: 'Modelos' },
  { icon: MdLibraryBooks, label: 'Cadernos' },
  { icon: MdLocalOffer, label: 'Etiquetas' },
  { icon: MdShare, label: 'Compartilhado comigo' },
  { icon: MdApps, label: 'Spaces' },
]

const shortcuts = [
  'Cursos',
  'Hobbies',
  'Novas senhas dos sites',
  'Motivação / Assistir',
  'Prioridades de amanhã',
  'Hoje',
  'Musiquinha',
  'Minha nova vida',
]

const pageDetails = {
  Início: 'Painel pessoal',
  Atalhos: 'Acesso rápido',
  Notas: 'Suas anotações',
  Tarefas: 'Organização',
  Arquivos: 'Biblioteca',
  Calendário: 'Agenda',
  Modelos: 'Templates',
  Cadernos: 'Coleções',
  Etiquetas: 'Organização',
  'Compartilhado comigo': 'Colaboração',
}

const emptyPages = {
  Arquivos: {
    icon: '▱',
    title: 'Nenhum arquivo adicionado',
    description: 'Os arquivos anexados às suas notas aparecerão aqui.',
  },
  Modelos: {
    icon: '⌘',
    title: 'Nenhum modelo salvo',
    description: 'Crie modelos quando quiser repetir uma estrutura de anotação.',
  },
  Cadernos: {
    icon: '▭',
    title: 'Nenhum caderno criado',
    description: 'Agrupe suas notas em cadernos quando começar a organizar o conteúdo.',
  },
  Etiquetas: {
    icon: '◇',
    title: 'Nenhuma etiqueta criada',
    description: 'As etiquetas ajudam a encontrar anotações por tema.',
  },
  'Compartilhado comigo': {
    icon: '⌯',
    title: 'Nada compartilhado ainda',
    description: 'Notas compartilhadas com você ficarão reunidas nesta página.',
  },
}

function Sidebar({ activePage, onPageChange }) {
  return (
    <aside className="sidebar">
      <label className="search-field">
        <MdLink size={18} style={{ opacity: 0.6 }} />
        <input type="search" placeholder="Pesquisa" />
      </label>

      <div className="quick-actions">
        <button className="new-note" type="button">
          <span aria-hidden="true">＋</span>
          Nota
        </button>
        <button className="round-action" type="button" aria-label="Sincronizar">
          ↻
        </button>
        <button className="round-action" type="button" aria-label="Nova tarefa">
          <MdCheckBox size={16} />
        </button>
        <button className="round-action" type="button" aria-label="Mais ações">
          <MdMoreHoriz size={16} />
        </button>
      </div>

      <nav className="nav-list" aria-label="Navegação principal">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              className={activePage === item.label ? 'active' : ''}
              key={item.label}
              onClick={() => onPageChange(item.label)}
              type="button"
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <button className="more-link" type="button">
        <MdMoreHoriz size={20} />
        <span>Mais</span>
      </button>

      <div className="profile">
        <div className="avatar">J</div>
        <strong>José Ricardo</strong>
        <span className="notification">1</span>
      </div>
    </aside>
  )
}

function Header({ activePage }) {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">{pageDetails[activePage]}</p>
        <h1>{activePage}</h1>
      </div>
      <button className="round-action edit-panel" type="button" aria-label="Editar painel">
        ✎
      </button>
    </header>
  )
}

function NoteCard({ note }) {
  return (
    <article className="note-card">
      <div className="note-type">{note.tag}</div>
      <h3>{note.title}</h3>
      <p>{note.description}</p>
      <div className="note-swatch" style={{ background: note.color }}>
        ✎
      </div>
      <div className="note-footer">
        <span>{note.date}</span>
        {note.pinned && <span aria-label="Nota fixada">★</span>}
      </div>
    </article>
  )
}

function CalendarCard() {
  return (
    <div className="calendar-card">
      <header>
        <strong>quinta-feira, 4 de junho de 2026</strong>
        <div>
          <button type="button">Hoje</button>
          <MdMoreHoriz size={16} style={{ opacity: 0.5 }} />
          <MdMoreHoriz size={16} style={{ opacity: 0.5 }} />
        </div>
      </header>
      <p>Nenhum evento para hoje</p>
    </div>
  )
}

function ShortcutsPanel() {
  return (
    <section className="panel shortcuts-panel">
      <div className="section-title">
        <h2>Atalhos</h2>
        <MdMoreHoriz size={18} style={{ opacity: 0.6 }} />
      </div>
      <div className="shortcut-grid">
        {shortcuts.map((shortcut) => (
          <button type="button" key={shortcut}>
            <MdNoteAlt size={16} />
            <span>{shortcut}</span>
          </button>
        ))}
      </div>
    </section>
  )
}

function TasksPanel() {
  return (
    <section className="panel tasks-panel">
      <div className="section-title">
        <h2>Minhas tarefas</h2>
      </div>
      <div className="empty-task">
        <div className="task-illustration">✓</div>
        <p>Adicione tarefas em qualquer nota e priorize-as com prazos e sinalizadores.</p>
        <button type="button">Adicionar nova tarefa</button>
      </div>
    </section>
  )
}

function DashboardPage() {
  const pinnedNote = notes.find((note) => note.pinned)

  return (
    <>
      <section className="dashboard-grid" aria-label="Painel inicial">
        <section className="panel notes-panel">
        <div className="section-title">
            <h2>Notas</h2>
            <MdMoreHoriz size={16} style={{ opacity: 0.6 }} />
          </div>
          {notes.length > 0 && (
            <div className="notes-row">
              {notes.map((note) => (
                <NoteCard note={note} key={note.title} />
              ))}
            </div>
          )}
        </section>

        <section className="panel pinned-note">
          <div className="section-title">
            <h2>Nota fixada</h2>
          </div>
          {pinnedNote && (
            <article className="large-note">
              <h3>{pinnedNote.title}</h3>
              <p>{pinnedNote.description}</p>
              <small>{pinnedNote.date}</small>
            </article>
          )}
        </section>

        <section className="panel calendar-panel">
          <div className="section-title">
            <h2>Calendário</h2>
          </div>
          <CalendarCard />
        </section>

        <ShortcutsPanel />
        <TasksPanel />

        <section className="panel scratch-panel">
          <div className="section-title">
            <h2>Bloco de anotações</h2>
          </div>
          <textarea placeholder="Comece a escrever..." aria-label="Bloco de anotações" />
        </section>
      </section>

      <section className="recent">
        <div className="section-title">
          <h2>Capturados recentemente</h2>
          <button type="button">
            Recortes da web
            <MdMoreHoriz size={14} style={{ marginLeft: '4px', opacity: 0.6 }} />
          </button>
        </div>
        <div className="recent-empty">▣</div>
      </section>
    </>
  )
}

function NotesPage() {
  if (notes.length === 0) return null

  return (
    <section className="page-grid">
      {notes.map((note) => (
        <NoteCard note={note} key={note.title} />
      ))}
    </section>
  )
}

function EmptyPage({ icon, title, description }) {
  return (
    <section className="page-surface">
      <div className="page-empty">
        <span aria-hidden="true">{icon}</span>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </section>
  )
}

function PageContent({ activePage }) {
  if (activePage === 'Início') return <DashboardPage />
  if (activePage === 'Notas') return <NotesPage />
  if (activePage === 'Atalhos') {
    return (
      <section className="page-grid compact">
        {shortcuts.map((shortcut) => (
          <button className="page-tile" type="button" key={shortcut}>
            <MdNoteAlt size={18} />
            <span>{shortcut}</span>
          </button>
        ))}
      </section>
    )
  }
  if (activePage === 'Tarefas') return <TasksPanel />
  if (activePage === 'Calendário') return <CalendarCard />

  return <EmptyPage {...emptyPages[activePage]} />
}

function App() {
  const [activePage, setActivePage] = useState('Início')

  return (
    <div className="app-shell">
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <main className="workspace" id="main">
        <Header activePage={activePage} />
        <PageContent activePage={activePage} />
      </main>
    </div>
  )
}

export default App
