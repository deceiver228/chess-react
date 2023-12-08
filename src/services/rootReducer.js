import { combineReducers } from "redux";
import { gameReducer } from "./reducers/gameReducer";
import { menuReducer } from "./reducers/menuReducer";
import { authReducer } from "./reducers/authReducer";

export const rootReducer = combineReducers({
	game: gameReducer,
	menu: menuReducer,
	auth: authReducer
})