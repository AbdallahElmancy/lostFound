import { Outlet, Navigate } from 'react-router-dom'


const PrivateRoutes = (props) => {
    return(
        localStorage.getItem('userToken') ? <Outlet/>  : <Navigate to="/login"/>
    )
}

export default PrivateRoutes