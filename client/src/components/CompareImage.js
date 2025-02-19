import { useEffect, useState } from "react";
import userCircle from "../assets/images/circle-user.png";

export default function CompareImage() {
  const [score, setScore] = useState(null);
  const [base64Image, setBase64Image] = useState("");

  const convertToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  useEffect(() => {
    const convertImage = async () => {
      try {
        const response = await fetch(userCircle);
        const blob = await response.blob();
        const base64 = await convertToBase64(blob);
        setBase64Image(base64);
      } catch (error) {
        console.error("Error loading and converting image to base64", error);
      }
    };

    convertImage();
  }, []);

  const handleSendingImage = async () => {
    try {
      const response = await fetch("http://localhost:3047/check-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userImage: base64Image,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Image successfully sent to server:", data);

      setScore(data.score);
    } catch (error) {
      console.error("Error sending image to server");
    }
  };

  return (
    <div className="compareImageContainer">
      <button type="button" onClick={handleSendingImage}>
        Compare Test
      </button>
      <p>Score: {score === null ? "Awaiting result..." : score}</p>
    </div>
  );
}
