export enum MatchStatus {ACTIVE='ACTIVE',WIN='WIN',LOSE='LOSE', SETUP='SETUP'}
export enum TileState {ACTIVE='ACTIVE', CORRECT='CORRECT', WRONG='WRONG', ASSASSIN='ASSASSIN', NEUTRAL='NEUTRAL'}
export const ApiUrl= 'ws://localhost:1337'
// export const ApiUrl= 'wss://services.cryptonomical.com:3333'
export const ReducerActions= {
    MATCH_UPDATE: 'mu',
    MATCH_TICK: 'mt',
    PLAYER_READY: 'pr',
    MATCH_START: 'ms',
    MATCH_WIN: 'mw',
    MATCH_LOST: 'ml',
    MATCH_CLEANUP: 'mc',
    SET_USER: 'su',
    PLAYER_UPDATE: 'pu',
    PLAYER_MINED: 'pm'
}

export enum EquipmentType {
    Miner='Miner',
    Storage='Storage',
    Solar='Solar',
    Battery='Battery',
    CStorage='CStorage'
}

export const EquipmentSprite = {
    Battery: require('./client/assets/buildable/drawing-4.svg'),
    Miner: require('./client/assets/buildable/drawing-1.svg'),
    Storage: require('./client/assets/buildable/drawing-2.svg'),
    CStorage: require('./client/assets/buildable/drawing-7.svg'),
    Miner2: require('./client/assets/buildable/drawing-5.svg'),
    Solar: require('./client/assets/buildable/drawing-6.svg')
}

export const EmptyEquipment = {
    powerCost: 3,
    isEnabled: true,
    buildCost: 10,
    sprite: EquipmentSprite.Miner,
    type: EquipmentType.Miner,
    coinName: '',
    level: 1
}


export const CoinRune = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']

export const CoinName = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']