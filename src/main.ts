import {AudioPlayer} from "./audio/AudioPlayer"

declare global {
    interface Window {
        AudioPlayer: any
    }
}

window.AudioPlayer = AudioPlayer