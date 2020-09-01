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


export default {harmonyInBar, rythmInBar, chords, bar}