import React from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './estilos.css'

const Cardpetition = ({info}) => {
  const token = useSelector(state=>state.usuario)

 function detalles(){
 let result = []
  for ( let prop in info){
    result.push(info[prop])
  }return result
 }

 function acepted(){
  axios.post('admin/petitionGet/acepted', { petitionId: info.id, token})
    .then(r=>console.log(r.data))
 }

  return (
    <>
    <div>
        <div>
         {detalles().map(e=><p>{e}</p>)}
         
        </div>
        <button onClick={acepted}>aceptar</button> <button>denegar</button>
    </div>
    
    </>
  )
}

export default Cardpetition