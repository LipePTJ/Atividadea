import { useState } from 'react';
import './style.css';

export default function atividade() {
  const [contador, setContador] = useState(0);
  const [passo, setPasso] = useState(1);
  const [ultimoLoteRegistrado, setUltimoLoteRegistrado] = useState(null);

  const CAPACIDADE_MAXIMA = 50;


  function incrementar() {
    setContador((valorAnterior) =>
      Math.min(valorAnterior + passo, CAPACIDADE_MAXIMA)
    );
  }


  function decrementar() {
    setContador((valorAnterior) => Math.max(valorAnterior - passo, 0));
  }

 
  function resetar() {
    if (contador > 0) {
      setUltimoLoteRegistrado(contador);
      setContador(0);
    }
  }


  function tratarPasso(e) {
    const valor = Number(e.target.value);
    if (isNaN(valor) || valor < 1) {
      setPasso(1);
    } else if (valor > 10) {
      setPasso(10);
    } else {
      setPasso(valor);
    }
  }

  return (
    <div className="card-exemplo">
      <div className="card-header">
        <span className="badge">Módulo Operacional</span>
        <h3>Controle de Paletes AutomaLog</h3>
      </div>

      <div className="contador-display">
        <span className="numero-contador">{contador}</span> / {CAPACIDADE_MAXIMA}
      </div>

    
      {contador >= 40 && contador < CAPACIDADE_MAXIMA && (
        <div className="mensagem-alerta">Capacidade quase atingida</div>
      )}

      {contador === CAPACIDADE_MAXIMA && (
        <div className="mensagem-fechado">Lote Fechado</div>
      )}


      <div className="passo-container">
        <label htmlFor="passo-input">Passo do incremento:</label>
        <input
          id="passo-input"
          type="number"
          min="1"
          max="10"
          value={passo}
          onChange={tratarPasso}
        />
      </div>

    
      <div className="botoes-grupo">
        <button
          className="btn btn-decrementar"
          onClick={decrementar}
          disabled={contador === 0 || contador - passo < 0}
        >
          - {passo}
        </button>

        <button
          className="btn btn-resetar"
          onClick={resetar}
          disabled={contador === 0}
        >
          Zerar
        </button>

        <button
          className="btn btn-incrementar"
          onClick={incrementar}
          disabled={
            contador === CAPACIDADE_MAXIMA || contador + passo > CAPACIDADE_MAXIMA
          }
        >
          + {passo}
        </button>
      </div>

      {ultimoLoteRegistrado !== null && (
        <div className="explicacao-box">
          <p>
            Último lote finalizado: <strong>{ultimoLoteRegistrado} caixas</strong>
          </p>
        </div>
      )}
    </div>
  );
}