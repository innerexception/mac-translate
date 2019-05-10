import * as React from 'react';
import Match from '../match/Match'
import Login from '../Splash'
import AppStyles from '../../AppStyles';

interface Props {
    currentUser: Player
    activeSession: Session
}

export default class UIManager extends React.Component<Props> {
    getComponent = () => {
        if(!this.props.currentUser.id){
            return <Login {...this.props}/>
        }
        else {
            return <Match {...this.props}/>
        }
    }

    render(){
        return (
            <div style={styles.frame}>
                {this.getComponent()}
            </div>
        )
    }
}

const styles = {
    frame: {
        height: '100vh',
        display:'flex', justifyContent:'center', alignItems:'center',
        backgroundImage: 'url('+require('../../assets/grayTile.png')+')',
        backgroundRepeat: 'repeat'
    },
    dot: {
        height:'0.5em',
        width:'0.5em',
        borderRadius: '0.5em'
    },
    statusDot: {
        position:'absolute' as 'absolute', bottom:'0.5em', right:'0.5em',
        display:'flex',
        color:AppStyles.colors.black,
        alignItems:'center'
    }
}