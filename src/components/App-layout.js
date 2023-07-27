import React from 'react'
import cross from '../assets/cross.svg'
import circle from '../assets/circle.svg'

const AppLayout = ({field, currentPlayer, isGameEnd, isDraw, handleReset, handleClick}) => {
  const status = isGameEnd ? 'Победил' : isDraw ? 'Ничья' : 'Ходит'

  return (
    <div className="wrapper">
      <div className="info">
        {status}
        {status !== 'Ничья' &&
          <img
            className="image"
            src={currentPlayer === 'X' ? cross : circle}
            alt="figure"
          />
        }
      </div>
      <div className="fields">
        {field.map(f => (
          <button
            key={f.id}
            onClick={() => handleClick(f.id)}
            className="field"
          >
            {f.value && <img src={f.value === 'X' ? cross : circle} alt="figure"/>}
          </button>
        ))}
      </div>
      <button className="reset" onClick={handleReset}>
        Начать заново
      </button>
    </div>
  )
}

export default AppLayout