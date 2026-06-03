export default function NotesPage() {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white text-zinc-900">
      
      {/* Coluna 1: Sidebar (Pastas) */}
      <aside className="w-64 border-r border-zinc-200 bg-zinc-50 p-4">
        <h2 className="font-semibold mb-4">Pastas</h2>
        <div className="space-y-2">
          <div className="p-2 bg-zinc-200 rounded cursor-pointer">Todas as Notas</div>
          <div className="p-2 hover:bg-zinc-200 rounded cursor-pointer">Pessoal</div>
          <div className="p-2 hover:bg-zinc-200 rounded cursor-pointer">Trabalho</div>
        </div>
      </aside>

      {/* Coluna 2: Lista de Notas */}
      <div className="w-80 border-r border-zinc-200 flex flex-col">
        <div className="p-4 border-b border-zinc-200">
          <input className="w-full bg-zinc-100 p-2 rounded" placeholder="Buscar..." />
        </div>
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 border-b border-zinc-100 hover:bg-zinc-50 cursor-pointer">
            <h3 className="font-medium">Primeira Nota</h3>
            <p className="text-sm text-zinc-500">Conteúdo da nota...</p>
          </div>
        </div>
      </div>

      {/* Coluna 3: Editor (Área principal) */}
      <main className="flex-1 overflow-y-auto p-10">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">Título da Nota</h1>
          <div className="text-zinc-600">
            O editor vai entrar aqui...
          </div>
        </div>
      </main>
      
    </div>
  );
}