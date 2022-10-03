import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage() {
	return(
		<div className={styles.principal}>
			<div className={styles.containerText}> 
				<h1  className={styles.henryFoodText}>Henry Food</h1>
				<div className={styles.containertextosP}>
					<h1  className={styles.textoP}>● + 100 Recetas</h1>
					<h1  className={styles.textoP}>● 11 Tipos de Dietas</h1>
				</div>
				<div className={styles.containerButton}>
					<Link to ='/home'>
						<button className={styles.boton}>Igresar</button>
					</Link>
				</div>
			</div>
		</div>
	)
}

