import * as React from 'react'
import { onMineBlock } from '../uiManager/Thunks'
import AppStyles from '../../AppStyles';
import { Button, LightButton } from '../Shared'
import { TileState, MatchStatus } from '../../../enum'
import Set from './Set'

interface Props {
    me: Player
    coin: Coin
    onShowBase: Function
    activeSession: Session
}

interface State {
    showMessage: string,
    showSetForTile: CryptoTile | null,
    messages: Array<string>
}

export default class CryptoBlock extends React.Component<Props, State> {

    messageEl:any

    state = {
        showMessage: '',
        showSetForTile: null as null,
        messages: ['Started mining '+this.props.coin.name]
    }

    onSolved = (success:boolean) => {
        if(success){
            this.mineBlock(this.state.showSetForTile)
            this.state.messages.push('Solve block: SUCCESS!')
        } 
        else
            this.state.messages.push('Solve block: FAILED!')

        this.setState({showSetForTile: null, messages: this.state.messages}, 
            ()=>this.messageEl.scrollIntoView())
    }

    getNotification = () => 
        <div style={{...AppStyles.disabled, display: 'flex'}}>
            <div style={AppStyles.notification}>
                <div style={{marginBottom:'0.5em', whiteSpace:'pre-wrap'}}>
                    {this.state.showMessage}
                </div>
                {Button(true, ()=>this.setState({showMessage:''}), 'Done')}
            </div>
        </div>  

    getSetForTile = () => 
        <Set sets={this.props.coin.difficulty}
             onSolved={this.onSolved}
             dimension={2+this.props.coin.difficulty}/>
    

    mineBlock = (tile:CryptoTile) => {
        onMineBlock(tile.x, tile.y, this.props.coin, this.props.me, this.props.activeSession)
    }

    getTileBackground = (tile:CryptoTile) => {
        
    }

    render(){
        return (
            <div>
                <div style={{...styles.tileInfo}}>
                    <div style={styles.infoInner}>
                        <div style={{width:'50%'}}>
                            <div style={{display:'flex'}}>
                                <div style={{fontFamily:'Coin'}}>{this.props.coin.rune}</div>
                                <div>{this.props.coin.name}</div>
                            </div>
                            <div>Current difficulty: {this.props.coin.difficulty}</div>
                            <div>My fragments: {this.props.me.wallet.find(holding=>holding.name===this.props.coin.name).currentFragments}</div>
                            {LightButton(true, this.props.onShowBase, 'Go Back')}
                        </div>
                        <div style={{height:'20vh', overflowY:'auto', width:'50%'}}>
                            {this.state.messages.map(message=><div>{message}</div>)}
                            <div ref={el => { this.messageEl = el }}/>
                        </div>
                    </div>
                </div>
                <div style={{position:'relative'}}>
                    <div style={styles.mapFrame}>
                        <div style={{display:'flex'}}>
                            {this.props.coin.activeBlock.map((row) => 
                                <div>
                                    {row.map((tile:CryptoTile) => 
                                         <div 
                                            onClick={tile.isMined ? null : ()=>this.setState({showSetForTile: tile})}
                                            style={{
                                                ...styles.tile, 
                                                ...(tile.isMined ? styles.minedTile : {})
                                                }}>
                                            {tile.hadFragment && <div style={styles.fragment}/>}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                    {this.state.showMessage && this.getNotification()}
                    {this.state.showSetForTile && this.getSetForTile()}
                </div>
            </div>
        )
    }
}

const styles = {
    mapFrame: {
        position:'relative' as 'relative',
        backgroundImage: 'url('+require('../../assets/whiteTile.png')+')',
        backgroundRepeat: 'repeat',
        overflow:'auto',
        maxHeight:'60vh',
        maxWidth:'100%'
    },
    tileInfo: {
        marginBottom: '0.5em',
        padding: '0.5em',
        border: '1px solid'
    },
    infoInner: {
        padding:'0.5em',
        background:'white',
        borderRadius:'5px',
        display:'flex'
    },
    tile: {
        width: '32px',
        height:'32px',
        border: '1px',
        position:'relative' as 'relative',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        backgroundImage: 'url('+require('../../assets/pipes/tile026.png')+')',
        cursor:'pointer'
    },
    minedTile: {
        backgroundImage: 'url('+require('../../assets/pipes/tile004.png')+')',
        cursor:'none'
    },
    tileInner: {
        background: 'white',
        width: '100%',
        textAlign: 'center' as 'center',
        borderRadius: '5px',
        border: '1px solid',
        margin: '5px'
    },
    otherTeamTurn: {
        background: 'white',
        padding: '2px',
        borderRadius: '5px',
        textAlign: 'center' as 'center',
        margin: '5px'
    },
    fragment: {
        
    }
}