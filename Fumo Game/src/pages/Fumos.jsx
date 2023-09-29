import { useState, useEffect } from 'react'
import axios from "axios"

let fumoUrl = "http://127.0.0.1:3000/fumo"

function Fumos() {
  const [fumos, setFumos] = useState([])
  const [ownedFumos, setOwned] = useState({
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
      <ul className='grid grid-cols-5'>
        {fumos.map((fumo) => (
            <li className='relative flex flex-col justify-top items-center border-double border-2' key={fumo.id}>
                <img className='mx-auto' src={fumo.url} />
                <h2>{fumo.name}</h2>
                <h3 className='mb-8'>{fumo.attack} ATK - {fumo.power} PWR <br/> spell effect: {fumo.spell}</h3>
                {/* <button className='mt-12 absolute bottom-0 w-36' onClick={() => handleAdd(fumo)}>Ajouter</button> :  */}
            </li> 
        ))}
      </ul>
    </>
  )
}

export default Fumos
