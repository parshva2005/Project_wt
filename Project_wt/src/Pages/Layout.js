import { Link, Outlet , useNavigate} from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo.png"
import Carousel from 'react-bootstrap/Carousel';

function Layout(){
    const [searchValue, setSearchValue] = useState('');
    const navigate = useNavigate();     
    const handleSearch = (e) => {
        console.log('Input value:', e.target.value);
        setSearchValue(e.target.value);
    };

    return( 
        <>
            <div class="row " >
                <nav class="navbar navbar-expand-lg bg-body-tertiary card text-center ">
                    <div class="container-fluid card-header bg-info">
                        <Link to='/home' class="navbar-brand" href="#"><img src={Logo} width={150} height={70} className="bg-info"/></Link>
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0 card-header-pills">
                            <li class="nav-item">
                            <Link to="/cart" class="nav-link active text-white me-3" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
                            </svg> Cart
                            </Link>
                            </li>
                            <li class="nav-item">
                            <Link to="/history" class="nav-link active hover:underline text-white" >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-seam-fill" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15.528 2.973a.75.75 0 0 1 .472.696v8.662a.75.75 0 0 1-.472.696l-7.25 2.9a.75.75 0 0 1-.557 0l-7.25-2.9A.75.75 0 0 1 0 12.331V3.669a.75.75 0 0 1 .471-.696L7.443.184l.01-.003.268-.108a.75.75 0 0 1 .558 0l.269.108.01.003zM10.404 2 4.25 4.461 1.846 3.5 1 3.839v.4l6.5 2.6v7.922l.5.2.5-.2V6.84l6.5-2.6v-.4l-.846-.339L8 5.961 5.596 5l6.154-2.461z"/>
                            </svg> Order
                            </Link>
                            </li>
                        </ul>
                        {/* <div className="d-flex">
                        <input className="form-control me-2 " type="search" placeholder="Search" id="Searchid" value={searchValue} onChange={handleSearch}/>

                        <button className="btn btn-outline-success" type="button" onClick={()=>{
                            navigate('/product/search/'+searchValue);
                        }}>
                        Search
                        </button>
                        </div> */}

                    </div>
                </nav>
            </div>
            <div class="row" >
                <div class="card-body card text-center container-fluid ms-2" /*style={{backgroundColor:"#96aba3"}}*/>
                    <Outlet />
                </div>
            </div>
        </>
    );
}

export default Layout;