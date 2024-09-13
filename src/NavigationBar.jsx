import React from "react";
import {Outlet, Link} from "react-router-dom"
function NavigationBar()
{
    return  <div>
    <Link classname='link' to='/'>
    Home
    </Link>
    <Link classname='link' to='/about'>
    About
    </Link>
    <Link classname='link' to='/login'>
    login
    </Link>
    <Outlet />
    </div>
}
export default NavigationBar