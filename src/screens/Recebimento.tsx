import { useState } from 'react';
import { MetodoTag } from '../components/MetodoTag';
import { RECEBER_MOCK } from '../data/seed';
import type { Metodo } from '../types';

const FILTROS: (string)[] = ['Todos', 'Resfriado', 'Congelado', 'Temp. Ambiente'];

interface RecebimentoProps {
  onToast: (msg: string) => void;
}

export function Recebimento({ onToast }: RecebimentoProps) {
  const [filtro, setFiltro] = useState('Todos');
  const [busca, setBusca] = useState('');

  const items = RECEBER_MOCK.filter(r => {
    const matchFiltro = filtro === 'Todos' || r.met === filtro;
    const matchBusca = r.n.toLowerCase().includes(busca.toLowerCase());
    return matchFiltro && matchBusca;
  });

  return (
    <>
      <h1 className="page-title">Produtos a receber</h1>
      <div className="page-sub">Selecione os produtos que chegaram. Registre e etiquete em segundos, 100% rastreável.</div>

      <div className="search">
        🔎
        <input
          placeholder="Buscar produto pelo nome..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>

      <div className="chips">
        {FILTROS.map(f => (
          <button key={f} className={`chip${filtro === f ? ' active' : ''}`} onClick={() => setFiltro(f)}>{f}</button>
        ))}
      </div>

      <div className="card" style={{padding:'6px 0'}}>
        <table className="table">
          <thead>
            <tr>
              <th>Produto</th>
              <th>Medida</th>
              <th>Armazenamento</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((r, i) => (
              <tr key={i}>
                <td><b>{r.n}</b></td>
                <td>{r.med}</td>
                <td><MetodoTag metodo={r.met as Metodo} /></td>
                <td style={{textAlign:'right'}}>
                  <button className="btn btn-ghost btn-sm" onClick={() => onToast(`${r.n} recebido e etiquetado`)}>
                    ＋ Receber
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
