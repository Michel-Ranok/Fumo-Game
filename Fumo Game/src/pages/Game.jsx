import { useState, useEffect } from 'react'
import axios from "axios"

let fumoUrl = "http://127.0.0.1:3000/fumo"

function Game() {
  const [fumoCoins, setFCoins] = useState(100)
  const [fumoSouls, setFSouls] = useState(0)
  const [gameStarted, setGameStarted] = useState(false)
  const [coinsPerClick, setCPC] = useState(1)
  const [fumos, setFumos] = useState([])
  const [summonedFumo, setSummFumo] = useState({
    id: "",
    name: "",
    url: "",
    attack: "",
    power: "",
    spell: ""
  })
  const [ownedFumos, setOwnedFumos] = useState([])

  // init localstorage values
  useEffect(() => {
    const fCoins = localStorage.getItem('fumoCoins')
    const gameStarted = localStorage.getItem('gameStarted')
    const myFumos = localStorage.getItem('ownedFumos')
    if (fCoins) {
      setFCoins(parseInt(fCoins))
    }
    if (gameStarted) {
      setGameStarted(gameStarted)
    }
    if (myFumos) {
      setOwnedFumos(JSON.parse(myFumos))
    }
  }, [])

  useEffect(() => {
    calculateCPC()
  }, [ownedFumos])

  // Update localstorage for fumoCoins
  useEffect(() => {
      if (fumoCoins >= 0) {
        localStorage.setItem('fumoCoins', fumoCoins)
      }
  }, [fumoCoins])

  // Update localstorage for gameStarted
  useEffect(() => {
    if (gameStarted) {
      localStorage.setItem('gameStarted', gameStarted)
    }
  }, [gameStarted])

  useEffect(() => {
    if (ownedFumos) {
      localStorage.setItem('ownedFumos', JSON.stringify(ownedFumos))
    }
  }, [ownedFumos])

  const summonFumo = async () => {
    await axios.get(fumoUrl)
      .then((res) => res.data)
      .then(data => {
        setFumos(data)
        let random = Math.floor(Math.random() * data.length)
        setOwnedFumos(owned => [...owned, data[random]])
      })
      .catch(err => console.log(err))
  }

  const calculateCPC = () => {
    if(ownedFumos) {
      ownedFumos.map((fumo) => addCPC(fumo.power))
    } else setCPC(1)
  }

  const addCPC = (num) => {
    let newCPC = coinsPerClick + num
    console.log(newCPC)
    setCPC(newCPC)
  }

  const handleReset = () => {
    localStorage.clear()
    setFCoins(100)
    setFSouls(0)
    setGameStarted(!gameStarted)
    setOwnedFumos([])
    setCPC(1)
  }

  const handleStart = () => {
    setGameStarted(!gameStarted)
  }

  const handleFumoClick = () => {
    let coinCount = fumoCoins + coinsPerClick
    setFCoins(coinCount)
  }

  const handleSummon = () => {
    let coinCount = fumoCoins - 50
    setFCoins(coinCount)
    summonFumo()
  }

  if (gameStarted) {
    return (
      <>
        <div className="currencies">
          <div className="FCoins">Fumo coins: {fumoCoins}</div>
          <div className="souls">Fumo Souls: {fumoSouls}</div>
        </div>
        <div className="w-max">
          <img className="inset-16 w-32" src="https://media.tenor.com/dEzP_xFI_oQAAAAC/touhou-fumo.gif" onClick={() => handleFumoClick()}/>
          <p>Coins per click: {coinsPerClick}</p>
        </div>
        <button onClick={() => handleSummon()} disabled={!(fumoCoins >= 50)}>50 Fumo coins - Summon Fumo</button>
        <button onClick={() => handleReset()}>Reset Game</button>
        <br/>
        <ul className='grid grid-cols-5'>
          {ownedFumos.map((fumo) => (
            <li className='relative flex flex-col justify-top items-center border-double border-2' key={fumo.id}>
              <img className='mx-auto' src={fumo.url} />
              <h2>{fumo.name}</h2>
              <h3 className='mb-8'>{fumo.attack} ATK - {fumo.power} PWR <br/> spell effect: {fumo.spell}</h3>
            </li> 
          ))}
        </ul>
      </>
    )
  } else {
    return (
      <>
        <button onClick={() => handleStart()}>Start Game</button>
      </>
    )
  }
}

export default Game