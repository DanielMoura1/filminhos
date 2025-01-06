import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Favo() {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState(false);
    const [testeData, settesteData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
       
        const teste =async () =>{
            try {
                const token ='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzc0YzdhNjljYTRjNTBjMjM1ZjlhZjQ3OGI3Y2U0MyIsIm5iZiI6MTczNTk3MTAzMC41NDksInN1YiI6IjY3NzhkMGQ2YWI1ZWM0YzNkYzcyNzcxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.02vvve1YIi1JlsneAFPBLtPe0Q8fEIDMrTWUh9w7xpQ'
                const response = await axios.get('https://api.themoviedb.org/3/account/null/favorite/movies?language=en-US&page=1&sort_by=created_at.asc', {
                    headers: {
                        accept: 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                console.log('favo')
                console.log(response.data.results.length)
                if(response.data.results.length>0){
                    settesteData(response.data.results)
                }else{
                    
                    
                }
                
                settesteData(response.data.results)
                console.log('favo')
                
             
                
                
            }catch (e){
                console.log('deu merda')
            }
        }
       
            
        

        teste();
        
        
    }, []);
   
   
   
    return(
        <div className='body'>
            
            {testeData.map((filmes) => {return(
                <div className='conteudo'>
                    <p>{filmes.original_title}</p>
                    <img className='imgs' src={`https://image.tmdb.org/t/p/w500${filmes.poster_path}`}></img>
                </div>);})}   
            
          
        </div>
        
    );

	
    

	

   
}
export default Favo;