import * as React from 'react'
import AppStyles from '../../AppStyles';
import CryptoBlock from './CryptoBlock'
import Rack from './Rack'
import { TopBar, Button } from '../Shared'
import { onMatchTick } from '../uiManager/Thunks'

interface Props {
    currentUser: Player
}

export default class MissionEditor extends React.Component<Props> {

    state = { activeView: 'base', activeCoinName: this.props.currentUser.wallet[0].name }
    
    componentDidMount = () => {
        setInterval(()=>onMatchTick(this.props.activeSession), 2000)
    }

    render(){
        return (
            <div style={AppStyles.window}>
                
            </div>
        )
    }
}

const styles = {
    
}