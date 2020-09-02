var rythmInBar = {
    tempo:  60,
    mainBeatsInBar: 4,
    baseScale: 'c:maj'  // every rythm has a base scale
}
var harmonyInBar = {
    rythmInBar: undefined,
    chords: []
}
var chords = {
    startTime: 0,  //on what beat does the chord(-change) happen
    durationInBeats: 1,  //How long is this chord played. For triplets, this may be 1/3
    definition: 'c:maj:7'
}
var bar = {
    harmonyInBar: undefined,
    notesInBar: []  //Filled with note objects (startBeat, duration, [notes] )- filled when randomizing
}

/**
 * Returns the scale as a note-value array
 * @param note starting point of the scale
 * @param scale String as type of scale e.g. major, minor
 * @param length how many octaves should the scale be long
 */
const createScale = (note, scale, length) => {
    var resultScale = [];
    var pattern;
    var pushNote = note
    switch (scale) {
        case 'major':
            pattern = [2,2,1,2,2,2,1]
            break
        case 'minor':
            pattern = [2,1,2,2,1,2,2]
            break
        default:
            pattern = [2,2,1,2,2,2,1]
    }
    while (length>0){
        for(var i in pattern){
            resultScale.push(pushNote)
            pushNote+=pattern[i]
        }
        length--;
    }
    resultScale.push(pushNote);
    return resultScale
}
/**
 * Generates the notes in a chord depending
 * @param degree the degree of the chord in the scale e.g. I, IV, V or VII -> numerical eg. 0, 3, 4, 6
 * @param scale the scale on which the chord is build
 * @param chordType eg. maj7, dom7, min9
 */
const createChord = (degree, baseNote, chordType) => {
    let notesToPick;
    switch (chordType) {
        case 'maj':
            notesToPick = ['1','3','5'];
            break;
        case 'min':
            notesToPick = ['1','b:3','5'];
            break;
        case 'dim':
            notesToPick = ['1','b:3','b:5'];
            break;
        case 'maj7':
            notesToPick = ['1','3','5','7'];
            break;
        case 'dom7':
            notesToPick = ['1','3','5','b:7'];
            break;
        case 'min7':
            notesToPick = ['1','b:3','5','b:7'];
            break;
        default:
            notesToPick =  ['1','3','5']
    }
    let scale = createScale(baseNote,'major',3)
    console.log("Scale:", scale)
    return makeChord(scale,notesToPick);
}
const makeChord = (scale, notesToPick) => {
    let resultNotes = []
    notesToPick.forEach((noteLiteral, index, array) => {
        let splitted = noteLiteral.split(':');
        //Has a # or b in it
        if(splitted.length>1){
            //We need to reduce the note-value by 1 (b)
            if(splitted[0].includes('b')){
                resultNotes.push(scale[Number(splitted[1])-1]-1);
            }
            //We need to increase the note-value by 1 (#)
            else{
                resultNotes.push(scale[Number(splitted[1])-1]+1);
            }
        }
        //Had no # or b in it
        else{
            resultNotes.push(scale[Number(noteLiteral)-1]);
        }
    })
    console.log("Notes in chord:", resultNotes)
    return resultNotes;
}
const createChordTypesFromScaleAndDegrees = (scaleName, progression) =>{
    let chordTypesOfScale;
    switch(scaleName){
        case 'major':
            chordTypesOfScale = ['maj','min','min','maj','maj','min','dim'];
            break;
            case 'minor':
            chordTypesOfScale = ['min','dim','maj','min','min','maj','maj'];
            break;
        default:
            chordTypesOfScale = ['maj','min','min','maj','maj','min','dim'];
    }
    return progression.map(i => chordTypesOfScale[i]);


}
const generateNumericProression = (progression) => {
    var returnArray = progression.split('-');
    returnArray.forEach((value,index,array) => {
        //Return the number with 0 eg. I -> 0, IV -> 3, VII -> 6
      returnArray[index] = Number(value)-1
    })
    return returnArray;
}



export default {harmonyInBar, rythmInBar, chords, bar, createScale, createChord,createChordTypesFromScaleAndDegrees, generateNumericProression}