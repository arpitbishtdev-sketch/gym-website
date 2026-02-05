import { useNavigate } from "react-router-dom";
import { MdOutlineContactSupport } from "react-icons/md";
import "./EnquiryCTA.css";

export default function EnquiryCTA() {
  const navigate = useNavigate();

  return (
    <section className="cta-section">
      <div className="cta-box">
        <h2>Still Thinking About Joining?</h2>
        <p>
          Ask us anything about memberships, trainers, timings or facilities.
          Our team will guide you personally.
        </p>

        <button className="cta-btn" onClick={() => navigate("/contact")}>
          <MdOutlineContactSupport size={22} />
          Send Enquiry
        </button>
      </div>
    </section>
  );
}
