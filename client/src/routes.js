import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdPerson, 
  MdHome, 
  MdLock,  
  MdCalendarMonth, 
  MdSsidChart,
  MdOutlineInventory2,
  MdPeople,
  MdPersonAdd,
  MdDomain,
  MdDomainAdd
 } from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Event from "views/admin/event";

// Auth Imports
import LoginUser from "views/auth/login";
import SignupUser from "views/auth/signup-user";
import SignupCompany from "views/auth/signup-company";
import CompanyView from "views/admin/company";
import FinanceView from "views/admin/finance";
import ProductView from "views/admin/product";
import UserView from "views/admin/user";

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
    role: ["Dev", "OM", "Analyst", "Basic"],
  },
  {
    name: "Events",
    layout: "/admin",
    path: "/event",
    icon: <Icon as={MdCalendarMonth} width="20px" height="20px" color="inherit" />,
    component: Event,
    role: ["Dev", "OM", "Analyst", "Basic"],
  },
  {
    name: "View Companies",
    layout: "/admin",
    path: "/company/view",
    icon: <Icon as={MdDomain} width="20px" height="20px" color="inherit" />,
    component: CompanyView,
    role: ["Dev"],
  },
  {
    name: "View Users",
    layout: "/admin",
    path: "/user/view",
    icon: <Icon as={MdPeople} width="20px" height="20px" color="inherit" />,
    component: UserView,
    role: ["Dev", "OM"],
  },
  {
    name: "Products",
    layout: "/admin",
    path: "/products",
    icon: <Icon as={MdOutlineInventory2} width="20px" height="20px" color="inherit" />,
    component: ProductView,
    role: ["Dev", "OM", "Analyst"],
  },
  {
    name: "Finance",
    layout: "/admin",
    path: "/finance",
    icon: <Icon as={MdSsidChart} width="20px" height="20px" color="inherit" />,
    component: FinanceView,
    role: ["Dev", "OM", "Analyst"],
  },
  {
    name: "Login",
    layout: "/auth",
    path: "/login",
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: LoginUser,
    role: [],
  },
  {
    name: "Create Company",
    layout: "/admin",
    path: "/company/signup",
    icon: <Icon as={MdDomainAdd} width="20px" height="20px" color="inherit" />,
    component: SignupCompany,
    role: ["Dev"],
  },
  {
    name: "Create User",
    layout: "/admin",
    path: "/signup-user",
    icon: <Icon as={MdPersonAdd} width="20px" height="20px" color="inherit" />,
    component: SignupUser,
    role: ["Dev", "OM"],
  },
];

export default routes;
