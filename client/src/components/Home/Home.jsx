import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getRecipes, filterDietByType, filterCreated, orderByName, getDiets, orderByHealthScore} from '../../actions';
import styles from './Home.module.css'
import {Link} from 'react-router-dom'
import Paginado from '../Paginado/Paginado';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';

export default function Home() {
	console.log("home")
	const dispatch = useDispatch()
	const allRecipes = useSelector ((state) => state.recipes)

	const [currentPage, setCurrentPage] = useState(1)
	const [recipesPerPage, setrecipesPerPage] = useState(9) 
/* 	console.log(currentPage) */
	const indexOfLastRecipe=currentPage * recipesPerPage 
	const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
	const dietsTypes = useSelector((state) => state.diets)


	let currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)


	const [orden, setOrden] = useState('')

	useEffect(() => {
		dispatch(getRecipes());
	},[dispatch])

	useEffect(() => {
		dispatch(getDiets())
	},[]);



	const[input, setInput] = useState({
		name:"",
		life:"",
		attack:"",
		defense:"",
        speed:"",
		height:"",
		weight:"",
		types:[]
	})	
	
	const paginado = (pageNumber) => {

		setCurrentPage(pageNumber)
		console.log(currentPage)
	}
	



	function handleFilterType(e) {		
		dispatch(filterDietByType(e.target.value))
		setCurrentPage(1);
	}

	function handleFilterCreated (e) {
		dispatch(filterCreated(e.target.value))
		setCurrentPage(1);
	}

	function handleSort (e) {
		e.preventDefault();
		dispatch(orderByName(e.target.value))
		setCurrentPage(1);
		setOrden(`Ordenado ${e.target.value}`)
	};

	  function handleOrderHealthScore(e) {
		e.preventDefault();
		dispatch(orderByHealthScore(e.target.value));
		setCurrentPage(1);
		setOrden(`ordered ${e.target.value}`);
	  }

	
	return (
		<div>
			<div className={styles.padreTop}>
				<div className={styles.LinkClase}>
					<p className={styles.HenryFood}>Henry Food</p>
					<div>
					<Link to= '/recipes' >
						<button className={styles.boton}>Crear Receta</button>
					</Link>
					</div>
				</div>

					<div className={styles.filtrosyPaginado}>
						<div className={styles.padreDeFiltros}>
							<div className={styles.HealthClass}>
								<label>Ordenar por HealthScore:</label>
								<select
									onChange={(e) => handleOrderHealthScore(e)}
									>
									<option selected="true" disabled="disabled">Seleccionar</option>
									<option value="top">Ascendente</option>
									<option value="bottom">Descendente</option>
								</select>
									<i></i>
							</div>

							<div className={styles.HealthClass}>
								<label>Ordenar alfabéticamente:</label>
									<select onChange={e => handleSort(e)}>
									<option selected="true" disabled="disabled">Seleccionar</option>
										<option value='asc'>Ascendente</option>
										<option value='desc'>Descendente</option>
									</select>	
									<i></i>
							</div>

							<div className={styles.HealthClass}>
							<label>Filtrar por tipo de dieta:</label>
{								<select onChange={e => handleFilterType(e)} className={styles.abcClase}>
								<option selected="true" disabled="disabled">Seleccionar</option>
									<option value="All">Todos</option>
									<option value="gluten free">Gluten Free</option>
									<option value="dairy free">Dairy Free</option>
									<option value= "lacto ovo vegetarian">Lacto Ovo Vegetarian</option>
									<option value='vegan'>Vegan</option>
									<option value='paleolithic'>Paleolithic</option>
									<option value='primal'>Primal</option>
									<option value='whole 30'>Whole 30</option>
									<option value='pescatarian'>Pescatarian</option>
									<option value='ketogenic'>Ketogenic</option>
									<option value='fodmap friendly'>Fodmap Friendly</option>
									<option value='vegetarian'>Vegetarian</option>
								</select>}
								<i></i>
							</div>

							<div className={styles.HealthClass}>
								<label>Filtar por creada o existente:</label>
								<select onChange={e => handleFilterCreated(e)}>
								<option selected="true" disabled="disabled">Seleccionar</option>
									<option value='All'>Todos</option>
									<option value='created'>Creados</option>
									<option value='api'>Existentes</option>
								</select>
								<i></i>
							</div>
						</div>	

						<div className={styles.paginadoClase}>
							<label className={styles.LabelPagina}>Seleccionar página:</label>
							<div className={styles.paginasClase}>
								<Paginado
									recipesPerPage= {recipesPerPage}
									allRecipes={allRecipes.length}
									paginado={paginado}
								/>
							</div>	
						</div>
					</div>
		
						
						<SearchBar paginado={paginado} />
				</div>
				<div className={styles.padreDeCards}>		
				{currentRecipes?.map((c) => {
					return (

						<fragment>							
							<Link to = {"/home/" + c.id}>
							<Card name={c.name} image={c.image} key={c.id} healthScore={c.healthScore} diets={c.diets}/>

							</Link>
						</fragment>

						)
					})}				
			</div>
		</div>
	)

}