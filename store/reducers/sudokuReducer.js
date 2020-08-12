
const initialState = {
  sudokuBoard: [],
  difficulty: "easy",
  result: null
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
      return {
        ...state,
        sudokuBoard: action.payload.result
      }
    case 'RESET':
        return {
          ...state,
          result: null
        }
    default:
      return state
  }
}