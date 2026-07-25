import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

function Cart() {

  const [cart, setCart] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);


  async function loadCart() {

    try {

      const response = await api.get("/cart/");

      setCart(response.data);

    } catch(err) {

      console.log(err);

    }

  }


  const toggleOrder = (id) => {

    if(selectedItems.includes(id)){

      setSelectedItems(
        selectedItems.filter(
          item => item !== id
        )
      );

    }
    else{

      setSelectedItems([
        ...selectedItems,
        id
      ]);

    }

  };


  const selectAll = () => {

    if(selectedItems.length === cart.length){

      setSelectedItems([]);

    }
    else{

      setSelectedItems(
        cart.map(
          item => item.id
        )
      );

    }

  };


  const updateQuantity = async(id, quantity)=>{

    try{

      await api.put(
        `/cart/${id}`,
        {
          quantity
        }
      );

      loadCart();

    }
    catch(err){

      console.log(err);

    }

  };



  const removeItem = async(id)=>{

    try{

      await api.delete(
        `/cart/${id}`
      );

      setSelectedItems(
        selectedItems.filter(
          item => item !== id
        )
      );

      loadCart();

    }
    catch(err){

      console.log(err);

    }

  };



  const allSelected =
    cart.length > 0 &&
    selectedItems.length === cart.length;

  const selectedProducts = cart.filter(
    item => selectedItems.includes(item.id)
  );


  const buttonStyle = {

    width:"45px",
    height:"45px",
    fontSize:"24px",
    borderRadius:"10px",
    border:"none",
    background:"#f59e0b",
    color:"white",
    cursor:"pointer",
    fontWeight:"bold"

  };



  const quantityStyle = {

    minWidth:"55px",
    textAlign:"center",
    background:"#1e293b",
    padding:"12px",
    borderRadius:"10px",
    fontSize:"18px",
    fontWeight:"bold"

  };



  return (

<div
style={{
maxWidth:"1200px",
margin:"40px auto",
padding:"20px",
minHeight:"100vh"
}}
>


<h1
style={{
color:"white",
marginBottom:"30px"
}}
>
My Cart
</h1>



{
cart.map((item)=>(


<div

key={item.id}

style={{

display:"grid",

gridTemplateColumns:
"170px 1fr 220px",

gap:"25px",

alignItems:"center",

background:"#0f172a",

borderRadius:"16px",

padding:"20px",

marginBottom:"20px",

color:"white",

boxShadow:
"0 8px 20px rgba(0,0,0,.35)"

}}

>



{/* IMAGE */}

<img

src={item.product.image_url}

alt={item.product.name}

style={{

width:"150px",

height:"150px",

objectFit:"cover",

borderRadius:"12px"

}}

/>




{/* DETAILS */}

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



<h3
style={{
color:"#f59e0b"
}}
>
Price: ₹{item.product.price}
</h3>



<h3
style={{
color:"#f59e0b"
}}
>
Item Total:
₹{item.product.price * item.quantity}
</h3>



<p>
Quantity
</p>


<div
style={{
display:"flex",
alignItems:"center",
gap:"15px"
}}
>


<button

style={buttonStyle}

onClick={()=>
updateQuantity(
item.id,
item.quantity-1
)
}

>
−
</button>



<div style={quantityStyle}>
{item.quantity}
</div>



<button

style={buttonStyle}

onClick={()=>
updateQuantity(
item.id,
item.quantity+1
)
}

>
+
</button>


</div>


</div>






{/* ACTIONS */}


<div
style={{
display:"flex",
flexDirection:"column",
gap:"15px"
}}
>


<button

onClick={()=>
toggleOrder(item.id)
}

style={{

background:
selectedItems.includes(item.id)
?
"#16a34a"
:
"#f59e0b",

color:"white",

border:"none",

padding:"14px",

borderRadius:"10px",

cursor:"pointer",

fontWeight:"bold"

}}

>

{

selectedItems.includes(item.id)

?

"✓ Added to Order"

:

"+ Add to Order"

}


</button>





<button

onClick={()=>
removeItem(item.id)
}

style={{

background:"#dc2626",

color:"white",

border:"none",

padding:"14px",

borderRadius:"10px",

cursor:"pointer",

fontWeight:"bold"

}}

>

🗑 Remove from Cart

</button>


</div>



</div>


))

}





{/* FOOTER */}


{
cart.length > 0 &&


<div

style={{

marginTop:"30px",

background:"#0f172a",

padding:"25px",

borderRadius:"16px",

display:"flex",

justifyContent:"space-between",

alignItems:"center",

color:"white"

}}

>


<div>

<h3>
Selected Items:
{selectedItems.length}
</h3>

</div>



<div
style={{
display:"flex",
gap:"15px"
}}
>


<button

onClick={selectAll}

style={{

background:
allSelected
?
"#16a34a"
:
"#f59e0b",

color:"white",

border:"none",

padding:"14px 25px",

borderRadius:"10px",

cursor:"pointer",

fontWeight:"bold"

}}

>

{

allSelected

?

"✓ All Items Added"

:

"Select All Items"

}


</button>



<button

onClick={() => {

if(selectedItems.length === 0){

alert("Please select items first");

return;

}


navigate(
"/review",
{
state:{
items:selectedProducts
}
}
);


}}

style={{

background:"#2563eb",

color:"white",

border:"none",

padding:"14px 25px",

borderRadius:"10px",

cursor:"pointer",

fontWeight:"bold"

}}

>

Proceed To Buy

</button>


</div>


</div>


}


</div>

  );

}

export default Cart;
