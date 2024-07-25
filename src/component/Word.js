import { useState } from 'react';


export default function Word(props){
    const [word,setWord] =useState(props.word);
    const [isShow,setIsShow] = useState(false);
    const [isDone,setIsDone] = useState(word.isDone);
 
    //  제거버튼을 눌러 ui에서 없애기
    if(word.id===0){
        return null;
    }   

 
    return (
        <tr className={isDone ?'off':''}>
        <td><input type='checkbox' checked={isDone} onChange={()=>{

            // Json 파일의 isDone 수정
           fetch(`http://localhost:3001/words/${word.id}`,{
                method:"PUT",
                headers:{
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({
                    ...word,
                    isDone :!isDone
                })
            }
            )
            //  isDone의 값에따라 css값을 다르게 설정되므로 
            .then(res=>{
                if(res.ok){
                    setIsDone(!isDone);
                }
            })
        }}></input></td>

        <td>{word.eng}</td>
        <td>{isShow && word.kor}</td>
        <td>
            <button onClick={()=>{
               setIsShow(!isShow);
            }}>{isShow ? '뜻 숨기기' : '뜻 보기'}</button>

            <button className='btn_del' onClick={()=>{
            if(window.confirm('삭제 할거에욘?')){
              
                //  json 파일에서 삭제됨
                fetch(`http://localhost:3001/words/${word.id}`,{
                    method:"DELETE",
                })
                //  ui에서도 사라지게 word를 state화 해서 랜더링
                .then(res=>{
                    if(res.ok){
                        setWord({id:0});
                    }
                })
            }
            }}>삭제</button>

        </td>
    </tr>
    )
}