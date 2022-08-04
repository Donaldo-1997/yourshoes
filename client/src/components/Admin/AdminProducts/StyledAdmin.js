import styled from "styled-components";


export const BackgroundList = styled.div`
    background-color: ${(props) => props.theme.background};
    height: auto;
`

export const ContainerList = styled.div`
    display: grid;
    grid-template-columns: 150px 1183px;
    gap: 1rem;
    padding-top:67px;
    
`