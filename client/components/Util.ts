import { CoinRune, CoinName } from "../../enum";
import AppStyles from "../AppStyles";
import * as localStorage from 'local-storage'

export const getId = () => Date.now() + '' + Math.random()

export const getSaves = () => {
    return localStorage.get<Array<Player>>('mac-translate-saves')
}

export const saveGame = (player:Player) => {
    let saves = localStorage.get<Array<Player>>('mac-translate-saves')
    saves.push(player)
    localStorage.set('mac-translate-saves', saves)
}

export const getRandomInt = (max:number) => Math.floor(Math.random() * Math.floor(max))

export const getRandomCoinName = () => CoinName[getRandomInt(CoinName.length-1)]+CoinName[getRandomInt(CoinName.length-1)]+CoinName[getRandomInt(CoinName.length-1)]

export const getRandomCoinRune = () => CoinRune[getRandomInt(CoinRune.length-1)]

export const getRandomColor = () => {
    let color = Object.keys(AppStyles.colors)[getRandomInt(3)];
    return (AppStyles.colors as any)[color]
}

export const shuffleArray = (array:Array<any>) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return Array.from(array)
  }