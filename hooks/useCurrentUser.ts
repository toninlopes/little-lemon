import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export type User = {
  firstName: string;
  lastName?: string;
  email: string;
  image?: string;
  phone?: string;
  orderNotification?: boolean;
  passwordNotification?: boolean;
  offersNotification?: boolean;
  newsNotification?: boolean;
}

const useCurrentUser = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState('');
  const [phone, setPhone] = useState('');
  const [orderNotification, toggleOrderNotification] = useState(false);
  const [passwordNotification, togglePasswordNotification] = useState(false);
  const [offersNotification, toggleOffersNotification] = useState(false);
  const [newsNotification, toggleNewsNotification] = useState(false);

  const forceUpdate = () => {
    AsyncStorage.getItem('USER')
      .then(data => {
        if (data) {
          const user = JSON.parse(data) as User;

          setImage(user.image || '');
          setFirstName(user.firstName || '');
          setLastName(user.lastName || '');
          setEmail(user.email || '');
          setPhone(user.phone || '');
          toggleOrderNotification(user.orderNotification || false);
          togglePasswordNotification(user.passwordNotification || false);
          toggleOffersNotification(user.offersNotification || false);
          toggleNewsNotification(user.newsNotification || false);
        }
      });
  };

  const saveUser = async (user: User) => {
    await AsyncStorage.setItem('USER', JSON.stringify(user));
  };

  const deleteUser = async () => {
    await AsyncStorage.removeItem('USER');
  };

  useEffect(() => {
    forceUpdate();
  }, []);

  return {
    forceUpdate,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    image,
    setImage,
    phone,
    setPhone,
    orderNotification,
    toggleOrderNotification,
    passwordNotification,
    togglePasswordNotification,
    offersNotification,
    toggleOffersNotification,
    newsNotification,
    toggleNewsNotification,
    saveUser,
    deleteUser,
  }
};

export default useCurrentUser;