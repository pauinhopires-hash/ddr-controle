import { QRCodeSVG } from 'qrcode.react';
import { BrandSymbol } from './BrandSymbol';
import { fmtDate, fmtDT } from '../utils/date';
import type { Config } from '../types';

export interface LabelData {
  tipo: 'manipulacao' | 'recebimento';
  nome: string;
  metodo: string;
  peso: string;
  un: string;
  original: Date | null;
  data: Date;
  validade: Date;
  marca: string;
  sif: string;
  lote: string;
  resp: string;
  id: string;
  capped: boolean;
}

interface LabelPreviewProps {
  data: LabelData;
  cfg: Config;
}

export function LabelPreview({ data, cfg }: LabelPreviewProps) {
  const isM = data.tipo === 'manipulacao';
  const midK = isM ? 'MANIPULAÇÃO:' : 'RECEBIMENTO:';
  const midV = isM ? fmtDT(data.data) : fmtDate(data.data);
  const valV = isM ? fmtDT(data.validade) : fmtDate(data.validade);
  const qrText = `DR|${data.id}|${data.nome}|${data.lote}|VAL:${fmtDate(data.validade)}`;

  const rows: [string, string][] = [
    ['VAL. ORIGINAL:', data.original ? fmtDate(data.original) : '—'],
    [midK, midV],
    ['VALIDADE:', valV],
    ['MARCA/FORN.:', (data.marca || '—').toUpperCase()],
    ['SIF:', data.sif || '—'],
    ['LOTE:', (data.lote || '—').toUpperCase()],
  ];

  return (
    <div className="label-wrap">
      <div className="ltop" />
      <div className="inner">
        <p className="lname">{data.nome.toUpperCase()}</p>
        <div className="lmeta">
          <span className="met">{data.metodo.toUpperCase()}</span>
          <span className="w">{data.peso} {data.un}</span>
        </div>
        <hr />
        <div className="lrows">
          {rows.map(([k, v]) => (
            <div className="ln" key={k}>
              <span className="k">{k}</span>
              <span className="v">{v}</span>
            </div>
          ))}
        </div>
        <hr />
        <div className="foot">
          <div className="resp">
            <div className="r1">RESP.: {(data.resp || '—').toUpperCase()}</div>
            <div className="co">
              <span className="sym"><BrandSymbol /></span>
              {(cfg.nome || '').toUpperCase()}
            </div>
            <div><b>CNPJ:</b> {cfg.cnpj}</div>
            <div>{cfg.end}</div>
            <div className="lid">{data.id}</div>
          </div>
          <div className="qr">
            <QRCodeSVG value={qrText} size={88} />
          </div>
        </div>
        {data.capped && (
          <div className="modnote">
            ⚠ Esta etiqueta teve a data de validade modificada respeitando a data de validade original do produto.
          </div>
        )}
      </div>
    </div>
  );
}
