import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function UserProfile(){
    const dispatch = useDispatch()
    const infoUser = useSelector((state) => state.user)
    console.log(infoUser)

    return(
        <div>
            <div>
                {
                    infoUser ? 
                    <div>
                        {!infoUser.image ? <img src="https://cdn4.iconfinder.com/data/icons/e-commerce-181/512/477_profile__avatar__man_-512.png"/> : <img src={infoUser.image}/>} 
                        {!infoUser.name ? <h1>Nombre: {infoUser.user.name}</h1> : <h1>Nombre: {infoUser.name}</h1>}
                        <h1>Apellido: {infoUser.surname}</h1>
                        <h1>E-mail: {infoUser.email}</h1>
                        {infoUser.address === null ? <h1>Direccion: {"Agrega tu direccion"}</h1> : <h1>Direccion: {infoUser.address}</h1>}
                        {infoUser.date_of_Birth === null ? <h1>Fecha de nacimiento: {"Agrega tu fecha de nacimiento"}</h1> : <h1>Fecha de nacimiento: {infoUser.date_of_Birth}</h1>}
                        {infoUser.phone_number === null ? <h1>Número de telefono: {"Agrega tu numero de telefono"}</h1> : <h1>Número de telefono: {infoUser.phone_number}</h1>}
                    </div> : null
                }
            </div>
        </div>
    )
}