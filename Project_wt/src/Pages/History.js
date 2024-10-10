import { useState , useEffect } from "react";
import { Link , useNavigate, useParams} from "react-router-dom";

function History(){
    const [data , setData] = useState([{}]);
    const navigate = useNavigate();
    const { id } = useParams();
    const today = new Date().toISOString().split('T')[0];
    useEffect(() => {
        const appUrl = "http://localhost:3020/order";
        fetch(appUrl , {method : "GET"})
        .then(res => res.json())
        .then(res => setData(res))
    },[data]);
    var formattedData = data[0].OrderProduct?.map((pro, currentIndex) => {    
        return (
            <div key={currentIndex} >
                <div className="row mt-1">
                    <div className="ms-5 col-md-4 text-center border border-black rounded pt-1">{pro.name}</div>
                    <div className="col-md-3 text-center border border-black rounded pt-1">{pro.price}</div>
                    <div className="col-md-3 text-center border border-black rounded pt-1">
                        <div className="container d-flex justify-content-center">
                            <div>{pro.quantity}</div>
                        </div>
                    </div>
                    <div className="col-md-1 text-center border border-black rounded pt-1">{pro.date}</div>
                </div>
            </div>
        );
    });
    if (!data[0].OrderProduct) return <div>Loading...</div>;
    else{
        const totalPrice = data[0].OrderProduct.reduce((acc, curr) => {
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
                <div className="col-md-1 text-center border border-black rounded" style={{backgroundColor: '#bab791'}}> Order Date</div>
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
            </div>
        </div>
    </>);
    }
}

export default History;