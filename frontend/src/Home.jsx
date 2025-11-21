import { useNavigate } from 'react-router-dom';

function Home() {
    const nav = useNavigate();

    return(
        <div>
            <h1>HOME PAGE</h1>
        </div>
    )
}

export default Home;