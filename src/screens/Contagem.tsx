import { useState } from 'react';
import { CONTAGENS_MOCK } from '../data/seed';

interface ContagemProps {
  onToast: (msg: string) => void;
}

export function Contagem({ onToast }: ContagemProps) {
  const [busca, setBusca] = useState('');

  const items = CONTAGENS_MOCK.filter(c => c.n.toLowerCase().includes(busca.toLowerCase()));

  return (
    <>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',flexWrap:'wrap',gap:12}}>
        <div>
          <h1 className="page-title">Contagem</h1>
          <div className="page-sub">Listas definidas pelo gestor, QR Code e resultados confiáveis.</div>
        </div>
        <button className="btn btn-ghost" onClick={() => onToast('Histórico de contagens')}>Ver histórico</button>
      </div>

      <div className="search">
        🔎
        <input
          placeholder="Buscar lista de contagem..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
        />
      </div>

      <div className="grid g3">
        {items.map((c, i) => (
          <div className="card" key={i}>
            <div style={{fontSize:30}}>{c.ico}</div>
            <h3 style={{marginTop:8}}>{c.n}</h3>
            <div className="desc">{c.q} produtos</div>
            <div className="chips" style={{margin:'12px 0 4px'}}>
              {c.g.map(g => (
                <div key={g} className="chip" style={{cursor:'default',padding:'5px 11px',fontSize:11}}>{g}</div>
              ))}
            </div>
            <button
              className="btn btn-primary btn-sm"
              style={{width:'100%',justifyContent:'center'}}
              onClick={() => onToast(`Contagem de ${c.n} via QR Code`)}
            >
              ⬛ Contar
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
