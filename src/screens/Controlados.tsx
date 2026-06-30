import { MetodoTag } from '../components/MetodoTag';
import { CONTROLADOS_MOCK } from '../data/seed';
import type { Metodo } from '../types';

interface ControladosProps {
  onToast: (msg: string) => void;
}

export function Controlados({ onToast }: ControladosProps) {
  return (
    <>
      <h1 className="page-title">Controle dos seus 💎 diamantes</h1>
      <div className="page-sub">Proteja onde o dinheiro realmente está. O sistema avisa quando comprar a partir do estoque mínimo.</div>

      <div className="grid g3" style={{marginBottom:22}}>
        <div className="card" style={{textAlign:'center',borderTop:'3px solid var(--vermelho)'}}>
          <div className="kpi" style={{color:'var(--vermelho)'}}>52</div>
          <small style={{color:'var(--cinza-texto)'}}>Sem estoque — repor já</small>
        </div>
        <div className="card" style={{textAlign:'center',borderTop:'3px solid var(--amarelo)'}}>
          <div className="kpi" style={{color:'var(--amarelo)'}}>149</div>
          <small style={{color:'var(--cinza-texto)'}}>Em estoque mínimo</small>
        </div>
        <div className="card" style={{textAlign:'center',borderTop:'3px solid var(--verde)'}}>
          <div className="kpi" style={{color:'var(--verde)'}}>308</div>
          <small style={{color:'var(--cinza-texto)'}}>Acima do mínimo</small>
        </div>
      </div>

      <div className="card" style={{padding:'6px 0'}}>
        <table className="table">
          <thead>
            <tr>
              <th>💎 Diamante</th>
              <th>Método</th>
              <th>Em estoque</th>
              <th>Mín.</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {CONTROLADOS_MOCK.map((c, i) => {
              const cls = c.st === 'venc' ? 's-venc' : c.st === 'hoje' ? 's-hoje' : 's-ok';
              const lbl = c.st === 'venc' ? 'Sem estoque' : c.st === 'hoje' ? 'Estoque mínimo' : 'Acima do mínimo';
              return (
                <tr key={i}>
                  <td>💎 <b>{c.n}</b></td>
                  <td><MetodoTag metodo={c.met as Metodo} /></td>
                  <td>{c.e}</td>
                  <td>{c.min}</td>
                  <td><span className={`pill-status ${cls}`}>{lbl}</span></td>
                  <td style={{textAlign:'right'}}>
                    <button className="btn btn-ghost btn-sm" onClick={() => onToast(`Pedido de reposição de ${c.n}`)}>Repor</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
