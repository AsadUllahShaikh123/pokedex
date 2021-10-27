import { CircularProgress, Typography,Button} from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
function Pokemon(props) {


    let { history,match } = props;
    let { params } = match;
    let { pokemonId } = params;

    let [pokemon, setPokemon] = useState(undefined)

    //1. Pokemon = undefined , that means we are getting the info 
    // -> return the Loading progress
    //2. Pokemon = good data , that means we have gotten the info 
    // -> return the actual data 
    //3. Pokemon = bad data  / false 
    // -> return pokemon not found 


    useEffect(()=>{
        axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
        .then((response)=> {
            const {data} = response;
            setPokemon(data);
        })
        .catch((error)=>{
            setPokemon(false);
        })
    },[pokemonId])

    let toFirstUpperCase=(name)=> name.charAt(0).toUpperCase() + name.slice(1)
    
    let generatePokemonJSX = () => {
        let { name, id, species, height, weight, types, sprites } = pokemon;
        const fullImgUrl = id <10  ? `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/00${id}.png`:  id <100 ?`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/0${id}.png` :`https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${id}.png`
        let { front_default } = sprites;
        return (
            <>
            <Typography variant="h2" >
                {`${id}.${toFirstUpperCase(name)}`}
                <img src={front_default} alt="Pokemon" />
            </Typography>
            <img style={{width:'300px',height:'300px'}} src={fullImgUrl} alt="Full Pic"/>
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
                types.map((typesInfo)=> {
                    let {type} = typesInfo;
                    let {name} = type;
                    return <Typography key={name}> {`${name}`}</Typography>
                })
            }

            </>
        )
    }
    return (
        
            <>
               {pokemon === undefined && <CircularProgress/>}
               {pokemon !== undefined && pokemon && generatePokemonJSX()}
               {pokemon === false && <Typography>Pokemon Not Found</Typography>}
               { pokemon !== undefined && (
                   <Button variant = "contained" onClick={()=> history.push('/')}> Back to Pokedex </Button>
               )}
               
            </>
       
    )
}

export default Pokemon
