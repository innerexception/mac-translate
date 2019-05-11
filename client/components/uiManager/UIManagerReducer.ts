import { ReducerActions } from '../../../enum'
import { getId } from '../Util';

const appReducer = (state = getInitialState(), action:any) => {
    switch (action.type) {
        case ReducerActions.PLAYER_UPDATE: 
            return { ...state, currentUser: action.currentUser}
        default:
            return state
    }
};

export default appReducer;

const getInitialState = () => {
    return {
        currentUser: {
            id: getId(),
            rack: new Array<RackTile>(),
            notoriety: 0,
            wordHorde: new Array<Language>(),
            sanity: 10,
            factions: new Array<Faction>()
        }
    }
}