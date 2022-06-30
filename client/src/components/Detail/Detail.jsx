import React,  {useState} from "react";
import { Link, useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getDetail} from "../../actions/index";
import {useEffect} from "react";
import styles from './Detail.module.css'
import Eliminar from '../Eliminar/Eliminar';



export default function Detail() {

	const [currentPage, setCurrentPage] = useState(1)

	const { id } = useParams();
	const dispatch = useDispatch();
	
	const myRecipe = useSelector((state) => state.detail);
	React.useEffect(() => {
	  dispatch(getDetail(id));
	}, [dispatch, id]);

function reset() {
	dispatch(getDetail());
	setCurrentPage(1);
}




	return (
		<div >
								<Eliminar
										nombre={myRecipe.name}
								/>
					{
							myRecipe.hasOwnProperty('diets') ?
						<div className={styles.detailClass}>
							<div className={styles.nameImage}>
								<div className={styles.NombreClass}>
									<h1>Name: {myRecipe.name}</h1>
								</div>
								<div className={styles.imagenyResumen}>
									<img className={styles.imagedetail} src = {myRecipe.image} alt="No se pudo cargar la imagen"  />
									<div className={styles.summaryStyle}>
										<p>Summary: {myRecipe.summary}</p>
									</div>
								</div>
							</div>
							<div className={styles.healthDietSsteps}>
								<div className={styles.healthDiets}>
									<p>HealthScore: {myRecipe.healthScore}</p>
									<p>Diets: {myRecipe.diets}</p>
								</div>
								<div className={styles.stepsStyle}>								
									<p>Steps: {myRecipe.steps}</p>
								</div>
							</div>
						</div> : <p>Loading...</p>
					}
					<Link to ='/home'>
						<button className={styles.botonDetail} onClick={() => reset()}>Volver</button>
					</Link> 
		
				
				</div>
		
			)
		}








