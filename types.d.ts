declare enum MissionType {
    Translate, TimedTranslate, Hack
}

declare enum ImplantType {
    Dialator, Decryptor, CoinMiner, WordHorde, AntiVirus, None
}

interface Player {
    id:string
    rack: Array<RackTile>
    notoriety: number
    wordHorde: Array<Language>
    sanity: number
    factions: Array<Faction>
}

interface Language {
    id: string
    name: string
    words: Array<string>
}

interface Implant {
    isEnabled: boolean
    buildCost: number
    sprite: string
    type: ImplantType
    level: number
}

interface RackTile {
    id: string
    equipment: Implant
}

interface CryptoTile {
    id: string
    isMined: boolean
    hadFragment: boolean
    x:number
    y:number
}

interface Mission {
    factionId: string
    summaryText: string
    loseText: string
    winText: string
    reputation: number
    notoriety: number
    type: MissionType
    content: string
    timeLimit: number
    level: number
    languageId: string
    accessDialog: Array<DialogNode>
}

interface DialogNode {
    id: string
    text: string
    choices: Array<DialogNode>
    factionId: string
    repRequired: number
    notorietyRequired: number
    implantRequired: ImplantType
    implantLevelRequired: number
}

interface Faction {
    id: string
    name: string
    currentReputation: number
}

interface RState {
    currentUser: Player
}