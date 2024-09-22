import useAuthUser from "react-auth-kit/hooks/useAuthUser";

const UserDashboard = () => {
  const user: any = useAuthUser();
  return (
    <div className="flex items-center justify-center">
      Hello, user {user.name}
    </div>
  );
};

export default UserDashboard;
