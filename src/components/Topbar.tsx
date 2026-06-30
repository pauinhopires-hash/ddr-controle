interface TopbarProps {
  onHamb: () => void;
}

export function Topbar({ onHamb }: TopbarProps) {
  return (
    <header className="topbar">
      <button className="hamb" onClick={onHamb}>☰</button>
      <div className="store">
        🏪 <span>Restaurante DDR — Matriz</span>
        <span className="pill">Unidade</span>
      </div>
      <div className="spacer" />
      <div className="user">
        <div className="meta" style={{ textAlign: 'right' }}>
          <b>Marcelo M.</b>
          <small>Gestor</small>
        </div>
        <div className="avatar">M</div>
      </div>
    </header>
  );
}
