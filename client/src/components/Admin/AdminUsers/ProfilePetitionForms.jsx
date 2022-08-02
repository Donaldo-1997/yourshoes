import React, { useEffect, useState } from "react";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useSelector } from 'react-redux'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { TitleCard, CardPetitions } from "./StyledAdminUsers";

function capitalize(str) {
  return str.replace(/^\w/, (c) => c.toUpperCase());
  // return str;
}

const popUpDeletePetition = (formId, from) => {
  Swal.fire({
    title: "Esta seguro?",
    text: "No podra revertir los cambios!",
    icon: "warning",
    showCancelButton: true,
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Eliminar",
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        "Eliminado",
        "Tu peticion ha sido eliminada correctamente",
        "success"
      );
      // if (from === "PetitionGetLosts") {
      //   axios.delete(`/petitionGet/deleteLost/${formId}`);
      //   location.reload();
      // }
      // if (from === "PetitionGets") {
      //   axios.delete(`/petitionGet/delete/${formId}`);
      //   location.reload();
      // }
      // if (from === "PetitionLoads") {
      //   axios.delete(`/petitionLoad/${formId}`);
      //   location.reload();
      // }
    }
  });
};

export function PetitionGetLosts({
  refresh,
  formDate,
  petId,
  formState,
  formId,
  userMovility,
  tel,
  originalName,
  lostZone,
  image,
  getReason,
}) {
  const [pet, setPet] = useState({});

  useEffect(() => {
    axios.get(`/pet/${petId}`).then((r) => setPet(r.data));
    //console.log('petPetitionGetLosts', pet)
  }, []);

  const from = "PetitionGetLosts";


  const popUp1 = () => {
    Swal.fire({
      title: `Peticion encontre mi mascota`,
      html: `        
        <p><b>Fecha de la peticion:</b> ${formDate}</p>
        <p><b>Mascota elegida:</b> ${capitalize(pet.name)}</p>
        <img src=${pet.image} alt=${pet.name} height='200px' width='200px' />
        <p>
        ${pet.pet === "dog" ? "Perro" : pet.pet === "cat" ? "Gato" : null} 
        ${capitalize(pet.breed)}, 
        ${pet.gender === "male"
          ? "macho"
          : pet.gender === "female"
            ? "hembra"
            : pet.gender === "unknown"
              ? "no se sabe"
              : null
        }
        </p>
        <p><b>¿Porque cree que es su mascota?</b> </br>${getReason}</p>
        <p><b>¿En que zona se le perdio?</b> </br> ${lostZone}</p>
        <p><b>¿A que nombre responde la mascota?</b> </br> ${originalName}</p>
        <p><b>Imagenes cargadas:</b></p>
        <img src=${image[0]
        } alt=${originalName}  height='150px' width='150px'/> 
        <p><b>Telefono: </b>${tel}</p>  
        <p><b>¿Tiene movilidad para buscar la mascota?</b> </br> ${userMovility === "yes" ? "Si" : userMovility === "no" ? "No" : null
        }</p>    
      `,
    });
  };

  const token = useSelector(state => state.usuario)

  function acepted() {
    axios.post('/admin/petitionGetLost/acepted', { petitionId: formId, token })
      .then(res => Swal.fire
        ({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: true,
          timer: 1500
        }).then(() => { refresh() }), res => Swal.fire
          ({
            icon: 'error',
            title: 'Error',
            text: res.response.data.error,
            showConfirmButton: false,
            timer: 1000
          }).then(() => { refresh() }))
  }
  function rejected() {
    axios.post('/admin/petitionGetLost/rejected', { petitionId: formId, token })
      .then(res => Swal.fire
        ({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: true,
          timer: 1500
        }).then(() => { refresh() }), res => Swal.fire
          ({
            icon: 'error',
            title: 'Error',
            text: res.response.data.error,
            showConfirmButton: false,
            timer: 1000
          }).then(() => { refresh() }))
  }

  return (
    <>
      <div>
        <CardPetitions sx={{ maxWidth: 345 }}>
          <img src={pet.image} alt={pet.name} width="345px" height="250px" />
          <TitleCard>Peticion perdidos</TitleCard>
          <CardContent>
            <TitleCard gutterBottom variant="h5" component="div">
              {pet.name && capitalize(pet.name)};{" "}
              {pet.pet === "dog" ? "Perro" : pet.pet === "cat" ? "gato" : null}
            </TitleCard>
            <Typography variant="body2" color="text.secondary">
              <TitleCard>Fecha: {formDate}</TitleCard>
              <TitleCard>
                Estado de la peticion:{" "}
                {formState === "pending"
                  ? "en revisión"
                  : formState === "acepted"
                    ? "aceptado"
                    : formState === "rejected"
                      ? "rechazado"
                      : null}
              </TitleCard>
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" variant="outlined" onClick={popUp1}>ver peticion</Button>
            {formState === 'pending' && <div>
              <Button size="small" variant="outlined" color="success" onClick={acepted}>Aceptar</Button>
              <Button size="small" variant="outlined" color="error" onClick={rejected}>denegar</Button>
            </div>}
          </CardActions>
        </CardPetitions>
      </div>
    </>
  );
}

export function PetitionGets({
  refresh,
  formDate,
  petId,
  state,
  formState,
  formId,
  actualPlace,
  adaptationTime,
  adoptedPetAloneMoments,
  adoptedPetPlace,
  adoptedPetSleepingSpace,
  adoptedPetWalkingInfo,
  familyRelation,
  familySize,
  getPetReason,
  openSpace,
  otherPets,
  otherPetsInfo,
  otherPetsCastration,
  otherPetsVacunation,
  rental,
  tel,
  transitPetPeriod,
  userAge,
  userAgreement,
  userMovility,
  userMovingIdea,
}) {
  const [pet, setPet] = useState({});

  const popUp2 = () => {
    Swal.fire({
      title: `Petición para adoptar`,
      html: `        
        <p><b>Fecha de la peticion:</b> ${formDate}</p>
        <p><b>Mascota elegida:</b> ${capitalize(pet.name)}</p>
        <img src=${pet.image} alt=${pet.name} height='200px' width='200px' />
        <p>
        ${pet.pet === "dog" ? "Perro" : pet.pet === "cat" ? "Gato" : null} 
        ${capitalize(pet.breed)}, 
        ${pet.gender === "male"
          ? "macho"
          : pet.gender === "female"
            ? "hembra"
            : pet.gender === "unknown"
              ? "no se sabe"
              : null
        }
        </p>
        <p><b>Edad del adoptante: </b> ${userAge} años</p>
        <p><b>Teléfono: </b>${tel}</p>
        <p><b>Futuro domicilio de la mascota</b> </br> ${actualPlace.toString()}</p>
        <p><b>¿Cuántas personas viven en la casa?</b> </br> ${familySize} personas</p>
        <p><b>Composición del núcleo familiar</b> </br> ${familyRelation}</p>
        <p><b>¿Tiene otros animales?</b> ${otherPets === "true" ? "Si" : otherPets === "false" ? "No" : null
        }</p>
        <p><b>¿Nos cuenta un poco sobre ellos?</b> </br> ${otherPetsInfo ? otherPetsInfo : "-"
        }</p>
        <p><b>¿Estan castrados? </b> ${otherPetsCastration
          ? otherPetsCastration === "true"
            ? "Si"
            : otherPetsCastration === "false"
              ? "No"
              : "-"
          : "-"
        }</p>
        <p><b>¿Estan vacunados? </b> ${otherPetsVacunation
          ? otherPetsVacunation === "true"
            ? "Si"
            : otherPetsVacunation === "false"
              ? "No"
              : "-"
          : "-"
        }</p>
        <p><b>¿Porque eligio este animal en particular?</b> </br> ${getPetReason}</p>
        <p><b>¿Dónde vivira la mascota adoptada?</b> </br> ${adoptedPetPlace}</p>
        <p><b>¿Posee espacio al aire libre?</b> </br> ${openSpace}</p>
        <p><b>¿Son propietarios o alquilan?</b> ${rental === "tenant"
          ? "Alquilo"
          : rental === "owner"
            ? "Propietario"
            : null
        }</p>
        <p><b>¿Dónde dormirá el adoptado?</b> <br/> ${adoptedPetSleepingSpace}</p>
        <p><b>¿Estará sola? ¿Cuánto tiempo?</b> <br/> ${adoptedPetAloneMoments}</p>
        <p><b>¿Quién lo paseará? ¿Cuántas veces al día?</b> <br/> ${adoptedPetWalkingInfo}</p>
        <p><b>¿Si se muda que hará con la mascota?</b> <br/> ${userMovingIdea}</p>
        <p><b>¿Le gustaría tener un tiempo de adaptación?</b> <br/> ${adaptationTime === "yes"
          ? "Si"
          : adaptationTime === "no"
            ? "No"
            : adaptationTime === "maybe"
              ? "Tal vez"
              : ""
        }</p>
        <p><b>¿Tiene movilidad para buscar a la mascota?</b> </br> ${userMovility === "yes" ? "Si" : userMovility === "no" ? "No" : "-"
        }</p>
      `,
    });
  };

  const popUp3 = () => {
    Swal.fire({
      title: `Petición para adoptar`,
      html: `        
        <p><b>Fecha de la peticion:</b> ${formDate}</p>
        <p><b>Mascota elegida:</b> ${capitalize(pet.name)}</p>
        <img src=${pet.image} alt=${pet.name} height='200px' width='200px' />
        <p>
        ${pet.pet === "dog" ? "Perro" : pet.pet === "cat" ? "Gato" : null} 
        ${capitalize(pet.breed)}, 
        ${pet.gender === "male"
          ? "macho"
          : pet.gender === "female"
            ? "hembra"
            : pet.gender === "unknown"
              ? "no se sabe"
              : null
        }
        </p>
        <p><b>Edad del postulante: </b> ${userAge} años</p>
        <p><b>Teléfono: </b>${tel}</p>
        <p><b>Futuro domicilio de la mascota</b> </br> ${actualPlace ? actualPlace.toString() : ""
        }</p>
        <p><b>¿Cuántas personas viven en la casa?</b> </br> ${familySize} personas</p>
        <p><b>Composición del núcleo familiar</b> </br> ${familyRelation}</p>
        <p><b>¿Tiene otros animales?</b> ${otherPets === "true" ? "Si" : otherPets === "false" ? "No" : null
        }</p>
        <p><b>¿Nos cuenta un poco sobre ellos?</b> </br> ${otherPetsInfo ? otherPetsInfo : "-"
        }</p>
        <p><b>¿Estan castrados? </b> ${otherPetsCastration
          ? otherPetsCastration === "true"
            ? "Si"
            : otherPetsCastration === "false"
              ? "No"
              : "-"
          : "-"
        }</p>
        <p><b>¿Estan vacunados? </b> ${otherPetsVacunation
          ? otherPetsVacunation === "true"
            ? "Si"
            : otherPetsVacunation === "false"
              ? "No"
              : "-"
          : "-"
        }</p>
        
        <p><b>¿Dónde vivira la mascota en transito?</b> </br> ${adoptedPetPlace}</p>
        <p><b>¿Posee espacio al aire libre?</b> </br> ${openSpace}</p>
        <p><b>¿Son propietarios o alquilan?</b> ${rental === "tenant"
          ? "Alquilo"
          : rental === "owner"
            ? "Propietario"
            : null
        }</p>
        <p><b>¿Dónde dormirá la mascota?</b> <br/> ${adoptedPetSleepingSpace}</p>
        <p><b>¿Estará sola? ¿Cuánto tiempo?</b> <br/> ${adoptedPetAloneMoments}</p>
        <p><b>¿Quién lo paseará? ¿Cuántas veces al día?</b> <br/> ${adoptedPetWalkingInfo}</p>
        <p><b>¿Cuánto tiempo puede tener en tránsito la mascota?</b> </br> ${transitPetPeriod}</p>
        <p><b>¿Por qué deseas dar tránsito a un animal?</b> </br> ${getPetReason}</p>        
        <p><b>¿Le gustaría tener un tiempo de adaptación?</b> <br/> ${adaptationTime === "yes"
          ? "Si"
          : adaptationTime === "no"
            ? "No"
            : adaptationTime === "maybe"
              ? "Tal vez"
              : ""
        }</p>
        <p><b>¿Tiene movilidad para buscar a la mascota?</b> </br> ${userMovility === "yes" ? "Si" : userMovility === "no" ? "No" : "-"
        }</p>
        <p><b>¿Sos consciente que la responsabilidad de ser un hogar transitorio implica hacerse cargo de la alimentación y cuidados veterinarios del animal?</b> </br> ${userAgreement === "true"
          ? "Si"
          : userAgreement === "false"
            ? "No"
            : null
        }</p>
      `,
    });
  };

  useEffect(() => {
    axios.get(`/pet/${petId}`).then((r) => setPet(r.data));
    console.log("PetitionGets", pet);
  }, []);

  const token = useSelector(state => state.usuario)

  function acepted() {
    axios.post('/admin/petitionGet/acepted', { petitionId: formId, token })
      .then(res => Swal.fire
        ({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: true,
          timer: 1500
        }).then(() => { refresh() }), res => Swal.fire
          ({
            icon: 'error',
            title: 'Error',
            text: res.response.data.error,
            showConfirmButton: false,
            timer: 1000
          }).then(() => { refresh() }))
  }
  function rejected() {
    axios.post('/admin/petitionGet/rejected', { petitionId: formId, token })
      .then(res => Swal.fire
        ({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: true,
          timer: 1500
        }).then(() => { refresh() }), res => Swal.fire
          ({
            icon: 'error',
            title: 'Error',
            text: res.response.data.error,
            showConfirmButton: false,
            timer: 1000
          }).then(() => { refresh() }))
  }
  const from = "PetitionGets";

  return (
    <div>
      <Card sx={{ maxWidth: 345 }}>
        <img src={pet.image} alt={pet.name} width="345px" height="250px" />
        {state === "adopted" ? (
          <TitleCard>Petición para adoptar</TitleCard>
        ) : state === "transit" ? (
          <TitleCard>Petición para hogar transito</TitleCard>
        ) : null}
        <CardContent>
          <TitleCard gutterBottom variant="h5" component="div">
            {pet.name && capitalize(pet.name)};{" "}
            {pet.pet === "dog" ? "perro" : pet.pet === "cat" ? "gato" : null}
          </TitleCard>
          <Typography variant="body2" color="text.secondary">
            <TitleCard>fecha: {formDate}</TitleCard>
            <TitleCard>
              Estado de la peticion:{" "}
              {formState === "pending"
                ? "en revisión"
                : formState === "acepted"
                  ? "aceptado"
                  : formState === "rejected"
                    ? "rechazado"
                    : null}
            </TitleCard>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small" variant="outlined"
            onClick={
              state === "adopted" ? popUp2 : state === "transit" ? popUp3 : null
            }
          >
            ver peticion
          </Button>
          {formState === 'pending' && <div>
            <Button size="small" variant="outlined" color="success" onClick={acepted}>Aceptar</Button>
            <Button size="small" variant="outlined" color="error" onClick={rejected}>denegar</Button>
          </div>}

        </CardActions>
      </Card>
    </div>
  );
}

export function PetitionLoads({
  refresh,
  formDate,
  state,
  petName,
  type,
  formState,
  petImg,
  formId,
  actualPlace,
  breed,
  castration,
  foundDate,
  foundPlace,
  fur,
  gender,
  pet,
  size,
  vaccinate,
  weight,
  image,
}) {
  const from = "PetitionLoads";

  const popUp4 = () => {
    Swal.fire({
      title: `Petición para cargar mascota y dar en adopcion`,
      html: `        
        <p><b>Fecha de la peticion:</b> ${formDate}</p>
        <p><b>¿Qué quieres hacer?</b> </br> ${state === "adopt" ? "Dar una mascota en adopción" : null
        }</p>
        <p><b>Nombre de la mascota</b> </br> ${petName}</p>
        <img src=${image[0]} alt=${petName} height='200px' width='200px' />
        <p>
        ${pet === "dog" ? "Perro" : pet === "cat" ? "Gato" : null} 
        ${capitalize(breed)}, 
        ${gender === "male"
          ? "macho"
          : gender === "female"
            ? "hembra"
            : gender === "unknown"
              ? "no se sabe"
              : null
        }
        </p>
        <p><b>Pelaje:</b> ${fur === "short" ? "corto" : fur === "long" ? "largo" : null
        }</p>
        <p><b>Tamaño:</b> ${size === "small"
          ? "pequeño"
          : size === "medium"
            ? "mediano"
            : size === "big"
              ? "grande"
              : null
        }</p> 
        <p><b>Vacunación:</b> ${vaccinate === "true"
          ? "si"
          : vaccinate === "false"
            ? "no"
            : vaccinate === "unknown"
              ? "no se sabe"
              : null
        }</p>
        <p><b>Castración:</b> ${castration === "true"
          ? "si"
          : castration === "false"
            ? "no"
            : castration === "unknown"
              ? "no se sabe"
              : null
        }</p>        
      `,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
    });
  };
  const popUp5 = () => {
    Swal.fire({
      title: `Petición para cargar mascota encontrada`,
      html: `        
        <p><b>Fecha de la peticion:</b> ${formDate}</p>
        <p><b>¿Qué quieres hacer?</b> </br> ${state === "lost" ? "Cargar una mascota que encontraste" : null
        }</p>
        <p><b>Nombre de la mascota</b> </br> ${petName}</p>
        <img src=${image[0]} alt=${petName} height='200px' width='200px' />
        <p>
        ${pet === "dog" ? "Perro" : pet === "cat" ? "Gato" : null} 
        ${capitalize(breed)}, 
        ${gender === "male"
          ? "macho"
          : gender === "female"
            ? "hembra"
            : gender === "unknown"
              ? "no se sabe"
              : null
        }
        </p>
        <p><b>Pelaje:</b> ${fur === "short" ? "corto" : fur === "long" ? "largo" : null
        }</p>
        <p><b>Tamaño:</b> ${size === "small"
          ? "pequeño"
          : size === "medium"
            ? "mediano"
            : size === "big"
              ? "grande"
              : null
        }</p> 
        <p><b>Vacunación:</b> ${vaccinate === "true"
          ? "si"
          : vaccinate === "false"
            ? "no"
            : vaccinate === "unknown"
              ? "no se sabe"
              : null
        }</p>
        <p><b>Castración:</b> ${castration === "true"
          ? "si"
          : castration === "false"
            ? "no"
            : castration === "unknown"
              ? "no se sabe"
              : null
        }</p>
        <p><b>¿Cuándo la encontraste?</b> ${foundDate}</p>
        <p><b>¿Dónde la encontraste?</b> </br> ${foundPlace}</p>        
        <p><b>¿Dónde se encuentra actualmente la mascota ?</b> </br> ${actualPlace}</p>
      `,
    });
  };
  const token = useSelector(state => state.usuario)


  function acepted() {
    axios.post('admin/petitionLoadPet/acepted', { petitionId: formId, token })
      .then(res => Swal.fire
        ({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: true,
          timer: 1500
        }).then(() => { refresh() }), res => Swal.fire
          ({
            icon: 'error',
            title: 'Error',
            text: res.response.data.error,
            showConfirmButton: false,
            timer: 1000
          }).then(() => { refresh() })
      )
  }
  function rejected() {
    axios.post('admin/petitionLoadPet/rejected', { petitionId: formId, token })
      .then(res => Swal.fire
        ({
          position: 'center',
          icon: 'success',
          title: res.data.message,
          showConfirmButton: true,
          timer: 1500
        }).then(() => { refresh() }), res => Swal.fire
          ({
            icon: 'error',
            title: 'Error',
            text: res.response.data.error,
            showConfirmButton: false,
            timer: 1000
          }).then(() => { refresh() }))
  }
  return (
    <div >

      <Card sx={{ maxWidth: 345 }}>
        {state === "adopt" ? (
          <TitleCard>Petición para cargar mascota y dar en adopcion</TitleCard>
        ) : state === "lost" ? (
          <TitleCard>Petición para cargar mascota encontrada</TitleCard>
        ) : null}
        <CardContent>
          <TitleCard gutterBottom variant="h5" component="div">
            {petName && capitalize(petName)};{" "}
            {type === "dog" ? "perro" : type === "cat" ? "gato" : null}
          </TitleCard>
          <Typography variant="body2" color="text.secondary">
            <TitleCard>fecha: {formDate}</TitleCard>
            <TitleCard>
              Estado de la peticion:{" "}
              {formState === "pending"
                ? "en revisión"
                : formState === "acepted"
                  ? "aceptado"
                  : formState === "rejected"
                    ? "rechazado"
                    : null}
            </TitleCard>
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small" variant="contained"
            onClick={state === "adopt" ? popUp4 : state === "lost" ? popUp5 : null}
          >
            ver peticion
          </Button>
          {formState === 'pending' && <div>
            <Button size="small" variant="outlined" color="success" onClick={acepted}>Aceptar</Button>
            <Button size="small" variant="outlined" color="error" onClick={rejected}>denegar</Button>
          </div>}
        </CardActions>
      </Card>
    </div>
  );
}
