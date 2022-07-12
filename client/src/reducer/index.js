const initialState = {
	recipes : [],
	allRecipes: [],
	detail:[],
	diets:[],
	healthScore:"",
	idActualizar:""

}

function rootReducer(state=initialState, action) {
	switch(action.type) {


		case 'LIMPIAR_RECETAS':
			console.log("limpiar reducer")
			return {
				...state,
				recipes:[]
			}

		case 'GET_RECIPES':
			return{
				...state,
				recipes:action.payload,				
				allRecipes: action.payload
			}

		case 'GET_DIETS':
			return {
			...state,
			diets: action.payload
		}

		case 'FILTER_BY_TYPE' : 
			let allRecipesStatus = state.allRecipes
			let statusFiltered=action.payload==='All' ? allRecipesStatus : allRecipesStatus.filter(el => el.diets.includes(action.payload))

			return {
				...state,
				recipes: statusFiltered,

		}

		case 'FILTER_CREATED':
			let createdFilter = state.allRecipes;
				createdFilter = action.payload === "All"
				? createdFilter
				: action.payload === "created"
				? createdFilter.filter((p) => p.createdInDb === true)
				: createdFilter.filter((p) => !p.createdInDb);

			return{
			...state,
			recipes: createdFilter,
		}

		case 'ORDER_BY_NAME':
			let sortedArr = action.payload === 'asc' ?
			state.recipes.sort(function(a,b) {
				if(a.name.toLowerCase() > b.name.toLowerCase()){
					return 1;
				}
				if (b.name.toLowerCase() > a.name.toLowerCase()) {
					return -1;
				}
					return 0;
				}) :
			state.recipes.sort(function(a,b) {
				if(a.name.toLowerCase() > b.name.toLowerCase()) {
					return -1;
				}
				if(b.name.toLowerCase() > a.name.toLowerCase()) {
					return 1;
				}
				return 0;
			})


			return {
				...state,
				recipes: sortedArr
			}
			
		case 'ORDER_BY_HEALTHSCORE':
			console.log("order by healthxcore")
      		const HealthScoreOrder =
        	action.payload === "top"
          	? state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return 1;
              }
              if (b.healthScore > a.healthScore) {
                return -1;
              }
              return 0;
            })
          : state.recipes.sort(function (a, b) {
              if (a.healthScore > b.healthScore) {
                return -1;
              }
              if (b.healthScore > a.healthScore) {
                return 1;
              }
              return 0;
            });

      return {
			...state,
		recipes: HealthScoreOrder};

		case "GET_DETAILS":
			return {
				...state,
				detail: action.payload
			}

		case 'GET_NAME_RECIPES':			
			return {
				...state,
				recipes: action.payload
			}
		case 'UPDATE_RECIPE':
			return {
				...state,
			}

			default:
				return state;
	}
}

export default rootReducer;



