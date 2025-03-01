import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import TextReading from './TextReading';
import TimerButton from './timerButton'
import YoutubeVid from './video';
import styles from './Game.module.css';


function Game({ setScore, score , num, total, setTotal, quizzSongs}) {
    let navigate = useNavigate();
    let { id } = useParams();

    const [songID, setSongID ] = useState(parseInt(id));
    const [ song, setSong ] = useState(quizzSongs[songID]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [ userChoice, setUserChoice ] = useState();
    const [ message, setMessage ] = useState('');

    useEffect(() => {
        if (songID < 13) {
        navigate(`/${songID}`)
        setIsPlaying(!isPlaying)
        setSong(quizzSongs[songID])
        }
        else {
            navigate('/end');
        }
    },[songID])

    // eslint-disable-next-line react-hooks/exhaustive-deps
    function displayVideo(choice) {
        setIsPlaying(!isPlaying);
        setTotal(total +1);
        if (choice === song.title) {
            setUserChoice(song.goodVideo);
            setMessage('Bon jeu ! C\'était bien ça :')
            setScore(score +1);
        }
        else {
            setUserChoice(song.wrongVideo);
            setMessage('Mauvaise réponse. Tu mérites ça :');
        }
    }

    function goForward() {
        setSongID(parseInt(id)+1)
    }

    const responses = [song.title, song.wrongResponse1, song.wrongResponse2]
    const shuffleResponses = responses.sort(()=> Math.random() - 0.5);
    // const [startTimer] = useState(true);
    return (
        <div>
            {isPlaying && song ? 
            <div>
                <TimerButton className={styles.GameTextTimer} missed = {displayVideo} song = {song.wrongResponse1}/>  
                <TextReading lyrics={song.lyricsFR} className={styles.GameTextReading}/>
                <h2 className={styles.GameH2}>Quelle est cette chanson?</h2>
                <div onClick={()=>displayVideo(shuffleResponses[0])} className={styles.GameTextSongDiv}><p className={styles.GameTextSong}>{shuffleResponses[0]}</p></div>
                <div onClick={()=>displayVideo(shuffleResponses[1])} className={styles.GameTextSongDiv}><p className={styles.GameTextSong}>{shuffleResponses[1]}</p></div>
                <div onClick={()=>displayVideo(shuffleResponses[2])} className={styles.GameTextSongDiv}><p className={styles.GameTextSong}>{shuffleResponses[2]}</p></div>
            </div> : 
            <div>
                <h2 className={styles.GameTextMessage}>{message}</h2>
                <div className={styles.GameVideoDiv}>
                <YoutubeVid embedId= {userChoice}/>
                </div>
                <button onClick={goForward} className={styles.GameTextButtonSong}> Chanson suivante </button>
            </div>
            }
        </div>
    )
}
export default Game;
