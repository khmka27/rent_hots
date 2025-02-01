import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/esm/Row';
import axiosInstance from '../api/axiosInstance';
import ApartmentCard from '../ui/ApartmentCard';

export default function ApartmentsPage({ user }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const favoritesResponse = await axiosInstance.get('/favorites');
        const idFavoritesCards = favoritesResponse.data.filter(
          (favorite) => favorite.userId === user.data.id,
        );

        const favoriteCardIds = idFavoritesCards.map((favorite) => favorite.apartmentId); // Исправлено на apartmentId

        if (favoriteCardIds.length > 0) {
          const apartmentsResponse = await axiosInstance.get('/apartments');
          const favoriteCards = apartmentsResponse.data.filter((card) =>
            favoriteCardIds.includes(card.id),
          );
          setCards(favoriteCards);
        } else {
          setCards([]);
        }
      } catch (error) {
        console.error('Error fetching favorites:', error);
      }
    };

    fetchFavorites();
  }, [user.data.id]); // Добавлено user.data.id в зависимости

  return (
    <Row className="mt-3">
      {cards.map((card) => (
        <ApartmentCard
          key={card.id} // Используется правильный id квартиры
          card={card}
          user={user}
          setCards={setCards}
        />
      ))}
    </Row>
  );
}

// import React from 'react';
// import { useState, useEffect } from 'react';
// import Row from 'react-bootstrap/esm/Row';

// import axiosInstance from '../api/axiosInstance';

// import ApartmentCard from '../ui/ApartmentCard';
// // import { useParams } from 'react-router-dom';

// export default function ApartmentsPage({ user }) {
//   const [cards, setCards] = useState([]);

//   // const { id } = useParams();

//   useEffect(() => {
//     axiosInstance.get('/favorites').then((res) => {
//       const idFavoritesCards = res.data.filter((favorite) => favorite.userId === user.data.id);
//       const favoriteCards = [];
//       for (let i = 0; i < idFavoritesCards.length; i++) {
//         favoriteCards.push(idFavoritesCards[i].cardId);
//       }
//       // if (favoriteCards.length > 0) {
//       //   axiosInstance.get(`/apartments`).then((res) => {
//       //     const newCards = res.data.filter((card) => favoriteCards.includes(card.id));
//       //     setCards(newCards);
//       //   });
//       setCards(favoriteCards);

//     });
//   }, []);

//   // const newObjectSubmitHandler = (e) => {
//   //   e.preventDefault();
//   //   const data = Object.fromEntries(new FormData(e.target));
//   //   if (!data.description || !data.address || !data.maxUsers) return; // название колонок

//   // axiosInstance
//   //   .post('/objects', data)
//   //   .then((res) => {
//   //     setCards((prev) => [res.data, ...prev]);
//   //   })
//   //   .catch((err) => {
//   //     console.log(err);
//   //   });
//   // };

//   // const deleteHandler = (id) => {
//   //   axiosInstance.delete(`/xxxs/${id}`).then(() => {
//   //     setCards((prev) => prev.filter((el) => el.id !== id));
//   //   });
//   // };

//   return (
//     <Row className="mt-3">
//       {cards.map((card) => (
//         <>
//           <ApartmentCard
//             key={card.id}
//             card={card}
//             user={user}
//             // meetSubmitHandler={meetSubmitHandler}
//             setCards={setCards}
//             // deleteHandler={deleteHandler}
//           />
//         </>
//       ))}
//     </Row>
//   );
// }

// // export default function ObjectsPage({ user }) {
