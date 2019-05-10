import { connect } from 'react-redux'
import { decodeWSMessage } from './Actions'
import UIManager from './UIManager'

const mapStateToProps = (state:RState) => {
    return state
};

const mapDispatchToProps = (dispatch:any) => {
    return {
        onWSMessage: (data:any) => {
            dispatch(decodeWSMessage(data))
        }
    }
};


const UIStateContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(UIManager);

export default UIStateContainer;