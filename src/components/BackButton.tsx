import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const goBack = () => {
    window.history.length > 1 ? navigate(-1) : navigate("/");
  };

  return <button onClick={goBack}>Back</button>;
};

export default BackButton;
