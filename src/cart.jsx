function Cart({ cartItems, setCartItems, onClose }) {
  const increaseQuantity = (index) => {
    setCartItems((prev) =>
      prev.map((item, i) =>
        i === index
          ? {
              ...item,
              cartQuantity: item.cartQuantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (index) => {
    setCartItems((prev) =>
      prev
        .map((item, i) =>
          i === index
            ? {
                ...item,
                cartQuantity: item.cartQuantity - 1,
              }
            : item
        )
        .filter((item) => item.cartQuantity > 0)
    );
  };

  const removeItem = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const total = cartItems.reduce(
    (sum, item) => sum + Number(item.price) * item.cartQuantity,
    0
  );

  const cartCount = cartItems.reduce(
    (sum, item) => sum + item.cartQuantity,
    0
  );

  const goToPayment = () => {
    localStorage.setItem("paymentCart", JSON.stringify(cartItems));
    localStorage.setItem("paymentTotal", total.toString());

    window.location.href = "/payment";
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: 0,
        width: "420px",
        maxWidth: "100%",
        height: "100vh",
        background: "#fff",
        zIndex: 9999,
        boxShadow: "-5px 0 20px rgba(0,0,0,0.15)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: "18px",
          borderBottom: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h2 style={{ margin: 0 }}>
          🛒 My Cart ({cartCount})
        </h2>

   <button
  type="button"
  onClick={() => {
    if (onClose) {
      onClose();
    }
  }}
  style={{
    border: "none",
    background: "transparent",
    fontSize: "28px",
    cursor: "pointer",
    padding: "5px 10px",
    color: "#222",
  }}
>
  ✕
</button>
      </div>

      {/* CART ITEMS */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "15px",
        }}
      >
        {cartItems.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              paddingTop: "80px",
            }}
          >
            <div style={{ fontSize: "60px" }}>🛒</div>

            <h3>Your cart is empty</h3>

            <p>Add some products to continue.</p>
          </div>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={`${item.name}-${index}`}
              style={{
                display: "flex",
                gap: "12px",
                padding: "15px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              {/* IMAGE */}
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "75px",
                  height: "75px",
                  objectFit: "contain",
                  borderRadius: "8px",
                  background: "#f7f7f7",
                }}
              />

              {/* DETAILS */}
              <div style={{ flex: 1 }}>
                <h4
                  style={{
                    margin: "0 0 5px",
                  }}
                >
                  {item.name}
                </h4>

                <p
                  style={{
                    margin: "0 0 5px",
                    color: "#666",
                    fontSize: "14px",
                  }}
                >
                  {item.quantity || item.weight}
                </p>

                <strong>₹{item.price}</strong>

                {/* QUANTITY */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <button
                    onClick={() => decreaseQuantity(index)}
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid #0c831f",
                      background: "#fff",
                      color: "#0c831f",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    −
                  </button>

                  <strong>{item.cartQuantity}</strong>

                  <button
                    onClick={() => increaseQuantity(index)}
                    style={{
                      width: "30px",
                      height: "30px",
                      border: "1px solid #0c831f",
                      background: "#0c831f",
                      color: "#fff",
                      borderRadius: "5px",
                      cursor: "pointer",
                      fontSize: "18px",
                    }}
                  >
                    +
                  </button>

                  <button
                    onClick={() => removeItem(index)}
                    style={{
                      marginLeft: "auto",
                      border: "none",
                      background: "transparent",
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* BOTTOM */}
      {cartItems.length > 0 && (
        <div
          style={{
            padding: "18px",
            borderTop: "1px solid #ddd",
            background: "#fff",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "15px",
              fontSize: "18px",
            }}
          >
            <strong>Total</strong>

            <strong>₹{total}</strong>
          </div>

          <button
            onClick={goToPayment}
            style={{
              width: "100%",
              padding: "14px",
              border: "none",
              borderRadius: "8px",
              background: "#0c831f",
              color: "#fff",
              fontSize: "17px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            💳 Proceed to Payment
          </button>
        </div>
      )}
    </div>
  );
}

export default Cart;