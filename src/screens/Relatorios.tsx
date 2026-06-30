import { useState } from 'react';
import { RELATORIOS_MOCK } from '../data/seed';

const FILTROS = ['Todos', 'Hoje', 'Ontem', '7 dias', '30 dias'];

interface RelatoriosProps {
  onToast: (msg: string) => void;
}

export function Relatorios({ onToast }: RelatoriosProps) {
  const [filtro, setFiltro] = useState('Todos');

  return (
    <>
      <h1 className="page-title">Registro de relatórios</h1>
      <div className="page-sub">Visão completa para quem decide com dados. Acompanhe e exporte quando precisar.</div>

      <div className="chips">
        {FILTROS.map(f => (
          <button key={f} className={`chip${filtro === f ? ' active' : ''}`} onClick={() => setFiltro(f)}>{f}</button>
        ))}
      </div>

      <div className="card" style={{padding:'6px 0'}}>
        <table className="table">
          <thead>
            <tr>
              <th>Relatório</th>
              <th>Período</th>
              <th>Tipo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {RELATORIOS_MOCK.map((r, i) => (
              <tr key={i}>
                <td><b>{r.n}</b></td>
                <td>{r.p}</td>
                <td>{r.t}</td>
                <td style={{textAlign:'right'}}>
                  <button className="btn btn-ghost btn-sm" onClick={() => onToast('Exportando relatório...')}>
                    ⬇️ Exportar
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
