import React, {useState, useEffect} from 'react';
import {Link, useHistory, useParams} from 'react-router-dom';
import {getDiets, getRecipes, UpdateRecipe,limpiarRecetas, getDetail} from '../../actions/index'
import {useDispatch, useSelector} from 'react-redux';
import styles from './Actualizar.module.css'
import { useNavigate } from 'react-router-dom';






/////////////////////////////////////////////////////////////////////////7


 function validate(input) {
    let errors = {}; 
     if (!input.name) {
      errors.name = "Este campo es requerido";
    } else if (!/^[a-zA-Z\s]*$/.test(input.name)) {
      errors.name = 
      "Solo se aceptan letras del abecedario" ;
    } else if (!input.image) {
      errors.image =  "Este campo es requerido";
    } else if (
      !/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(input.image)
    ) {
      errors.image = "La imagen debe ser una url disponible"; 
    }  else if (!input.summary) {
      errors.summary =  "Este campo es requerido";
    } else if (!input.healthScore) {
      errors.healthScore =  "Este campo es requerido";
    }  else if (!/^[0-9_-]{1,3}$/.test(input.healthScore) || input.healthScore < 1) {
      errors.healthScore = "El número debe ser mayor que 0 y menor que 1000";
    } else if (!input.steps) {
      errors.steps = "Este campo es requerido";
    } else if (input.diets.length==0) {
      console.log("errores en diet")
    } 

    return errors;
  }   



export default function RecipeUpdate(){

    const dispatch=useDispatch()
    const dietTypes = useSelector((state) => state.diets)
    const allRecipes= useSelector ((state) => state.recipes)
    const navigate = useNavigate();

    const details= useSelector(state => state.detail)
  	const { id } = useParams();


    const [errors, setErrors] = useState({});
    const [terminos, setTerminos]=useState("")

 	const[input, setInput] = useState({
		name:"",
    image:"",
		summary:"",
		healthScore:"",
    steps:"",
		diets:[],
        id:id
	})
 
	useEffect(() => {
		dispatch(getDiets())
    dispatch(getDetail(id));
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


    function handleSubmit(e) {
        e.preventDefault();
        dispatch(UpdateRecipe(input, id))
        dispatch(limpiarRecetas())
        dispatch(getRecipes())
        dispatch(getDetail())
        alert("Receta Actualizada")
         setInput({
          name:"",
          image:"",
          summary:"",
          healthScore:"",
          steps:"",
          diets:[],
        }) 
      navigate('/home'); 
    }

  
	return(	
		<div className={styles.Contenedor}>      
          <div className={styles.DivBoton}>
          {<Link to= '/home'><button className={styles.botonVolver}>Volver a Home</button></Link>}
          {<Link to= {'/home/'+ id}><button className={styles.botonVolver}>Volver a detalles</button></Link>}
        </div>
        <div className={styles.divTitulo}>
            <h1>Actualizar Receta: {details.name}</h1>
        </div>
		    <form onSubmit = {(e) => handleSubmit(e)} className={styles.formulario}> 

            <div className={styles.estiloDiv}>
                            <div>  
                                <input className={styles.estiloInputdisabled}
                                type="text"	
                                value={input.id}		    	
                                name="id"
                                onChange={(e) => handleChange(e)}
                                disabled
                                />
                            </div>

                    </div>

                    <div className={styles.estiloDiv}>
                            <div className={styles.estiloLabel}><label>Name:</label></div>
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
                         
                            {details.diets?.map((dieta)=> <p className={styles.estiloP}>• {dieta}</p>)}


                </div>

                <div>

            
                              {
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
                Actualizar Receta
              </button>
            ) : (
              <button className={styles.buttonSubmit} type="submit">
                Actualizar Receta
              </button>
            )}
                </div>

		    </form>
          <div className={styles.estiloDivdiets}>
            </div>
        </div>
		
	)
}