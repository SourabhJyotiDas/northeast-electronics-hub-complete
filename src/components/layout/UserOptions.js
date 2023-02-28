import { SpeedDial, SpeedDialAction } from '@material-ui/lab'
import React from 'react'
import { useState } from 'react';
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { useNavigate } from 'react-router-dom'
import { logout } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { Backdrop } from '@material-ui/core';
import { toast } from 'react-toastify';

export default function UserOptions({ user }) {
   const dispatch = useDispatch()
   const navigate = useNavigate()
   // console.log(user.avatar.url)
   const [open, setOpen] = useState(false)

   const { cartItems } = useSelector((state) => state.cart)

   const options = [
      { icon: <ListAltIcon />, name: "Orders", func: orders },
      { icon: <PersonIcon />, name: "Profile", func: account },
      {
         icon: (<ShoppingCartIcon style={{ color: cartItems.length > 0 ? "tomato" : "unset" }} />), name: `Cart(${cartItems.length})`, func: cart,
      },
      { icon: <ExitToAppIcon />, name: "Logout", func: logoutUser },
   ];

   if (user.role === "admin") {
      options.unshift({ icon: <DashboardIcon />, name: "Dashboard", func: dashboard, });
   }

   function dashboard() {
      navigate("/admin/dashboard");
   }
   function orders() {
      navigate("/orders");
   }
   function account() {
      navigate("/account");
   }
   function cart() {
      navigate("/cart");
   }
   function logoutUser() {
      dispatch(logout());
      toast.success("Logout Successfully", {
         position: "top-center",
         autoClose: 4000,
         hideProgressBar: false,
         closeOnClick: true,
         pauseOnHover: true,
         draggable: true,
         progress: undefined,
         theme: "colored",
         });
      navigate("/login");
   }

   return (
      <>
         <Backdrop open={open} style={{ zIndex: "10" }} />
         <SpeedDial
            ariaLabel="SpeedDial tooltip example"
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            style={{ zIndex: "11" }}
            open={open}
            direction="down"
            className="speedDial"
            icon={
               <img
                  className="speedDialIcon"
                  src={user.avatar.url ? user.avatar.url : "/Profile.png"}
                  alt="Profile"
               />
            }
         >
            {options.map((item) => (
               <SpeedDialAction
                  key={item.name}
                  icon={item.icon}
                  tooltipTitle={item.name}
                  onClick={item.func}
                  tooltipOpen={window.innerWidth <= 600 ? true : false}
               />
            ))}
         </SpeedDial>
      </>
   )
}
