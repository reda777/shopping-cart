function Shop(props){
    const prods=[{id: 0,img:'https://m.media-amazon.com/images/I/610Rt4BtEWL._AC_SX679_.jpg',name:'Ryzen 7 8000X',stock:20,price:2500},
                {id: 1,img:'https://m.media-amazon.com/images/I/711vU2IrEuL._AC_SX679_.jpg',name:'Nvidia 3100 TI',stock:5,price:20000},
                {id: 2,img:'https://m.media-amazon.com/images/I/71uOgDy40BL._AC_SX466_.jpg',name:'Apple Watch',stock:13,price:5000},
                {id: 3,img:'https://m.media-amazon.com/images/I/619f09kK7tL._AC_SX679_.jpg',name:'Iphone 15',stock:50,price:6000},
                {id: 4,img:'https://m.media-amazon.com/images/I/61sLuO6LiAL._AC_SX679_.jpg',name:'Logitech G590x',stock:4,price:600},
                {id: 5,img:'https://m.media-amazon.com/images/I/51DHwXLD6gL._AC_SX569_.jpg',name:'Xiaomi Note 12',stock:2,price:2600}];
    const handleAddCart=(e)=>{
        let parent=e.target.parentNode;
        let quantity=parseInt(parent.querySelector('#quantity').value);
        let product=prods.find(element => element.id === parseInt(e.target.dataset.id));
        product={...product,quantity:quantity};
        props.setCart([...props.cart,product]);
    }
    return(
        <div className="products">
            {prods.map((prod)=>{
                let currentProd=props.cart.find(element => element.id === prod.id);
                return (
                    <div className="prod" key={prod.id}>
                        <div className="img"><img src={prod.img} alt={prod.name}/></div>
                        <div className="name">{prod.name}</div>
                        <div className="stock">On stock:{prod.stock}</div>
                        <div className="quantity">
                            <input type="number" id="quantity" defaultValue="1" min="1" max={prod.stock}/>
                        </div>
                        <div className="price">{prod.price}</div>
                        {(currentProd)?<div className="addedCart">Added To Cart</div>:<div className="addCart" data-id={prod.id} onClick={handleAddCart}>Add To Cart</div>}
                    </div>
                );
            })}
        </div>
    );
}
//input 3em = 3 numbers :)
export default Shop;