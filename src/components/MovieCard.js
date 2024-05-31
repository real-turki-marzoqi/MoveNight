
import poster from "../img/poster.png"
import { Link } from "react-router-dom";


const MoveCard = ({mov})=>{
    
    const posterUrl = `https://image.tmdb.org/t/p/w500${mov.poster_path}`;

    return (
        <Link to={`/move/${mov.id}`}>
       
        <div className="MoveCard">

<img className="poster shadow-box" src={posterUrl} alt={mov.original_title} style={{ width: '100%' }} />
      


        </div>
       
       
        </Link>   
      
    )
   
}

export default MoveCard