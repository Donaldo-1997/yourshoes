import React from "react";
import SideBar from "../SideBar/SideBar";
import DatatableProducts from "./DatatableProducts";
import { BackgroundList, ContainerList } from "./StyledAdmin";

export default function AdminProducts() {

    return(
        <BackgroundList>
            <ContainerList>
                <SideBar />
                <DatatableProducts />
            </ContainerList>
        </BackgroundList>
    )
}