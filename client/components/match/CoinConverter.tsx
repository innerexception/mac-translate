import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, LightButton } from '../Shared'
import { onConvertCoin } from '../uiManager/Thunks'
import { getTotalPower } from '../Util';

interface Props {
    coin: Coin
    ownedCoins: Array<Coin>
    hide: Function
    me:Player
}

export default class CoinConverter extends React.Component<Props> {

    state = { 
        amount:0,
        price:0,
        sourceCoin: this.props.coin,
        targetCoin: this.props.ownedCoins[0]
    }

    getCoinPrice = () => {
        let price = this.state.amount*(this.state.sourceCoin.value/this.state.targetCoin.value)
        price+=this.state.targetCoin.difficulty+(price*0.05)
        return price
    }
        
    render(){
        return (
            <div style={{...AppStyles.disabled, pointerEvents:'all', display: 'flex'}}>
                <div style={{padding:'0.5em', maxWidth:'25em'}}>
                    {TopBar('CoinEx')}
                    <div style={{...AppStyles.notification, borderRadius:0, borderTop:'none'}}>
                        <h5>Exchange: </h5>
                        <div>
                            <div>
                                <h5>Coin Type</h5>
                                <select style={{width:'5em'}}
                                        value={this.state.sourceCoin.name} 
                                        onChange={(e)=>this.setState({...this.state, sourceCoin: this.props.ownedCoins.find(coin=>coin.name===e.currentTarget.value) })}>
                                    {this.props.ownedCoins.map(coin=><option value={coin.name}>{coin.name}</option>)}
                                </select>
                            </div>
                            <div style={{display:'flex'}}>
                                <div style={{width:'4em'}}>Symbol</div>
                                <div style={{width:'4em'}}>Val</div>
                                <div style={{width:'4em'}}>Dif</div>
                            </div>
                            <div style={{display:'flex'}}>
                                <div style={{width:'4em'}}>
                                    <span style={{fontFamily:'Coin'}}>{this.state.sourceCoin.rune}</span> {this.state.sourceCoin.name}
                                </div>
                                <div style={{width:'4em'}}>{this.state.sourceCoin.value}</div>
                                <div style={{width:'4em'}}>{this.state.sourceCoin.difficulty}</div>
                                <input type="number" min={0} 
                                    max={this.props.me.wallet.find(holding=>holding.name===this.state.sourceCoin.name).amount}
                                    value={this.state.amount} 
                                    onChange={(e)=>this.setState({amount: e.currentTarget.value})}/>
                            </div>
                        </div>
                        <h5>For: </h5>
                        <div>
                            <div>
                                <h5>Coin Type</h5>
                                <select style={{width:'5em'}} defaultValue={this.state.targetCoin.name} 
                                        value={this.state.targetCoin.name} 
                                        onChange={(e)=>this.setState({...this.state, targetCoin: this.props.ownedCoins.find(coin=>coin.name===e.currentTarget.value) })}>
                                    {this.props.ownedCoins.map(coin=><option value={coin.name}>{coin.name}</option>)}
                                </select>
                            </div>
                            <div style={{display:'flex'}}>
                                <div style={{width:'4em'}}>Symbol</div>
                                <div style={{width:'4em'}}>Val</div>
                                <div style={{width:'4em'}}>Dif</div>
                            </div>
                            <div style={{display:'flex'}}>
                                <div style={{width:'4em'}}>
                                    <span style={{fontFamily:'Coin'}}>{this.state.targetCoin.rune}</span> {this.state.targetCoin.name}
                                </div>
                                <div style={{width:'4em'}}>{this.state.targetCoin.value}</div>
                                <div style={{width:'4em'}}>{this.state.targetCoin.difficulty}</div>
                                <div>{this.state.amount*(this.state.sourceCoin.value/this.state.targetCoin.value)} (+5% exchange fee)</div>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                            {LightButton(true, this.props.hide, 'Cancel')}
                            {Button(true, ()=>{onConvertCoin(this.props.me, this.state.sourceCoin, this.state.amount, this.state.targetCoin, this.getCoinPrice()); this.props.hide()}, 'Ok')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
}