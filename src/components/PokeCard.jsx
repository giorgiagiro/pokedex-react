import React from "react"
import { useEffect } from "react"
import { useState } from "react"
import { getPokedexNumber, getFullPokedexNumber } from "../utils"
import Modal from "./Modal"
import TypeCard from "./TypeCard"

export default function PokeCard(props) {
    const { selectedPokemon } = props

    const [data, setData] = useState(null)

    const [loading, setLoading] = useState(false)

    const [skill, setSkill] = useState(null)

    const [loadingSkill, setLoadingSkill] = useState(false)

    const { name, height, abilities, stats, types, moves, spirites } = data || {}

    useEffect(() => {
        console.log(selectedPokemon)

        //loading state, if loading, exit loop
        //if (loading || !localStorage) return

        //check if selected pokemon info is available in cache
        // 1. define the cache
        let cache = {}
        if (localStorage.getItem("pokedex")) {
            cache = JSON.parse(localStorage.getItem("pokedex"))
        }

        // 2. check if selected pokemon is in the cache, otherwise check API
        if (selectedPokemon in cache) {
            // read from cache
            setData(cache[selectedPokemon])
            return
        }

        // if fetch from api, save information to the cache for next time
        // 3. fetch from API
        async function fetchPokemonData() {
            setLoading(true)
            try {
                const baseUrl = "https://pokeapi.co/api/v2/"
                const suffix = "pokemon/" + getPokedexNumber(selectedPokemon)
                const finalUrl = baseUrl + suffix
                console.log("Indirixx: " + finalUrl)
                const res = await fetch(finalUrl)
                const pokemonData = await res.json()
                setData(pokemonData)
                console.log(pokemonData)

                cache[selectedPokemon] = pokemonData
                localStorage.setItem("pokedex", JSON.stringify(cache))
            } catch (err) {
                console.log(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchPokemonData()
    }, [selectedPokemon])

    if (loading || !data) {
        return (
            <div>
                <h4>Loading...</h4>
            </div>
        )
    }

    return (
        <div className="poke-card">
            {/*<Modal
                handleCloseModal={() => {
                    setSkill(null)
                }}
            >
                <div>
                    <h6>Name</h6>
                    <h2 className="skill-name">{skill.name.replaceAll("-", " ")}</h2>
                </div>
                <div>
                    <h6>Description</h6>
                    <p>{skill.description}</p>
                </div>
            </Modal>*/}

            <div>
                <h4>#{getFullPokedexNumber(selectedPokemon)}</h4>
                <h2>{name}</h2>
            </div>
            <div className='type-container'>
                {types.map((typeObj, typeIndex) => {
                    return (
                        <TypeCard key={typeIndex} type={typeObj?.type?.name} />
                    )
                })}
            </div>

            <img className='default-img' src={'/pokemon/' + getFullPokedexNumber(selectedPokemon) + '.png'} alt={`${name}-large-img`} />
           {/* <div className='img-container'>
                {imgList.map((spriteUrl, spriteIndex) => {
                    const imgUrl = sprites[spriteUrl]
                    return (
                        <img key={spriteIndex} src={imgUrl} alt={`${name}-img-${spriteUrl}`} />
                    )
                })}
            </div>*/}

        </div>
    )
}
