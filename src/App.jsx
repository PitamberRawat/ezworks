import React, { useState } from "react";
import "./App.css";
import ezworkslogo from "./assets/ezworkslogo.png";
import ts from "./assets/ts.png";
import dp from "./assets/dp.png";
import heading from "./assets/heading.png";
import rna from "./assets/rna.png";
import pd from "./assets/pd.png";
import gd from "./assets/gd.png";
import avp from "./assets/avp.png";
import ServicesGrid from "./ServicesGrid";

function App() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset states
    setError("");
    setSuccess(false);

    // Frontend validation
    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("https://test.ezworks.ai/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.status === 422) {
        // Handle the specific case for @ez.works emails
        setError(data.message || "Email not allowed");
      } else if (response.status === 200) {
        // Handle success
        setSuccess(true);
        setEmail("");
      } else {
        // Handle other errors
        setError(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error("API Error:", err);
      setError("Failed to connect to the server");
    } finally {
      setIsLoading(false);
    }
  };

  const services = [
    {
      url: pd,
      title: "Presentation Design",
      description:
        "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      url: avp,
      title: "Audio - Visual Production",
      description:
        "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      url: ts,
      title: "Translation Services",
      description:
        "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      url: gd,
      title: "Graphic Design",
      description:
        "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      url: rna,
      title: "Research & Analytics",
      description:
        "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      url: dp,
      title: "Data Processing",
      description:
        "Lorem ipsum dolor sit amet, lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
  ];

  return (
    <div className="app-container">
      <div className="landing-container">
        <div className="hero-section">
          <div className="left-section">
            <div className="logo-section">
              <div className="logo">
                {/* <span className="ez">EZ</span>
              <span className="works">Works</span> */}
                <img height="62px" width="222px" src={ezworkslogo} alt="" />
                <img
                  height="76px"
                  src={heading}
                  style={{ margin: "18px 0 18px 0" }}
                  alt=""
                />
              </div>
              <p className="subtitle">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt...Lorem ipsum dolor sit amet,
                consectetur adipiscing elit, sed
              </p>
            </div>
            <div className="lap-div contact-form">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={success ? "Form Submitted" : email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={error ? "input-error" : ""}
                    disabled={success || isLoading}
                  />
                </div>
                {error && <div className="error-message">{error}</div>}
                <button type="submit" disabled={isLoading || success}>
                  {isLoading ? "Sending..." : "Contact Me"}
                </button>
              </form>
            </div>
          </div>
          <div className="services-grid">
            {services.map((service, index) => (
              <ServicesGrid
                title={service.title}
                url={service.url}
                des={service.description}
              />
            ))}
          </div>
          <div className="mob-div contact-form">
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={success ? "Form Submitted" : email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={error ? "input-error" : ""}
                  disabled={success || isLoading}
                />
                <button type="submit" disabled={isLoading || success}>
                  {isLoading ? "Sending..." : "Contact Me"}
                </button>
              </div>
              {error && <div className="error-message">{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
