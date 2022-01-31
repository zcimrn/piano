"use strict"
let d = {
    //"CapsLock": 0,
    "ShiftLeft": -9,
    "KeyA": -8,
    "KeyZ": -7,
    "KeyS": -6,
    "KeyX": -5,
    //"KeyD": 0,
    "KeyC": -4,
    "KeyF": -3,
    "KeyV": -2,
    "KeyG": -1,
    "KeyB": 0,
    "KeyH": 1,
    "KeyN": 2,

    //"KeyJ": 0,
    "KeyM": 3,
    "KeyK": 4,
    "Comma": 5,
    "KeyL": 6,
    "Period": 7,
    //"Semicolon": 0,
    "Slash": 8,
    "Quote": 9,
    "ShiftRight": 10,
    "Enter": 11,

    //"Backqoute": 0,
    "Tab": 3,
    "Digit1": 4,
    "KeyQ": 5,
    "Digit2": 6,
    "KeyW": 7,
    //"Digit3": 0,
    "KeyE": 8,
    "Digit4": 9,
    "KeyR": 10,
    "Digit5": 11,
    "KeyT": 12,
    "Digit6": 13,
    "KeyY": 14,

    //"Digit7": 0,
    "KeyU": 15,
    "Digit8": 16,
    "KeyI": 17,
    "Digit9": 18,
    "KeyO": 19,
    //"Digit0": 0,
    "KeyP": 20,
    "Minus": 21,
    "BracketLeft": 22,
    "Equal": 23,
    "BracketRight": 24,
    "Backspace": 25,
    "Backslash": 26,
}

let audioContext = new AudioContext()

let mainGain = audioContext.createGain()
mainGain.gain.value = 0.2
mainGain.connect(audioContext.destination)

document.addEventListener("keydown", function(event) {
    if (event.code in d) {
        event.preventDefault()
    }
    else {
        return
    }

    let time = audioContext.currentTime

    let gain = audioContext.createGain()
    gain.gain.setValueAtTime(0, time)
    gain.gain.linearRampToValueAtTime(1, time + 0.1)
    gain.gain.linearRampToValueAtTime(0.5, time + 0.2)
    gain.gain.linearRampToValueAtTime(0.5, time + 0.3)
    gain.gain.linearRampToValueAtTime(0, time + 0.5)
    gain.connect(mainGain)

    let frequency = 220 * (2 ** (1 / 12)) ** d[event.code]
    console.log(event.code, d[event.code], frequency)

    let oscillator = audioContext.createOscillator()
    oscillator.type = "triangle"
    oscillator.frequency.setValueAtTime(frequency, time)
    oscillator.start(time)
    oscillator.stop(time + 3)
    oscillator.connect(gain)
})
