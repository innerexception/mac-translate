import * as React from 'react'
import AppStyles from '../../AppStyles';
import { TopBar, Button } from '../Shared'
import { getRandomInt, getRandomCoinRuneLimited, getRandomColor } from '../Util';


const CardTexture = [
    require('../../assets/stars.png'),
    require('../../assets/whiteTile2.png'),
    require('../../assets/whiteTile3.png'),
    require('../../assets/greyTile2.png'),
    require('../../assets/greyTile3.png'),
    require('../../assets/whiteTile4.png'),
]

interface Card {
    id: string
    color: string
    pattern: string
    number: number
    symbol: string
    isSelected: boolean
}

interface Props {
    dimension: number
    sets:number
    onSolved: Function
}

interface State{
    cards: Array<Card>
}

export default class Set extends React.Component<Props, State> {

    state = { cards: getInitialCards(this.props.dimension) }
    
    toggleSelectCard = (card:Card) => {
        this.state.cards = this.state.cards.map(scard=>{
            if(card.id === scard.id) return {...scard, isSelected: !scard.isSelected}
            else return scard
        })
        this.setState({cards: this.state.cards})
    }

    onTrySolve = () => {
        let selected = this.state.cards.filter(card=>card.isSelected)
        let availableCards = Array.from(selected)
        let matches=0
        for(var i=0; i<this.props.sets; i++){
            selected.forEach(card=>{
                const colorMatch = availableCards.filter(selectedCard=>selectedCard.color === card.color)
                const patternMatch = availableCards.filter(selectedCard=>selectedCard.pattern === card.pattern)
                const symbolMatch = availableCards.filter(selectedCard=>selectedCard.symbol === card.symbol)
                const numberMatch = availableCards.filter(selectedCard=>selectedCard.number === card.number)
                //TODO other match criteria: numerical sequence, all different
                if(colorMatch.length >= 3){
                    //Remove found cards
                    availableCards = availableCards.filter(selectedCard=>
                        !colorMatch.find(mcard => selectedCard.id === mcard.id))
                    matches++
                }
                if(patternMatch.length >= 3){
                    //Remove found cards
                    availableCards = availableCards.filter(selectedCard=>
                        !patternMatch.find(mcard => selectedCard.id === mcard.id))
                    matches++
                }
                if(symbolMatch.length >= 3){
                    //Remove found cards
                    availableCards = availableCards.filter(selectedCard=>
                        !symbolMatch.find(mcard => selectedCard.id === mcard.id))
                    matches++
                }
                if(numberMatch.length >= 3){
                    //Remove found cards
                    availableCards = availableCards.filter(selectedCard=>
                        !numberMatch.find(mcard => selectedCard.id === mcard.id))
                    matches++
                }
            })
        }
        if(matches>=this.props.sets) this.props.onSolved(true)
        else this.props.onSolved(false)
    }

    render(){
        return (
            <div style={{...AppStyles.window, position:'absolute', top:0,left:0,right:0,bottom:0,margin:'1em'}}>
                {TopBar('HashSolver v0.9')}
                <div style={{display:'flex', alignItems:'center', justifyContent:'center', height:'75%', width:'100%'}}>
                    <div style={{padding:'0.5em', maxWidth:(this.props.dimension*3)+1+'em', display:'flex', flexWrap:'wrap'}}>
                        {this.state.cards.map(card => 
                            <div style={buildCardStyle(card)} 
                                onClick={()=>this.toggleSelectCard(card)}>
                                {new Array(card.number).fill(null).map(sym=>
                                    <div style={{fontFamily:'Coin', ...styles.shadow}}>{card.symbol}</div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
                <h4>Select sets of three to solve. {this.props.sets} sets of 3 required</h4>
                {Button(true, this.onTrySolve, 'Solve')}
            </div>
        )
    }
}

const getInitialCards = (dimension:number) => {
    let cards = new Array(dimension*dimension).fill(null).map(card => {
        return {
            id: Date.now()+''+Math.random(),
            color: getRandomColor(),
            pattern: CardTexture[getRandomInt(CardTexture.length)],
            number: getRandomInt(3),
            symbol: getRandomCoinRuneLimited(),
            isSelected: false
        }
    })
    return cards
}

const buildCardStyle = (card:Card)=>{
    return {
        ...(card.isSelected ? styles.cardSelected : styles.card),
        color: card.color,
        backgroundImage: 'url('+card.pattern+')',
        display: 'flex',
        justifyContent:'space-around',
        alignItems:'center'
    }
}


const styles = {
    card: {
        height: '1em',
        width:'3em',
        margin: '2px',
        border: '1px dotted'
    },
    cardSelected: {
        height: '1em',
        width:'3em',
        margin: '3px',
        border: '1px solid'
    },
    modal: {
        position:'absolue' as 'absolute',
        top:0,left:0,right:0,bottom:0,
        margin:'1em'
    },
    shadow: {
        textShadow: '-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000'
    }
}