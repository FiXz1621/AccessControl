import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { PrivateRoutes } from './PrivateRoutes'
import Login from '../Pages/Login'
import HomePage from '../Pages/HomePage'
import AccessRecord from '../Pages/AccessRecord'
import Users from '../Pages/Users'
import RegisterUser from '../Pages/RegisterUser'
import ModifyUser from '../Pages/ModifyUser'
import Doors from '../Pages/Doors'
import Roles from '../Pages/Roles'
import AccessRecordList from '../Pages/AccessRecordList'


export function HandleRoutes() {
    return (
        <Router>
            <Routes>
                <Route element={<PrivateRoutes />}>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/access-record" element={<AccessRecord />} />
                    <Route path="/users" element={<Users />}/>
                    <Route path="/register-user" element={<RegisterUser />} />
                    <Route path="/modify-user" element={<ModifyUser />} />
                    <Route path="/doors" element={<Doors />} />
                    <Route path="/roles" element={<Roles />} />
                    <Route path="/access-record-list" element={<AccessRecordList />} />
                </Route>
                <Route path="/" element={<Login />} />
            </Routes>
        </Router>
    )
}
