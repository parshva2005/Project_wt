import Carousel from 'react-bootstrap/Carousel';
import Swal from 'sweetalert2';
import { useState , useEffect } from "react";
import { Link , useNavigate, useParams} from "react-router-dom";

function Details(){
    const [data , setData] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();
    useEffect(() => {
        const appUrl = "http://localhost:3020/product/"+id;
        fetch(appUrl ,{method: "GET"},JSON.stringify(data),{headers: {'Content-Type': 'application/json'}})
        .then(res => res.json())
        .then(res => setData(res))
    },[]);
    if(!data || !data.Detail) return <div>Loading...</div>;
    return(
        <div className='row'>
            <div className="col-md-6">
                <Carousel>
                    <Carousel.Item interval={1500}>
                        <img src={data.image1} style={{width : "500px" }}/>
                    </Carousel.Item>
                    <Carousel.Item interval={1500}>
                        <img src={data.image2} style={{width : "500px" }}/>
                    </Carousel.Item>
                    <Carousel.Item interval={1500}>
                        <img src={data.image3} style={{width : "500px" }}/>
                    </Carousel.Item>
                </Carousel>
                
                <h3 className='text-black'>{data.name}</h3>
                <p className='text-black'><h3 class="card-text">{data.price} 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                        <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
                    </svg>
                </h3></p>
                <button className="btn btn-primary" style={{ color: "white" }} onClick={
                () => {   
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                          toast.onmouseenter = Swal.stopTimer;
                          toast.onmouseleave = Swal.resumeTimer;
                        }
                      });
                      Toast.fire({
                        icon: "success",
                        title: "Cake added successfully"
                    });
                    const appUrl = "http://localhost:3020/cart/"+data.id;
                    fetch(appUrl, {method: "POST" } )
                    .then(res => res.json())
                    .then(res => setData(res));
                } 
                }>Add to Cart</button>
            </div>
            <div className="col-md-6 text-start">
                <h4>Product Details</h4>
                <ul>
                    <li>{data.Detail[0]}</li>
                    <li>{data.Detail[1]}</li>
                    <li>{data.Detail[2]}</li>
                    <li>{data.Detail[3]}</li>
                    <li>{data.Detail[4]}</li>
                    <li>{data.Detail[5]}</li>
                    <li>{data.Detail[6]}</li>
                    <li>{data.Detail[7]}</li>
                </ul>
                <h4>Ingredients:</h4>
                <ul>
                    <li>{data.Ingredients}</li>
                </ul>
                <h4>Delivery Information</h4>
                <ul>
                    <li>{data.Information[0]}</li>
                    <li>{data.Information[1]}</li>
                    <li>{data.Information[2]}</li>
                    <li>{data.Information[3]}</li>
                    <li>{data.Information[4]}</li>
                </ul>
                <h4>Care Instructions</h4>
                <ul>
                    <li>{data.Instruction[0]}</li>
                    <li>{data.Instruction[1]}</li>
                    <li>{data.Instruction[2]}</li>
                    <li>{data.Instruction[3]}</li>
                    <li>{data.Instruction[4]}</li>
                    <li>{data.Instruction[5]}</li>
                    <li>{data.Instruction[6]}</li>
                </ul>
            </div>
        </div>
    )



}

export default Details;