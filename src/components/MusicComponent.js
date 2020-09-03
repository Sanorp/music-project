import React, {useState} from 'react';
import RandomMelody from "../components/RandomMelody"
import RhythmGenerator from "../components/RhythmGenerator"
import HarmonyGenerator from "../components/HarmonyGenerator"
import '../css/Components.css'
import ScalePlayer from "./ScalePlayer";
import MIDISounds from 'midi-sounds-react';
const MusicComponent = () => {
    /* TODO
    1. Create harmony structure randomly:
        - enter number of bars to be created
        - enter number of beats in a bar
        - enter the main scale of those bars
        - emter the tempo of those bars
        - (optional) enter some kind of parameters for randomization

    2. Create small themes/melodies, save them in the app and use them for the randomization
     */

    var midiWriter = require('midi-writer-js');

    const [tempo , setTempo] = useState(120);
    const [bars, setBars] = useState([]);
    const [rhythm, setRhythm] = useState(null);
    const [midiSounds, setMidiSounds] = useState(null)

    return (
        <div width="100%">
            <header>
                <h2 className="Header"> Music Project </h2>
            </header>
            <content width="100%">
                <RandomMelody midiSounds={midiSounds}/>
                <div className="Spacer"/>
                <ScalePlayer midiSounds={midiSounds}/>
                <div className="Spacer"/>
                <HarmonyGenerator midiSounds={midiSounds}/>
                <div className="Spacer"/>
                <RhythmGenerator midiSounds={midiSounds} rhythm={rhythm}setRhythm={setRhythm}tempo={tempo} setTempo={setTempo}/>
                <div className="Spacer"/>
                <div className="center midiSounds">
                    <MIDISounds ref={(ref) => (setMidiSounds(ref))} appElementName="root" instruments={[3]} drums={[0,2,33]}/>
                </div>
                Hallo
            </content>
        </div>
    );
}

export default MusicComponent;