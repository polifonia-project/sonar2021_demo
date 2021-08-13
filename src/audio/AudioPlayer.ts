import {Howl} from 'howler';

type AudioPlayerOptions = {

}

export class AudioPlayer {

    soundController: Howl;

    constructor(songs : string[], options? : AudioPlayerOptions) {
        this.soundController = new Howl({
            src: songs
        })
    }

    playCurrentSong() : void {
        this.soundController.play()
    }
    pauseCurrentSong() : void {
        this.soundController.pause()
    }
    songIsPlaying() : boolean {
        return this.soundController.playing()
    }
    getCurrentSongTime() {
        return this.soundController.seek()
    }
    getCurrentSongDuration() {
        return this.soundController.duration()
    }
}
