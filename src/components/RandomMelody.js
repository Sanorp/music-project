import React, {useState} from "react";
import "../css/Components.css"
import scale from '../util/Utilities'

const RandomMelody = ({midiSounds}) => {

    const [ longness, setLongness ] = useState(0)
    const [ number, setNumber ] = useState(0)

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
            const density = longness / number;
            const startTime = midiSounds.contextTime();
            for (var i = 0; i < number; i++) {
                const updatedStartTime = startTime + (i * density)
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


    return (
        <div className="Background parameters" width="100%">
            <h4 className="SmallHeader"> Random-Melody</h4>
            <div className="hbox">
                <div className="vbox">
                    <div> Longness: <input onChange={changeLongness} value={longness}/></div>
                    <div> Number: <input onChange={changeNumber} value={number}/> </div>
                    <button onClick={() => {playRandomNotes(longness, number)}}>Random</button>
                    <button onClick={playTestInstrument}>Play</button>
                </div>
            </div>
        </div>
    );
}

export default RandomMelody