import React, { useEffect, useReducer, useState } from 'react'
import './estilos.css'
import axios from 'axios'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useNavigate} from 'react-router-dom'
import Button from '@mui/material/Button';
import { useSelector } from 'react-redux';
import Swal from "sweetalert2";
import { BackgroundListUsers, TablaOscura, TextTable } from './StyledAdminUsers';

const AdminTable = () => {

const [user, setUser] = useState(null)
const navigate = useNavigate()
const token = useSelector(state=>state.usuario)

  // useEffect(() => {
  //   axios.get('/user/all').then((r) => { setUser(r.data) })
  // }, [])

  const [ignore, forceUpdate] = useReducer(x => x + 1, 0)

  function refresh() {
    forceUpdate()

  }

  // useEffect(() => {
  //   axios.get('/user/all').then((r) => { setUser(r.data) })
  //   console.log(ignore)
  // }, [ignore])

  function addAdmin(id) {
    axios.put('/admin/addRemove', { token, id }).then(res => {

      Swal.fire
        ({
          position: 'center',
          icon: 'success',
          title: res.data.message ? res.data.message : res.data,
          showConfirmButton: true,
          timer: 1500
        }).then(() => { refresh() })
    }, res => Swal.fire
      ({
        icon: 'error',
        title: 'Error',
        text: res.response.data.error,
        showConfirmButton: false,
        timer: 1000
      }).then(() => { refresh() })
    )
  }

  return (
    <BackgroundListUsers>
      <TableContainer component={Paper} className='table' >
        <TablaOscura sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="tableCell"><TextTable>Id</TextTable></TableCell>
              <TableCell className="tableCell" ><TextTable>Usuario</TextTable></TableCell>
              <TableCell className="tableCell"><TextTable>Apellido</TextTable></TableCell>
              <TableCell className="tableCell"><TextTable>Email</TextTable></TableCell>
              <TableCell className="tableCell"><TextTable>Dar Admin</TextTable></TableCell>
              <TableCell className="tableCell"><TextTable>Baneado</TextTable></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user && user.map((e) => (
              <TableRow key={e.id}>
                <TableCell className="tableCell"><TextTable>{e.id}</TextTable></TableCell>
                <TableCell className="tableCell">
                  <div className="cellWarpper">
                    <img src={e.picture} alt="" className="image" />
                    <TextTable>{e.name}</TextTable>
                  </div>
                </TableCell>
                <TableCell className="tableCell"><TextTable>{e.lastname}</TextTable></TableCell>
                <TableCell className="tableCell"><TextTable>{e.email}</TextTable></TableCell>
                <TableCell className="tableCell">
                  <Button size="small" variant="outlined" onClick={() => { navigate('/admin/petitionuser/' + e.id) }}>{`Ver ${e.PetitionGets.length + e.PetitionGetLosts.length + e.PetitionLoads.length}`}</Button>
                </TableCell>
                <TableCell className="tableCell">
                  <Button size="small" variant="outlined" color="secondary" onClick={() => { addAdmin(e.id) }}> {e.rol} </Button>
                </TableCell>
                {/* <TableCell className="tableCell">
                  <Button size="small" variant="outlined" color="secondary" onClick={() => { addAdmin(e.id) }}> {e.rol} </Button>
                </TableCell>  AGREGAR BAN!!!*/}
              </TableRow>
            ))}
          </TableBody>
        </TablaOscura>
      </TableContainer>
    </BackgroundListUsers>
  );
}

export default AdminTable