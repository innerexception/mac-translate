import * as React from 'react'
import AppStyles from '../../AppStyles'
import { TopBar, Button, LightButton } from '../Shared'
// import { onTranslationTick } from '../uiManager/Thunks'

interface Props {
    me: Player
    onSolved: Function
    document: string
}

export default class Translator extends React.Component<Props> {

    state = {}    

    componentDidMount = () => {
        // setInterval(()=>onTranslationTick(), 1000)
    }

    render(){
        return (
            <div style={{...AppStyles.disabled, pointerEvents:'all', display: 'flex'}}>
                
                <div style={{padding:'0.5em', maxWidth:'25em'}}>
                    {TopBar('Power')}
                </div>
            </div>
        )
    }
}