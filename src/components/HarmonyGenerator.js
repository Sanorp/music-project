import React, {useState}from 'react'
import MIDISounds from "midi-sounds-react";
import '../css/Components.css'
import util from '../util/Utilities'



const HarmonyGenerator = () => {

    const [baseNote , setBaseNote] = useState(50)
    const [scaleName, setScaleName] = useState('major')
    const [chordProgression, setChordProgression] = useState('1-4-5-1')
    const [midiSounds, setMidiSounds] = useState(null)

    const onChangeBaseNote = (event) => {
        setBaseNote(Number(event.target.value))
    }
    const onChangeScaleName = (event) => {
        setScaleName(event.target.value)
    }
    const onChangeChordProression = (event) => {
        setChordProgression(event.target.value)
    }
    const playProgression = () => {

        const numericProgression = util.generateNumericProression(chordProgression);
        const chordTypes = util.createChordTypesFromScaleAndDegrees(scaleName, numericProgression);
        const majorScale = util.createScale(baseNote,'major',3);

        if(numericProgression.length !== chordTypes.length){
            console.log("Error. Not same length")
        }
        let soundTime = midiSounds.contextTime();
        console.log("numericProg:",numericProgression);
        console.log("chordTypes:", chordTypes)
        for(let i=0; i<numericProgression.length; i++){
            console.log("baseNoteForNewChord:",majorScale[numericProgression[i]])
            midiSounds.playChordAt(soundTime,3,util.createChord(numericProgression[i], majorScale[numericProgression[i]], chordTypes[i]),1);
            soundTime+=1
        }
    }

    return (
        <div className="RandomMelody" width="100%" >
            <h4 className="SmallHeader"> Play Chord Proression</h4>
            <div className="hbox parameters">
                <div className="vbox">
                    <div> Base-Note: <input onChange={onChangeBaseNote} value={baseNote}/></div>
                    <div> Scale-Name: <input onChange={onChangeScaleName} value={scaleName}/> </div>
                    <div> Chord Progression: <input onChange={onChangeChordProression} value={chordProgression}/> </div>
                    <div className="hbox">
                        <button onClick={() => {playProgression()}}> Play the Progression </button>
                    </div>
                </div>
                <div className="center midiSounds">
                    <MIDISounds ref={(ref) => (setMidiSounds(ref))} appElementName="root" instruments={[3]}/>
                </div>
            </div>
        </div>
    )
}
export default HarmonyGenerator