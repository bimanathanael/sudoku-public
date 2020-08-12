
const initialState = {
  sudokuBoard: [],
  difficulty: "easy",
  result: null,
  solution: []
}

export const sudokuReducers = ( state = initialState, action) => {
  switch (action.type) {
    case 'SET_SUDOKU_BOARD':
      return {
        ...state,
        sudokuBoard: action.payload.sudokuBoard,
        difficulty: action.payload.difficulty
      }
    case 'VALIDATE_BOARD':
      return {
        ...state,
        result: action.payload.result
      }
    case 'SET_VALID_BOARD':
      console.log(action.payload.result, 'reducers solution')
      return {
        ...state,
        solution: action.payload.result
      }
    case 'RESET':
        return {
          ...state,
          result: null,
          solution: []
        }
    default:
      return state
  }
}