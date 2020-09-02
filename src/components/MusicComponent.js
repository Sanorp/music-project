import React from 'react';
import RandomMelody from "../components/RandomMelody"
import HarmonyGenerator from "../components/HarmonyGenerator"
import '../css/Components.css'
import ScalePlayer from "./ScalePlayer";
const MusicComponent = () => {




    //TODO
    /*

    1. Create harmony structure randomly:
        - enter number of bars to be created
        - enter number of beats in a bar
        - enter the main scale of those bars
        - emter the tempo of those bars
        - (optional) enter some kind of parameters for randomization

    2. Create small themes/melodies, save them in the app and use them for the randomization

     */


    var midiWriter = require('midi-writer-js');


    return (
        <div width="100%">
            <header>
                <h2 className="Header"> Music Project </h2>
            </header>
            <content width="100%">
                <RandomMelody />
                <div className="Spacer"/>
                <ScalePlayer/>
                <div className="Spacer"/>
                <HarmonyGenerator/>
                <div className="Spacer"/>
            </content>
        </div>
    );
}

export default MusicComponent;