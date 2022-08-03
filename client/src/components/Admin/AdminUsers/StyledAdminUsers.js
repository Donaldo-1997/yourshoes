import styled from "styled-components";
import Table from '@mui/material/Table';
import { VscArrowLeft } from 'react-icons/vsc';
import Card from '@mui/material/Card';


export const BackgroundListUsers = styled.div`
    background-color: ${(props) => props.theme.background};
    height: auto;
`

export const BackgroundPetition = styled.div`
    background-color: ${(props) => props.theme.background};
    height: 200vh;
`

export const ContainerListUsers = styled.div`
    display: grid;
    grid-template-columns: 150px 1183px;
    gap: 1rem;
    padding-top: 66px;
`

export const TablaOscura = styled(Table)`
    background-color: ${(props) => props.theme.background};
`

export const TextTable = styled.p`
    color: ${(props) => props.theme.search};
`

export const BackgroundCardPetition = styled.div`
    background-color: ${(props) => props.theme.background};
    display: grid;
    grid-template-columns: repeat(3, 400px);
    margin-left: 70px;
    column-gap: 10px;

    @media screen and (max-width: 600px) {
        grid-template-columns: repeat(1, 1fr);
        margin: 0;
        margin-left: 15px;
    }
`

export const CardPetition = styled.div`
    margin-bottom: 20px;
`

export const TitlePetitions = styled.h1`
    text-align: center;
    font-size: 1.5rem;
    color: ${(props) => props.theme.secondary};
`

export const TitleCard = styled.h1`
    text-align: center;
    font-size: 1rem;
    color: ${(props) => props.theme.secondary};
`

export const CardDiv = styled.div`
    margin-bottom: 20px;
` 

export const CardPetitions = styled(Card)`
    background-color: ${(props) => props.theme.card};
`

export const BackPetitions = styled(VscArrowLeft)`
    color: ${(props) => props.theme.secondary};
    margin-left: 20px;
    margin-top: 10px;
    width: 2em;
    height: 2em;
`