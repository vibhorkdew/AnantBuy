import { useLocation, useNavigate } from "react-router-dom";


function ReviewOrder(){

const location = useLocation();

const navigate = useNavigate();


const items =
location.state?.items || [];


const total = items.reduce(
(sum,item)=>
sum +
(item.product.price * item.quantity),
0
);


return (

<div
style={{
padding:"40px",
color:"white"
}}
>

<h1>
Review Your Order
</h1>


{
items.map(item=>(

<div
key={item.id}
style={{

display:"flex",

gap:"25px",

alignItems:"center",

background:"#0f172a",

padding:"20px",

marginBottom:"15px",

borderRadius:"12px"

}}
>


<img

src={item.product.image_url}

alt={item.product.name}

style={{

width:"120px",

height:"120px",

objectFit:"cover",

borderRadius:"12px"

}}

/>



<div>

<h2>
{item.product.name}
</h2>


<p
style={{
color:"#94a3b8"
}}
>
Brand: {item.product.brand}
</p>


<p>
Quantity: {item.quantity}
</p>


<h3
style={{
color:"#f59e0b"
}}
>
₹{item.product.price * item.quantity}
</h3>


</div>


</div>
))
}



<h2>
Grand Total: ₹{total}
</h2>



<button

onClick={()=>navigate("/checkout")}

style={{

background:"#16a34a",

color:"white",

padding:"15px 25px",

border:"none",

borderRadius:"10px"

}}

>

Continue To Checkout

</button>

<button

onClick={()=>navigate("/cart")}

style={{

marginLeft:"15px",

background:"#475569",

color:"white",

padding:"15px 25px",

border:"none",

borderRadius:"10px"

}}

>

Back To Cart

</button>

</div>

);


}


export default ReviewOrder;