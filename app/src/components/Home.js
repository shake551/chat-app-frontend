import {Link} from 'react-router-dom';
import HomeBase from "./HomeBase";

function Home() {
    return (
        <div>
            <HomeBase/>
            <Link to='/login'>Login</Link>
        </div>
    );
}

export default Home;
