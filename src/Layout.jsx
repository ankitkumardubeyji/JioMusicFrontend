import Header from "./componets/Header";
import {Outlet} from "react-router-dom"
import Footer from "./componets/Footer";
import Sidebar from "./componets/Sidebar"


function Layout(){
    return(
        <>
             <Header/>
             <div className="row">
                <Sidebar/>
                <Outlet/>
             </div>
        
            <Footer/>
        
        </>
       
    )
}

export default Layout
