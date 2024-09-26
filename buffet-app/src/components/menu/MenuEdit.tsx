import React from "react";
import { MenuItem } from "../../types";
import { dummyFood } from "../../dummyData";

const MenuEdit = () => {
  const [menu, setMenu] = React.useState<MenuItem[]>(dummyFood);
  return (
    <div>
      {menu.map((item) => {
        return (
          <div key={item.id}>
            <input type="text" value={item.name} />
            <input type="text" value={item.price} />
            <input type="text" value={item.description} />
          </div>
        );
      })}
    </div>
  );
};

export default MenuEdit;
