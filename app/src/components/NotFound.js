import {Link} from 'react-router-dom'

function NotFound() {
  return (
    <div>
      <h1>Page Not Found</h1>
      <h1>
        <Link to='/'>Home</Link>
      </h1>
      <h1>
        <Link to='/login'>Login</Link>
      </h1>
    </div>
  )
}

export default NotFound;