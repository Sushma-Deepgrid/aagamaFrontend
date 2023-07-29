import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ChevronsLeft } from "react-feather";
import { Media } from "reactstrap";
import SidebarMenu from "./SidebarMenu";



const Sidebar = ({ toggle, setToggle }) => {

  const [firstName,setfirstName] = useState('')
  const [lastName,setlastName] = useState('')
  const [email,setemail] = useState('')
  useEffect(() => {

  if (typeof window !== 'undefined') {
    setfirstName(localStorage.getItem("userFirstName"))
    setlastName(localStorage.getItem("userLastName"))
    setemail(localStorage.getItem("userEmail"))
  }
   
},[1])

  return (
    <div className={`page-sidebar ${!toggle ? 'close_icon' : ''}`}>
      <div className="logo-wrap">
        <div className="d-flex justify-content-center" >
          <img style={{width:'150px'}} src="/assets/images/logo/LatestLogowithNameDown.png" className="img-fluid for-light" alt='' />
        </div>
        <div className="back-btn d-lg-none d-inline-block">
          <ChevronsLeft onClick={() => { setToggle(!toggle) }} />
        </div>
      </div>
      <div className="main-sidebar">
        <div className="user-profile">
          <Media className="media d-flex justify-content-center">
            <div body className=""  style={{textAlign:'center'}}>
            <Link href='/manage-users/profile'>
                <h6>{firstName} {lastName}</h6>
              </Link>
              <span className="font-roboto">{email}</span>
            </div>
          </Media>
        </div>
        <div id="mainsidebar">
          <SidebarMenu />
        </div >
      </div >
    </div >
  );
};

export default Sidebar;
