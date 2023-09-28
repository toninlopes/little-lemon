import * as SQLite from 'expo-sqlite';
import { useEffect, useMemo, useState } from 'react';

const db = SQLite.openDatabase('little_lemon');

db.transaction((tx) => {
  tx.executeSql(
    'create table if not exists items (' +
      'id string primary key not null, ' +
      'name text, ' +
      'price number, ' +
      'description text, ' +
      'image text, ' +
      'category text ' +
    ');'
  );
});

export type MenuItem = {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

const QUERY = 'select * from items';
const INSERT = 'insert into items (id, name, price, description, image, category) values(?, ?, ?, ?, ?, ?)';
const GROUP_BY_CATEGORY = 'select category from items group by category';

const useDBMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [categories, setCategories] = useState<string[]>([]);

  const selectAllMenuItems = () => {
    db.transaction((tx) => {
      tx.executeSql(QUERY, [], (_, { rows }) => {
        const items = rows._array.map((item) => ({
          ...item,
        }) as MenuItem );
        setMenuItems(items || []);
      });
    });

    db.transaction((tx) => {
      tx.executeSql(GROUP_BY_CATEGORY, [], (_, { rows }) => {
        setCategories(rows._array.map(item => item.category));
      });
    });
  };

  const updateMenuItems = (items: MenuItem[]) => {
    db.transaction((tx) => {
      items.forEach(item => {
        tx.executeSql(
          INSERT,
          [item.id, item.name, item.price, item.description, item.image, item.category]
        );
      })
    });

    selectAllMenuItems();
  };

  const filter = (categories: string[], dishname: string = '') => {
    const clause = [];
    if (categories.length) {
      clause.push(`category in (${categories.map(t => `'${t}'`).join(', ')})`);
    }
    if (dishname) {
      clause.push(`name like '%${dishname}%'`);
    }
    
    const command = [QUERY, (categories.length || dishname) && 'where', clause.join(' and ') ];

    db.transaction((tx) => {
      tx.executeSql(command.join(' '), [], (_, { rows }) => {
        const itemsFiltered = rows._array.map((item) => ({
          ...item,
        }) as MenuItem );
        setMenuItems(itemsFiltered);
      });
    });

  };

  useEffect(() => {
    selectAllMenuItems();
  }, []);

  return {
    menuItems,
    categories,
    updateMenuItems,
    filter,
  }
};

export default useDBMenuItems;