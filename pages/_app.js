import Layout from "../layout";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../public/assets/scss/admin.scss";
import { ToastContainer } from 'react-toastify';
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>)
  console.log(router,"check Roting")
  useEffect(() => {
   if(localStorage.getItem("role") === "admin"){
   if(localStorage.getItem("loggedIn") === "true"){
    if(router.pathname.includes('/customer')){
      router.push("/admin/dashboard")
     }
     else if(router.pathname.includes('/authentication')){
      router.push("/admin/dashboard")
     }
    }
      
   }
   else  if(localStorage.getItem("role") === "customer"){
    if(localStorage.getItem("loggedIn") === "true"){
    if(router.pathname.includes('/admin')){
     router.push("/customer/dashboard")
    }
    else if(router.pathname.includes('/authentication')){
      router.push("/customer/dashboard")
     }
  }
}

    // router.push('/authentication/login');
  }, [])
  return (
    <>
      <Head>
        <title>Sheltos - Admin dashboard page</title>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:400,400i,500,500i,600,600i,700,700i,800,800i" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,400i,500,500i,700,700i&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css?family=Rubik:400,400i,500,500i,700,700i" rel="stylesheet" />
      </Head>
      {getLayout(<Component {...pageProps} />)}
      <ToastContainer theme="light" />
    </>
  );
}

export default MyApp;
