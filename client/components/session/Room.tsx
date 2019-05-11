import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button, LightButton } from '../Shared'
import ImplantShop from './ImplantShop'
import { onBuyPowerUnit } from '../uiManager/Thunks'
import { } from '../Util';

interface Props {
    me: Player
}

interface State {
    showImplantShop: boolean
    shopOwnerId: string
    showMissionBBS: boolean
    showFactionSummary: boolean
    showWordHorde: boolean
    showImplantInfo: Implant | null
    rackBuildSpace: number
}

export default class Room extends React.Component<Props, State> {

    state = { 
        showImplantShop: false,
        shopOwnerId: '',
        showMissionBBS: false,
        showFactionSummary: false,
        showWordHorde: false,
        showImplantInfo: null as null,
        rackBuildSpace:0
    }

    getEquipmentStyle = (implant:Implant) => {
        return {
            backgroundImage: 'url('+implant.sprite+')',
            ...AppStyles.equipment,
            margin:'2px',
            border: '1px dotted'
        }
    }

    render(){
        return (
            <div style={AppStyles.window}>
                <div>
                    <h4>Implants</h4>
                    <div style={{display:'flex'}}>
                        <h4>Power</h4>
                        <div>{this.props.me.power} (-{getTotalPower(this.props.me.rack)} / Day)</div>
                        {LightButton(true, onBuyPowerUnit, 'Buy 1 Unit')}
                    </div>
                    <div style={{padding:'0.5em', maxWidth:'25em', display:'flex', justifyContent:'center'}}>
                        {this.props.me.rack.map((rackTile:RackTile, i)=>
                                    rackTile.equipment ? 
                                        <div onClick={()=>this.setState({showImplantInfo: rackTile.equipment})} 
                                            style={this.getEquipmentStyle(rackTile.equipment)} 
                                        /> :
                                        <div onClick={()=>this.setState({showImplantShop:true, shopOwnerId: '', rackBuildSpace: i})} 
                                            style={styles.emptyBaseTile}/>
                        )}
                    </div>
                </div>
                {this.state.showImplantShop && 
                    <ImplantShop hide={()=>this.setState({showImplantShop:false})} 
                          me={this.props.me}
                          rackSpace={this.state.rackBuildSpace}/>
                }
                {this.state.showImplantInfo && 
                    <div style={{...AppStyles.disabled, display: 'flex'}}>
                        <div style={AppStyles.notification}>
                            <div style={{marginBottom:'0.5em', whiteSpace:'pre-wrap'}}>
                                {this.state.showImplantInfo}
                            </div>
                            {Button(true, ()=>this.setState({showImplantInfo:null}), 'Done')}
                        </div>
                    </div>  
                }
         </div>
        )
    }
}

const getTotalPower = (rack:Array<RackTile>) => {
    let power=0
    rack.forEach(tile=>tile.equipment && (power+=tile.equipment.power))
    return power
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