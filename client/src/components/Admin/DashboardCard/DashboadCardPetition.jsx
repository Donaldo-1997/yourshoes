import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Dashboard, Left, Right, SubTitleCard, TitleCard, Icon2 } from './StyledDashboardCard';

export default function DashboardCardPetition() {

    const [pet, setPet] = useState({})

    useEffect(() => {
        axios.get('/countP').then((r) => {setPet(r.data)})
    }, [])

    return(
        <Dashboard>
            <Left>
                <div>
                    <TitleCard>Peticiones Totales: {pet.total}</TitleCard>
                    <SubTitleCard>Formulario Adoptar: {pet.get}</SubTitleCard>
                    <SubTitleCard>Formulario poner en Adopcion: {pet.load}</SubTitleCard>
                    <SubTitleCard>Formulario Extraviados: {pet.getLost}</SubTitleCard>
                </div>
            </Left>
            <Right>
                <Icon2 />
            </Right>
        </Dashboard>
    )
}