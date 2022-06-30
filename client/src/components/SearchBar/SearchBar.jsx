import React from 'react';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {getNameRecipes} from '../../actions';
import styles from './SearchBar.module.css'

export default function SearchBar() {
	const dispatch = useDispatch()
	const[name,setName] = useState("")
	const [currentPage, setCurrentPage] = useState(1)
	
function handleInputChange(e) {
	e.preventDefault()
	setName(e.target.value)
	console.log(name)
}

function handleSubmit(e) {
	e.preventDefault();
	setCurrentPage(1);
	dispatch(getNameRecipes(name))

}

return (
	<div className={styles.divBuscar}>
		<label className={styles.labelBuscarRecetas}>Buscar Recetas:</label>
		<div>
			<input type='text' placeholder="Buscar..."
			onChange = {(e) => handleInputChange(e)}
			className={styles.buscarClase}/>
		</div>
		<div>
			<button type='submit' onClick={(e) => handleSubmit(e)} 
			className={styles.botonBuscar}>Buscar</button>
		</div>
	</div>
)


}