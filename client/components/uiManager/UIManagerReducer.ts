import { ReducerActions } from '../../../enum'

const appReducer = (state = getInitialState(), action:any) => {
    switch (action.type) {
        case ReducerActions.MATCH_TICK: 
            return { ...state, activeSession: action.session }
        case ReducerActions.SET_USER: 
            return { ...state, currentUser: action.currentUser, activeSession: action.session }
        case ReducerActions.MATCH_CLEANUP: 
            return { ...state, activeSession: null, currentUser:null}
        case ReducerActions.PLAYER_UPDATE: 
            let players = state.activeSession.players.map(player=>{
                if(player.id===action.player.id) return action.player
                else return player
            })
            return { ...state, activeSession: {...state.activeSession, players}}
        case ReducerActions.PLAYER_MINED: 
            let coins = state.activeSession.coins.map(coin => {
                if(coin.name === action.coin.name) return {...action.coin}
                else return coin
            })
            return { ...state, activeSession: {...state.activeSession, players: action.players, coins}}
        default:
            return state
    }
};

export default appReducer;

const getInitialState = () => {
    return {
        currentUser: {
            
        }
    }
}