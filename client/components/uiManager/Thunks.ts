import { dispatch } from '../../../client/App'
import { ReducerActions } from '../../../enum'
import { getRandomInt } from '../Util';

export const onMatchStart = (currentUser:Player) => {
    dispatch({
        type: ReducerActions.PLAYER_UPDATE,
        currentUser
    })
}


export const onBuyPowerUnit = () => {

}

export const onBuildImplant = () => {
    
}