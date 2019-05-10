import * as React from 'react'
import AppStyles from '../../AppStyles'
import { TopBar, Button, LightButton } from '../Shared'
import { onBuyPower } from '../uiManager/Thunks'
import { getTotalPower } from '../Util';

interface Props {
    hide: Function
    ownedCoins: Array<Coin>
    me: Player
}

export default class EquipmentBuilder extends React.Component<Props> {

    state = { 
        power: 1,
        coinName: '',
        price: 1
    }    

    hasCoinAmt = () => {
        let holding = this.props.me.wallet.find(holding=>holding.name===this.state.coinName)
        return holding && holding.amount >= this.state.price
    }

    render(){
        return (
            <div style={{...AppStyles.disabled, pointerEvents:'all', display: 'flex'}}>
                
                <div style={{padding:'0.5em', maxWidth:'25em'}}>
                    {TopBar('Power')}
                    <div style={{...AppStyles.notification, borderRadius:0, borderTop:'none'}}>
                        <div style={{marginBottom:'0.5em', whiteSpace:'pre-wrap'}}>
                            <h3 style={{marginBottom:'1em'}}>Buy Power</h3>
                            <div style={{display:'flex'}}>
                                <h4>Current Power Flow</h4>
                                <div>{this.props.me.power} (-{getTotalPower(this.props.me.rack)})</div>
                            </div>
                            <div>
                                <h5>Pay with coin:</h5>
                                <select style={{width:'5em'}} defaultValue={null} value={this.state.coinName} 
                                        onChange={(e)=>this.setState({...this.state, coinName: e.currentTarget.value, price:getPowerPrice(this.state.power, e.currentTarget.value, this.props.ownedCoins)})}>
                                    <option value={null}>Select...</option>
                                    {this.props.ownedCoins.map(coin=><option value={coin.name}>{coin.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <h5>Kwh:</h5>
                                <input type="number" style={{width:'2em'}} 
                                    min={1} value={this.state.power} 
                                    onChange={(e)=>this.setState({power: e.currentTarget.value, price: getPowerPrice(this.state.power, this.state.coinName, this.props.ownedCoins)})}/>
                            </div>
                            <div>
                                <h4>Total cost: {this.state.price} {this.state.coinName}</h4>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                            {LightButton(true, this.props.hide, 'Cancel')}
                            {Button(this.hasCoinAmt(), ()=>{onBuyPower(this.props.me, this.state.power, getPowerPrice(this.state.power, this.state.coinName, this.props.ownedCoins), this.state.coinName);this.props.hide();}, 'Buy')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const getPowerPrice = (power:number, coinName:string, coins:Array<Coin>) => {
    let coin = coins.find(coin=>coin.name===coinName)
    return power/coin.value
}