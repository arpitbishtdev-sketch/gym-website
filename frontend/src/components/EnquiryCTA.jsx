import { useNavigate } from "react-router-dom";
import "./EnquiryCTA.css";

export default function EnquiryCTA() {
  const navigate = useNavigate();

  return (
    <section className="enquiry-cta">
      <div className="cta-box">
        <h2>Have Questions Before Joining?</h2>
        <p>
          Ask us anything about memberships, trainers, timings or facilities.
          Our team will guide you personally.
        </p>

        <button onClick={() => navigate("/contact")}>Send Enquiry</button>
      </div>
    </section>
  );
}
