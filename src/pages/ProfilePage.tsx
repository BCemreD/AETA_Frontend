import { useAuthStore } from "../stores/useAuthStore";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProfilePage = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth"); 
    }
  }, [user, navigate]);

  if (!user) return null; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
        <div className="space-y-3">
          <p>
            <span className="font-semibold">First Name:</span> {user.firstName}
          </p>
          <p>
            <span className="font-semibold">Last Name:</span> {user.lastName}
          </p>
          <p>
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
