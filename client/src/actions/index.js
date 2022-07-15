import axios from 'axios'


export function limpiarRecetas() {
	console.log("limpiar action")
	return{
		type:'LIMPIAR_RECETAS'
	}
}

export function getRecipes() {
	return async function(dispatch){
		var json = await axios.get(`/Recipes`);
		return dispatch({
			type:'GET_RECIPES',
			payload:json.data
		})
	}
}


export function filterDietByType(payload) {
	return{
		type: 'FILTER_BY_TYPE',
		payload,
	}
}




export function filterCreated(payload) {
	return{
		type: "FILTER_CREATED",
		payload
	}
}

export function orderByName(payload) {
	return {
		type: 'ORDER_BY_NAME',
		payload
	}
}

export function getNameRecipes(name) {
	return async function (dispatch) {
		try{
			var json=await axios.get(`/Recipes?name=` + name)
			return dispatch ({
				type: "GET_NAME_RECIPES",
				payload: json.data				
			})
		} catch(error) {
			console.log(error)
			alert("Receta no encontrada")
		}
	}	
}



export function getDetail(id){
	return async function (dispatch) {
		try{
			var json = await axios.get(`/Recipes/` + id);
			return dispatch({
				type: "GET_DETAILS",
				payload: json.data
			})			
		} catch(error) {
			alert("no existe el id solicitado")
		}
	}
}

 export function getDiets() {
	return async function(dispatch) {
		var info = await axios.get(`/diets`)
		return dispatch({type: 'GET_DIETS', payload: info.data} );
	};
} 


 export function postRecipe (payload) {

	return async function(dispatch){
		const response = await axios.post(`/Recipes`, payload)
		return response;
	}
}
 

export function deleteRecipe (id) {

 	return async function(dispatch){
		const response = await axios.delete(`/Recipes/` + id)
		console.log(response)
		return response;
	} 
}

  
  export function orderByHealthScore(payload) {

	return { type: 'ORDER_BY_HEALTHSCORE', payload };
  }



export function UpdateRecipe(payload, id) {
	console.log(payload)

	return async function (dispatch) {
			var json = await axios.put(`/Recipes/` + payload.id, payload);
			return dispatch({
				type: "UPDATE_RECIPE",
				payload: json.data
			})			

	}
}



