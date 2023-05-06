function Checkout(props){
    const plusSvg=(<svg fillRule="evenodd" clipRule="evenodd" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path  d="M12 4C12.5523 4 13 4.44772 13 5V11H19C19.5523 11 20 11.4477 20 12C20 12.5523 19.5523 13 19 13H13V19C13 19.5523 12.5523 20 12 20C11.4477 20 11 19.5523 11 19V13H5C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11H11V5C11 4.44772 11.4477 4 12 4Z"/>
    </svg>);
    const minusSvg=(<svg strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <line  x1="4" x2="20" y1="12" y2="12"/>
    </svg>);
    const crossSvg=(<svg clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z"/>
    </svg>);
    function handlePlus(e){
        const newCart = props.cart.map(prod => {
            if(prod.id===parseInt(e.currentTarget.dataset.id) && prod.quantity!==prod.stock) {
                prod.quantity+=1;
            }
            return prod;
        });
        props.setCart(newCart);
    }
    function handleMinus(e){
        const newCart = props.cart.map(prod => {
            if(prod.id===parseInt(e.currentTarget.dataset.id) && prod.quantity!==1) {
                prod.quantity-=1;
            }
            return prod;
        });
        props.setCart(newCart);
    }
    function handleRemove(e){
        let newCart=props.cart.filter(prod=>prod.id!==parseInt(e.currentTarget.dataset.id));
        props.setCart(newCart);
    }
    return (
        <div className="checkout">
            <div className="products">
            {props.cart.map((prod)=>{
                return (
                    <div className="prod" key={prod.id}>
                        <div className="img"><img src={prod.img} alt={prod.name}/></div>
                        <div className="name"><p>{prod.name}</p></div>
                        <div className="quantity">
                            <div className="minusBtn" data-id={prod.id} onClick={handleMinus}>
                                {minusSvg}
                            </div>
                            <div className="amount">
                                {prod.quantity}
                            </div>
                            <div className="plusBtn" data-id={prod.id} onClick={handlePlus}>
                                {plusSvg}
                            </div>
                        </div>
                        <div className="price">Price: <p> &nbsp;{prod.price * prod.quantity}</p></div>
                        <div className="removeCart" data-id={prod.id} onClick={handleRemove}>
                            {crossSvg}
                        </div>
                    </div>
                );
            })}
            </div>
        </div>
    );
}
export default Checkout;