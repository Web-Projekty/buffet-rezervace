import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const AdminDashboard = () => {
  const user: any = useAuthUser();
  return (
    <div className="flex items-center justify-center">
      Hello, admin {user.name}
    </div>
  );
};

export default AdminDashboard;
