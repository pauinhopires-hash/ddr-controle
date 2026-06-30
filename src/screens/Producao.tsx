import { LabelPreview } from '../components/LabelPreview';
import { MetodoTag } from '../components/MetodoTag';
import { DEFAULT_CONFIG } from '../data/seed';
import { rid } from '../utils/date';
import type { Produto, Config, Screen } from '../types';

interface ProducaoProps {
  products: Produto[];
  cfg: Config;
  onNavigate: (s: Screen) => void;
}

export function Producao({ products, cfg, onNavigate }: ProducaoProps) {
  const first = products[0];
  const now = new Date();
  const val = new Date(now);
  val.setDate(val.getDate() + (first?.dias ?? 30));
  val.setHours(23, 59, 0, 0);

  const labelData = first ? {
    tipo: 'manipulacao' as const,
    nome: first.nome,
    metodo: first.metodo,
    peso: String(first.medida),
    un: first.un,
    original: null,
    data: now,
    validade: val,
    marca: first.marca,
    sif: first.sif,
    lote: first.nome.toUpperCase(),
    resp: (cfg.resps || '').split(',')[0]?.trim() || '—',
    id: rid(),
    capped: false,
  } : null;

  return (
    <>
      <h1 className="page-title">Produção e manipulação</h1>
      <div className="page-sub">Registre o que foi manipulado e imprima a etiqueta com validade correta na hora.</div>

      <div className="grid g2">
        <div className="card">
          <h3>Itens em produção hoje</h3>
          <table className="table" style={{marginTop:10}}>
            <tbody>
              {products.slice(0, 4).map(p => (
                <tr key={p.id}>
                  <td><b>{p.nome}</b></td>
                  <td><MetodoTag metodo={p.metodo} /></td>
                  <td style={{textAlign:'right',color:'var(--cinza-texto)',fontSize:12}}>{p.marca || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="btn btn-primary" style={{marginTop:16}} onClick={() => onNavigate('etiquetas')}>
            ＋ Registrar manipulação
          </button>
        </div>

        <div className="card" style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
          {labelData && <LabelPreview data={labelData} cfg={cfg} />}
        </div>
      </div>
    </>
  );
}
