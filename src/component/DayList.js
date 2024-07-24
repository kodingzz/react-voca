
import {Link} from 'react-router-dom';
import useFetch from '../hook/useFetch';
// import dummy  from '../db/data.json';

export default function DayList(){
     const days= useFetch('http://localhost:3002/days');

    //  화면 로드가 느릴때(네트워크가 느릴때),  ui가 보여지기 전에 나올 문구 출력
     if(days.length===0){
        return <span>Loading...</span>
     }

    return(
        <ul className='list_day'>
            {days.map(item=>{
               return <li key={item.id}><Link to={`/day/${item.day}`}>Day{item.day}</Link></li>
            })}
        </ul>
      
    )
     
}

