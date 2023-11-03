import Footer from '../../Components/Footer/Footer'
import Waves from '../../assets/waves.png'
import { useNavigate } from 'react-router-dom'
import './Home.css'

export default function Home(){
    let navigate = useNavigate();

    return <main className="home-container">
        <nav className="header">
            <h1 className="logo">WITTY</h1>
            <button className="start-btn" onClick={() => navigate("/trainer")}>START</button>
        </nav>
        <h1 className="landing-text">
            Think<br/><span className="orange">Fast</span>
        </h1>
        <h2 className="landing-sub">
            Improve your mental math today.
        </h2>
        <Footer/>
        <img src={Waves} alt="" className="waves"/>
    </main>
}