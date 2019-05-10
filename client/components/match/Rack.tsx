import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, LightButton } from '../Shared'
import EquipmentBuilder from './EquipmentBuilder'
import PowerStore from './PowerStore'
import CoinConverter from './CoinConverter'
import { getTotalPower } from '../Util';

interface Props {
    onShowBlockForCoin: Function
    coins: Array<Coin>
    me: Player
}

interface State {
    showBuildOptions: boolean
    showEquipmentInfo: Equipment | boolean
    showBuyPower: boolean
    rackSpace: number
    showCoinShop: Coin
}

export default class Rack extends React.Component<Props, State> {

    state = { 
        showBuildOptions: false,
        showEquipmentInfo: false,
        showBuyPower: false,
        rackSpace: 0,
        showCoinShop: null as null
    }

    getEquipmentStyle = (equipment:Equipment) => {
        return {
            backgroundImage: 'url('+equipment.sprite+')',
            ...AppStyles.equipment,
            margin:'2px',
            border: '1px dotted'
        }
    }

    hasValidMiner = (coin:Coin) => this.props.me.rack.find(rackSpace=>rackSpace.equipment && rackSpace.equipment.isEnabled && rackSpace.equipment.coinName === coin.name && rackSpace.equipment.level >= coin.difficulty) ? true : false
    
    render(){
        let ownedCoins = this.props.coins.filter(coin=>this.props.me.wallet.find(wcoin=>wcoin.name===coin.name))
        return (
            <div style={AppStyles.window}>
                <div>
                    <h4>CoinEx</h4>
                    <div style={{display:'flex'}}>
                        <div style={{width:'4em'}}>Symbol</div>
                        <div style={{width:'4em'}}>Amt</div>
                        <div style={{width:'4em'}}>Val</div>
                        <div style={{width:'4em'}}>Hash Rate</div>
                    </div>
                    {this.props.me.wallet.map(coinHolding=>{
                        let coin = this.props.coins.find(coin=>coin.name===coinHolding.name)
                        return (
                            <div style={{display:'flex'}}>
                                <div style={{width:'4em'}}>
                                    <span style={{fontFamily:'Coin'}}>{coin.rune}</span> {coin.name}
                                </div>
                                <div style={{width:'4em'}}>{coinHolding.amount}</div>
                                <div style={{width:'4em'}}>{coin.value}</div>
                                <div>{getHashRate(this.props.me.rack, coin.name)} {!this.hasValidMiner(coin) && <div title={'Miner for this coin is missing or underlevel. Mining will be slow or non-existent.'}>!</div>}</div>
                                {LightButton(true, ()=>this.setState({showCoinShop: coin}), 'Trade')}
                                {LightButton(true, ()=>this.props.onShowBlockForCoin(coin), 'Mine')}
                            </div>
                        )
                    })}
                </div>
                <div>
                    <h4>My Rack</h4>
                    <div style={{display:'flex'}}>
                        <h4>Power</h4>
                        <div>{this.props.me.power} (-{getTotalPower(this.props.me.rack)})</div>
                        {LightButton(true, ()=>this.setState({showBuyPower: true}), 'Buy')}
                    </div>
                    <div style={{padding:'0.5em', maxWidth:'25em', display:'flex', justifyContent:'center'}}>
                        {this.props.me.rack.map((rackTile:RackTile, i)=>
                                    rackTile.equipment ? 
                                        <div onClick={()=>this.setState({showEquipmentInfo: rackTile.equipment})} 
                                            style={this.getEquipmentStyle(rackTile.equipment)} 
                                        /> :
                                        <div onClick={()=>this.setState({showBuildOptions:true, rackSpace: i})} 
                                            style={styles.emptyBaseTile}/>
                        )}
                    </div>
                </div>
                {this.state.showBuildOptions && 
                    <EquipmentBuilder hide={()=>this.setState({showBuildOptions:false})} 
                                      me={this.props.me}
                                      rackSpace={this.state.rackSpace}
                                      ownedCoins={ownedCoins}/>
                }
                {this.state.showBuyPower && 
                    <PowerStore me={this.props.me}
                                ownedCoins={ownedCoins}
                                hide={()=>this.setState({showBuyPower:false})}/>
                }
                {this.state.showEquipmentInfo && 
                    <div style={{...AppStyles.disabled, display: 'flex'}}>
                        <div style={AppStyles.notification}>
                            <div style={{marginBottom:'0.5em', whiteSpace:'pre-wrap'}}>
                                
                            </div>
                            {Button(true, ()=>this.setState({showEquipmentInfo:false}), 'Done')}
                        </div>
                    </div>  
                }
                {this.state.showCoinShop &&
                    <CoinConverter  ownedCoins={ownedCoins}
                                    me={this.props.me}
                                    hide={()=>this.setState({showCoinShop:null})}
                                    coin={this.state.showCoinShop}/>
                }
         </div>
        )
    }
}

const getHashRate = (rack:Array<RackTile>, coinName:string) => {
    let rate = 0
    rack.forEach(space=>{
        if(space.equipment && space.equipment.coinName===coinName && space.equipment.isEnabled) 
            rate+=space.equipment.level
    })
    return rate
}

const styles = {
    emptyBaseTile: {
        backgroundImage: 'url('+require('../../assets/pipes/tile035.png')+')',
        backgroundRepeat: 'no-repeat',
        height:'1.5em',
        width:'1.5em',
        margin:'2px',
        border: '1px dotted',
        cursor:'pointer'
    }
}