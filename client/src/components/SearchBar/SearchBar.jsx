import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getNameRecipes} from '../../actions';
import styles from './SearchBar.module.css'

export default function SearchBar({paginado, resetSelects}) {
	const dispatch = useDispatch()
	const[name,setName] = useState("")
	const [currentPage, setCurrentPage] = useState(1)

function handleInputChange(e) {
	e.preventDefault()
	setName(e.target.value)
	console.log(name)

}


async function handleSubmit(e) {
	e.preventDefault();
	dispatch(getNameRecipes(name))
	paginado(1)
	resetSelects()
}

return (
	<div className={styles.containerBuscarAll}> {
			<div className={styles.divBuscar}> 
				<label className={styles.labelBuscarRecetas}>Buscar Recetas:</label>
				<div>
					<input type='text' placeholder="Buscar..."
					onChange = {(e) => handleInputChange(e)}
					className={styles.buscarClase}/>
				</div>
				<div>
					<button onClick={(e) => handleSubmit(e)} type='submit'
					className={styles.botonBuscar}>Buscar</button>
				</div>
			</div> }
	</div>
)


}