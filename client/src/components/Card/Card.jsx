import React from "react";
import styles from './Card.module.css'

export default function Card({name, image, key, healthScore, diets}) {

	return (
		<div> 
			<p className={styles.cardStyletitle}><strong>Nombre receta:</strong> </p>
			<p className={styles.cardStyleName}>{name}</p>
			<p className={styles.cardStylenombreReceta}><strong>Tipos de dietas: </strong> </p>
{/* 			<p className={styles.cardStyletype}>{diets}</p> */}
{/* 			<div className={styles.tipoDietaEstilo}>
				{diets?.map((dieta)=> <div className={styles.tipoDietaEstiloDiv}>{dieta}</div>)}
			</div> */}
			<div className={styles.tipoDietaEstilo}>
				{diets?.map((dieta)=> <div className={styles.tipoDietaEstiloDiv}>• {dieta}</div>)}
			</div>
			<img src = {image} alt="img not found" width="268px" />
			<p className={styles.cardhealthScore}><strong>healthScore: </strong>{healthScore}</p>
		</div> 
	);
}


