import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { Dashboard, Left, Right, SubTitleCard, TitleCard, Icon } from './StyledDashboardCard';

export default function DashboardCardUser() {

    const users = JSON.parse(localStorage.getItem('users'))
    const admins = users && users.filter(usu => usu.isAdmin)
    const normalUsers = users && users.filter(usu => !usu.isAdmin)

    return(
        <Dashboard>
            <Left>
                <div>
                    <TitleCard>Usuarios Totales: {users && users.length}</TitleCard>
                    <SubTitleCard>Administradores: {admins && admins.length}</SubTitleCard>
                    <SubTitleCard>Usuarios: {normalUsers && normalUsers.length}</SubTitleCard>
                </div>
            </Left>
            <Right>
                <Icon />
            </Right>
        </Dashboard>
    )
}