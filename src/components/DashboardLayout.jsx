import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import MainContent from "./MainContent";
import { productData } from "../data/data";

function DashboardLayout(){
    const [ShowSideBar, setShowSideBar] = useState(true);
    const [activePage, setActivePage] = useState("dashboard");
    const [products, setProducts] = useState(productData);

    const navigate = useNavigate();

    const toggleSideBar = () => {
        setShowSideBar(!ShowSideBar)};

    const handleLogout = () => {
        navigate("/Login")
    }
    return(
        <div className="layout">
            {ShowSideBar && (<SideBar activePage={activePage} onPageChange={setActivePage} onLogout={handleLogout}/>
            )}
            <div className="main-area">
                <Header onToggleSidebar={toggleSideBar}/>
                <MainContent activePage={activePage} products={products} setProducts={setProducts} />
            </div>
        </div>
    );
}
export default DashboardLayout