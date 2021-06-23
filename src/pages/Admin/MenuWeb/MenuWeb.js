import React,{ useState, useEffect } from 'react';
import { getMenuApi } from "../../../api/menu";
import MenuWebLIst from "../../../components/Admin/MenuWeb/MenuWebList";
export default function MenuWeb(props) {
  const [menu, setMenu] = useState({});
  const [reloadMenuWeb, setReloadMenuWeb] = useState(false);
  useEffect(() => {
    getMenuApi().then(response => {
      setMenu(response.menu);
    });
    setReloadMenuWeb(false);
  }, [reloadMenuWeb]);
  return(

    <div className="menu-web">
      <MenuWebLIst menu={Array.from(menu)} setReloadMenuWeb={setReloadMenuWeb}/>
    </div>
  );
};
