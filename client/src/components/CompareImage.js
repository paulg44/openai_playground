import userCircle from "../assets/images/circle-user.png";

export default function CompareImage(base64Image) {
  const [score, setScore] = 0;

  const handleSendingImage = async () => {
    try {
      const response = await fetch("http://localhost:3047/check-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: base64Image,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Image successfully sent to server:", data);

      setScore(data.message.content);
    } catch (error) {
      console.error("Error sending image to server");
    }
  };

  return (
    <div className="compareImageContainer">
      <button type="button" onClick={handleSendingImage}>
        Compare Test
      </button>
      <p>Score: {score}</p>
    </div>
  );
}
