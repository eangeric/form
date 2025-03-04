import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/auth`, {
      method: "DELETE",
      credentials: "include",
    });

    if (!response.ok) {
      return;
    }
    const data = await response.json();
    console.log(data);
    navigate("/login", { replace: true });
  };

  return (
    <div className="p-2">
      <Button onClick={handleLogout}>Log out</Button>
    </div>
  );
}
