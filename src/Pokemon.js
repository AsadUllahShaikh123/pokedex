import { CircularProgress,
     Typography, 
     Button 
    } from '@mui/material';

import React, { useEffect, useState } from 'react'

import { Link } from 'react-router-dom';

import axios from 'axios';


function Pokemon(props) {

    // the props have the data which we will destructure and get the required data 
    let { history, match } = props;
    let { params } = match;

    // This is giving the id of Clicked one pokemon  
    let { pokemonId } = params;


    // Used for storing the data of Clicked one Pokemon 
    let [pokemon, setPokemon] = useState(undefined)



    // It will give us the data of Pokemon which is being clicked 
    useEffect(() => {
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then((response) => {
                const { data } = response;
                setPokemon(data);
            })
            .catch((error) => {
                setPokemon(false);
            })
    }, [pokemonId])

    // As the name pokemon name starts with LowerCase so we are editing to UpperCase
    let toFirstUpperCase = (name) => name.charAt(0).toUpperCase() + name.slice(1)


    //   Generate the Page which will be shown when we wil click any Pokemon and will give us the information of clicked one pokemon

    let generatePokemonJSX = () => {
        let { name, id, species, height, weight, types, sprites } = pokemon;
        const fullImgUrl = id < 10 ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${id}.png` : id < 100 ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${id}.png` : `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`
        let { front_default } = sprites;
        return (
            <>
                <Typography variant="h2" >
                    {`${id}.${toFirstUpperCase(name)}`}
                    <img src={front_default} alt="Pokemon" />
                </Typography>
                <img style={{ width: '300px', height: '300px' }} src={fullImgUrl} alt="Full Pic" />
                <Typography variant="h3">
                    POKEMON INFO
                </Typography>
                <Typography>
                    {"Species: "}
                    <Link href={species.url}>{species.name}</Link>
                </Typography>
                <Typography>  Height: {height}</Typography>
                <Typography>  Weight: {weight}</Typography>
                {
                    types.map((typesInfo) => {
                        let { type } = typesInfo;
                        let { name } = type;
                        return <Typography key={name}> {`${name}`}</Typography>
                    })
                }

            </>
        )
    }
    return (

        <>
             {/* 1. Pokemon = undefined , that means we are getting the info 
             -> return the Loading progress
            2. Pokemon = good data , that means we have gotten the info 
             -> return the actual data 
            3. Pokemon = bad data  / false 
             -> return pokemon not found  */}


            {pokemon === undefined && <CircularProgress />}
            {pokemon !== undefined && pokemon && generatePokemonJSX()}
            {pokemon === false && <Typography>Pokemon Not Found</Typography>}
            {pokemon !== undefined && (
                <Button variant="contained" onClick={() => history.push('/')}> Back to Pokedex </Button>
            )}

        </>

    )
}

export default Pokemon
