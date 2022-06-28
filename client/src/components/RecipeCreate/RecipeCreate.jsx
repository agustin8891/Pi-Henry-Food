import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {postRecipe, getDiets} from '../../actions/index'
import {useDispatch, useSelector} from 'react-redux';
import styles from './RecipeCreate.module.css'

/////////////////////////////////////////////////////////////////////////7
var dietasUnicas=[]
/* /^[a-zA-Z\s][4-100]*$/ */
/* /^[a-zA-Z\s][4-100]*$/ */
 function validate(input) {
    let errors = {}; 
     if (!input.name) {
      errors.name = "Este campo es requerido";
    } else if (!/^[a-zA-Z\s]*$/.test(input.name)) {
      errors.name = 
      "Solo se aceptan letras del abecedario" ;
    } else if (!input.image) {
      errors.image =  "Este campo es requerido";
    } /*else if (
      !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(
        input.image
      )
    ) {
      errors.image = "La imagen debe ser una url disponible"; 
    }*/  else if (!input.summary) {
      errors.summary =  "Este campo es requerido";
    }/* else if (!/^[a-zA-Z\s]*$/.test(input.summary)) {
      errors.summary = "No se aceptan caracteres numéricos";
    } */ else if (!input.healthScore) {
      errors.healthScore =  "Este campo es requerido";
    }  else if (!/^[0-9_-]{1,3}$/.test(input.healthScore) || input.healthScore < 1) {
      errors.healthScore = "El número debe ser mayor que 0 y menor que 1000";
    } else if (!input.steps) {
      errors.steps = "Este campo es requeridoe";
    } else if (input.diets.length==0) {
      console.log("errores en diet")
    } 

    return errors;
  }   



export default function RecipeCreate(){

	const dispatch=useDispatch()
	const dietTypes = useSelector((state) => state.diets)
    const allRecipes= useSelector ((state) => state.recipes)
    /* const history= useHistory() */// esto es un metodo del router que me redirige a la ruta que yo le diga

    let dietasDuplicadas=[]
    let indice
    const [errors, setErrors] = useState({});
    const [terminos, setTerminos]=useState("")

  let arrayDiets=[] 
 	const[input, setInput] = useState({
		name:"",
    image:"",
		summary:"",
		healthScore:"",
    steps:"",
		diets:[],
	})
 
	useEffect(() => {
		dispatch(getDiets())
	},[]);



    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));

    }

    function handleSelect(e) {
	setInput({
		...input,
		diets:[...input.diets, e.target.diets]		
	})
}

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(postRecipe(input))
        alert("Receta creada")
        setInput({
          name:"",
          image:"",
          summary:"",
          healthScore:"",
          steps:"",
          diets:[],
        })
       /*  history.push('/home') */
    }

     function handleCheckBox(e) {
      if(e.target.checked===true) {  
        setInput({ ...input, diets: [...input.diets, e.target.name] });
      } else if(e.target.checked===false) { 
      setInput({...input, diets: input.diets.filter(diet => diet !==e.target.name)
    })
    }
    console.log(input.diets)
      }
  
	return(	
		<div className={styles.Contenedor}>      
          <div className={styles.DivBoton}>
          {<Link to= '/home'><button className={styles.botonVolver}>Volver</button></Link>}
        </div>
        <div className={styles.divTitulo}>
            <h1>Crea tu Receta</h1>
        </div>
		    <form onSubmit = {(e) => handleSubmit(e)} className={styles.formulario}> 

                    <div className={styles.estiloDiv}>
                            <div className={styles.estiloLabel}><label>Nombre:</label></div>
                            <div>  
                                <input className={styles.estiloInput}
                                type="text"	
                                value={input.name}		    	
                                name="name"
                                onChange={(e) => handleChange(e)}
                                />
                            </div>
                        {errors.name && (
                            <p className={styles.estiloError}>{errors.name}</p>
                        )}
                    </div>

                <div className={styles.estiloDiv}>
                    <div className={styles.estiloLabel}><label>Image (url):</label></div>
                    <div>
                        <input className={styles.estiloInput}
                        type="text"
                        value={input.image}
                        name="image"
                        onChange={(e) => handleChange(e)}
                        />
                    </div>
                    {errors.image && <p className={styles.estiloError}>*{errors.image}</p>}
                </div>

			    <div className={styles.estiloDiv}>
                    <div className={styles.estiloLabel}><label>Summary:</label></div>
                    <div>
                        <input className={styles.estiloInput}
                        type="string"
                        value={input.summary}
                        name="summary"
                        onChange={(e) => handleChange(e)}
                        />
                    </div>
                    {errors.summary && <p className={styles.estiloError}>*{errors.summary}</p>}
                </div>

			    <div className={styles.estiloDiv}>
                    <div className={styles.estiloLabel}><label>healthScore:</label></div>
                        <div>
                            <input  className={styles.estiloInput}
                            type="number"
                            value={input.healthscore}
                            name="healthScore"
                            onChange={(e) => handleChange(e)}
                            />
                        </div>
                </div>
                {errors.healthScore && <p className={styles.estiloError}>*{errors.healthScore}</p>}

                <div className={styles.estiloDiv}>
                    <div className={styles.estiloLabel}><label>Steps:</label></div>
                    <div>
                        <input className={styles.estiloInput}
                        type="text"
                        value={input.steps}
                        name="steps"
                        onChange={(e) => handleChange(e)}
                        />
                    </div>
                </div>                
                {errors.steps && <p className={styles.estiloError}>*{errors.steps}</p>}
                <div className={styles.estiloDivUltimo}>
                  
                <div className={styles.estiloLabelTipos}><label>Tipos de dietas: </label></div>
                  <div className={styles.contenedorDiets}>
                    
                        <div className={styles.primeras4Diets}>
                            <label for="lacto ovo vegetarian" className={styles.labelTypeDiet}><input type="checkbox" value="lacto ovo vegetarian"  name="lacto ovo vegetarian" onChange={(e) =>  handleCheckBox(e)} className={styles.inputStyle}/>lacto ovo vegetarian</label>
                            <label for="fodmap friendly" className={styles.labelTypeDiet}><input type="checkbox" value="fodmap friendlyn"  name="fodmap friendly" onChange={(e) =>  handleCheckBox(e)}/>fodmap friendly</label>
                            <label for="gluten free" className={styles.labelTypeDiet}><input type="checkbox" value="gluten free"  name="gluten free" onChange={(e) =>  handleCheckBox(e)}/>gluten free</label>
                            <label for="dairy free" className={styles.labelTypeDiet}><input type="checkbox" value="dairy free"  name="dairy free" onChange={(e) =>  handleCheckBox(e)}/>dairy free</label>               
                        </div>
                        <div className={styles.segundas4Diets}> 
                          <label for="paleolithic" className={styles.labelTypeDiet}><input type="checkbox" value="paleolithic"  name="paleolithic" onChange={(e) =>  handleCheckBox(e)}/>paleolithic</label>             
                            <label for="vegan" className={styles.labelTypeDiet}><input type="checkbox" value="vegan"  name="vegan" onChange={(e) =>  handleCheckBox(e)}/>vegan</label>
                            <label for="primal" className={styles.labelTypeDiet}><input type="checkbox" value="primal"  name="primal" onChange={(e) =>  handleCheckBox(e)}/>primal</label>                
                            <label for="whole 30" className={styles.labelTypeDiet}><input type="checkbox" value="whole 30"  name="whole 30" onChange={(e) =>  handleCheckBox(e)}/>whole 30</label>
                        </div>
                        <div className={styles.ultimas3Diets}>           
                            <label for="pescatarian" className={styles.labelTypeDiet}><input type="checkbox" value="pescatarian"  name="pescatarian" onChange={(e) =>  handleCheckBox(e)}/>pescatarian</label>
                            <label for="ketogenic" className={styles.labelTypeDiet}><input type="checkbox" value="ketogenic"  name="ketogenic" onChange={(e) =>  handleCheckBox(e)}/>ketogenic</label>
                            <label for="vegetarian" className={styles.labelTypeDiet}><input type="checkbox" value="vegetarian"  name="vegetarian" onChange={(e) =>  handleCheckBox(e)}/>vegetarian</label>
                        </div>
                  </div>
                          

                  </div>

                <div>
{input.diets.length==0 ? (<p className={styles.estiloError}>*Debe agregar al menos una dieta{errors.diets}</p>) : null}
            
                              {
            input.diets.length === 0 ||
            errors.name ||
            errors.image ||
            errors.summary ||
            errors.healthScore ||
            errors.steps ||
            !input.name ||
            !input.image ||
            !input.summary ||
            !input.healthScore ||
            !input.steps ?
              (
              <button className={styles.buttonSubmitDisabled}  type="submit" disabled={true}>
                Crear Receta
              </button>
            ) : (
              <button className={styles.buttonSubmit} type="submit">
                Crear Receta
              </button>
            )}
                </div>

		    </form>
          <div className={styles.estiloDivdiets}>
            </div>



        </div>
		
	)
}