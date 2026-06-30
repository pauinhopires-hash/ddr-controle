import { useState } from 'react';
import { MetodoTag } from '../components/MetodoTag';
import { ModalProduto } from '../components/ModalProduto';
import { SEED_PRODUCTS } from '../data/seed';
import type { Produto } from '../types';

interface CatalogoProps {
  products: Produto[];
  onSave: (p: Omit<Produto, 'id'> & { id?: string }) => void;
  onDelete: (id: string) => void;
  onRestoreSeed: () => void;
  onToast: (msg: string) => void;
}

export function Catalogo({ products, onSave, onDelete, onRestoreSeed, onToast }: CatalogoProps) {
  const [busca, setBusca] = useState('');
  const [editing, setEditing] = useState<Produto | null | undefined>(undefined);

  const list = products.filter(p =>
    (p.nome + ' ' + (p.grupo || '')).toLowerCase().includes(busca.toLowerCase())
  );

  function handleSave(data: Omit<Produto, 'id'> & { id?: string }) {
    onSave(data);
    setEditing(undefined);
    onToast('Produto salvo');
  }

  function handleDelete(id: string) {
    onDelete(id);
    setEditing(undefined);
    onToast('Produto excluído');
  }

  function handleRestore() {
    if (confirm('Restaurar a lista de exemplo? Isso substitui o catálogo atual.')) {
      onRestoreSeed();
      onToast('Lista exemplo restaurada');
    }
  }

  return (
    <>
      <h1 className="page-title">Catálogo de produtos</h1>
      <div className="page-sub">Cadastre os produtos do restaurante. Esses dados preenchem a etiqueta automaticamente.</div>

      <div className="toolbar">
        <div className="search" style={{margin:0,flex:1,maxWidth:340}}>
          🔎
          <input
            placeholder="Buscar produto pelo nome ou grupo..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => setEditing(null)}>＋ Novo produto</button>
        <button className="btn btn-ghost btn-sm" style={{marginLeft:'auto'}} onClick={handleRestore}>
          Restaurar lista exemplo
        </button>
      </div>

      <div className="card" style={{padding:'6px 0',overflow:'auto'}}>
        <table className="table">
          <thead>
            <tr>
              <th>Produto</th><th>Grupo</th><th>Marca/Forn.</th>
              <th>SIF</th><th>Método</th><th>Medida</th><th>Validade</th><th></th>
            </tr>
          </thead>
          <tbody>
            {list.map(p => (
              <tr key={p.id}>
                <td><b>{p.nome}</b></td>
                <td>{p.grupo || '—'}</td>
                <td>{p.marca || '—'}</td>
                <td>{p.sif || '—'}</td>
                <td><MetodoTag metodo={p.metodo} /></td>
                <td>{p.medida} {p.un}</td>
                <td>{p.dias} dias</td>
                <td style={{textAlign:'right'}}>
                  <button className="ic" onClick={() => setEditing(p)}>Editar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <div className="empty">Nenhum produto. Clique em "Novo produto" ou "Restaurar lista exemplo".</div>
        )}
      </div>

      {editing !== undefined && (
        <ModalProduto
          produto={editing}
          onSave={handleSave}
          onDelete={handleDelete}
          onClose={() => setEditing(undefined)}
        />
      )}
    </>
  );
}
