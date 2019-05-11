import * as React from 'react'
import AppStyles from '../../AppStyles'
import { TopBar, Button, LightButton } from '../Shared'
import { onBuildImplant } from '../uiManager/Thunks'
import { EmptyEquipment, EquipmentSprite, EquipmentType } from '../../../enum';

interface Props {
    hide: Function
    me: Player
    rackSpace: number
}

export default class ImplantShop extends React.Component<Props> {

    state = { 
        ...EmptyEquipment,
    }    

    render(){
        return (
            <div style={{...AppStyles.disabled, pointerEvents:'all', display: 'flex'}}>
                <div style={{padding:'0.5em', maxWidth:'25em'}}>
                    {TopBar('Equipment')}
                    <div style={{...AppStyles.notification, borderRadius:0, borderTop:'none'}}>
                        <div style={{marginBottom:'0.5em', whiteSpace:'pre-wrap'}}>
                            <h3 style={{marginBottom:'1em'}}>Configure New Equipment</h3>
                            <div style={{display:'flex', alignItems:'center', justifyContent:'space-around'}}>
                                <div style={{...AppStyles.equipment, backgroundImage: 'url('+this.state.sprite+')'}}/>
                                <div>
                                    <h4>lvl {this.state.level} {this.state.coinName} {this.state.type}</h4>
                                    <div style={{display:'flex', alignItems:'baseline', justifyContent:'space-between'}}>
                                        <h5>cost</h5>
                                        <div>{this.state.buildCost}</div>
                                        <h5>power</h5>
                                        <div>{this.state.powerCost}</div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h4>Type</h4>
                                <select value={this.state.type} style={{width:'5em'}}
                                        onChange={(e)=>this.setState({...this.state, type: e.currentTarget.value, coinName:null, sprite: (EquipmentSprite as any)[e.currentTarget.value]})}>
                                    {Object.keys(EquipmentType).map(type=><option value={type}>{type}</option>)}
                                </select>
                            </div>
                            <div>
                                <h5>Level</h5>
                                <input type="number" style={{width:'2em'}} 
                                    min={1} value={this.state.level} 
                                    onChange={(e)=>this.setState({...this.state, level: e.currentTarget.value, powerCost: +e.currentTarget.value*3, buildCost: (+e.currentTarget.value*10)})}/>
                            </div>
                            <div>
                                <h5>Pay With</h5>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'flex-end', alignItems:'center'}}>
                            {LightButton(true, this.props.hide, 'Cancel')}
                            {Button(true, ()=>{onBuildImplant();this.props.hide();}, 'Build')}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}