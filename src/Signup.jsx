import { useState } from "react";

function Signup({ onSignupSuccess, onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // SEND OTP
  // =========================
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Please fill all fields");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

     const response = await fetch(
  "https://ecommerce-website-12i1.onrender.com/api/auth/signup",
  {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setOtpSent(true);
        setMessage("OTP sent to your Gmail");
      } else {
        setMessage(data.message || "Signup failed");
      }
    } catch (error) {
      console.log(error);
      setMessage("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setMessage("Please enter OTP");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
const response = await fetch(
  "https://ecommerce-website-12i1.onrender.com/api/auth/verify-otp",
  {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Signup successful!");

        // Signup complete hone ke baad
        // FreshMart website par wapas
        if (onSignupSuccess) {
          onSignupSuccess();
        }
      } else {
        setMessage(data.message || "OTP verification failed");
      }
    } catch (error) {
      console.log(error);
      setMessage("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f5f5f5",
      }}
    >
      <div
        style={{
          width: "380px",
          background: "white",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
          }}
        >
          Create Account
        </h2>

        {/* =========================
            SIGNUP FORM
        ========================= */}
        {!otpSent ? (
          <form onSubmit={handleSignup}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              style={inputStyle}
            />

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter Gmail"
              style={inputStyle}
            />

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </form>
        ) : (
          /* =========================
             OTP FORM
          ========================= */
          <form onSubmit={handleVerifyOtp}>
            <p
              style={{
                textAlign: "center",
                marginBottom: "15px",
              }}
            >
              OTP sent to
              <br />
              <strong>{email}</strong>
            </p>

            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter 6 digit OTP"
              maxLength="6"
              style={inputStyle}
            />

            <button
              type="submit"
              disabled={loading}
              style={buttonStyle}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        {/* =========================
            LOGIN BUTTON
            Signup aur OTP dono screen par dikhega
        ========================= */}
        <button
          type="button"
          onClick={() => {
            if (onLogin) {
              onLogin();
            }
          }}
          style={{
            width: "100%",
            marginTop: "10px",
            padding: "10px",
            border: "1px solid #0c831f",
            borderRadius: "7px",
            background: "white",
            color: "#0c831f",
            fontSize: "15px",
            cursor: "pointer",
          }}
        >
          Already have an account? Login
        </button>

        {/* MESSAGE */}
        {message && (
          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              color: "#333",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

// =========================
// INPUT STYLE
// =========================
const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "7px",
  fontSize: "15px",
};

// =========================
// BUTTON STYLE
// =========================
const buttonStyle = {
  width: "100%",
  padding: "12px",
  border: "none",
  borderRadius: "7px",
  background: "#0c831f",
  color: "white",
  fontSize: "16px",
  cursor: "pointer",
};

export default Signup;