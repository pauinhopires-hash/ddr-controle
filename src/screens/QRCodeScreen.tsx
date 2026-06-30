import { QRCodeSVG } from 'qrcode.react';
import type { Screen } from '../types';

interface QRCodeScreenProps {
  onNavigate: (s: Screen) => void;
}

export function QRCodeScreen({ onNavigate }: QRCodeScreenProps) {
  return (
    <>
      <h1 className="page-title">
        QR Code <span className="badge-novo" style={{position:'static'}}>NOVO!</span>
      </h1>
      <div className="page-sub">Aponte a câmera para a etiqueta e atualize estoque, contagem e validade.</div>

      <div className="grid g2">
        <div className="card">
          <h3>Como contar com QR Code</h3>
          <div className="steps">
            <div className="step">
              <span className="n">1</span>
              <div><b>Aponte a câmera</b> para o QR Code na etiqueta.</div>
            </div>
            <div className="step">
              <span className="n">2</span>
              <div>Se não escanear, <b>use o ID</b> impresso para contar.</div>
            </div>
            <div className="step">
              <span className="n">3</span>
              <div><b>Confira</b> e finalize. Status atualizado em tempo real.</div>
            </div>
          </div>
          <button className="btn btn-primary" style={{marginTop:22}} onClick={() => onNavigate('contagem')}>
            Ir para Contagem →
          </button>
        </div>

        <div className="card" style={{display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',textAlign:'center',background:'var(--laranja)',color:'#fff',border:'none'}}>
          <div style={{fontSize:54}}>📱</div>
          <h3 style={{color:'#fff',fontFamily:'var(--fx)'}}>Escaneie e pronto</h3>
          <div style={{opacity:.9,fontSize:13,marginTop:6,maxWidth:260}}>
            Cada etiqueta tem um QR único com toda a rastreabilidade.
          </div>
          <div style={{background:'#fff',borderRadius:12,padding:8,marginTop:18}}>
            <QRCodeSVG value="DR|#A1B2C3|Ancho|ANCHO|VAL:12/03/2026" size={104} />
          </div>
        </div>
      </div>
    </>
  );
}
