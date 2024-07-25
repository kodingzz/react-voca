import './App.css';
import Header from './component/Header';
import DayList from './component/DayList';
import Day from './component/Day';
import {BrowserRouter,Route,Routes} from 'react-router-dom';
import EmptyPage from './component/EmptyPage';
import CreateWord from './component/CreateWord';
import CreateDay from './component/CreateDay';



function App() {

  return (
    <BrowserRouter>
      <div className="App">
          <Header/>
          {/*  Routes 내부는 url에 따라 다른 페이지를 보여준다. */}

          <Routes> 
            {/* exact : 정확히 /와 일치할때(첫 페이지)일때만 DayList 출력 */}
            <Route exact path='/' element={ <DayList/>}/>
             
            {/*  : 으로 day라는 변수에 값을 받는다.  */}
            <Route path='/day/:day' element={<Day/>}/> 
      
            <Route path='/create_word' element={<CreateWord/>}/> 
            
            <Route path='/create_day' element={<CreateDay/>}/> 
    
          {/* 잘못된 url 페이지는 밑에 적는 것이 좋다. 젤 위로 가면 첫페이지로 취급되므로 */}
            <Route path='*' element={<EmptyPage/>}/> 
          </Routes>
        
      </div>  
    </BrowserRouter>

  );
}

export default App;
