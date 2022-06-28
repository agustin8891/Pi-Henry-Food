const { Router } = require('express');
const router = Router();
const axios = require('axios')
const {Recipe, Diet} = require('../db')
const {Op} = require('sequelize')

const dataJson = require('./dataApiFood.json')
const {API_PASSWORD} = process.env;



const getApiInfo = async() => {  
	console.log("getApiInfo")
	const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_PASSWORD}&number=100&addRecipeInformation=true`)
	console.log(apiUrl.data.next)	
	const apiInfo = await apiUrl.data.results.map(el => { // esto debo verlo bien despues
        return{ 
			id: el.id,
            name: el.title,
            healthScore:el.healthScore,
            summary: el.summary,
            diets: el.diets,
            steps: el.analyzedInstructions.length>0 ? (el.analyzedInstructions[0].steps.map (st => st.step)) : (null), 
            image: el.image,
            dishTypes: el.dishTypes
        }
        })
		return apiInfo 
  
}



router.get('/', async (req,res) => {
	const name= req.query.name
    let recipe
	let arrayApiRecipes=[]
	console.log("get")
	if(name) {
				try {
                    //Busco en la Bd
						let recipeBd = await Recipe.findAll({
							include: Diet,
								where: {
									name: {
										[Op.iLike]: "%" + name + "%"
									}
							},
							order: [
								['name', 'ASC'],
							], 
							})

					recipeBd=recipeBd.map((e) => ({...e.dataValues, diets: e.diets.map((e) => e.name)}));
					console.log(API_PASSWORD)
					nameMinuscula=name.toLowerCase()
					const buscarApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_PASSWORD}&number=100&addRecipeInformation=true`)
					const buscarNombreApi=buscarApi.data.results
					for (let i=0; i<buscarNombreApi.length; i++){
								if (buscarNombreApi[i].title.toLowerCase().includes(name.toLowerCase())) {	
									console.log("26 6 2022 18hs")								
											recipeApi= {
												id: buscarNombreApi[i].id,
												name: buscarNombreApi[i].title,
												healthScore:buscarNombreApi[i].healthScore,
												summary: buscarNombreApi[i].summary,
												diets: buscarNombreApi[i].diets,
												steps: buscarNombreApi[i].analyzedInstructions.length>0 ? (buscarNombreApi[i].analyzedInstructions[0].steps.map (st => st.step)) : (null), 
												image: buscarNombreApi[i].image,
												dishTypes: buscarNombreApi[i].dishTypes											
											}
											arrayApiRecipes.push(recipeApi)
								} 
					 }
					
										let arrayRecipesAll = arrayApiRecipes.concat(recipeBd);
										console.log(arrayRecipesAll)
										res.status(200).send(arrayRecipesAll) 		

						}
						catch(err) {
							res.status(404).send(err)
						} 
					} 
					else {
			let recipeAll= await getAllRecipes();
			res.status(200).send(recipeAll)        
		}
	})




router.get('/:id', async (req,res) => {

		 try {	
			const id = req.params.id;
			let recipe

			if(typeof id === 'string' && id.length > 8) {            
	                let RecipeDb = await getDbInfo()               
					recipe = RecipeDb.filter(function(el) {
		             return el.id === id; }) 
					recipe=recipe[0]
                           
			 } else {
				let apiUrl= await axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=${API_PASSWORD}`)
				console.log(apiUrl.data.id)
				  recipe = {
				  		id: apiUrl.data.id,
					  	name: apiUrl.data.title,
				  		healthScore:apiUrl.data.healthScore,
					  	summary: apiUrl.data.summary,
				  		diets: apiUrl.data.diets,
					  	steps: apiUrl.data.analyzedInstructions.length>0 ? (apiUrl.data.analyzedInstructions[0].steps.map (st => st.step)) : (null), 
				  		image: apiUrl.data.image,
				  		dishTypes: apiUrl.data.dishTypes											
				 				}			
			 	}
				console.log(recipe)
				res.send(recipe)				
			} catch(error) {
				res.status(404).send(error)
			}	
		})




router.post('/', async (req,res) => {

	let {
        name,
        healthScore,
        summary,
        diets,
        steps,
        image,
	}= req.body	

	let recipeCreated = await Recipe.create({
		name,
		healthScore,
		summary,
		diets,
		steps,
		image,
	})

	let DietBd = await Diet.findAll({
		where: {name : diets}			
	})
	console.log(DietBd)
	recipeCreated.addDiet(DietBd)
	res.send('Receta creada con éxito')
})










const getDbInfo = async() => {
	let r=await Recipe.findAll({
		include: {
			model:Diet,
			attributes: ['name'],
			through:{
				attributes: [],
				},
			},
		});

		r=r.map((e) => ({...e.dataValues, diets: e.diets.map((e) => e.name)}));
	return r;
	};

	

const getAllRecipes = async() => {
	const apiInfo = await getApiInfo();	
	const dbInfo = await getDbInfo();
	const infoTotal = apiInfo.concat(dbInfo);
	return infoTotal 
}

module.exports = router;
