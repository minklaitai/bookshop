import { useStateContext } from '../context/UserContext'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../css/Navbar.scss'

const Navbar = () => {

    const navigate = useNavigate()
    const { user, setPage, setUserFormData, initialUserState, initialErrorObj, setErrorObj } = useStateContext()

    const navigateToRegister = () => {
        setPage('register')
        setUserFormData(initialUserState)
        setErrorObj(initialErrorObj)
    }

    const navigateToLogin = () => {
        setPage('login')
        setUserFormData(initialUserState)
        setErrorObj(initialErrorObj)
    }

    return (
        <div className="navbar">
            {
                user ? (
                    <div className="parent">
                        <div className="div1">
                            <h4 onClick={() => navigate('/')} className="logo">BOOK SHOP</h4>
                        </div>
                        <div className="div4">Trang chủ</div>
                        <div className="div6">Mượn sách</div>
                        <div className="div9">Trao đổi sách</div>
                        <div className="div8">
                            <img onClick={() => navigate('/home-auth')} src={user?.image} alt='avatar' />
                        </div>
                        <div className="div11">
                            <input type='text' placeholder='Tìm kiếm sách...' />
                            <button>Tìm kiếm</button>
                        </div>
                    </div>
                ) : (

                    <div className="parent">
                        <div className="div1">
                            <h4 onClick={() => navigate('/')} className="logo">BOOK SHOP</h4>
                        </div>
                        <div className="div4">Trang chủ</div>
                        <div className="div6">Mượn sách</div>
                        <div className="div9">Trao đổi sách</div>
                        <div className="div8">
                        <div className="auth-links">
                        
                        <Link to="/auth" onClick={navigateToLogin} className="btn login">Login</Link>
                    </div>
                        </div>
                        <div className="div11">
                            <input type='text' placeholder='Tìm kiếm sách...' />
                            <button>Tìm kiếm</button>
                        </div>
                    </div>
                   
                )
            }
        </div>
    )
}

export default Navbar
