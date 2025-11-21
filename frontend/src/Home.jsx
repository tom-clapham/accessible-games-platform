import { useEffect, useState} from 'react'
import axios from 'axios'
import Navbar from './Components/Navbar/Navbar.jsx'
import './index.css'

function Home() {
    const [games, setGames] = useState()
    useEffect(() => {
            axios.get("http://127.0.0.1:8000/app/threads/helloWorld")
            .then(res => setGames(res.data))
            .catch(err => console.log(err))
        }, [games])
    
        return(
        <div>
            <div className='navbar-container'>
                <Navbar/>
            </div>
            <h1>Hello World</h1>
            <p>axios call results: {games}</p>
        </div>
    )
}

export default Home;