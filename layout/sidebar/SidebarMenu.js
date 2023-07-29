import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { ChevronsRight,Airplay, BarChart, CreditCard, Grid, Layout, Lock, MapPin, UserPlus, Users } from "react-feather";

const SidebarMenu = () => {
    const router = useRouter();
   
    const [SidebarMenuItem, setSidebarMenuItem] = useState([]);
   
    useEffect(() => {
      console.log(localStorage.getItem("role"))
      if( localStorage.getItem("role") === "admin"){
        let obj =
        [
      {
          title: 'Dashboard',
          icon: <Airplay />,
          type: 'link',
          path: "/admin/dashboard"
      },
      {
          title: 'Portal Administration',
          icon: <Grid />,
          type: 'sub',
          children: [
              {
                  path: "/admin/portalAdministration/UserList",
                  title: 'UserList',
                  type: 'link'
              },
              {
                  path: "/admin/portalAdministration/UserRole",
                  title: 'User Role',
                  type: 'link'
              }
          ]
      },
      {
          title: 'Property Management',
          icon: <Users />,
          type: 'sub',
          children: [
              {
                  path: "/admin/portalManagement/propertyList",
                  title: 'Property List',
                  type: 'link'
              }
          ]
      },
      {
          title: 'Task Management',
          icon: <UserPlus />,
          type: 'link',
          path: "/admin/taskManagement"
      },
      {
          title: 'Subscription Management',
          icon: <Layout />,
          type: 'sub',
          children: [
              {
                  path: "/admin/subscriptionManagement/subscriptionList",
                  title: 'Subscription List',
                  type: 'link'
              },
              {
                  path: "/admin/subscriptionManagement/serviceList",
                  title: 'Service List',
                  type: 'link'
              },
              {
                  path: "/admin/subscriptionManagement/BillingList",
                  title: 'Billing List',
                  type: 'link'
              }
          ]
      },
     
  ]
  setSidebarMenuItem(obj)
      }
  else  if( localStorage.getItem("role") === "customer"){
    let obj =
    [
  {
      title: 'Dashboard',
      icon: <Airplay />,
      type: 'link',
      path: "/CustomerDashboard"
  },
  {
      title: 'My Property',
      icon: <Grid />,
      type: 'link',
      path: "/MyProperty"
  },
  {
      title: 'Subscription Management',
      icon: <Layout />,
      type: 'link',
     path: "/SubscriptionPlans",
             
  },
  
  ]
  setSidebarMenuItem(obj)
  }
    },[1])
    const [activeMenu, setActiveMenu] = useState('Dashboard');
    const [chiledMenu, setChiledMenu] = useState();

    useEffect(() => {
        if (router.asPath) {
            SidebarMenuItem.forEach((item) => {
                if (item.children) {
                    item.children.forEach((child) => {
                        if (child.path === router.asPath) { setChiledMenu(child.title); setActiveMenu(item.title); return true }
                        else return false;
                    })
                } else {
                    if (item.path === router.asPath) { setActiveMenu(item.title); return true }
                    else return false;
                }
            })
        }
    }, [router])

    return (
        <ul className="sidebar-menu custom-scrollbar">
            {
                SidebarMenuItem && SidebarMenuItem.map((item, i) => {
                    return (
                        <li key={i} className="sidebar-item">
                            {item.type === 'link' && <Link href={`${item.path}`} className={`sidebar-link only-link ${activeMenu === item.title ? 'active' : ''}`} onClick={() => { setActiveMenu(prev => prev !== item.title && item.title) }}>
                                {item.icon}
                                <span>{item.title}</span>
                            </Link>}
                            {
                                item.type === 'sub' &&
                                <a href="#" className={`sidebar-link ${activeMenu === item.title ? 'active' : ''}`} onClick={() => { setActiveMenu(prev => prev !== item.title && item.title) }}>
                                    {item.icon}
                                    <span>{item.title}</span>
                                    <div className="according-menu"><i className="fa fa-angle-right" /></div>
                                </a>
                            }
                            {
                                Array.isArray(item.children) &&
                                <ul className={`nav-submenu menu-content ${item.title === activeMenu ? 'd-block' : 'd-none'}`}>
                                    {item.children.map((child, i) => {
                                        return (
                                            <li key={i}>
                                                <Link href={`${child.path}`} className={`${child.title === chiledMenu ? 'active' : ''}`} onClick={() => { setChiledMenu(child.title) }}>
                                                    <ChevronsRight />
                                                    {child.title}
                                                    {
                                                        child.badge && <span className="label label-shadow ms-1">New</span>
                                                    }
                                                </Link>
                                            </li>
                                        )
                                    })
                                    }
                                </ul>
                            }
                        </li>
                    )
                })
            }
           
        </ul>
    )
}

export default SidebarMenu