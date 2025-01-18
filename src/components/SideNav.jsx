import React from "react"
import { first151Pokemon, getFullPokedexNumber } from "../utils"
import { useState } from "react"

export default function SideNav(props) {

    const { selectedPokemon, setSelectedPokemon, handleCloseMenu, showSideMenu } = props

    const [searchValue, setSearchValue] = useState("")

    const filteredPokemon = first151Pokemon.filter((ele, eleIndex) => {
        // if full podex n includes the current search value return true
        if ((getFullPokedexNumber(eleIndex)).includes(searchValue)) {
            return true
        }

        // if the pok name includes the current search value return true
        if (ele.toLowerCase().includes(searchValue.toLowerCase())) {
            return true
        }

        //otherwise exclude form array
        return false
    })

    return (
        <nav className={' ' + (!showSideMenu ? " open" : '')}>
            <div className={"header " + (!showSideMenu ? " open" : '')}>
                <button onClick={handleCloseMenu} className="open-nav-button">
                    <i className="fa-solid fa-arrow-left-long"></i>
                </button>
                <h1 className="text-gradient">Pokédex</h1>
            </div>
            <input
                placeholder="E.g 001 or Bulbasaur..."
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value)
                }}
            />
            {filteredPokemon.map((pokemon, pokemonIndex) => {

                const truePokemonIndex = first151Pokemon.indexOf(pokemon)   

                return (
                    <button
                        onClick={() => {
                            setSelectedPokemon(truePokemonIndex)
                            handleCloseMenu()
                        }}
                        className={
                            "nav-card " +
                            (pokemonIndex === selectedPokemon ? "nav-card-selected" : " ")
                        }
                        key={pokemonIndex}
                    >
                        <p>{getFullPokedexNumber(truePokemonIndex)}</p>
                        <p>{pokemon}</p>
                    </button>
                )
            })}
        </nav>
    )
}
