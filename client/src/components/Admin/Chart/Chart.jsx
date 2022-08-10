import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, YAxis, XAxis } from "recharts";
import { useDispatch, useSelector } from 'react-redux';
import { getAllShoes } from '../../../redux/actions';
import NavBar2 from "../../Navbar2/Navbar2"


export default function Chart() {

  const products = useSelector((state) => state.products)
  const users = JSON.parse(localStorage.getItem('users'))

  // console.log('products',products)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllShoes())
  }, [])

  
  const data = [
    {
      "name": "Productos",
      "info": products.length,
    },
    {
      "name": "Users",
      "info": users && users.length,
    },
    // {
    //   "name": "...",
    //   "info": products[0].name,
    // },
  ]

  return (
    <div>
      <NavBar2/>
      <BarChart width={800} height={250} data={data}>
        <h1>VENTAS:</h1>
        <XAxis dataKey="name"/>
        <YAxis />
        <Bar barSize={50} dataKey="info" fill="rgb(248, 125, 45)" />
      </BarChart>
    </div>
  );
}

