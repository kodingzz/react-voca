
import { useParams } from 'react-router-dom';
import Word from './Word';
import useFetch from '../hook/useFetch';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";


export default function Day(){
    //  useParams hook은 url에 있는 정보를 가져오는데 사용한다.
    const day=useParams().day;
    const words=useFetch(`http://localhost:3001/words?day=${day}`);
    const days=useFetch(`http://localhost:3001/days?day=${day}`);
    const dayCount=useFetch('http://localhost:3001/days');
    const history= useNavigate();

    return(
        <div>
        
         <h2>Day{day}</h2>
         {words.length===0 && <span>Loading...</span>}
        <table>
            <tbody>
                {words.map(item=>{
                    return  <Word word={item} key={item.id}></Word>
                })}
            </tbody>
        </table>

        <button className='arrow_left' onClick={()=>{
            if(Number(day)===1){
               alert('첫 day임!');
               return;
            }
            history(`/day/${day-1}`)
        }}><FontAwesomeIcon icon={faAngleLeft}/></button>


        <button className='btn_day_del' onClick={()=>{
            if(Number(day)!==dayCount.length){
                alert('가장 나중 day부터 삭제해줘잉~');
                return;
            }

            if(window.confirm('day를 삭제하시겠습니까용?')){
             
                //  1. day안의 단어제거
                        
                    words.forEach(word=>{
                        fetch(`http://localhost:3001/words/${word.id}`,{
                            method:'DELETE'
                        })
                        .then(res=>{
                            if(!res.ok){
                                throw new Error('단어가 이미 삭제됨.')
                            }
                        })
                        .catch(error=>console.log(error));
                    })
                
               
                // 2. day 제거
                days.forEach(day=>{
                    fetch(`http://localhost:3001/days/${day.id}`,{
                        method:'DELETE'
                    })
                    .then(res=>{
                        if(res.ok){
                            history('/');
                        }
                    })
                })
               
            }
        }}>Day{day} 삭제</button>
         <button className='arrow_right' onClick={()=>{
            console.log(day);
            if(Number(day)===dayCount.length){
               alert('마지막 day임!');
               return;
            }
            history(`/day/${Number(day)+1}`)
        }}><FontAwesomeIcon icon={faAngleRight}/></button>
        </div>
    )
}