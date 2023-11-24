import { useEffect, useState } from "react"
import './App.css'

const FACT_URL = 'https://catfact.ninja/fact'

const IMG_URL = `https://cataas.com/cat/says/`

export function App() {
    const [fact, setFact] = useState('Fact por defecto sobre gatos')
    const [img, setImg] = useState()
    const [factError, setFactError] = useState()

    /* //Solución con los con fetch anidado
        const getFact = async () => {
            await fetch(FACT_URL)
                .then(
                    response => response.json()
                )
                .then(
                    data => {
                        setFact(data.fact)
                        const firstThreeWords = data.fact.split(" ").splice(0, 3).join(" ")
    
                        console.log(`${IMG_URL}${firstThreeWords}`.toString())
                        fetch(`${IMG_URL}${firstThreeWords}?fontSize=40&fontColor=blue?size=50`)
                            .then(
                                response => {
                                    response.json()
                                    setImg(response.url)
                                }
                            )
    
                    }
                )
                .catch(function (error) {
                    console.log("Error fetching cat fact")
                })
        }
    */
    //Solución separando fetchs
    //funciones asíncronas siempre se usa catch, si no fuese asíncrona, podemos quitar el catch
    //y manejar los errores en el .then 
    const getFact = async () => {
        await fetch(FACT_URL)
            .then(
                response => {
                    //manejo de errores
                    if (!response.ok) throw new Error('Error fetching fact')
                    return response.json()
                }
            )
            .then(
                data => {
                    setFact(data.fact)
                }
            )
            .catch((error) => {
                //tanto si hay un error con la respuesta 
                //como si hay un error en la petición
                console.log("Error fetching cat fact")
            })
    }
    const getImg = async () => {
        const firstThreeWords = fact.split(" ").splice(0, 3).join(" ")
        await fetch(`${IMG_URL}${firstThreeWords}?fontSize=40&fontColor=blue?size=50`)
            .then(
                response => {
                    response.json()
                    setImg(response.url)
                }
            )
    }
    //Cargar hecho 
    useEffect(() => {
        getFact()
    }, [])
    //Cargar imagen con texto una vez se obtiene el hecho
    useEffect(() => {
        if (!fact) return
        getImg()
    }, [fact])
    return (
        <div className="container">
            <h1>App de gatos</h1>
            <section>
                {fact
                    && <p>{fact}</p>
                }

                {
                    img
                    && <img src={img}></img>
                }
            </section>
        </div>
    )
}