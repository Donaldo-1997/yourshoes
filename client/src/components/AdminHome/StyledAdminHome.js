import styled from "styled-components";


export const BackgroundList = styled.div`
    background-color: ${(props) => props.theme.background};
    height: 100vh;
`

export const ContainerList = styled.div`
    display: grid;
    grid-template-columns: 150px 1183px;
    gap: 1rem;
`

export const ContainerDashboard = styled.div`
    width: 95%;
    display: flex;
    padding: 20px;
    gap: 20px;
    height: 100px;
`

export const ContainerChart = styled.div`
    display: flex;
    padding: 5px 20px;
    margin-top: 40px;
`

export const ContainerCircleChart = styled.div`
    height: 300px;
    margin-bottom: 70px;
`

export const ContainerBarChart = styled.div`
    margin-top: 70px;
`

export const Subtitle = styled.h1`
    font-size: 1rem;
    margin: 0;
    color: ${(props) => props.theme.font_alt};
    text-align: center;
`

export const Text = styled.h1`
    font-size: 1rem;
    margin: 0;
    margin-bottom: 80px;
    color: ${(props) => props.theme.font_alt};
    text-align: center;
`