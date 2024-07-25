
import { useNavigate } from 'react-router-dom';
import useFetch  from '../hook/useFetch';

export default function CreateDay(){
    const days= useFetch('http://localhost:3001/days');
    const history =useNavigate();

    return(
        <div>
            <h3>현재 일수: {days.length}일</h3>   
            <button onClick={()=>{
                fetch('http://localhost:3001/days',{
                    method:"POST",
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body : JSON.stringify({
                        // json-server에서 데이터 POST(생성) 시 ID는 자동으로 부여된다.
                        day:days.length+1
                    })
                })
                .then(response=>{
                    if(response.ok){
                        //  첫번째 페이지
                        alert('날짜가 생성되었습니다!')
                        history(`/`);
                    }
                })
            }}>Day 추가</button>
        </div>  

    )
 
}