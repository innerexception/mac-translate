import * as React from 'react'
import AppStyles from '../../AppStyles';
import Deck from './Set'
import Room from './Room'
import Translator from './Translator'
import { TopBar, Button } from '../Shared'
import { Scenes } from '../../../enum';

interface Props {
    currentUser: Player
}

export default class Session extends React.Component<Props> {

    state = { 
        activeView: Scenes.Room,
        deckSets: 3,
        deckDimension: 3,
        document: ''
    }

    onSolvedDeck = () => {

    }

    onSolvedTranslate = () => {

    }
    
    renderScene = (activeView:Scenes) => {
        if(activeView===Scenes.Room) return <Room me={this.props.currentUser}/>
        if(activeView===Scenes.HackingDeck) return <Deck dimension={this.state.deckDimension}  
                                                         sets={this.state.deckSets} 
                                                         onSolved={this.onSolvedDeck}/>
        if(activeView===Scenes.Translator) return <Translator me={this.props.currentUser} 
                                                              document={this.state.document}
                                                              onSolved={this.onSolvedTranslate}/>
    }

    render(){
        return (
            <div style={AppStyles.window}>
                {TopBar('MacTranslate')}
                <div style={{padding:'0.5em', maxWidth:'25em'}}>
                    {this.renderScene(this.state.activeView)}
                </div>
         </div>
        )
    }
}

const styles = {
    
}