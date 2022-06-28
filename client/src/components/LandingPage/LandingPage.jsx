import React from 'react';
import {Link} from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage() {
	return(
		<div className={styles.principal}>
			<Link to ='/home'>
				<button className={styles.boton}>Igresar</button>
			</Link>
		</div>
	)
}

