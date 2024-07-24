import './App.css';
import Header from './component/Header';
import DayList from './component/DayList';
import Day from './component/Day';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import EmptyPage from './component/EmptyPage';
import CreateWord from './component/CreateWord';
import CreateDay from './component/CreateDay';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
          <Header/>
          {/*  Switch 내부는 url에 따라 다른 페이지를 보여준다. */}

          <Switch> 
            {/* exact : 정확히 /와 일치할때(첫 페이지)일때만 DayList 출력 */}
            <Route exact path='/'>
              <DayList/>
            </Route>
            {/*  : 으로 day라는 변수에 값을 받는다.  */}
            <Route path='/day/:day'> 
              <Day/>
            </Route>
         
            <Route path='/create_word'> 
              <CreateWord/>
            </Route>

            <Route path='/create_day'> 
              <CreateDay/>
            </Route>

          {/* 잘못된 url 페이지는 밑에 적는 것이 좋다. 젤 위로 가면 첫페이지로 취급되므로 */}
            <Route> 
              <EmptyPage/>
            </Route>
          </Switch>
        
      </div>  
    </BrowserRouter>

  );
}

export default App;
