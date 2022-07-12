import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getRecipes, filterDietByType, filterCreated, orderByName, getDiets, orderByHealthScore, filtromayor50} from '../../actions';
import styles from './Home.module.css'
import {Link} from 'react-router-dom'
import Paginado from '../Paginado/Paginado';
import Card from '../Card/Card';
import SearchBar from '../SearchBar/SearchBar';

export default function Home() {
	console.log("home")


	const dispatch = useDispatch()
	const allRecipes = useSelector ((state) => state.recipes)

	const [currentPage, setCurrentPage] = useState(1) // cuando currentPage vale 1 /// 2 
	const [recipesPerPage, setrecipesPerPage] = useState(9) 
	const indexOfLastRecipe=currentPage * recipesPerPage  //  1 * 9 = 9 
	const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage // 9-9 = 0
	const dietsTypes = useSelector((state) => state.diets)

	let currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe) //slice(0,9) => 9 recetas
	const [orden, setOrden] = useState("")
	const [count, setCount] = useState(0);

	let selectFilterTypes = document.getElementById("selectFilterType");
	let selectFilterCreateds = document.getElementById("selectFilterCreated");
	let selectselectOrderHealthScores = document.getElementById("selectOrderHealthScore");
	let selectSorts = document.getElementById("selectSort");


	useEffect(() => {		
		dispatch(getDiets())			
		if(allRecipes.length===0) dispatch(getRecipes())	
	},[dispatch])	



	
	const paginado = (pageNumber) => {
		setCurrentPage(pageNumber)

	}

	
	const resetSelects= () => {
		selectFilterCreateds.value = "Seleccionar";  
		selectselectOrderHealthScores.value = "Seleccionar"; 
		selectSorts.value = "Seleccionar"; 
		selectFilterTypes.value = "Seleccionar";
	}
	
	const resetRecipes = () => {
		dispatch(getRecipes())
	}


	function handleFilterType(e) {		
		dispatch(filterDietByType(e.target.value))
		setCurrentPage(1);
		selectFilterCreateds.value = "Seleccionar";  
		selectselectOrderHealthScores.value = "Seleccionar"; 
		selectSorts.value = "Seleccionar"; 
		setCount(count + 1);
	}

	function handleFilterCreated (e) {
		dispatch(filterCreated(e.target.value))
		setCurrentPage(1); 
		selectFilterTypes.value = "Seleccionar";
		selectselectOrderHealthScores.value = "Seleccionar"; 
		selectSorts.value = "Seleccionar";  
		setCount(count + 1);
	}

	function handleSort (e) {
		e.preventDefault();
		dispatch(orderByName(e.target.value))
		setCurrentPage(1);
		setOrden(`ordered ${e.target.value}`);
		selectFilterCreateds.value = "Seleccionar";  
		selectFilterTypes.value = "Seleccionar";
		selectselectOrderHealthScores.value = "Seleccionar";
		setCount(count + 1); 
	};








	  function handleOrderHealthScore(e) {
		e.preventDefault();
		dispatch(orderByHealthScore(e.target.value));
		setCurrentPage(1);
		setOrden(`ordered ${e.target.value}`);
		selectFilterCreateds.value = "Seleccionar";  
		selectFilterTypes.value = "Seleccionar";
		selectSorts.value = "Seleccionar"; 
		setCount(count + 1);
	  }



	
	return (
		<div>

			<div className={styles.padreTop}>
				<div className={styles.LinkClase}>
					<p className={styles.HenryFood}>Henry Food</p>
					<div>
					<Link to= '/recipes' >
						<button className={styles.boton}  onClick={() => resetRecipes()}>Crear Receta</button>
					</Link>
					</div>
				</div>

					<div className={styles.filtrosyPaginado}>
						<div className={styles.padreDeFiltros}>
							
							<div className={styles.HealthClass}>
								<label>Ordenar por HealthScore:</label>
								<select id="selectOrderHealthScore"
									onChange={(e) => handleOrderHealthScore(e)}
									>
									<option value="Seleccionar" selected="true" disabled="disabled">Seleccionar</option>
									<option value="top">Ascendente</option>
									<option value="bottom">Descendente</option>
								</select>
									<i></i>
							</div>

							<div className={styles.HealthClass}>
								<label>Ordenar alfabéticamente:</label>
									<select id="selectSort" className={styles.HealthClassSelect} 
									onChange={e => handleSort(e)}>
										<option value="Seleccionar" selected="true" disabled="disabled">Seleccionar</option>
										<option value='asc' className={styles.optionStyle}>Ascendente</option>
										<option value='desc'>Descendente</option>
									</select>	
									<i></i>
							</div>

							<div className={styles.HealthClass}>
							<label>Filtrar por tipo de dieta:</label>
{								<select id="selectFilterType"
									onChange={e => handleFilterType(e)} className={styles.abcClase}>
								<option value="Seleccionar" selected="true" disabled="disabled">Seleccionar</option>
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
								<select  id="selectFilterCreated"
									onChange={e => handleFilterCreated(e)}>
								<option value="Seleccionar" selected="true" disabled="disabled">Seleccionar</option>
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
						
						<SearchBar paginado={paginado} resetSelects={resetSelects} />
				</div>

				<div className={styles.padreDeCards}>		
						{ currentRecipes.length>0 ?
						currentRecipes?.map((c) => {

							return (

								<fragment>							
									<Link to = {"/home/" + c.id}>
									<Card name={c.name} image={c.image} key={c.id} healthScore={c.healthScore} diets={c.diets}/>

									</Link>
								</fragment>

								)
							}) : <h1 className={styles.LoadingClass}>Loading...</h1> }				
				</div> 
		</div>
	) 

}