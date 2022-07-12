const { Router } = require('express');
const router = Router();
const {Diet, Recipe} = require ('../db')
const axios = require('axios')
const {Op} = require('sequelize')

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
			let [diet, created] = await Diet.findOrCreate({
				where: { name:  ArchivoJson[i].diets[j]
				}
			  });
		}
	}
	let [diet, created] = await Diet.findOrCreate({ 
		where: { name: "vegetarian"
		}
	});
	const AllDiets = await Diet.findAll();
	res.send(AllDiets)
})
///ARCHIVO









// router.get('/', async(req, res) => { 
// 	/* console.log("archivo")  */
// 	const ArchivoJson = await dataJson.results

//  	for (let i=0; i<ArchivoJson.length; i++) {

// 		for (let j=0; j<ArchivoJson[i].diets.length; j++) {
// 			let [diet, created] = await Diet.findOrCreate({
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







////////////////////////////////////////////////////////////////////////////////////////////////////

////////////77API

// router.get('/', async(req, res) => {  
// 	const ArchivoJson = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_PASSWORD}&number=100&addRecipeInformation=true`)
// 	for (let i=0; i<ArchivoJson.length; i++) {
// 		for (let j=0; j<ArchivoJson[i].diets.length; j++) {
// 			let [diet, created] = await Diet.findOrCreate({ 
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


// router.get('/', async(req, res) => {  
// 	const getdietas=axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_PASSWORD}&number=100&addRecipeInformation=true`)
// 	.then(ArchivoJson => 	{
// 			for (let i=0; i<ArchivoJson.length; i++) {
// 		for (let j=0; j<ArchivoJson[i].diets.length; j++) {
// 			let [diet, created] = await Diet.findOrCreate({ 
// 				where: { name:  ArchivoJson[i].diets[j]
// 				},
// 				defaults: {
// 				  name: ArchivoJson[i].diets[j]
// 				}
// 			  })
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
// 	})		
// })


//server.get('/players', async (req, res) => {
	// const { name } = req.query;
	// const condition = name 
	//   ? {where: {firstName: name}}
	//   : {}
	// condition.attributes = { exclude: ['actualizado']}
	// const players = await Player.findAll(
	//   condition,
	// );
	// // console.log(players);
	// // console.log(players.map(p => p.toJSON()));
	// res.json(players.length ? players : 'No players found');
  //});


//   router.get("/", async(req,res) => {
// 	const name = req.query.name
// 	console.log(name)
// 	const buscarDiet= await Recipe.findAll({where:{name:name}})
// 	console.log(buscarDiet)
// 	res.send("get probando")
//   })




/* router.get("/", async(req,res) => {
	const name=req.query.name
	console.log(name)
	let recipeBuscar= await Recipe.findAll({
		include : Diet,
		where:{name:name},
	})

	recipeBuscar= recipeBuscar.map((e) => ({...e.dataValues, diets: e.diets.map((e) => e.name)}));


	res.send(recipeBuscar)
}) */

// router.get("/", async (req,res) => {
// 	const name=req.query.name
// 	let recipebuscar= await Recipe.findAll({
// 		include: Diet,
// 		where:{ name: {
// 			[Op.iLike]: "%" +  name + "%"
// 		}},
// 		})
// 		console.log(recipebuscar)
// /* 		let recipeBd = await Recipe.findAll({
// 			include: Diet,
// 				where: {
// 					name: {
// 						[Op.iLike]: "%" + name + "%"
// 					}
// 			},
// 			}) */




// 	res.send("recipeBd")
// })


// router.get("/", async(req,res) => {
// 	const ArchivoJson = await dataJson.results
// 	for(let i=0; i<ArchivoJson.length; i++) {
// 		for(let j=0; i<ArchivoJson[j].diets; j++) {
// 			let [recipe, created] = await Diet.findOrCreate({where:{name:name}})
// 		}
// 	}	

// 	const Alldiets=await Diet.findAll()
// 	console.log(Alldiets)

// 	res.send(Alldiets)

// })









//API
//////////////////////////////////////////////////////////////////////////////////////////////////7

module.exports = router;




