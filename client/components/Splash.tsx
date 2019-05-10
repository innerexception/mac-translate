import * as React from 'react';
import { onMatchStart } from './uiManager/Thunks'
import AppStyles from '../AppStyles';
import { Button, TopBar } from './Shared'
import { getRandomInt, getRandomCoinName, getRandomCoinRune, getFreshCoinBlock } from './Util';

export default class Login extends React.Component {
    render(){
        return (
            <div style={AppStyles.window}>
                {TopBar('Welcome')}
                <div style={{padding:'0.5em'}}>
                    <h3 style={{margin:'0'}}>MacMiner</h3>
                    {Button(true, ()=>onMatchStart(getUser(), getInitialCoin()), 'Start')}
                </div>
            </div>
        )
    }
}

const getUser = () => {
   return {
       id: Date.now() + ''+ Math.random(),
       rack: getEmptyRack(),
       power: 0,
       wallet: new Array<CoinHolding>(),
       passives: new Array<Passive>()
    }
}

const getInitialCoin = () => {
    let amount = getRandomInt(1000)
    let value = Math.round(amount / 100)
    return {
        name: getRandomCoinName(),
        rune: getRandomCoinRune(),
        value,
        difficulty: 1,
        circulation: amount*getRandomInt(20),
        activeBlock: getFreshCoinBlock()
    }
}

const getEmptyRack = () => 
    new Array(3).fill(null).map(rackTile => {
        return {
            id: Date.now()+''+Math.random(),
            equipment: null
        }
    })