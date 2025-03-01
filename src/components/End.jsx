import React from 'react'; 
// import {useNavigate} from 'react-router-dom';

import styles from './End.module.css';
import Glitter from '../assets/glitter.gif';

function End ({ resetGame }) {

    // let navigate = useNavigate();
    // function playGame(){
    //     navigate("/");
    // }

    return (
<div>
    <h1 className={styles.EndTitle}>BRAVO ! </h1>
        <img src={Glitter} alt="homme jetant des paillettes" className={styles.EndGif}/>

    <h2 className={styles.EndH2}>C'est la fin ! </h2>
    <p className={styles.EndText}>Vous n'avez pas trouvé toutes les bonnes réponses ? </p>
    <p className={styles.EndText}>Vous pouvez recommencer ! </p>
    <button className={styles.EndButton} onClick={resetGame}>Jouer encore</button>
</div>
    )
}

export default End;