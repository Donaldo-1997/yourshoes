import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Dashboard, Left, Right, SubTitleCard, TitleCard, Icon } from './StyledDashboardCard';

export default function DashboardCardUser() {

    const [pet, setPet] = useState({})
    const [donations, setDonations] = useState(0)

    useEffect(() => {
        axios.get('/user').then((r) => {
            let admin = r.data.rows.filter(u=>u.rol === 'admin')
            let user = r.data.rows.filter(u=>u.rol === 'user')
            admin = admin.length
            user = user.length
            setPet({count: r.data.count, admin, user})
        })
        axios.get('/donation').then(r=>{
            setDonations(r.data.length)
        })
    }, [])

    return(
        <Dashboard>
            <Left>
                <div>
                    <TitleCard>Usuarios Totales: {pet.count}</TitleCard>
                    <SubTitleCard>Administradores: {pet.admin}</SubTitleCard>
                    <SubTitleCard>Usuarios: {pet.user}</SubTitleCard>
                </div>
            </Left>
            <Right>
                <Icon />
            </Right>
        </Dashboard>
    )
}