import { CoinRune, CoinName } from "../../enum";
import AppStyles from "../AppStyles";

export const getRandomInt = (max:number) => Math.floor(Math.random() * Math.floor(max))

export const getRandomCoinName = () => CoinName[getRandomInt(CoinName.length-1)]+CoinName[getRandomInt(CoinName.length-1)]+CoinName[getRandomInt(CoinName.length-1)]

export const getRandomCoinRune = () => CoinRune[getRandomInt(CoinRune.length-1)]

export const getRandomCoinRuneLimited = () => CoinRune[getRandomInt(CoinRune.length/4)]

export const getRandomColor = () => {
    let color = Object.keys(AppStyles.colors)[getRandomInt(3)];
    return (AppStyles.colors as any)[color]
}

export const getFreshCoinBlock = () => new Array(25).fill(null).map((row,x)=>new Array(25).fill(null).map((tile,y)=>{
    return {
        id: Date.now()+''+Math.random(),
        isMined: false,
        hadFragment: false,
        x,
        y
    }
}))

export const shuffleArray = (array:Array<any>) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return Array.from(array)
  }