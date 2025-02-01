import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
import axiosInstance from '../api/axiosInstance';
import { useParams } from 'react-router-dom';

const OneApartment = ({ user }) => {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editFields, setEditFields] = useState({
    title: false,
    price: false,
    desc: false,
    address: false,
    coordinates: false,
  });

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        const res = await axiosInstance.get(`/apartments/${id}`);
        setApartment(res.data);
      } catch (error) {
        console.error('Ошибка при загрузке квартиры:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchApartment();
  }, [id]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await axiosInstance.get(`/photos?apartmentId=${id}`);
        setPhotos(res.data);
      } catch (error) {
        console.error('Ошибка при загрузке фотографий:', error);
      }
    };
    fetchPhotos();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApartment((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const confirmChange = (fieldName) => {
    return window.confirm(`Вы уверены, что хотите изменить ${fieldName}?`);
  };

  const handleKeyPress = (e, fieldName) => {
    if (e.key === 'Enter') {
      if (confirmChange(fieldName)) {
        updateApartment();
      }
    }
  };

  const updateApartment = async () => {
    try {
      await axiosInstance.put(`/apartments/${id}`, apartment);
      alert('Данные успешно обновлены!');
      setEditFields({
        title: false,
        price: false,
        desc: false,
        address: false,
        coordinates: false,
      });
    } catch (error) {
      console.error('Ошибка при обновлении данных:', error);
      alert('Произошла ошибка при обновлении данных.');
    }
  };

  const renderEditableField = (name, value, placeholder) => {
    return editFields[name] ? (
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        onKeyPress={(e) => handleKeyPress(e, name)}
        style={{ marginLeft: '5px', width: '280px' }}
        placeholder={placeholder}
      />
    ) : (
      <>
        {value}
        {user?.data?.isAdmin && (
          <Button
            variant="link"
            onClick={() => setEditFields({ ...editFields, [name]: true })}
            style={{ color: 'gray', fontSize: '14px', marginLeft: '5px' }}
          >
            Изменить
          </Button>
        )}
      </>
    );
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (!apartment) {
    return <div>Квартира не найдена.</div>;
  }

  return (
    <Container fluid className="p-0">
      <Row className="mb-4">
        {photos.length > 0 ? (
          photos.map((photo, index) => (
            <Col key={index} md={4} className="mb-3">
              <Image src={photo.photo} fluid />
            </Col>
          ))
        ) : (
          <div>Нет фотографий.</div>
        )}
      </Row>

      <Row style={{ height: '100%' }}>
        <Col md={6} className="text-center" style={{ padding: '20px', backgroundColor: '#f8f9fa' }}>
          <h1 className="mb-4">
            {renderEditableField('name', apartment.name, 'введите новое название')}
          </h1>

          <h5 className="text-muted mb-4">
            Адрес: {renderEditableField('address', apartment.address, 'введите новый адрес')}
          </h5>

          <Card className="mb-4" style={{ margin: '0 auto', maxWidth: '400px' }}>
            <Card.Body>
              <Card.Title>Описание</Card.Title>
              <Card.Text>
                {renderEditableField('desc', apartment.desc, 'введите новое описание')}
              </Card.Text>
              <Card.Text>
                <strong>Цена:</strong> {renderEditableField('price', apartment.price, 'введите новое значение цены')}$
              </Card.Text>
              <Card.Text>
                <strong>Забронирована:</strong> {apartment.isReserve ? 'Да' : 'Нет'}
                {user?.data?.isAdmin && (
                  <Button
                    variant="link"
                    onClick={() => {
                      setApartment((prev) => ({
                        ...prev,
                        isReserve: !prev.isReserve,
                      }));
                    }}
                    style={{ color: 'gray', fontSize: '14px', marginLeft: '5px' }}
                  >
                    {apartment.isReserve ? 'Снять бронь' : 'Забронировать'}
                  </Button>
                )}
              </Card.Text>
              <Card.Text>
                <strong>Координаты:</strong> {renderEditableField('coordinates', apartment.coordinates, 'введите новые координаты')}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} style={{ padding: '0' }}>
          <Card className="mb-4" >
            <Card.Body>
              <Card.Title>Карта</Card.Title>
              <div style={{ width: '100%', height: '400px' }}>
                <iframe
                  src={`https://yandex.ru/map-widget/v1/?ll=${apartment.longitude}%2C${apartment.latitude}&mode=search&sll=${apartment.longitude}%2C${apartment.latitude}&text=${apartment.latitude}%2C${apartment.longitude}&z=16.79`}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  style={{ border: '1px solid #ccc' }}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OneApartment;



// import React, { useEffect, useState } from 'react';
// import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
// import axiosInstance from '../api/axiosInstance';
// import { useParams } from 'react-router-dom';

// const OneApartment = () => {
//   const { id } = useParams();

//   const [apartment, setApartment] = useState(null);
//   const [photos, setPhotos] = useState([]);

//   const [showInputTitle, setShowInputTitle] = useState(false);
//   const [showInputPrice, setShowInputPrice] = useState(false);
//   const [showInputDesc, setShowInputDesc] = useState(false);
//   const [showInputAddress, setShowInputAddress] = useState(false);
//   const [showInputCoordinates, setShowInputCoordinates] = useState(false);

//   const onClickHandlerTitle = () => {
//     setShowInputTitle(!showInputTitle);
//   };

//   const onClickHandlerPrice = () => {
//     setShowInputPrice(!showInputPrice);
//   };

//   const onClickHandlerDesc = () => {
//     setShowInputDesc(!showInputDesc);
//   };

//   const onClickHandlerAddress = () => {
//     setShowInputAddress(!showInputAddress);
//   };

//   const onClickHandlerCoordinates = () => {
//     setShowInputCoordinates(!showInputCoordinates);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setApartment((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const toggleReservation = () => {
//     setApartment((prev) => ({
//       ...prev,
//       isReserve: !prev.isReserve,
//     }));
//   };
//   const handleKeyPress = (e, fieldName) => {
//     if (e.key === 'Enter') {
//       if (confirmChange(`Вы уверены, что хотите изменить ${fieldName}?`)) {
//         updateApartment();
//       }
//     }
//   };
//   const [photos, setPhotos] = useState([]);

//   useEffect(() => {
//     axiosInstance
//       .get(`/apartments/${id}`)
//       .then((res) => setApartment(res.data))
//       .catch((error) => console.error('Ошибка при загрузке квартиры:', error));
//     axiosInstance
//       .get(`/apartments/${id}`)
//       .then((res) => {
//         console.log(res.data);
//         setApartment(res.data);
//       })
//       .catch((error) => console.error('Ошибка при загрузке квартиры:', error));
//   }, [id]);

//   useEffect(() => {

//     axiosInstance
//       .get(`/photos?apartmentId=${id}`)
//       .then((res) => setPhotos(res.data))

//       .catch((error) => console.error('Ошибка при загрузке фотографий:', error));
//   }, [id]);

//   if (!apartment) {
//     return <div>Загрузка...</div>;
//   }

//   const { latitude, longitude } = apartment;

//   return (
//     <Container fluid className="p-0" style={{ height: '100vh' }}>

//       <Row
//         className="align-items-center justify-content-center"
//         style={{ height: '100%', backgroundColor: '#f8f9fa' }}
//       >
//         <Col md={6} className="text-center">
//         <h1 className="mb-4">
//             {showInputTitle ? (
//               <input
//                 type="text"
//                 name="name"
//                 value={apartment.name}
//                 onChange={handleChange}
//                 onKeyPress={(e) => handleKeyPress(e, 'название')} // вот тут решить
//                 style={{ marginLeft: '5px', width: '280px' }}
//                 placeholder="введите новое название"
//               />
//             ) : (
//               <>
//                 {apartment.name}
//                 <Button onClick={onClickHandlerTitle} className="material-icons" style={{ marginLeft: '5px' }}>
//                   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
//                     <path d="M0 0h24v24H0z" fill="none" />
//                     <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
//                   </svg>
//                 </Button>
//               </>
//             )}
//           </h1>

//           <h5 className="text-muted mb-4">
//             Адрес: {showInputAddress ? (
//               <input
//                 type="text"
//                 name="address"
//                 value={apartment.address}
//                 onChange={handleChange}
//                 style={{ marginLeft: '5px', width: '280px' }}
//                 placeholder="введите новый адрес"
//               />
//             ) : (
//               <>
//                 {apartment.address}
//                 <Button onClick={onClickHandlerAddress} className="material-icons" style={{ marginLeft: '5px' }}>
//                   <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
//                     <path d="M0 0h24v24H0z" fill="none" />
//                     <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
//                   </svg>
//                 </Button>
//               </>
//             )}
//           </h5>

//           {/* <h1 className="mb-4">{apartment.name}</h1>
//           <h5 className="text-muted mb-4">Адрес: {apartment.address}</h5> */}

//           <Card className="mb-4" style={{ margin: '0 auto', maxWidth: '400px' }}>
//             <Card.Body>
//               <Card.Title>Описание</Card.Title>
//               <Row>
//                 <Card.Text>
//                   {showInputDesc ? (
//                     <input
//                       type="text"
//                       name="desc"
//                       value={apartment.desc}
//                       onChange={handleChange}
//                       style={{ marginLeft: '5px', width: '280px' }}
//                       placeholder="введите новое описание"
//                     />
//                   ) : (
//                     <>
//                       {apartment.desc}
//                       <Button onClick={onClickHandlerDesc} className="material-icons" style={{ marginLeft: '5px' }}>
//                         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
//                           <path d="M0 0h24v24H0z" fill="none" />
//                           <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
//                         </svg>
//                       </Button>
//                     </>
//                   )}
//                 </Card.Text>
//               </Row>

//               <Row>
//                 <Card.Text onClick={onClickHandlerPrice}>
//                   <strong>Цена:</strong> {showInputPrice ? (
//                     <input
//                       type="number"
//                       name="price"
//                       value={apartment.price}
//                       onChange={handleChange}
//                       style={{ marginLeft: '5px', width: '280px' }}
//                       placeholder="введите новое значение цены"
//                     />
//                   ) : (
//                     <>
//                       {apartment.price}₽
//                       <Button className="material-icons" style={{ marginLeft: '5px' }}>
//                         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
//                           <path d="M0 0h24v24H0z" fill="none" />
//                           <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
//                         </svg>
//                       </Button>
//                     </>
//                   )}
//                 </Card.Text>
//               </Row>

//               <Row>
//                 <Card.Text>
//                   <strong>Забронирована:</strong> {apartment.isReserve ? 'Да' : 'Нет'}
//                   <Button onClick={toggleReservation} style={{ marginLeft: '5px' }}>
//                     {apartment.isReserve ? 'Снять бронь' : 'Забронировать'}
//                   </Button>
//                 </Card.Text>
//               </Row>

//               <Row>
//                 <Card.Text>
//                   <strong>Координаты:</strong> {showInputCoordinates ? (
//                     <input
//                       type="text"
//                       name="coordinates"
//                       value={apartment.coordinates}
//                       onChange={handleChange}
//                       style={{ marginLeft: '5px', width: '280px' }}
//                       placeholder="введите новые координаты"
//                     />
//                   ) : (
//                     <>
//                       {apartment.coordinates}
//                       <Button onClick={onClickHandlerCoordinates} className="material-icons" style={{ marginLeft: '5px' }}>
//                         <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#5f6368">
//                           <path d="M0 0h24v24H0z" fill="none" />
//                           <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
//                         </svg>
//                       </Button>
//                     </>
//                   )}
//                 </Card.Text>
//               </Row>
//               <Card.Text>{apartment.desc}</Card.Text>
//               <Card.Text>
//                 <strong>Цена:</strong> {apartment.price}₽
//               </Card.Text>
//               <Card.Text>
//                 <strong>Забронирована:</strong> {apartment.isReserve ? 'Да' : 'Нет'}
//               </Card.Text>
//               <Card.Text>
//                 <strong>Координаты:</strong>
//                 <a href={apartment.mapLink} target="_blank" rel="noopener noreferrer">
//                   {apartment.coordinates}
//                 </a>
//               </Card.Text>
//               <Button variant="primary">Забронировать</Button>
//             </Card.Body>
//           </Card>

//           <Card className="mb-4">
//             <Card.Body>
//               <Card.Title>Карта</Card.Title>
//               <div style={{ width: '100%', height: '400px' }}>
//                 <iframe
//                   src={`https://yandex.ru/map-widget/v1/?ll=${longitude}%2C${latitude}&mode=search&sll=${longitude}%2C${latitude}&text=${latitude}%2C${longitude}&z=16.79`}
//                   width="100%"
//                   height="100%"
//                   allowFullScreen
//                   style={{ border: '1px solid #ccc' }}
//                 />
//               </div>
//             </Card.Body>
//           </Card>

//           <h3 className="mb-4"></h3>
//           <Row>

//             {photos.length > 0 ? (
//               photos.map((photo, index) => (
//                 <Col key={index} md={4} className="mb-3">
//                   {/* <Image
//                     src={photo.photo}
//                     alt={`Фото квартиры ${index + 1}`}
//                     fluid
//                     style={{ height: '200%', width: '300%', objectFit: 'cover' }}
//                     rounded
//                   /> */}
//                   <Image
//                     src={photo.photo}
//                     alt={`Фото квартиры ${index + 1}`}
//                     fluid
//                     style={{ height: '200%', width: '300%', objectFit: 'cover' }}
//                     rounded
//                   />
//                 </Col>
//               ))
//             ) : (
//               <Col>
//                 <p>Нет доступных фотографий.</p>
//               </Col>
//             )}
//           </Row>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default OneApartment;

// // import React, { useEffect, useState } from 'react';
// // import { Container, Row, Col, Image, Card, Button } from 'react-bootstrap';
// // import axiosInstance from '../api/axiosInstance';
// // import { Link, useParams } from 'react-router-dom';
// // // import { on, use } from '../../../../server/src/app';
// // // import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
// // // import ThreeDRotation from '@mui/icons-material/ThreeDRotation';
// // // import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
// // // import SvgIcon from '@material-ui/core/SvgIcon';

// // const OneApartment = () => {
// //   const { id } = useParams();
// //   const [apartment, setApartment] = useState(null);
// //   const [photos, setPhotos] = useState([]);

// //   const [showInputPrice, setShowInputPrice] = useState(false);

// //   const onClickHandlerPrice = () => {
// //     setShowInputPrice(!showInputPrice);
// //   };

// //   const handleChangePrice = (e) => {
// //     const { price, value } = e.target;
// //     setApartment((prev) => ({
// //       ...prev,
// //       [price]: value,
// //     }));
// //   };

// //   const [showInputDesc, setShowInputDesc] = useState(false);

// //   const onClickHandlerDesc = () => {
// //     setShowInputDesc(!showInputDesc);
// //   };

// //   const handleChangeDesc = (e) => {
// //     const { desc, value } = e.target;
// //     setApartment((prev) => ({
// //       ...prev,
// //       [desc]: value,
// //     }));
// //   };

// //   const [showInputAddress, setShowInputAddress] = useState(false);

// //   const onClickHandlerAddress = () => {
// //     setShowInputAddress();
// //   };

// //   const handleChangeAddress = (e) => {
// //     const { adress, value } = e.target;
// //     setApartment((prev) => ({
// //       ...prev,
// //       [adress]: value,
// //     }));
// //   };

// //   const [showInputCoordinates, setShowInputCoordinates] = useState(false);

// //   const onClickHandlerCoordinates = () => {
// //     setShowInputCoordinates(!showInputCoordinates);
// //   };

// //   const handleChangeCoordinates = (e) => {
// //     const { coordinates, value } = e.target;
// //     setApartment((prev) => ({
// //       ...prev,
// //       [coordinates]: value,
// //     }));
// //   };

// //   useEffect(() => {
// //     axiosInstance
// //       .get(`/apartments/${id}`)
// //       .then((res) => setApartment(res.data))
// //       .catch((error) => console.error('Ошибка при загрузке квартиры:', error));
// //   }, [id]);

// //   useEffect(() => {
// //     axiosInstance
// //       .get(`/photos?apartmentId=${id}`)
// //       .then((res) => setPhotos(res.data))
// //       .catch((error) => console.error('Ошибка при загрузке фотографий:', error));
// //   }, [id]);

// //   if (!apartment) {
// //     return <div>Загрузка...</div>;
// //   }

// //   return (
// //     <Container fluid className="p-0" style={{ height: '100vh' }}>
// //       <Row
// //         className="align-items-center justify-content-center"
// //         style={{ height: '100%', backgroundColor: '#f8f9fa' }}
// //       >
// //         <Col md={6} className="text-center">
// //           <h1 className="mb-4">{apartment.name}</h1>
// //           <h5 className="text-muted mb-4">
// //             Адрес: {apartment.address}
// //             <Button onClick={onClickHandlerAddress} className="material-icons">
// //               <svg
// //                 xmlns="http://www.w3.org/2000/svg"
// //                 height="24px"
// //                 viewBox="0 0 24 24"
// //                 width="24px"
// //                 fill="#5f6368"
// //               >
// //                 <path d="M0 0h24v24H0z" fill="none" />
// //                 <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
// //               </svg>
// //             </Button>
// //           </h5>
// //           {!showInputAddress ? null : (
// //             <input
// //               type="text"
// //               name="address"
// //               value={apartment.address}
// //               onChange={handleChangeAddress}
// //               style={{ marginLeft: '5px', width: '280px' }}
// //               placeholder="введите новый адрес"
// //             />
// //           )}

// //           <Card className="mb-4" style={{ margin: '0 auto', maxWidth: '400px' }}>
// //             <Card.Body>
// //               <Card.Title>Описание</Card.Title>
// //               <Row>
// //                 <Card.Text>
// //                   {apartment.desc}
// //                   <Button onClick={onClickHandlerDesc} className="material-icons">
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       height="24px"
// //                       viewBox="0 0 24 24"
// //                       width="24px"
// //                       fill="#5f6368"
// //                     >
// //                       <path d="M0 0h24v24H0z" fill="none" />
// //                       <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
// //                     </svg>
// //                   </Button>
// //                 </Card.Text>{' '}
// //                 {!showInputDesc ? null : (
// //                   <input
// //                     type="number"
// //                     name="desc"
// //                     value={apartment.desc}
// //                     onChange={handleChangeDesc}
// //                     style={{ marginLeft: '5px', width: '280px' }}
// //                     placeholder="введите новое описание"
// //                   />
// //                 )}
// //               </Row>

// //               <Row>
// //                 <Card.Text onClick={onClickHandlerPrice}>
// //                   <strong>Цена:</strong> {apartment.price}₽
// //                   <Button className="material-icons">
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       height="24px"
// //                       viewBox="0 0 24 24"
// //                       width="24px"
// //                       fill="#5f6368"
// //                     >
// //                       <path d="M0 0h24v24H0z" fill="none" />
// //                       <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
// //                     </svg>
// //                   </Button>
// //                 </Card.Text>
// //                 {!showInputPrice ? null : (
// //                   <input
// //                     type="number"
// //                     name="price"
// //                     value={apartment.price}
// //                     onChange={handleChangePrice}
// //                     style={{ marginLeft: '5px', width: '280px' }}
// //                     placeholder="введите новое значение цены"
// //                   />
// //                 )}
// //               </Row>

// //               <Row>
// //                 <Card.Text>
// //                   <strong>Забронирована:</strong> {apartment.isReserve ? 'Да' : 'Нет'}
// //                 </Card.Text>
// //               </Row>

// //               <Row>
// //                 <Card.Text>
// //                   <strong>Координаты:</strong> {apartment.coordinates}
// //                   <Button
// //                     width="30px"
// //                     height="30px"
// //                     onClick={onClickHandlerCoordinates}
// //                     className="material-icons"
// //                   >
// //                     <svg
// //                       xmlns="http://www.w3.org/2000/svg"
// //                       height="24px"
// //                       viewBox="0 0 24 24"
// //                       width="24px"
// //                       fill="#5f6368"
// //                     >
// //                       <path d="M0 0h24v24H0z" fill="none" />
// //                       <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
// //                     </svg>
// //                   </Button>
// //                 </Card.Text>
// //                 {!showInputCoordinates ? null : (
// //                   <input
// //                     type="text"
// //                     name="coordinates"
// //                     value={apartment.coordinates}
// //                     onChange={handleChangeCoordinates}
// //                     style={{ marginLeft: '5px', width: '280px' }}
// //                     placeholder="введите новые координаты"
// //                   />
// //                 )}
// //               </Row>
// //               {/* <Button variant="primary">Забронировать</Button> */}
// //             </Card.Body>
// //           </Card>

// //           <h3 className="mb-4"></h3>
// //           <Row>
// //             {photos.length > 0 ? (
// //               photos.map((photo, index) => (
// //                 <Col key={index} md={4} className="mb-3">
// //                   <Image
// //                     src={photo.photo}
// //                     alt={`Фото квартиры ${index + 1}`}
// //                     fluid
// //                     style={{ height: '200%', width: '300%', objectFit: 'cover' }}
// //                     rounded
// //                   />
// //                 </Col>
// //               ))
// //             ) : (
// //               <Col>
// //                 <p>Нет доступных фотографий.</p>
// //               </Col>
// //             )}
// //           </Row>
// //         </Col>
// //       </Row>
// //     </Container>
// //   );
// // };

// // export default OneApartment;
