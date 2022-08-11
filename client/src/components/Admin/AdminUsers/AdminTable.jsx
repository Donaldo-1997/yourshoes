import * as React from 'react';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios, { Axios } from 'axios';
import Modal from 'react-modal';
import UserEdit from './UserEdit';

function descendingComparator(a, b, orderBy) {
  // console.log("a -->", a[orderBy])

  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'id',
    numeric: false,
    disablePadding: false,
    label: 'ID',
  },
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'surname',
    numeric: false,
    disablePadding: true,
    label: 'Apellidos',
  },
  {
    id: 'email',
    numeric: false,
    disablePadding: false,
    label: 'Correo',
  },
  {
    id: 'image',
    numeric: false,
    disablePadding: false,
    label: 'Imagen',
  },
  {
    id: 'phone_number',
    numeric: true,
    disablePadding: false,
    label: 'Teléfono',
  },
  {
    id: 'address',
    numeric: false,
    disablePadding: false,
    label: 'Dirección',
  },
  {
    id: 'isAdmin',
    numeric: true,
    disablePadding: false,
    label: 'Admin',
  },
  {
    id: 'isBanned',
    numeric: true,
    disablePadding: false,
    label: 'Baneado',
  },
  // {
  //   id: 'isActive',
  //   numeric: true,
  //   disablePadding: false,
  //   label: 'Activo',
  // },
];

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow color='primary'>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Usuarios
        </Typography>
      {/* )} */}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

export default function EnhancedTable() {

  //MODAL//
  const [modalIsOpen, setIsOpen] = useState(false)
  const openModal = () => {
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(40);

  
  const [ rows, setRows] = useState([])
  // console.log(rows)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  useEffect(() => {
      // dispatch para obtener todos los usuarios
      axios.get('http://localhost:3001/user')
      .then(res => {
          localStorage.setItem('users', JSON.stringify(res.data))
          setRows(res.data)
      })
  }, [])

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const updateIsAdmin = (idUser, data, nameUser) => {
    const respuesta = window.confirm(`Actualiza propiedad isAdmin del usuario "${nameUser}"`)

    console.log('DATA --->', data)

    if(respuesta){
      axios.put(`http://localhost:3001/user/isadmin/${idUser}`, { isAdmin: data })
      .then(res => {
        console.log(res)
        setRows([...rows.filter(user => user.id !== idUser), res.data.user])
      })
    }
  }
  
  const updateIsBanned = (idUser, data, nameUser) => {
    const respuesta = window.confirm(`Está seguro de cambiar la propiedad isBanned del usuario "${nameUser}"`)

    console.log('DATA --->', data)

    if(respuesta){
      axios.put(`http://localhost:3001/user/isBanned/${idUser}`, { isBanned: data })
      .then(res => {
        console.log(res)
        setRows([...rows.filter(user => user.id !== idUser), res.data.user])
      })
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '88vw', height: '58vh', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            aria-label="sticky table"
            sx={{ minWidth: 550 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.title);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <>
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="normal"
                      >
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.surname}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="left"><img src={row.image} alt="user" width="50" style={{ borderRadius: '50%', cursor: 'pointer' }} /></TableCell>
                      <TableCell align="left">{row.phone_number ? row.phone_number : 'No tiene'}</TableCell>
                      <TableCell align="left">{row.address ? row.address : 'No tiene'}</TableCell>
                      <TableCell align="center">{<Switch checked={row.isAdmin} onChange={() => updateIsAdmin(row.id, !row.isAdmin, row.name)} />}</TableCell>
                      <TableCell align="center">{<Switch checked={row.isBanned} onChange={() => updateIsBanned(row.id, !row.isBanned, row.name)} />}</TableCell>
                      {/* <TableCell align="center">{<Switch checked={row.isActive} onChange={() => window.confirm('modificar isActive del usuario?')} />}</TableCell> */}
                    </TableRow>

                    <Modal
                      isOpen={modalIsOpen}
                      onRequestClose={closeModal}
                      style={{ 
                        content: {
                          top: '50%',
                          left: '50%',
                          right: 'auto',
                          bottom: 'auto',
                          transform: 'translate(-50%, -50%)',
                          width: "510px",
                          height: "550px",
                          "border-radius": "10px",
                          background: "#fff",
                        },
                      }}
                    >
                      <UserEdit data={row} closeModal={closeModal}/>
                    </Modal>
                </>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 40]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </Box>
  );
}