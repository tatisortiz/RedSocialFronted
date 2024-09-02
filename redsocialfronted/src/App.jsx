import React from 'react'
import { BrowserRouter} from "react-router-dom";import "./App.css";
import { Body } from "./views/Body/Body";
import { Header } from './components/Header/Header';

function App() {
	return (
		<>
			<BrowserRouter>
				<main className='app-main'>
					<Header/>
					<Body />
				</main>
			</BrowserRouter>
		</>
	);
}

export default App;
