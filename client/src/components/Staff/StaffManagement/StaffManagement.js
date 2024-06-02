import React from 'react'
import NavBarStaff from '../NavBar/NavBarStaff'
import { Route, Routes } from 'react-router-dom'
import ConfirmOrder from '../ConfirmOrder/ConfirmOrder'

export default function StaffManagement() {
    return (
        <div style={{ display: 'flex' }}>
            <NavBarStaff />
            <Routes>
                <Route path='/comfirm_order' element={<ConfirmOrder />}></Route>
                {/* <Route path='/comfirm_order' element={<ConfirmOrder />}></Route>
                <Route path='/comfirm_order' element={<ConfirmOrder />}></Route>
                <Route path='/comfirm_order' element={<ConfirmOrder />}></Route>
                <Route path='/comfirm_order' element={<ConfirmOrder />}></Route>
                <Route path='/comfirm_order' element={<ConfirmOrder />}></Route> */}
            </Routes>
        </div>
    )
}