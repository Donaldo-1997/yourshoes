import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dashboard, Left, Right, SubTitleCard, TitleCard, Icon3 } from './StyledDashboardCard';

export default function DashboardCard() {

    const [pet, setPet] = useState({});

    useEffect(() => {
        axios.get('pet/count').then((response) => { setPet(response.data) })
    }, [])

    return (
        <Dashboard>
            <Left>
                <div key={pet.id}>
                    <TitleCard>Productos: {pet.pets}</TitleCard>
                    <SubTitleCard>Vendidos: {pet.adopted}</SubTitleCard>
                    <SubTitleCard>En stock: {pet.lost}</SubTitleCard>
                </div>
            </Left>
            <Right>
                <Icon3 />
            </Right>
        </Dashboard>
    )
}