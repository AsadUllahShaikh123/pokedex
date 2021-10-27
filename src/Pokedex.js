import React, { useState, useEffect } from 'react'
import {
    AppBar,
    Toolbar,
    Typography,
    Grid,
    Card,
    CircularProgress,
    CardMedia,
    CardContent,
    TextField, Container
} from '@mui/material'

import axios from 'axios';

import { Search } from '@mui/icons-material';

function Pokedex(props) {
    let { history } = props;

    // Will Store the Data of All Pokemon 
    let [pokemonData, setPokemonData] = useState({});

    // will store the value of Input Text Field
    let [filter, setFilter] = useState("")



    // It will give us the value of Input Text Field 
    let handleSearchChange = (e) => {
        setFilter(e.target.value);
    }

    // Fetching the data of 898 Data this data will again give us the URL Which we will have to fetch again 

    useEffect(() => {
        axios.get('https://pokeapi.co/api/v2/pokemon?limit=898')
            .then((response) => {
                const { data } = response;
                const { results } = data;
                const newPokemonData = {};
                results.forEach((pokemon, index) => {
                    newPokemonData[index + 1] = {
                        id: index + 1,
                        name: pokemon.name,
                        sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index + 1}.png`
                    }
                });
                setPokemonData(newPokemonData);
            });
    }, [])


    let toUpperCase = (name) => name.charAt(0).toUpperCase() + name.slice(1)


    // The Data of Each and every pokemon will be destructured here which we are getting by using the map() below 

    let getPokemonCard = (pokemonId) => {
        let { id, name, sprite } = pokemonData[pokemonId]
        console.log(pokemonData[pokemonId]);
        return (
            <Grid item xs={12} lg={4} md={6} key={pokemonId}>
                <Card onClick={() => history.push(pokemonId)} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <CardMedia
                        image={sprite}
                        style={{ width: '120px', height: '120px' }}
                    />
                    <CardContent>
                        <Typography variant="h5">
                            {`${id}.${toUpperCase(name)}`}
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        )
    }
    return (
        <>
            {/* App Bar or Simply Header */}
            <AppBar position="fixed" style={{ backgroundColor: 'black' }}>
                <Toolbar>
                    <Typography variant="h4" marginRight="2rem" >
                        Pokemon
                    </Typography>
                    
                    {/* Search Icon  */}

                    <Search />
                    <TextField

                        inputProps={{ style: { color: 'white' } }}
                        variant="standard" sx={{ color: 'white' }} onChange={(e) => handleSearchChange(e)}
                        placeholder="Search..." />
                </Toolbar>
            </AppBar>
            {
                pokemonData ? (

                    <Container maxWidth="md" style={{ marginTop: '5rem' }} >

                        <Grid container spacing={2}  >
                            {Object.keys(pokemonData).map((pokemonId) =>
                                pokemonData[pokemonId].name.includes(filter.toLowerCase()) &&
                                getPokemonCard(pokemonId))}

                        </Grid>
                    </Container>

                ) : (
                    <CircularProgress />
                )
            }

        </>
    )
}

export default Pokedex
