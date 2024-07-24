
import { useParams } from 'react-router-dom';
import Word from './Word';
import useFetch from '../hook/useFetch';

export default function Day(){
    //  useParams hook은 url에 있는 정보를 가져오는데 사용한다.
    const day=useParams().day;
    const words=useFetch(`http://localhost:3002/words?day=${day}`);

    
    return(
        <>
         <h2>Day{day}</h2>
         {words.length===0 && <span>Loading...</span>}
        <table>
            <tbody>
                {words.map(item=>{
                    return  <Word word={item} key={item.id}></Word>
                })}
            </tbody>
        </table>
        
        </>
    )
}