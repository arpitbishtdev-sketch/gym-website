import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthChoiceModal from "../components/AuthChoiceModal";
import "./Home.css";
import RotatingText from "../components/RotatingText";
import WhatWeOffer from "./WhatWeOffer";
import Membership from "./Membership";
import gbImg from "../assets/gb.png";
import { API } from "../api"; // path adjust

function Home() {
  const [showChoice, setShowChoice] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const checkAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) return setIsLoggedIn(false);

    try {
      const res = await fetch(`${API}/api/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setIsLoggedIn(res.ok);
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkAuth();

    const onFocus = () => checkAuth(); // jab page pe wapas aao
    window.addEventListener("focus", onFocus);

    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const handleHeroButtonClick = () => {
    if (!isLoggedIn) {
      setShowChoice(true);
    } else {
      navigate("/plans");
    }
  };

  return (
    <>
      <section className="home">
        <div
          className="hero"
          style={{
            backgroundImage: `url(${gbImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "rgba(99, 94, 94, 0.45)",
              borderRadius: "inherit",
            }}
          />

          <div style={{ position: "relative", zIndex: 2 }}>
            <h1 className="hero-title">
              Transform{" "}
              <span className="rotate-box">
                <RotatingText
                  texts={["Your Body 💪🏻", "Your Mind 🧠", "Your Soul 🪷"]}
                  rotationInterval={2000}
                />
              </span>
            </h1>

            <p style={{ color: "#1cdb2c" }}>
              Join the best gym in your city. Modern equipment, expert trainers,
              and real results.
            </p>

            <button className="join-btn" onClick={handleHeroButtonClick}>
              {isLoggedIn ? "View Plans" : "Join Now"}
            </button>
          </div>
        </div>
      </section>

      <WhatWeOffer />
      <Membership />

      {showChoice && (
        <AuthChoiceModal
          onClose={() => setShowChoice(false)}
          onLogin={() => {
            setShowChoice(false);
            navigate("/auth/login");
          }}
          onRegister={() => {
            setShowChoice(false);
            navigate("/auth/register");
          }}
        />
      )}
    </>
  );
}

export default Home;
