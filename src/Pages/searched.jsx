import React, { useState, useEffect } from "react";
import { useParams,Link } from "react-router-dom";
import styled from "styled-components";

function Searched() {

    const [searchedReceipes, setSearchedReceipes] = useState([])

    let params = useParams()

    useEffect(() => {
        getSearched(params.search)
    }, [params.search])

    const getSearched = async (name) => {
        debugger
        const data = await fetch(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`)
        debugger
        const recipes = await data.json();
        debugger
        setSearchedReceipes(recipes.results)
    }

    return (
        <Grid>
            {searchedReceipes.map((item) => {
                return (
                    <Card key={item.id}>
                        <Link to={"/recipe/" + item.id}>
                            <img src={item.image} alt="" />
                            <h4>{item.title}</h4>
                        </Link>
                    </Card>
                )
            })}
        </Grid>
    )
}

const Grid = styled.div`
display:grid;
grid-template-columns:repeat(auto-fit,minmax(20rem,1fr));
grid-grap:3rem;
`
const Card = styled.div`
img {
    width:100%;
    border-radius:2rem;
}
a {
    text-decoration:none;
}
h4 {
    text-align:center;
    padding:1rem;
}
`

export default Searched