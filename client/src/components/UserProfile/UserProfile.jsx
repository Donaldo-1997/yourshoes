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
                    Object.keys(infoUser).length ? 
                    <div>
                        <h1>Nombre: {infoUser.displayName}</h1>
                        <h1>E-mail: {infoUser.emails[0].value}</h1>
                        <h1>Imagen de perfil: {!infoUser.photos[0].value ? <img src="https://cdn4.iconfinder.com/data/icons/e-commerce-181/512/477_profile__avatar__man_-512.png"/> : <img src={infoUser.photos[0].value}/>}</h1>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}