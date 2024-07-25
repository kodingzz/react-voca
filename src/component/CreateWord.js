import { useRef, useState } from 'react';
import useFetch from '../hook/useFetch'
import { useNavigate } from 'react-router-dom';

export default function CreateWord(){
    const days= useFetch('http://localhost:3001/days');

    const engRef = useRef(null);
    const korRef = useRef(null);
    const dayRef = useRef(null);

    const history =useNavigate();
    const [isLoading,setIsLoading] = useState(false);

    return(
         <form onSubmit={(event)=>{
            event.preventDefault();
            if(engRef.current.value===''|| korRef.current.value==='' || dayRef.current.value===''){
                alert('모두 입력하세요!');
                return;
            }
            //  loading중이지 않을때 생성할거고 생성중일때는 또다른 값을 생성하지 못하게 한다.(네트워크가 느릴 경우를 대비). 즉 여러번 클릭 불가
            if(!isLoading){
                setIsLoading(true);
                fetch('http://localhost:3001/words',{
                    method: 'POST',
                    headers:{
                        "Content-Type": "application/json",
                    },
                    body:JSON.stringify({
                        // json-server에서 데이터 POST(생성) 시 ID는 자동으로 부여된다.
                        day: Number(dayRef.current.value),
                        eng: engRef.current.value,
                        kor: korRef.current.value,
                        isDone :false
                    })
    
                })
                .then(res=>{
                    if(res.ok){
                        window.alert('단어가 생성되었습니다!');
                        history(`/day/${dayRef.current.value}`);
                        setIsLoading(false);
                    }
                })
            }
            
         }}>
            <div className='input_area'>
                <label>Eng</label>
                <input type='input' placeholder='computer' ref={engRef}></input>
            </div> 
            <div className='input_area'>
                <label>Kor</label>
                <input type='input' placeholder='컴퓨터' ref={korRef}></input>
            </div> 
            <div className='input_area'>
                <label>Day</label>
                <select ref={dayRef}>
                    {days.map(item=>(
                      <option key={item.id}>{item.day}</option>
                    ))}
                </select>
            </div> 
            <button style={
                {opacity: isLoading ? 0.3 : 1}
            }>{isLoading ? '저장중...' : '저장'}</button>
         </form>

    )
        }