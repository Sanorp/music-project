import React, {useState}from 'react'
import '../css/Components.css'
import util from '../util/Utilities'



const ScalePlayer = ({midiSounds}) => {

    const [baseNote , setBaseNote] = useState(30)
    const [scaleName, setScaleName] = useState('major')
    const [octaveLength, setOctaveLength] = useState(2)

    const onChangeBaseNote = (event) => {
        setBaseNote(Number(event.target.value))
    }
    const onChangeScaleName = (event) => {
        setScaleName(event.target.value)
    }
    const onChangeOctaveLength = (event) => {
        setOctaveLength(event.target.value)
    }
    const playScale = (backwards) => {
        const localScale = util.createScale(baseNote,scaleName,octaveLength);
        if(backwards){
            localScale.reverse();
        }
        var soundTime = midiSounds.contextTime();
        for(var i in localScale){
            midiSounds.playChordAt(soundTime,3,[localScale[i]],(1/4));
            soundTime+=(1/4)
        }
    }

    return (
        <div className="Background" width="100%" >
            <h4 className="SmallHeader"> Play Scale</h4>
            <div className="hbox parameters">
                <div className="vbox">
                    <div> Base-Note: <input onChange={onChangeBaseNote} value={baseNote}/></div>
                    <div> Scale-Name: <input onChange={onChangeScaleName} value={scaleName}/> </div>
                    <div> Octave-Length: <input onChange={onChangeOctaveLength} value={octaveLength}/> </div>
                    <div className="hbox">
                        <button onClick={() => {playScale(false)}}> Scale forwards </button>
                        <button onClick={() => {playScale(true)}}> Scale backwards</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default ScalePlayer