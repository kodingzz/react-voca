import {Link} from 'react-router-dom';

export default Header


function Header(){
    return (
        <div className='header'>
            {/* react-router-dom에서는 a태그 대신 Link 태그 사용 */}
            <h1><Link to='/'>영단어(고급)</Link></h1>

            <div className='menu'>
                <Link to='/create_word' className='link'>단어 추가</Link>
                <Link to='/create_day' className='link'>Day 추가</Link>
            </div>
        </div>
    )
}