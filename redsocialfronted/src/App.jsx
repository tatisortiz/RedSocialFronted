import React from 'react'
import { BrowserRouter} from "react-router-dom";import "./App.css";
import { Body } from "./views/Body/Body";
import { Header } from './components/Header/Header';

function App() {
	return (
		<>
		<BrowserRouter>
            <Header/>
			<Body />
			</BrowserRouter>
          
		</>
	);
}

export default App;
