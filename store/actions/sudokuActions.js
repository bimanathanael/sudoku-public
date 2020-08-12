const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

export const getSudokuBoard = (difficulty = "easy") => {
  return (dispact) => {
    fetch(`https://sugoku.herokuapp.com/board?difficulty=${difficulty}`, {
      method: 'GET',
      headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
      },
    })
      .then( resp => resp.json())
      .then( data => 
        dispact({
          type: 'SET_SUDOKU_BOARD',
          payload: {
            sudokuBoard: data.board,
            difficulty
          }
        })
      )
  }
}

export const validate = (data) => {
  const dataSubmit = {
    board: data
  }
  return (dispact) => {
    fetch('https://sugoku.herokuapp.com/validate', {
      method: "POST",
      body: encodeParams(dataSubmit),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
    })
      .then( resp => resp.json() )
      .then( data => {
        dispact({
          type: 'VALIDATE_BOARD',
          payload: {
            result: data
          }
        })
      }
    )
  }
}

export const giveUp = (data) => {
  const dataSubmit = {
    board: data
  }
  return (dispact) => {
    fetch('https://sugoku.herokuapp.com/solve', {
      method: 'POST',
      body: encodeParams(dataSubmit),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })
      .then(response => response.json())
      .then(response => dispact({
        type: 'SET_VALID_BOARD',
        payload: {
          result: response.solution
        }
      }))
      .catch(console.warn)
  }
}

export const reset = () => {
  return { type: "RESET" }
}