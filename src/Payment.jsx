import { useState } from "react";

function Payment() {
  const [loading, setLoading] = useState(false);

  const cartItems = JSON.parse(
    localStorage.getItem("paymentCart") || "[]"
  );

  const total = Number(
    localStorage.getItem("paymentTotal") || 0
  );

  // =========================
  // LOAD RAZORPAY CHECKOUT
  // =========================

  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = "https://checkout.razorpay.com/v1/checkout.js";

      script.onload = () => {
        resolve(true);
      };

      script.onerror = () => {
        resolve(false);
      };

      document.body.appendChild(script);
    });
  };

  // =========================
  // START PAYMENT
  // =========================

  const handlePayment = async () => {
    try {
      if (!total || total <= 0) {
        alert("Invalid payment amount");
        return;
      }

      setLoading(true);

      // Load Razorpay
      const razorpayLoaded = await loadRazorpay();

      if (!razorpayLoaded) {
        alert("Razorpay load nahi hua. Internet check karo.");
        setLoading(false);
        return;
      }

      // =========================
      // CREATE ORDER FROM BACKEND
      // =========================

    const response = await fetch(
  "https://ecommerce-website-12i1.onrender.com/api/payment/create-order",
  {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: total,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        alert(
          data.message ||
            "Razorpay order create nahi hua."
        );

        setLoading(false);
        return;
      }

      const order = data.order;

      // =========================
      // RAZORPAY CHECKOUT
      // =========================

      const options = {
        key: "rzp_test_Tfnjvtwtt0NrOC",

        amount: order.amount,

        currency: order.currency,

        name: "FreshMart",

        description: "FreshMart Grocery Order",

        order_id: order.id,

        handler: function (response) {
          console.log(
            "Payment Successful:",
            response
          );

          // Payment successful
          localStorage.removeItem("paymentCart");
          localStorage.removeItem("paymentTotal");

          alert("Payment Successful! 🎉");

          window.location.href = "/";
        },

        prefill: {
          name: "",
          email: "",
          contact: "",
        },

        notes: {
          website: "FreshMart",
        },

        theme: {
          color: "#0c831f",
        },

        modal: {
          ondismiss: function () {
            setLoading(false);
          },
        },
      };

      const razorpay = new window.Razorpay(
        options
      );

      razorpay.on(
        "payment.failed",
        function (response) {
          console.log(
            "Payment Failed:",
            response.error
          );

          alert(
            "Payment Failed: " +
              response.error.description
          );

          setLoading(false);
        }
      );

      razorpay.open();

    } catch (error) {
      console.log(
        "Payment Error:",
        error
      );

      alert(
        "Payment start nahi ho paya."
      );

      setLoading(false);
    }
  };

  // =========================
  // PAGE
  // =========================

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f5f7f5",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "850px",
          margin: "auto",
          background: "#fff",
          borderRadius: "15px",
          padding: "30px",
          boxShadow:
            "0 5px 25px rgba(0,0,0,0.1)",
        }}
      >
        <h1 style={{ marginBottom: "25px" }}>
          💳 Payment
        </h1>

        {/* ORDER SUMMARY */}

        <div
          style={{
            borderBottom:
              "1px solid #ddd",
            paddingBottom: "20px",
            marginBottom: "25px",
          }}
        >
          <h2>Order Summary</h2>

          {cartItems.map(
            (item, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  padding: "10px 0",
                }}
              >
                <span>
                  {item.name} ×{" "}
                  {item.cartQuantity}
                </span>

                <strong>
                  ₹
                  {Number(item.price) *
                    item.cartQuantity}
                </strong>
              </div>
            )
          )}

          <div
            style={{
              display: "flex",
              justifyContent:
                "space-between",
              borderTop:
                "1px solid #ddd",
              paddingTop: "15px",
              marginTop: "10px",
              fontSize: "20px",
            }}
          >
            <strong>Total</strong>

            <strong>
              ₹{total}
            </strong>
          </div>
        </div>

        {/* RAZORPAY PAYMENT */}

        <h2>
          Secure Payment
        </h2>

        <p
          style={{
            color: "#666",
            marginTop: "10px",
          }}
        >
          Pay securely using UPI,
          Debit/Credit Card,
          Net Banking or Wallet.
        </p>

        <button
          onClick={handlePayment}
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "25px",
            border: "none",
            borderRadius: "8px",
            background:
              loading
                ? "#999"
                : "#0c831f",
            color: "#fff",
            fontSize: "18px",
            fontWeight: "bold",
            cursor:
              loading
                ? "not-allowed"
                : "pointer",
          }}
        >
          {loading
            ? "Processing..."
            : `💳 Pay ₹${total}`}
        </button>

        <p
          style={{
            textAlign: "center",
            color: "#777",
            fontSize: "13px",
            marginTop: "15px",
          }}
        >
          🔒 Secured by Razorpay
        </p>
      </div>
    </div>
  );
}

export default Payment;