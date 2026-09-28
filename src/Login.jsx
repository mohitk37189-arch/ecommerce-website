import { useState } from "react";

function Login({ onLogin, onSignup }) {
  const [step, setStep] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ================= LOGIN =================
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (onLogin) {
          onLogin(data.user);
        }
      } else {
        setMessage(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      setMessage("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= SEND FORGOT OTP =================
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("Please enter your Gmail");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("OTP sent to your Gmail");
        setStep("otp");
      } else {
        setMessage(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.log(error);
      setMessage("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================
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
        "http://localhost:5000/api/auth/verify-forgot-otp",
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
        setMessage("OTP verified successfully");
        setStep("reset");
      } else {
        setMessage(data.message || "Invalid OTP");
      }
    } catch (error) {
      console.log(error);
      setMessage("Server connection failed");
    } finally {
      setLoading(false);
    }
  };

  // ================= RESET PASSWORD =================
  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!newPassword) {
      setMessage("Please enter new password");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      const response = await fetch(
        "http://localhost:5000/api/auth/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Password reset successfully");

        setEmail("");
        setPassword("");
        setOtp("");
        setNewPassword("");

        setTimeout(() => {
          setStep("login");
          setMessage("");
        }, 1500);
      } else {
        setMessage(data.message || "Password reset failed");
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
          background: "#fff",
          padding: "30px",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
        }}
      >

        {/* ================= LOGIN ================= */}
        {step === "login" && (
          <>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "25px",
              }}
            >
              Login
            </h2>

            <form onSubmit={handleLogin}>
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
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <button
              type="button"
              onClick={() => {
                setStep("forgot");
                setMessage("");
              }}
              style={linkButtonStyle}
            >
              Forgot Password?
            </button>

            <button
              type="button"
              onClick={onSignup}
              style={linkButtonStyle}
            >
              Don't have an account? Signup
            </button>
          </>
        )}

        {/* ================= FORGOT PASSWORD ================= */}
        {step === "forgot" && (
          <>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "25px",
              }}
            >
              Forgot Password
            </h2>

            <form onSubmit={handleForgotPassword}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your Gmail"
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

            <button
              type="button"
              onClick={() => {
                setStep("login");
                setMessage("");
              }}
              style={linkButtonStyle}
            >
              ← Back to Login
            </button>
          </>
        )}

        {/* ================= OTP ================= */}
        {step === "otp" && (
          <>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "25px",
              }}
            >
              Verify OTP
            </h2>

            <form onSubmit={handleVerifyOtp}>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter 6 digit OTP"
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
          </>
        )}

        {/* ================= RESET PASSWORD ================= */}
        {step === "reset" && (
          <>
            <h2
              style={{
                textAlign: "center",
                marginBottom: "25px",
              }}
            >
              New Password
            </h2>

            <form onSubmit={handleResetPassword}>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                style={inputStyle}
              />

              <button
                type="submit"
                disabled={loading}
                style={buttonStyle}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>
            </form>
          </>
        )}

        {/* ================= MESSAGE ================= */}
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

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  marginBottom: "15px",
  border: "1px solid #ddd",
  borderRadius: "7px",
  fontSize: "15px",
};

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

const linkButtonStyle = {
  width: "100%",
  marginTop: "15px",
  padding: "10px",
  border: "none",
  background: "transparent",
  color: "#0c831f",
  cursor: "pointer",
  fontSize: "14px",
};

export default Login;