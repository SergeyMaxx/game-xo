import {useState} from 'react'
import AppLayout from './components/App-layout'
import './main.css'
import circle from './assets/circle.svg'
import cross from './assets/cross.svg'

function App() {
  const initialState = new Array(9).fill().map(() => ({
    id: Math.random().toString(36).slice(2),
    value: ''
  }))

  const [field, setField] = useState(initialState)
  const [isGameEnd, setIsGameEnd] = useState(false)
  const [isDraw, setIsDraw] = useState(false)
  const [currentPlayer, setCurrentPlayer] = useState('X')

  const handleReset = () => {
    setField(initialState)
    setIsDraw(false)
    setIsGameEnd(false)
    setCurrentPlayer('X')
  }

  const handleClick = id => {
    if (isDraw || isGameEnd) {
      return
    }

    const newField = field.map(f => {
      if (f.id === id && f.value === '') {
        setCurrentPlayer(p => p === 'X' ? 'O' : 'X')
        return {...f, value: currentPlayer}
      } else {
        return f
      }
    })
    setField(newField)

    function isWin(fields, currentPlayer) {
      const WIN_PATTERNS = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8], // Варианты побед по горизонтали
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8], // Варианты побед по вертикали
        [0, 4, 8],
        [2, 4, 6]  // Варианты побед по диагонали
      ]

      return WIN_PATTERNS.some(w => w.every(i => fields[i].value === currentPlayer))
    }

    if (isWin(newField, currentPlayer)) {
      currentPlayer === 'X' ? setCurrentPlayer('X') : setCurrentPlayer('O')
      setIsGameEnd(true)
      return
    }

    if (newField.every(f => f.value)) {
      setIsDraw(true)
    }
  }

  return (
    <AppLayout
      field={field}
      isGameEnd={isGameEnd}
      isDraw={isDraw}
      currentPlayer={currentPlayer}
      setCurrentPlayer={setCurrentPlayer}
      handleReset={handleReset}
      handleClick={handleClick}
    />
  )
}

export default App