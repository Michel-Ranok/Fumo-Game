import { useState, useEffect } from 'react'
import axios from "axios"

let fumoUrl = "http://127.0.0.1:3000/fumo"

function Home() {
  const [count, setCount] = useState(0)
  const [fumos, setFumos] = useState([])
  const [fumo, setRandomFumo] = useState({
    id: "",
    name: "",
    url: "",
    attack: "",
    power: "",
    spell: ""
})

function generateFumo() {
  axios.get(fumoUrl)
    .then((res) => res.data)
    .then(data => {
      setFumos(data)
      let random = Math.floor(Math.random() * data.length)
      setRandomFumo(data[random])
    })
    .catch(err => console.log(err))
}

useEffect(() => {
    generateFumo()
}, [])

  return (
    <>
      <h1>Fumo Game</h1>
      <div className="card">
        <img src="https://media.tenor.com/dEzP_xFI_oQAAAAC/touhou-fumo.gif" onClick={() => setCount((count) => count + 1)}/>
          count is {count}
        <p>{fumo.name}</p>
        <img src={fumo.url} className="src" />
        <p>attack: {fumo.attack} - power: {fumo.power} - spell effect: {fumo.spell}</p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default Home
