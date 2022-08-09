import React, {Component}from "react";
import ChatBot from "react-simple-chatbot"


export default function Chatbot() {
    
        return (
          <div>
            <ChatBot 
                 steps={[
                                {
                                    id: "Hola",
                                    message: `Holii, Soy PatitasBot tu asistente virtual🎊`,
                                    trigger: "Holas"
                                },

                                {
                                    id: "Holas",
                                    message: "Estoy Aqui para ayudarte con cualquier Solicitud Sobre Nuestra Pagina!",
                                    trigger: "Chau",
                                    
                                },
                                {
                                    id: "Chau",
                                    message: "Por favor, Selecciona tu Consulta",

                                    end:true
                                },
                                


                            ]}
            />
          </div>
        );
    }