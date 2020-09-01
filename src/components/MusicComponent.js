import React, { Component , useState, useEffect } from 'react';
import MIDISounds from 'midi-sounds-react';

const MusicComponent = () => {

    const [ midiSounds, setMidiSounds ] = useState(null);
    const [ longness, setLongness ] = useState(0)
    const [ number, setNumber ] = useState(0)

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

    const playTestInstrument = () =>  {

        var audioTime = midiSounds.contextTime();

        midiSounds.playChordAt(audioTime, 1, [60, 64, 67], 1)
        midiSounds.playChordAt(audioTime+1, 2, [60, 65, 69], 1)
        midiSounds.playChordAt(audioTime+2, 3, [60, 64, 67], 10)

    }

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max));
    }
    const getRandomIntinBetween = (min, max) => {
        return min + getRandomInt(max-min);
    }
    const playRandomNotes = (longness, number) => {
        if(midiSounds) {
            console.log("Hello"+longness+number)
            const density = longness / number;
            const startTime = midiSounds.contextTime();
            for (var i = 0; i < number; i++) {
                const updatedStartTime = startTime + (i * density)
                console.log("startTime"+updatedStartTime);
                console.log("density"+density);
                console.log("rint"+getRandomIntinBetween(60,72));
                midiSounds.playChordAt(updatedStartTime, 3, [getRandomIntinBetween(60,72)], density)
            }
        }
    }
    const changeNumber = (evt) => {
        setNumber(evt.target.value)
    }
    const changeLongness = (evt) => {
        setLongness(evt.target.value)
    }
    // render() {
        return (
            <div className="App">
                <div> Longness: <input onChange={changeLongness} value={longness}/></div>
                <div> Number: <input onChange={changeNumber} value={number}/> </div>
                <button onClick={() => {playRandomNotes(longness, number)}}>Random</button>
                <button onClick={playTestInstrument}>Play</button>
                <MIDISounds ref={(ref) => (setMidiSounds(ref))} appElementName="root" instruments={[3]}/>
            </div>
        );
    // }
}

export default MusicComponent;