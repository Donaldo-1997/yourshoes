import React from "react";
import SideBar from "../SideBar/SideBar";
import DatatableProducts_copy from "./DatatableProducts_copy";
import { BackgroundList, ContainerList } from "./StyledAdmin";

export default function AdminProducts() {

    return(
        <BackgroundList>
            <ContainerList>
                <SideBar />
                <DatatableProducts_copy />
            </ContainerList>
        </BackgroundList>
    )
}