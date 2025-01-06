import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Home() {
    const navigate = useNavigate();
    const [movieData, setMovieData] = useState(null);
    const [testeData, settesteData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [Inf, setInf] = useState('');
    const [Leitura,setLeitura] = useState(false)
    function informacao(t){
        setInf(t)
        setLeitura(true)
    }
    function sair(){
        setLeitura(false)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzc0YzdhNjljYTRjNTBjMjM1ZjlhZjQ3OGI3Y2U0MyIsIm5iZiI6MTczNTk3MTAzMC41NDksInN1YiI6IjY3NzhkMGQ2YWI1ZWM0YzNkYzcyNzcxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.02vvve1YIi1JlsneAFPBLtPe0Q8fEIDMrTWUh9w7xpQ';
                const response = await axios.get('https://api.themoviedb.org/3/movie/11', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setMovieData(response.data);
            } catch (err) {
                setError('Erro ao carregar os dados');
            } finally {
                setLoading(false);
            }
        };
        const teste =async () =>{
            try {
                const token ='eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzc0YzdhNjljYTRjNTBjMjM1ZjlhZjQ3OGI3Y2U0MyIsIm5iZiI6MTczNTk3MTAzMC41NDksInN1YiI6IjY3NzhkMGQ2YWI1ZWM0YzNkYzcyNzcxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.02vvve1YIi1JlsneAFPBLtPe0Q8fEIDMrTWUh9w7xpQ'
                const response = await axios.get('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', {
                    headers: {
                        accept: 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });
                settesteData(response.data)
                console.log('response.data')
                console.log(response.data)
            }catch (e){
                console.log('deu merda')
            }
        }

        fetchData();
        teste();
        
        
    }, []);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>{error}</div>;


    function ir(){
        navigate("/favoritos")
    }
    

    function favoritar(n){
      
            const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Mzc0YzdhNjljYTRjNTBjMjM1ZjlhZjQ3OGI3Y2U0MyIsIm5iZiI6MTczNTk3MTAzMC41NDksInN1YiI6IjY3NzhkMGQ2YWI1ZWM0YzNkYzcyNzcxYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.02vvve1YIi1JlsneAFPBLtPe0Q8fEIDMrTWUh9w7xpQ';
            const requisicao = axios.post(`https://api.themoviedb.org/3/account/${n}/favorite/movies?language=en-US&page=1&sort_by=created_at.asc`, {
                headers: {
                    accept: 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'content-type': 'application/json',
                },
            });;
    
            
        
    }


    return(
        <div className='body'>
            <div className={Leitura ? 'inf': 'none'} >
                <button className='sair' onClick={sair}>x</button>
                <p>{Inf}</p>
            </div>             
            {testeData.results.map((filmes) => {return(
                <div onClick={()=> informacao(filmes.overview)} className='conteudo'>
                    <p>{filmes.original_title}</p>
                    
                    <img className='imgs' src={`https://image.tmdb.org/t/p/w500${filmes.poster_path}`}></img>
                </div>);})}   
            
          
        </div>
        
    );
}
export default Home;