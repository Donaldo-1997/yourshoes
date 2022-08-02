import React, { useEffect, useState, useReducer } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import {
  PetitionGets,
  PetitionGetLosts,
  PetitionLoads
} from "./ProfilePetitionForms";
import { BackgroundCardPetition, BackgroundPetition, CardPetition, TitlePetitions, CardDiv, TitleCard, BackPetitions } from "./StyledAdminUsers";
const Peticiones = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  // codigo de Matifa
  const [loadPetAdopt, setLoadPetAdopt] = useState(null);
  const [loadPetLost, setLoadPetLost] = useState(null);
  const [getAdopt, setGetAdopt] = useState(null);
  const [getTransit, setGetTransit] = useState(null);
  const [getItsMyPet, setGetItsMyPet] = useState(null);

  const callbackIn = async () => {
    const res = await axios.get(`/petitionGet/${id}`);
    const resData = res.data;
    console.log("resData", resData);

    if (resData.PetitionGetLosts) {
      setGetItsMyPet(resData.PetitionGetLosts);
    }
    if (resData.PetitionLoads) {
      let adopt = []
      let lost = []
      for (let petition of resData.PetitionLoads) {
        if (petition.state === "adopt") {
          adopt.push(petition)
        }
        if (petition.state === "lost") {
          lost.push(petition)
        }
      }
      setLoadPetAdopt(() => adopt)
      setLoadPetLost(() => lost)
    }
    if (resData.PetitionGets) {
      let transito = []
      let getAdopt = []
      for (let petition of resData.PetitionGets) {

        if (petition.state === "transit") {
          transito.push(petition)
        }
        if (petition.state === "adopted") {
          getAdopt.push(petition)
        }
        setGetTransit(() => transito);
        setGetAdopt(() => getAdopt);
      }
    }
  };

  useEffect(() => {
    callbackIn();
  }, []);



  const [ignore, forceUpdate] = useReducer(x => x + 1, 0)

  function refresh() {
    forceUpdate()

  }

  useEffect(() => {
    callbackIn()
    console.log(ignore)
  }, [ignore])


  return (
    <BackgroundPetition>
      <div>
        <Link to="/admin/users">
          <BackPetitions />
        </Link>
      </div>

      <BackgroundCardPetition>
        <CardPetition>
          <TitlePetitions>Peticion de Adopcion</TitlePetitions>
          <CardDiv>
            {
              getAdopt && getAdopt.map((p, i) => (
                <PetitionGets
                  refresh={refresh}
                  formDate={p.formDate}
                  petId={p.petId}
                  state={p.state}
                  formState={p.formState}
                  formId={p.id}
                  key={"j" + i}
                  actualPlace={p.actualPlace}
                  adaptationTime={p.adaptationTime}
                  adoptedPetAloneMoments={p.adoptedPetAloneMoments}
                  adoptedPetPlace={p.adoptedPetPlace}
                  adoptedPetSleepingSpace={p.adoptedPetSleepingSpace}
                  adoptedPetWalkingInfo={p.adoptedPetWalkingInfo}
                  familyRelation={p.familyRelation}
                  familySize={p.familySize}
                  getPetReason={p.getPetReason}
                  openSpace={p.openSpace}
                  otherPets={p.otherPets}
                  otherPetsCastration={p.otherPetsCastration}
                  otherPetsInfo={p.otherPetsInfo}
                  otherPetsVacunation={p.otherPetsVacunation}
                  rental={p.rental}
                  tel={p.tel}
                  transitPetPeriod={p.transitPetPeriod}
                  userAge={p.userAge}
                  userAgreement={p.userAgreement}
                  userMovility={p.userMovility}
                  userMovingIdea={p.userMovingIdea}
                />
              ))}
          </CardDiv>
          <CardDiv>
            {
              getTransit && getTransit.map((p, i) => (
                <PetitionGets
                  refresh={refresh}
                  formDate={p.formDate}
                  petId={p.petId}
                  state={p.state}
                  formState={p.formState}
                  formId={p.id}
                  key={"j" + i}
                  actualPlace={p.actualPlace}
                  adaptationTime={p.adaptationTime}
                  adoptedPetAloneMoments={p.adoptedPetAloneMoments}
                  adoptedPetPlace={p.adoptedPetPlace}
                  adoptedPetSleepingSpace={p.adoptedPetSleepingSpace}
                  adoptedPetWalkingInfo={p.adoptedPetWalkingInfo}
                  familyRelation={p.familyRelation}
                  familySize={p.familySize}
                  getPetReason={p.getPetReason}
                  openSpace={p.openSpace}
                  otherPets={p.otherPets}
                  otherPetsCastration={p.otherPetsCastration}
                  otherPetsInfo={p.otherPetsInfo}
                  otherPetsVacunation={p.otherPetsVacunation}
                  rental={p.rental}
                  tel={p.tel}
                  transitPetPeriod={p.transitPetPeriod}
                  userAge={p.userAge}
                  userAgreement={p.userAgreement}
                  userMovility={p.userMovility}
                  userMovingIdea={p.userMovingIdea}
                />
              ))}
          </CardDiv>
        </CardPetition>
        <div>
          <TitlePetitions>Peticion perdidos</TitlePetitions>
          <CardDiv>
            {
              getItsMyPet && getItsMyPet.map((p, i) => (
                <PetitionGetLosts
                  refresh={refresh}
                  ormDate={p.formDate}
                  petId={p.petId}
                  formState={p.formState}
                  formId={p.id}
                  key={"i" + i}
                  userMovility={p.userMovility}
                  tel={p.tel}
                  originalName={p.originalName}
                  lostZone={p.lostZone}
                  image={p.image}
                  getReason={p.getReason}
                />
              ))}
          </CardDiv>
        </div>
        <div>
          <TitlePetitions>Dar en Adopcion</TitlePetitions>
          <CardDiv>
            {loadPetAdopt &&
              loadPetAdopt.map((p, i) => (
                <PetitionLoads
                  refresh={refresh}
                  formDate={p.formDate}
                  petId={p.petId}
                  state={p.state}
                  petName={p.name}
                  type={p.pet}
                  formState={p.formState}
                  petImg={p.image}
                  formId={p.id}
                  key={"f" + i}
                  actualPlace={p.actualPlace}
                  breed={p.breed}
                  castration={p.castration}
                  foundDate={p.foundDate}
                  foundPlace={p.foundPlace}
                  fur={p.fur}
                  gender={p.gender}
                  pet={p.pet}
                  size={p.size}
                  vaccinate={p.vaccinate}
                  weight={p.weight}
                  image={p.image}
                />
              ))}
          </CardDiv>
          <CardDiv>
            {loadPetLost &&
              loadPetLost.map((p, i) => (
                <PetitionLoads
                  refresh={refresh}
                  formDate={p.formDate}
                  petId={p.petId}
                  state={p.state}
                  petName={p.name}
                  type={p.pet}
                  formState={p.formState}
                  petImg={p.image}
                  formId={p.id}
                  key={"f" + i}
                  actualPlace={p.actualPlace}
                  breed={p.breed}
                  castration={p.castration}
                  foundDate={p.foundDate}
                  foundPlace={p.foundPlace}
                  fur={p.fur}
                  gender={p.gender}
                  pet={p.pet}
                  size={p.size}
                  vaccinate={p.vaccinate}
                  weight={p.weight}
                  image={p.image}
                />
              ))}
          </CardDiv>
        </div>
      </BackgroundCardPetition>
    </BackgroundPetition>
  );
};

export default Peticiones;
