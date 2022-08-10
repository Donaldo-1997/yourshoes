import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const compras = ['compra1', 'compra2', 'compra3']

export default function UserEdit({ data, closeModal }) {

    const navigate = useNavigate()

    const [state, setState] = useState({
        name: data.name,
        surname: data.surname,
        address: data.address,
        phone_number: data.phone_number
    })

    const [ order, setorder ] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:3001/order`, { email: data.email })
        .then(res => {
            console.log(res)
            setorder(res.data)
        })
    }, [])

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    const updateUser = (event) => {
        event.preventDefault()
        const respuesta = window.confirm(`Está seguro de actualizar el usuario "${data.name}"`)
    
        console.log('STATE --->', state)
    
        if(respuesta){
          axios.put(`http://localhost:3001/user?email=${data.email}`, state)
          .then(res => {
            console.log(res)
            closeModal()
          })
        }
      }

    return (
        <div style={{
            backgroundColor: '#fff'
        }}>
            <div>
                <img style={{ borderRadius: '50%' }} src={data.image} />
            </div>
            <form
                onSubmit={updateUser} 
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '5px',
                    padding: '0 20px'
            }}>
                <div>
                    <p>Name:</p>
                    <input type="text" name='name' value={state.name} onChange={handleChange} />
                </div>
                <div>
                    <p>Apellidos:</p>
                    <input type="text" name='surname' value={state.surname} onChange={handleChange} />
                </div>
                <div>
                    <p>Dirección:</p>
                    <input type="text" name='address' value={state.address} onChange={handleChange} />
                </div>
                <div>
                    <p>Número de teléfono:</p>
                    <input type="text" name='phone_number' value={state.phone_number} onChange={handleChange} />
                </div>
                <div style={{ gridColumn: '1 / span 2' }}>
                    <button style={{ width: '100%' }} type="submit">Guardar</button>
                </div>
            </form>
            <div>
                <h1>Historia de compras:</h1>
                <div>
                    {order && order.length ? order.map((elem, i) => (
                        <div key={i}>
                            <p>{elem.amount}</p>
                            <p>{elem.address}</p>
                            <p>{elem.status}</p>
                            <p>{elem.date}</p>
                        </div>
                    )) : 
                    <div><h3>No hay compras</h3></div>
                    }
                </div>
            </div>
        </div>
    )
}
