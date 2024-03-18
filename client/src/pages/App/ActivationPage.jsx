import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { BASE_URL } from "../../config";
import axios from "axios";

const ActivationPage = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${BASE_URL}/user/user-activation`, {
            activation_token,
          });
          console.log(res.data.message);
        } catch (error) {
          console.log(error.response.data.message);
          setError(true);
        }
      };
      activationEmail();
    }
  }, [activation_token]);

  return (
    <div className="w-full h-screen flex justify-center items-center text-sm font-semibold">
      {error ? (
        <p>Your token is Expired!!</p>
      ) : (
        <div>
          <p>Your Account has been created successfully!!</p>
          <Link to="/login">
            <button
              type="button"
              className="mt-7 group relative w-full h-[40] flex justify-center py-2 px-4 border border-transparent text-md font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              LOGIN
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ActivationPage;
