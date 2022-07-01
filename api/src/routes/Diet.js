const { Router } = require('express');
const router = Router();
const {Diet} = require ('../db')
const axios = require('axios')

const {API_PASSWORD} = process.env;
const dataJson = require('./dataApiFood.json')

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Solo se puede hacer 150 peticiones por día a la api de este proyecto por lo que se comenta el código 
// relacionado con la api y se crea un archivo llamado dataApiFood con los datos de las
//  100 primeras recetas de la api para traer los datos desde este archivo

/////ARCHIVO

router.get('/', async(req, res) => { 
	/* console.log("archivo")  */
	const ArchivoJson = await dataJson.results

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
///ARCHIVO

////////////////////////////////////////////////////////////////////////////////////////////////////

////////////77API

// router.get('/', async(req, res) => {  
// 	const ArchivoJson = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_PASSWORD}&number=100&addRecipeInformation=true`)
// 	for (let i=0; i<ArchivoJson.length; i++) {
// 		for (let j=0; j<ArchivoJson[i].diets.length; j++) {
// 			let [diet, created] = await Diet.findOrCreate({ // como dije antes: debo revisar esto pq no se si está del todo bien
// 				where: { name:  ArchivoJson[i].diets[j]
// 				},
// 				defaults: {
// 				  name: ArchivoJson[i].diets[j]
// 				}
// 			  });
// 		}
// 	}
// 	let [diet, created] = await Diet.findOrCreate({ 
// 		where: { name: "vegetarian"
// 		},
// 		defaults: {
// 		  name: "vegetarian"
// 		}
// 	});
// 	const AllDiets = await Diet.findAll();
// 	res.send(AllDiets)
// })


//API
//////////////////////////////////////////////////////////////////////////////////////////////////7

module.exports = router;




