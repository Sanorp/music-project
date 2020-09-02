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
function scale(note, scale, length) {
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



export default {harmonyInBar, rythmInBar, chords, bar, scale}