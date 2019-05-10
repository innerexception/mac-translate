import "babel-polyfill";
import 'normalize.css'
import { render } from 'react-dom'
import App from './client/App'
import * as React from 'react'

render(<App />, document.getElementById('appRoot'));