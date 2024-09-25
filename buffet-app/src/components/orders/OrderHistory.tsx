import { User } from "../../types";
import UserOrderHistory from "./UserOrderHistory";

const OrderHistory = ({ user }: { user: User }) => {
  return <UserOrderHistory list={user.orders} />;
};

export default OrderHistory;
