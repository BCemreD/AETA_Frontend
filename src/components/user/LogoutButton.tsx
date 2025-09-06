import { useAuthStore } from "../../stores/useAuthStore";

const LogoutButton = () => {
  const logout = useAuthStore((state) => state.logout);

  const handleLogout = () => {
    logout();
    alert("Logged out!");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
