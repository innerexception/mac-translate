import { dispatch } from '../../../client/App'
import { ReducerActions } from '../../../enum'
import { getFreshCoinBlock, getRandomInt } from '../Util';

export const onMatchStart = (currentUser:Player, coin:Coin) => {
    currentUser.wallet = [{
        name: coin.name,
        amount: Math.round(coin.value*100),
        currentFragments: 0
    }]
    dispatch({
        type: ReducerActions.SET_USER,
        session: {
            players: [currentUser],
            coins: [coin]
        },
        currentUser
    })
}

export const onMineBlock = (x:number, y:number, gcoin:Coin, miner:Player, session:Session) => {
    let holding = miner.wallet.find(holding=>holding.name === gcoin.name)
    let { coin, players } = mineCoin(x,y,miner.id,holding,gcoin,session.players)

    dispatch({
        type: ReducerActions.PLAYER_MINED,
        players,
        coin
    })
}

export const onMatchTick = (session:Session) => {
    //TODO
    //5. check for global events to trigger
    //6. chance to discover new coin (trigger ICO)
    //7. chance to spawn a new AI miner
    
    let outPlayers, outCoins
    session.players.forEach(player=>{
        let { players, coins } = runTurn(player, session.coins, session.players)
        outPlayers = players
        outCoins = coins
    })

    dispatch({
        type: ReducerActions.MATCH_TICK,
        session: {
            ...session,
            players: outPlayers,
            coins: outCoins
        }
    })
}

const runTurn = (player:Player, coins:Array<Coin>, splayers:Array<Player>) => {
    let outPlayers = splayers
    let outCoins = coins
    player.wallet.forEach(pcoin=>{
        const miners = player.rack.filter(rackSpace=>
                rackSpace.equipment&&
                rackSpace.equipment.coinName === pcoin.name&&
                rackSpace.equipment.isEnabled).map(space=>space.equipment)
        const gcoin = coins.find(gcoin=>pcoin.name === gcoin.name)
        let { coin, players } = mineCoin(getRandomInt(gcoin.activeBlock.length), getRandomInt(gcoin.activeBlock[0].length), player.id, pcoin, gcoin, splayers, miners)
        outPlayers = players
        outCoins = coins.map(ocoin=>{
            if(ocoin.name === coin.name) return {...coin}
            else return ocoin
        })
    })

    let reqPower=0
    player.rack.forEach(rackSpace=>reqPower+=rackSpace.equipment ? rackSpace.equipment.powerCost : 0)
    player.power-=reqPower
    if(player.power < 0){
        player.rack.forEach(rackSpace=>{
            if(rackSpace.equipment && player.power < 0){
                rackSpace.equipment.isEnabled = false
                player.power+= rackSpace.equipment.powerCost
            } 
        })
    }
    
    outPlayers = outPlayers.map(oplayer=>{
        if(oplayer.id===player.id)
            return {...player}
        else return oplayer
    })

    return {
        players: outPlayers,
        coins: outCoins
    }
}

const mineCoin = (x:number, y:number, playerId:string, holding:CoinHolding, coin:Coin, players:Array<Player>, miningEquipment?:Array<Equipment>) => {
    
    let tile = coin.activeBlock[x][y]
    if(!tile.isMined){
        if(miningEquipment){
            miningEquipment.forEach(equipment=>{
                holding.currentFragments += (equipment.level / coin.difficulty)/10
                tile.isMined = true
            })
        }
        else{
            holding.currentFragments+=0.1 
            holding.currentFragments = Math.round(holding.currentFragments * 100) / 100
            tile.isMined = true
        }
        if(holding.currentFragments >= 1){
            //Close out the block
            holding.amount++
            coin.circulation++
            coin.difficulty++
            players.forEach(player=>
                player.wallet.forEach(coinHolding=>{
                    if(coinHolding.name === holding.name) coinHolding.currentFragments = 0;
                }))
            coin.activeBlock = getFreshCoinBlock()
        }
        else 
            coin.activeBlock[x][y] = {...tile}
    }

    players = players.map(player=>{
        if(player.id === playerId) {
            return {
                ...player, 
                wallet: player.wallet.map(pholding=>{
                            if(pholding.name===holding.name) return {...holding}
                            else return pholding
                        })
            }
        }
        return player
    })

    return {
        coin, players
    }
}

export const onBuildEquipment = (player:Player, payCoin:Coin, price:number, equipment:Equipment, rackSpace:number) => {
    player.rack[rackSpace].equipment = equipment
    player.wallet.forEach(holding=>{
        if(holding.name === payCoin.name) holding.amount -= price
    })
    dispatch({
        type: ReducerActions.PLAYER_UPDATE,
        player
    })
}

export const onBuyPower = (player:Player, power:number, coinAmt:number, coinName:string) => {
    player.power+=power
    player.wallet.forEach(holding=>{
        if(holding.name===coinName) holding.amount-=coinAmt
    })
    dispatch({
        type: ReducerActions.PLAYER_UPDATE,
        player
    })
}

export const onPurchasePower = (kw:number) => {

}

export const onPlaceEquipment = (equipment:Equipment) => {

}

export const onPurchasePassive = (passive:Passive) => {

}

export const onConvertCoin = (player:Player, sourceCoin:Coin, amount:number, targetCoin:Coin, price:number) => {
    //TODO: value decreases/increases
    player.wallet.forEach(holding=>{
        if(holding.name === sourceCoin.name) holding.amount-=price
        if(holding.name === targetCoin.name) holding.amount+=amount
    })
    dispatch({
        type: ReducerActions.PLAYER_UPDATE,
        player
    })
}

export const onCleanSession = () => {
    dispatch({
        type: ReducerActions.MATCH_CLEANUP
    })
}