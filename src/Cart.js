function Cart(props){
    function handlePlus(e){
        const newCart = props.cart.map(prod => {
            if(prod.id===parseInt(e.target.dataset.id) && prod.quantity!==prod.stock) {
                prod.quantity+=1;
            }
            return prod;
        });
        props.setCart(newCart);
    }
    function handleMinus(e){
        const newCart = props.cart.map(prod => {
            if(prod.id===parseInt(e.target.dataset.id) && prod.quantity!==1) {
                prod.quantity-=1;
            }
            return prod;
        });
        props.setCart(newCart);
    }
    function handleRemove(e){
        let newCart=props.cart.filter(prod=>prod.id!==parseInt(e.target.dataset.id));
        props.setCart(newCart);
    }
    return (
        <div className="cart">
            <div className="products">
            {props.cart.map((prod)=>{
                return (
                    <div className="prod" key={prod.id}>
                        <div className="img"><img src={prod.img} alt={prod.name}/></div>
                        <div className="name">{prod.name}</div>
                        <div className="quantity">
                            <div className="plusBtn" data-id={prod.id} onClick={handlePlus}>
                                +
                            </div>
                            <div className="amount">
                                {prod.quantity}
                            </div>
                            <div className="minusBtn" data-id={prod.id} onClick={handleMinus}>
                                -
                            </div>
                        </div>
                        <div className="price">{prod.price}</div>
                        <div className="removeCart" data-id={prod.id} onClick={handleRemove}>
                            X
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
    );
}
export default Cart;