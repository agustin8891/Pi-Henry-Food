import React,  {useState} from "react";
import { Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetail, deleteRecipe, getRecipes, limpiarRecetas} from "../../actions/index";
import {useEffect} from "react";
import styles from './Detail.module.css'
import { useNavigate } from 'react-router-dom';



export default function Detail() {

	const navigate = useNavigate();
	const { id } = useParams();
	const dispatch = useDispatch();	
	const myRecipe = useSelector((state) => state.detail);

	React.useEffect(() => {
		console.log(id)
	  dispatch(getDetail(id));
	}, []);

function reset() {
	dispatch(getDetail());
}

function EliminarRecipe(){
	var respuesta = window.confirm("¿Estás seguro que deseas Eliminar la receta?")
	if (respuesta === true)
	{
		dispatch(deleteRecipe(id));
		dispatch(limpiarRecetas());
		dispatch(getDetail())
		alert("Receta eliminada")	
		dispatch(getRecipes())
		navigate('/home');
		return true;
	} else {
		return false;
	}

}

	return (
		<div >								
					{
							myRecipe.hasOwnProperty('diets') ?
						<div className={styles.detailClass}>
							<div className={styles.nameImage}>
								<div className={styles.NombreClass}>
									<h1>Name: {myRecipe.name}</h1>
								</div>

								<div className={styles.imagenyResumen}>
									<img className={styles.imagedetail} src = {myRecipe.image} alt="No se pudo cargar la imagen"  />

								</div>
								{myRecipe.steps ? 
								<div className={styles.stepsStyle}>	
										<div className={styles.stepsStyleTitle}>															
											<p><strong>Steps:</strong></p>
										</div>
										<div className={styles.stepsStyleText}>															
											<p>{myRecipe.steps}</p>
										</div>
								</div> : null	
								}
							</div>
							<div className={styles.healthDietSsteps}>
								<div className={styles.healthDiets}>
									<div className={styles.healthScoreStyle}>
										<div className={styles.healthScoreTitle}>
											<p>HealthScore: </p>
										</div>
										<div className={styles.healthScoreData}>
											<p>     {myRecipe.healthScore}</p>
										</div>
									</div>
									<div className={styles.dietsStyleTitle}>
										<p>Diets: </p>
									</div>
									<div className={styles.dietsStyleText}>
									{myRecipe.diets?.map((dieta)=> <p className={styles.estiloP}>• {dieta}</p>)}

									</div>
								</div>

								<div className={styles.summaryStyle}>
										<div className={styles.summaryStyleTitle}>
											<p>Summary:</p>
										</div>
										<div className={styles.summaryStyleText}>
											<p>{myRecipe.summary}</p>
										</div>
								</div>
							</div>
							
						</div> : <p>Loading...</p>
					}
					{myRecipe.createdInDb ? 

						<div className={styles.botonsDiv}>
								<div>
									<Link to ='/home'>
										<button className={styles.botonDetail} onClick={() => reset()}>Volver a Home</button>
									</Link> 
								</div>
								<button className={styles.botonDetail} onClick={() => EliminarRecipe()}>Eliminar Receta</button>
								<Link to ={'/actualizar/' + id}>
								<button className={styles.botonDetail}>Actualizar Receta</button>  
								</Link> 
						</div>

							:
						<div className={styles.divBotones}>

							<Link to ='/home'>
								<button className={styles.botonDetail} onClick={() => reset()}>Volver a Home</button>
							</Link> 

						</div>

					}
							

				</div>		
			)
		}








