import { useState, useEffect } from 'react'
import axios from "axios"

let fumoUrl = "http://127.0.0.1:3000/fumo"

function Game() {
  const [fumoCoins, setFCoins] = useState(50)
  const [gameStarted, setGameStarted] = useState(false)
  const [coinsPerClick, setCPC] = useState(1)
  const [fumos, setFumos] = useState([])
  const [summonedFumo, setSummFumo] = useState({
    id: "",
    name: "",
    url: "",
    attack: "",
    power: "",
    spell: "",
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

  const summonFumo = () => {
    axios.get(fumoUrl)
      .then((res) => res.data)
      .then(data => {
        setFumos(data)
        let random = Math.floor(Math.random() * data.length)
        addFumo(data[random])
      })
      .catch(err => console.log(err))
  }

  const addFumo = (fumo) => {
    const ownedFumo = ownedFumos.find(owned => owned.id === fumo.id)
    if(ownedFumo) {
      const newLevel = ownedFumo.level + 1
      fumo.level = newLevel
      fumo.attack = fumo.attack + newLevel - 1
      fumo.power = fumo.power + newLevel - 1
      let newOwnedFumos = ownedFumos.filter(owned => owned.id !== fumo.id)
      newOwnedFumos.push(fumo)
      setOwnedFumos(newOwnedFumos)
    } else {
      fumo.level = 1
      setOwnedFumos(owned => [...owned, fumo])
    }
  }

  const calculateCPC = () => {
    let newCPC = 1
    console.log(ownedFumos)
    if(ownedFumos != []) {
      ownedFumos.map((fumo) => {
        let fumoPower = fumo.power
        newCPC += fumoPower
      })
    }
    setCPC(newCPC)
  }

  const handleReset = () => {
    localStorage.clear()
    setFCoins(50)
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
        </div>
        <div className="w-max top-10">
          <p>Click on the fumo to get coins !</p>
          <img className="inset-16 w-32 border-3 border-yellow-400" src="https://media.tenor.com/dEzP_xFI_oQAAAAC/touhou-fumo.gif" onClick={() => handleFumoClick()}/>
          <p>Coins per click: {coinsPerClick}</p>
          <button onClick={() => handleSummon()} disabled={!(fumoCoins >= 50)} className='border-teal-300 border-2'>50 Fumo coins - Summon Fumo</button>
          <button onClick={() => handleReset()} className='bg-red-600'>Reset Game</button>
        </div>

        <ul className='grid grid-cols-5'>
          {ownedFumos.map((fumo) => (
            <li className='relative flex flex-col justify-top items-center border-double border-2' key={fumo.id}>
              <img className='mx-auto' src={fumo.url} />
              <h2>{fumo.name}</h2>
              <h3 className='mb-8'>{fumo.attack} ATK - {fumo.power} PWR <br/> Level {fumo.level}</h3>
            </li> 
          ))}
        </ul>
      </>
    )
  } else {
    return (
      <>
        <button onClick={() => handleStart()} className='bg-green-500'>Start Game</button>
      </>
    )
  }
}

export default Game