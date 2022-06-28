const { Router } = require('express');
const router = Router();
const {Diet} = require ('../db')
const axios = require('axios')

const {API_PASSWORD} = process.env;
const dataJson = require('./dataApiFood.json')

router.get('/', async(req, res) => {  
	const ArchivoJson = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_PASSWORD}&number=100&addRecipeInformation=true`)
	for (let i=0; i<ArchivoJson.length; i++) {
		for (let j=0; j<ArchivoJson[i].diets.length; j++) {
			let [diet, created] = await Diet.findOrCreate({ // como dije antes: debo revisar esto pq no se si está del todo bien
				where: { name:  ArchivoJson[i].diets[j]
				},
				defaults: {
				  name: ArchivoJson[i].diets[j]
				}
			  });
		}
	}
	let [diet, created] = await Diet.findOrCreate({ 
		where: { name: "vegetarian"
		},
		defaults: {
		  name: "vegetarian"
		}
	});
	const AllDiets = await Diet.findAll();
	res.send(AllDiets)
})


module.exports = router;




