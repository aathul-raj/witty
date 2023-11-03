import './MenuButton.css'

// eslint-disable-next-line react/prop-types
export default function MenuButton( {text, isActive, setActive} ){
    return <button className={`menu-button ${isActive ? "active" : ""}`} onClick={() => {setActive(text)}}>{text}</button>
}