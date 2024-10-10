import { useState , useEffect } from "react";
import Swal from 'sweetalert2';
import { Link , useNavigate, useParams} from "react-router-dom";

function Cart(){
    const [data , setData] = useState([{}]);
    const navigate = useNavigate();
    const { id } = useParams();
    const today = new Date().toISOString().split('T')[0];
    useEffect(() => {
        const appUrl = "http://localhost:3020/cart";
        fetch(appUrl , {method : "GET"})
        .then(res => res.json())
        .then(res => setData(res))
    },[data]);
    const handleBuyClick = async () => {
        const today = new Date().toISOString().split('T')[0];
        
        console.log(data[0].CartProduct);
        var cartProducts = new Array();
        cartProducts = data[0].CartProduct;      
        if (!cartProducts || cartProducts.length === 0) {
          console.log("Cart is empty");
          return;
        }
        
        const orderData = { date: today, products: cartProducts };
        fetch('http://localhost:3020/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData),
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res);
            navigate('/cart');
        })
        .catch((error) => console.error(error));
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
            title: "Cake buy successfully"
          });
        };
    var formattedData = data[0].CartProduct?.map((pro, currentIndex) => {    
        return (
            <div key={currentIndex} >
                <div className="row mt-1">
                    <div className="ms-5 col-md-4 text-center border border-black rounded pt-1">{pro.name}</div>
                    <div className="col-md-3 text-center border border-black rounded pt-1">{pro.price}</div>
                    <div className="col-md-3 text-center border border-black rounded pt-1">
                        <div className="container d-flex justify-content-center">
                        {/* <div id={"cakeL-" + currentIndex} className="badge btn btn-info btn-sm m-1 h-25 d-inline-block" style={{ color: "white" }} 
                        onClick={(e) => {
                            let newData = data[0].CartProduct;
                            newData[e.target.id.split("-")[1]].quantity--;
                            setData([...newData]);
                        }}>-</div> */}
                        <div >{pro.quantity}</div>
                        {/* <div id={"cakeR-" + currentIndex} className="badge btn btn-info btn-sm m-1 h-25 d-inline-block" style={{ color: "white" }} 
                        onClick={(e) => {
                            let newData = data[0].CartProduct;
                            newData[e.target.id.split("-")[1]].quantity++;
                            setData([...newData]);                   
                        }}>+</div> */}
                        </div>
                    </div>
                    <div className="col-md-1 text-center border border-black rounded btn btn-danger" onClick={() => {
                        Swal.fire({
                            title: "Are you sure?",
                            text: "You won't be able to revert this!",
                            icon: "warning",
                            showCancelButton: true,
                            confirmButtonColor: "#3085d6",
                            cancelButtonColor: "#d33",
                            confirmButtonText: "Yes, delete it!"
                        }).then((result) => {
                            if (result.isConfirmed) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your Cake has been deleted.",
                                icon: "success"
                            });
                            const appUrl = "http://localhost:3020/cart/" + pro.id;
                            fetch(appUrl, { method: 'DELETE' })
                            .then(res => res.json())
                            .then((res) => navigate('/cart'));
                            }
                        });

                        
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
                            <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                        </svg>
                    </div>
                </div>
            </div>
        );
    });
    {/* <div id={"cakeL-" + currentIndex} className="badge btn btn-info btn-sm m-1 disable h-25 d-inline-block invisible" style={{ color: "white" }} onClick={
        (e) => {
            let newData = data;
            if((newData[e.target.id.split("-")[1]].quantity)>1)
                newData[e.target.id.split("-")[1]].quantity--;
            setData([...newData])
        }
    }>-</div> */}
    {/* <div id={"cakeR-" + currentIndex} className="badge btn btn-info btn-sm m-1 h-25 d-inline-block disable invisible" style={{ color: "white"}} onClick={
        (e) => {
            let newData = data;
            newData[e.target.id.split("-")[1]].quantity++;
            setData([...newData])
        }
    }>+</div> */}
    if (!data[0].CartProduct) return <div>Loading...</div>;
    else{
        const totalPrice = data[0].CartProduct.reduce((acc, curr) => {
        const price = parseFloat(curr.price);
        const quantity = parseInt(curr.quantity);
        return acc + (price * quantity);
    }, 0);

    return(
    <>
        <div className="table table-striped-columns d-flex flex-column">
            <div className="row " >
                <div className="ms-5 col-md-4 text-center border border-black rounded" style={{backgroundColor: '#bab791'}}>
                    Cake
                </div>
                <div className="col-md-3 text-center border border-black rounded" style={{backgroundColor: '#bab791'}}>Cake price</div>
                <div className="col-md-3 text-center border border-black rounded" style={{backgroundColor: '#bab791'}}> Cake Quantity</div>
                <div className="col-md-1 text-center border border-black rounded" style={{backgroundColor: '#bab791'}}>
                    Delete
                </div>
            </div>

            {formattedData && (
            <div>
                {formattedData}
            </div>
            )}
            
            {/* <div className="row">
                {formattedData}
            </div> */}
            
        </div>
        <div className="table  table-striped-columns mt-auto">
            <div className="row">
                <div className="ms-5 col-md-10 border border-black rounded text-sm-end font-monospace" style={{height:"45px"}} >
                    <p>Total Price: Rs.{isNaN(totalPrice) ? '0' : totalPrice}</p>
                </div>
                <button className="col-md-1 btn btn-primary border border-black text-center m-1" style={{height:"35px" , width:"120px"}} onClick={handleBuyClick}>Buy</button>
            </div>
        </div>
    </>);
    }
}

export default Cart;