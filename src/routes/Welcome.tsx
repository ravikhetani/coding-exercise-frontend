import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Welcome.css";
const API_URL = import.meta.env.VITE_REST_SERVICE_API_URL;

interface NextDeliveryMessage {
  title: string;
  message: string;
  totalPrice: number;
  freeGift: boolean;
}

const currencyFormat = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const WelcomePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const [message, setMessage] = useState<NextDeliveryMessage | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(`${API_URL}/your-next-delivery/${userId}`);
        const data = await response.json();
        setMessage(data);
      } catch (error) {
        console.error("Error fetching delivery message:", error);
      }
    };

    if (userId) {
      fetchMessage();
    }
  }, [userId]);

  return message ? (
    <div className="container">
      {message.freeGift && <div className="free-gift-tag">FREE GIFT</div>}
      <div className="delivery-card-image-mobile">
        <img src="/cat_50x50.png" alt="Cat Image" />
      </div>
      <div className="delivery-card">
        <div className="delivery-card-image-desktop">
          <img src="/cat_340x250.png" alt="Cat Image" />
        </div>
        <div className="delivery-card-content">
          <div>
            <div className="delivery-card-title">{message.title}</div>

            <div className="delivery-card-message">{message.message}</div>

            <div className="delivery-card-price">
              Total price: {currencyFormat.format(message.totalPrice)}
            </div>
          </div>
          <div className="delivery-card-buttons">
            <button disabled={true} className="delivery-card-button see-details-button">
              SEE DETAILS
            </button>
            <button disabled={true} className="delivery-card-button edit-delivery-button">
              EDIT DELIVERY
            </button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default WelcomePage;
