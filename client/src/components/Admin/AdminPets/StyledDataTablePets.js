import styled from 'styled-components';
import {Link} from 'react-router-dom';
import Table from '@mui/material/Table';

export const DivButtons = styled.div`
    display: flex;
    align-items: center;
    gap: 15px;
`

export const ButtonEdit = styled(Link)`
    color: ${(props) => props.theme.search};
    text-decoration: none;
    padding: 2px 5px;
    border-radius: 5px;
    border: 1px solid ${(props) => props.theme.search};
    cursor: pointer;
`

export const ButtonDelete = styled.button`
    background-color: ${(props) => props.theme.background};
    padding: 2px 5px;
    border-radius: 5px;
    color: red;
    border: 1px solid red;
    cursor: pointer;
`

export const TablaOscura = styled(Table)`
    background-color: ${(props) => props.theme.background};
`

export const TextTable = styled.p`
    color: ${(props) => props.theme.search};
`