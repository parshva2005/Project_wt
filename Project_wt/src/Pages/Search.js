// import { useEffect, useState } from "react";
// import { Link , useNavigate, useParams} from "react-router-dom";

// function Search(){
//     const [searchValue, setSearchValue] = useState("");
//     const [products, setProducts] = useState([]);
//     const { name } = useParams();
//     // const [isLoading, setIsLoading] = useState(true);
//     useEffect(() => {
//         const handleSearch = async () => {
//             if (!searchValue || searchValue.trim() === '') {
//                 return <div>No search query provided.</div>;        
//             } else {
//             //   setIsLoading(true);
//               try {
//                 const searchName = name.toString();
//                 console.log({searchName})
//                 const response = await fetch("http://localhost:3020/product/search/"+searchName , {method : "GET"});
//                 const result = await response.json();
//                 setProducts(result);
//                 // setIsLoading(false);
//               } catch (error) {
//                 console.error(error);
//                 // setIsLoading(false);
//               }
//             }
//           };
//         handleSearch();
//     },[products , name]);
//     const formattedData = products.map((pro) => {
        
//         return (
//             <div className="col-3 mb-3" >
//                 <div class="card rounded-4 border border-dark" style={{ width: '18rem', backgroundColor: "#96aba3" }}>
//                     <Link to={"/product/detail/"+pro.id}><img src={pro.image1} class="card-img-top rounded-4 hover:{hoverImage}" style={{ width: '17.9rem', height: '17.9rem' }}  /></Link>
//                     <div class="card-body rounded-4 " style={{ backgroundColor: "#96aba3", color: "white" }}>
//                         <h5 class="card-title ">{pro.name}</h5>
//                         <h4 class="card-text">{pro.price}
//                             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
//                                 <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z" />
//                             </svg>
//                         </h4>
//                         <button className="btn btn-primary" style={{ color: "white" }} onClick={
//                         () => {   
//                             const appUrl = "http://localhost:3020/cart/"+pro.id;
//                             fetch(appUrl, {method: "POST" } )
//                             .then(res => res.json())
//                             .then(res => setSearchValue(res));
//                         } 
//                         }>Add to Cart</button>
//                     </div>
//                 </div>
//             </div>
//         )
//     })
//     // if (!products || products.length==0 || isLoading) {
//     //     return <div>Loading...</div>;
//     // }
//     return (
//         <>
//             <div class="row ms-4 mt-2">
//                 {formattedData}
//             </div>

//         </>
//     );
// }

// export default Search;