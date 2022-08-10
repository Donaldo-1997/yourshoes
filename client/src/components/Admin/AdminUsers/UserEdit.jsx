import React, { useState } from 'react'

const compras = ['compra1', 'compra2', 'compra3']

export default function UserEdit({ data }) {

    const [state, setState] = useState({
        name: data.name,
        surname: data.surname,
        email: data.email,
        address: data.address
    })

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value
        })
    }

    console.log(data)

    return (
        <div style={{
            backgroundColor: '#fff'
        }}>
            <div>
                <img style={{ borderRadius: '50%' }} src={data.image} />
            </div>
            <form
                onSubmit={(e) => {
                    e.preventDefault()
                    window.confirm('Actualizar datos del usuario?')
                }} 
                style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '5px',
                    padding: '0 20px'
            }}>
                <div>
                    <input type="text" name='name' value={state.name} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" name='surname' value={state.surname} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" name='email' value={state.email} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" name='email' value={state.address} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" name='email' value={state.email} onChange={handleChange} />
                </div>
                <div>
                    <input type="text" name='email' value={state.email} onChange={handleChange} />
                </div>
                <div style={{ gridColumn: '1 / span 2' }}>
                    <button style={{ width: '100%' }} type="submit">Guardar</button>
                </div>
            </form>
            <div>
                <h1>Historia de compras:</h1>
                <div>
                    {compras.map((c, i) => (
                        <div key={i}>
                            <span>{c}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
