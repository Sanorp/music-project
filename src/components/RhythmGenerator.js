import '../css/Components.css'
import util from '../util/Utilities'
import React, {useState} from 'react'

const RhythmGenerator = ({midiSounds,rhythm, setRhythm, tempo, setTempo}) => {

    const [barLength,setBarLength] = useState(4)
    const [rhythmParameters, setRhythmParameters] = useState([6,6,4,4,4,2,1,1,1,1,1]);
    //TODO Add more :)
    let rhythmPatterns = [[0], [1], [1,1], [0,1], [1,0], [1,1,1], [1,1,0], [1,0,1], [0,0,1], [0,1,0], [0,1,1]];

    const applyWeights = () => {
        if (rhythmPatterns.length !== rhythmParameters.length) {
            console.log("Parameter-length-error");
            return;
        }
        let weightedPatterns = [];
        for(let i = 0 ; i < rhythmParameters.length; i++){
            for(let j = 0; j < rhythmParameters[i]; j++) {
                weightedPatterns.push(rhythmPatterns[i]);
            }
        }
        return weightedPatterns;
    }
    const drawRandomPattern = () => {
        let weightedPattern = applyWeights();
        return weightedPattern[util.getRandomInt(weightedPattern.length)]
    }

    const onChangeTempo = (event) => {
        setTempo(event.target.value);
    }
    const onChangeBarLength = (event) => {
        setBarLength(event.target.value);
    }

    const createRandomBar = ()  => {
        let barArray = []
        for (let beat = 0; beat < barLength; beat++) {
            let randomPattern = drawRandomPattern();
            console.log("Beat:", beat, " RandomPattern: ", randomPattern)
            let currentBeat = beat;
            for (let piece = 0; piece < randomPattern.length; piece++) {
                if (randomPattern[piece]) {
                    barArray.push(currentBeat);
                }
                currentBeat += 1 / randomPattern.length;
            }
            barArray.push();
        }
        return barArray;
    }

    const generateRandomRhythm = () => {
        let barArray = createRandomBar();
        //Round the numbers
        barArray.forEach((value, index, array ) => array[index] = Math.round((value + Number.EPSILON) * 100) / 100)
        console.log("Random bar:", barArray)
        setRhythm(barArray)
    }

    const playRhythm = () => {
        console.log(rhythm);
        let speedup  = tempo/60;
        let contextTime = midiSounds.contextTime();
        for(let beat = 0;beat < rhythm.length; beat++){

            //Plays
            let playTime = rhythm[beat]* 1/speedup;
            midiSounds.playDrumsAt(contextTime+playTime, [0])
        }
    }
    const onChangeRhythmParameters = (event) => {

    }

    return(
        <div className="Background" width="100%">
            <h4 className="SmallHeader"> Generate rhythm</h4>
            <div className="hbox parameters">
                <div className="vbox">
                    <div> Tempo: <input onChange={onChangeTempo} value={tempo}/></div>
                    <div> Beats in a Bar: <input onChange={onChangeBarLength} value={barLength}/> </div>
                    <div> Parameter for a Beat: <input onChange={onChangeRhythmParameters} value={rhythmParameters}/> </div>
                    <button onClick={() => {generateRandomRhythm()}}> Generate random rhythm </button>
                    <button onClick={() => {playRhythm()}}> Play rhythm </button>
                </div>
            </div>
        </div>
    )
}

export default RhythmGenerator