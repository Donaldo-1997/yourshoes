import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./SocialFollow.css"
import {
    faGithub,
    faLinkedin,
  } from "@fortawesome/free-brands-svg-icons";
import NavBar2 from "../Navbar2/Navbar2"


export default function SocialFollow() {
  return (
    <div>
        <NavBar2/>
    <div className="social-container">
        <div className="name-icon-container">
            <h3>Ramiro Hernandez</h3>
            <div className="icons-container">
                <a href="https://github.com/RamaHernandez"
                  className="github social">
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/ramanandez/"
                  className="linkedin social">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
            </div>
        </div>
        <div className="name-icon-container">
            <h3>Nicolas Bringas</h3>
            <div className="icons-container">
                <a href="https://github.com/Nicolas0210"
                  className="github social">
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/nicolas-bringas-72a45a208/"
                  className="linkedin social">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
            </div>
        </div>
        <div className="name-icon-container">
            <h3>Marcos Guzman</h3>
            <div className="icons-container">
                <a href="https://github.com/Mmgs94"
                  className="github social">
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/marcos-guzman-224b6423a/"
                  className="linkedin social">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
            </div>
        </div>
        <div className="name-icon-container">
            <h3>Juan Carracedo</h3>
            <div className="icons-container">
                <a href="https://github.com/juancarracedo7"
                  className="github social">
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/juan-cruz-carracedo-72716711a"
                  className="linkedin social">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
            </div>
        </div>
        <div className="name-icon-container">
            <h3>Giselle Taboada</h3>
            <div className="icons-container">
                <a href="https://github.com/GiseTaboada1990"
                  className="github social">
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/elizabeth-giselle-taboada-fullstackdeveloper/"
                  className="linkedin social">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
            </div>
        </div>
        <div className="name-icon-container">
            <h3>Donaldo Barraza</h3>
            <div className="icons-container">
                <a href="https://github.com/Donaldo-1997"
                  className="github social">
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/donaldo-barraza-madrid-fullstackdeveloper/"
                  className="linkedin social">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
            </div>
        </div>
        <div className="name-icon-container">
            <h3>Benjamin Malo</h3>
            <div className="icons-container">
                <a href="https://github.com/Benjamalo"
                  className="github social">
                  <FontAwesomeIcon icon={faGithub} size="2x" />
                </a>
                <a href="https://www.linkedin.com/in/benjamin-malo-teixeira/"
                  className="linkedin social">
                  <FontAwesomeIcon icon={faLinkedin} size="2x" />
                </a>
            </div>
        </div>
    </div>
    </div>
  );
}