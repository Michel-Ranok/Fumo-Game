import { createContext, useState } from "react"

export const FumoContext = createContext()

export const FumoContextProvider = ({ children }) => {

    const [fumos, setFumos] = useState([])
    const [ownedFumos, setOwnedFumos] = useState([])

    useEffect(() => {
        const myFumos = localStorage.getItem('ownedFumos')
        if (myFumos) {
            setOwnedFumos(JSON.parse(myFumos))
        }
    }, [])

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

    const contextValues = {}

    return <ShopContext.Provider value={contextValues}>{children}</ShopContext.Provider>
}