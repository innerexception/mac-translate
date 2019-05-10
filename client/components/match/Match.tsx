import * as React from 'react'
import AppStyles from '../../AppStyles';
import CryptoBlock from './CryptoBlock'
import Rack from './Rack'
import { TopBar, Button } from '../Shared'
import { onMatchTick } from '../uiManager/Thunks'

interface Props {
    currentUser: Player
    activeSession: Session
}

export default class Match extends React.Component<Props> {

    state = { activeView: 'base', activeCoinName: this.props.currentUser.wallet[0].name }
    
    componentDidMount = () => {
        setInterval(()=>onMatchTick(this.props.activeSession), 2000)
    }

    render(){
        return (
            <div style={AppStyles.window}>
                {TopBar('MacMiner')}
                <div style={{padding:'0.5em', maxWidth:'25em'}}>
                    {this.state.activeView === 'base' ? 
                        <Rack 
                            onShowBlockForCoin={(activeCoin:Coin)=>this.setState({activeView:'block', activeCoinName:activeCoin.name})}
                            coins={this.props.activeSession.coins}
                            me={this.props.activeSession.players.find(player=>player.id===this.props.currentUser.id)}
                        />
                        :
                        <CryptoBlock 
                            coin={this.props.activeSession.coins.find(coin=>coin.name===this.state.activeCoinName)}
                            me={this.props.activeSession.players.find(player=>player.id===this.props.currentUser.id)}
                            activeSession={this.props.activeSession}
                            onShowBase={()=>this.setState({activeView:'base'})}
                        />
                    }
                </div>
         </div>
        )
    }
}

const styles = {
    
}