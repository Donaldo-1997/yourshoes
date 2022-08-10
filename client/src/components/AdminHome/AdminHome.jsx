import React, { useEffect } from 'react';
import DashboardCard from '../Admin/DashboardCard/DashboardCardProducts';
import DashboardCardUser from '../Admin/DashboardCard/DashboardCardUser';
import SideBar from '../Admin/SideBar/SideBar';
import Chart from '../Admin/Chart/Chart';

import { BackgroundList,
    ContainerDashboard,
    ContainerList,
    ContainerChart,
    Text,
} from './StyledAdminHome';
import axios from 'axios';

export default function AdminHome() {

    useEffect(() => {
        // dispatch para obtener todos los usuarios
        axios.get('http://localhost:3001/user')
        .then(res => {
            localStorage.setItem('users', JSON.stringify(res.data))
        })
    }, [])

    return (
        <BackgroundList style={{paddingTop: '66px'}}>
            <ContainerList>
                <SideBar />
                <div>
                    <ContainerDashboard>
                        <DashboardCard />
                        <DashboardCardUser />
                    </ContainerDashboard>
                    <div>
                        <div>
                            <ContainerChart>
                                <div>
                                    <Text>Ventas:</Text>
                                    <Chart />
                                </div>
                            </ContainerChart>
                        </div>
                    </div>
                </div>
            </ContainerList>
        </BackgroundList >
    )
}