import { useEffect, useState } from 'react';
import axiosInstance, { setAccessToken } from '../components/api/axiosInstance';

export default function useUser() {
  const [user, setUser] = useState({ status: 'fetching', data: null });

  useEffect(() => {
    axiosInstance('/tokens/refresh')
      .then(({ data }) => {
        setAccessToken(data.accessToken);
        setUser({
          status: 'logged',
          data: {
            ...data.user,
            isAdmin: data.user.isAdmin,
          },
        });
      })
      .catch(() => {
        setUser({ status: 'guest', data: null });
        setAccessToken('');
      });
  }, []);

  const logoutHandler = () => {
    axiosInstance.get('/auth/logout').then(() => setUser({ status: 'guest', data: null }));
    setAccessToken('');
  };

  const signUpHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!formData.email || !formData.password || !formData.name) {
      return alert('Заполните все обязательные поля');
    }
    axiosInstance.post('/auth/signup', formData).then(({ data }) => {
      setUser({
        status: 'logged',
        data: {
          ...data.user,
          isAdmin: data.user.isAdmin,
        },
      });
    });
  };

  const signInHandler = (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(e.target));
    if (!formData.email || !formData.password) {
      return alert('Заполните все обязательные поля');
    }
    axiosInstance.post('/auth/signin', formData).then(({ data }) => {
      setUser({
        status: 'logged',
        data: {
          ...data.user,
          isAdmin: data.user.isAdmin,
        },
      });
    });
  };

  return {
    user,
    signInHandler,
    signUpHandler,
    logoutHandler,
  };
}
