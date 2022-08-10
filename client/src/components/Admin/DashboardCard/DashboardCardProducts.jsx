import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dashboard, Left, Right, SubTitleCard, TitleCard, Icon3 } from './StyledDashboardCard';
import { useSelector } from 'react-redux';

export default function DashboardCard() {

    const { products } = useSelector(state => state)
    const [orders, setOrders] = useState([])
    const vendidos = orders && orders.filter(order => order.status === 'realizada').length

    useEffect(() => {
        axios.get('http://localhost:3001/order')
        .then(res => setOrders(res.data))
    }, [])

    return (
        <Dashboard>
            <Left>
                <div>
                    <TitleCard>Productos: {products && products.length}</TitleCard>
                    <SubTitleCard>Vendidos: {vendidos}</SubTitleCard>
                    <SubTitleCard>En stock: {products && products.length - vendidos}</SubTitleCard>
                </div>
            </Left>
            <Right>
                <Icon3 />
            </Right>
        </Dashboard>
    )
}