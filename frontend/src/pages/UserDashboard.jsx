import { useEffect, useState } from "react";
import "./UserDashboard.css";
import { toast } from "react-toastify";

export default function UserDashboard() {
  const [member, setMember] = useState(null);
  const [review, setReview] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/my-membership", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setMember(data));
  }, []);

  const submitReview = async () => {
    const res = await fetch("http://localhost:5000/api/review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ review }),
    });

    const data = await res.json();

    if (!res.ok) {
      toast.error(data.msg); // ❌ Only active members can submit review
      return;
    }

    setReview("");
    toast.success(data.msg); // ✅ Review submitted
  };

  if (!member) return <div className="ud-loading">Loading...</div>;

  return (
    <div className="ud-container">
      <div className="ud-card">
        <h2>My Membership</h2>

        <div className="ud-dates">
          <div>
            <span>Plan Start</span>
            <p>
              {member.planStart
                ? new Date(member.planStart).toDateString()
                : "Membership not started"}
            </p>
          </div>
          <div>
            <span>Plan Expiry</span>
            <p>
              {member.planExpiry
                ? new Date(member.planExpiry).toDateString()
                : "Membership not active"}
            </p>
          </div>
        </div>
      </div>

      <div className="ud-card">
        <h3>Write a Review</h3>

        <textarea
          placeholder="Share your experience..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <button onClick={submitReview}>Submit Review</button>
      </div>
    </div>
  );
}
