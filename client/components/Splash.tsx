import * as React from 'react';
import { onMatchStart } from './uiManager/Thunks'
import AppStyles from '../AppStyles';
import { Button, TopBar } from './Shared'
import { getId, getSaves } from './Util';

export default class Splash extends React.Component {

    state = { name: '', saves: getSaves() }
    
    render(){
        return (
            <div style={AppStyles.window}>
                {TopBar('Welcome')}
                <div style={{padding:'0.5em'}}>
                    <h3 style={{margin:'0'}}>MacTranslate</h3>
                    <input style={{...styles.loginInput, marginBottom:'0.5em'}} 
                           type="text" 
                           value={this.state.name} 
                           onChange={(e)=>this.setState({name:e.currentTarget.value})}/>
                    {Button(!!this.state.name, ()=>onMatchStart(getNewPlayer(this.state.name)), 'New')}
                    {this.state.saves.map(player => 
                        Button(true, ()=>onMatchStart(player), 'Load '+player.name))}
                </div>
            </div>
        )
    }
}

const getNewPlayer = (name:string) => {
   return {
       id: getId(),
       rack: getEmptyRack(),
       name,
       notoriety: 0,
       wordHorde: new Array<Language>(),
       sanity: 0,
       factions: new Array<Faction>(),
       power: 0
    }
}

const getEmptyRack = () => 
    new Array(3).fill(null).map(rackTile => {
        return {
            id: getId(),
            equipment: null
        }
    })

const styles = {
    loginInput: {
        boxShadow: 'none',
        border: '1px solid',
        minWidth:'10em'
    }
}