const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('adminPassword', 10);
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: hashedPassword,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Regular User',
        email: 'user@example.com',
        password: await bcrypt.hash('userPassword', 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Test User',
        email: 'test1@example.com',
        password: await bcrypt.hash('testPassword', 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Test User',
        email: 'test2@example.com',
        password: await bcrypt.hash('testPassword', 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'Test User',
        email: 'test3@example.com',
        password: await bcrypt.hash('testPassword', 10),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Categories', [
      {
        category: 'Квартира',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 'Комната',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 'Студия',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 'Дом',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        category: 'Вилла',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Apartments', [
      {
        name: 'Номер Плаза',
        categoryId: 1,
        address: '768 5th Avenue, Manhattan, New York',
        desc: 'Размер номера 44.03 м², 1/7 этаж',
        coordinates: '40.7128,-74.0060',
        ownerId: 1,
        price: 250000,
        isReserve: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        latitude: '40.764336',
        longitude: '-73.974201',
        imageUrl:'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718845.jpg?k=c08107ed4a5c022b0bbc643a95b96220940e15b5e611f2c9570c86e13d856610&o=&hp=1.jpg',
        mapLink:'https://yandex.ru/maps/202/new-york/?ll=-73.982224%2C40.742922&mode=search&sll=-73.981634%2C40.745264&text=40.745264%2C-73.981634&z=16.79',
      },
      {
        name: 'Номер Делюкс с кроватью размера «king-size',
        categoryId: 2,
        address: '768 5th Avenue, Manhattan, New York',
        desc: 'Размер номера 51.03 м², 4/7 этаж',
        coordinates: '40.745264, -73.981634',
        ownerId: 2,
        price: 150000,
        isReserve: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        latitude: '40.764336',
        longitude: '-73.974201',
        imageUrl:'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718977.jpg?k=7f45ce8630a259d59cda121fcc23316a6c5b3c75d16c0a52146bbd9390a3585f&o=&hp=1.jpg',
        mapLink:'https://yandex.ru/maps/202/new-york/?ll=-73.982224%2C40.742922&mode=search&sll=-73.981634%2C40.745264&text=40.745264%2C-73.981634&z=16.79',
      },
      {
        name: 'Номер "Гранд Люкс"',
        categoryId: 3,
        address: '768 5th Avenue, Manhattan, New York',
        desc: 'Размер номера 65.03 м², 4/7 этаж',
        coordinates: '40.752695, -73.993543',
        ownerId: 1,
        price: 500000,
        isReserve: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        latitude: '40.764336',
        longitude: '-73.974201',
        imageUrl:'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718884.jpg?k=ee64ffa384454944b3214691106e22a4257843f6cf44f1ea4ebcf3e726def9cf&o=&hp=1.JPEG',
        mapLink:'https://yandex.ru/maps/202/new-york/?ll=-73.982224%2C40.742922&mode=search&sll=-73.981634%2C40.745264&text=40.745264%2C-73.981634&z=16.79',
      },
      {
        name: 'Эдвардиан Люкс',
        categoryId: 1,
        address: '768 5th Avenue, Manhattan, New York',
        desc: 'Размер номера 92.03 м², 6/7 этаж',
        coordinates: '40.764336, -73.974201',
        ownerId: 3,
        price: 300000,
        isReserve: false,
        createdAt: new Date(),
        updatedAt: new Date(),
        latitude: '40.764336',
        longitude: '-73.974201',
        imageUrl:'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718993.jpg?k=c5eb5f32519f5fed4cea6361d2c489abcf7d84025d6b33e3292c48e9cded9fa3&o=&hp=1.jpg',
        mapLink:'https://yandex.ru/maps/202/new-york/?ll=-73.982224%2C40.742922&mode=search&sll=-73.981634%2C40.745264&text=40.745264%2C-73.981634&z=16.79',
      },
      {
        name: 'Люкс «Карнеги',
        categoryId: 2,
        address: '768 5th Avenue, Manhattan, New York',
        desc: 'Размер номера 92.09 м², 7/7 этаж',
        coordinates: '40.776176, -73.977753',
        ownerId: 2,
        price: 800000,
        isReserve: true,
        latitude: '40.764336',
        longitude: '-73.974201',
        imageUrl:'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718912.jpg?k=d86c36963196d6be7f12c39a2ea3756daf4f752f676f8727b24fc0297e2d7a1e&o=&hp=1.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
        mapLink:'https://yandex.ru/maps/202/new-york/?ll=-73.982224%2C40.742922&mode=search&sll=-73.981634%2C40.745264&text=40.745264%2C-73.981634&z=16.79',
      },
    ]);

    await queryInterface.bulkInsert('Favorites', [
      {
        userId: 1,
        apartmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 1,
        apartmentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        apartmentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 3,
        apartmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        userId: 2,
        apartmentId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert('Photos', [
      {
        photo: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718837.jpg?k=44f8279b85e085abfe3698de3ec30fd9a3f6d4d6c430f00d7cdb7a560bb284c4&o=&hp=1.jpg',
        apartmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo:
          'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718828.jpg?k=8843809a06b9b068652577efa337b1ef4f3b1c294d0790a3ce2e8604d94d3218&o=&hp=1.jpg',
        apartmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo:
          'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718845.jpg?k=c08107ed4a5c022b0bbc643a95b96220940e15b5e611f2c9570c86e13d856610&o=&hp=1.jpg',
        apartmentId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718963.jpg?k=cdad2b585be5648c5c05b310cd0ea5b82e9c02b394ec250a8fa8be4146bafcdb&o=&hp=1.jpg',
        apartmentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718919.jpg?k=a8d822a2e983a07bbc23cb63ec45c65846f939fec12fc0bd8cb2c500149ddf20&o=&hp=1.jpg',
        apartmentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718865.jpg?k=718d2beba2a068617d5c836add5655ee5c00c6315ee3137032828f70272b1e37&o=&hp=1.jpg',
        apartmentId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718999.jpg?k=a23ff582d0c50e84fe59a2db0ed63f8136a3d38c45f2d9cde524fdeb49af4ca6&o=&hp=1.jpg',
        apartmentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718969.jpg?k=59bcf3af3b7e454d1c64724893fefa56beb19e94920e7c4d771aa34e50fa1229&o=&hp=1.jpg',
        apartmentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718884.jpg?k=ee64ffa384454944b3214691106e22a4257843f6cf44f1ea4ebcf3e726def9cf&o=&hp=1.jpg',
        apartmentId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718858.jpg?k=64e76e4eba7b311e40b66e7fc79efeb2288b909073cb8482bd42d39f2bcb66b2&o=&hp=1.jpg',
        apartmentId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718946.jpg?k=1706e5650bc7fd5711473377be8eca7b9291fa6fac9986b1aabd07f11a8f1cc0&o=&hp=1.jpg',
        apartmentId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718987.jpg?k=787222e4cfe0223c7baf85d7781348e4ab398b09095f221868babb314365124a&o=&hp=1.jpg',
        apartmentId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718906.jpg?k=8d236195ba86de4e1d4af08e646342cb467e5e3ac9ef6afe1e683f6c15513ec0&o=&hp=1.jpg',
        apartmentId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718877.jpg?k=4b35288685c689ba9d35420fd2411e70fe555991a9c4f6fc914125b79e58cb2a&o=&hp=1.jpg',
        apartmentId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        photo: 'https://cf.bstatic.com/xdata/images/hotel/max1024x768/496718955.jpg?k=bb7bb95a6faf9a90069631e5152672dce146190ec91eea6ed80e8e8169e2fd01&o=&hp=1.jpg',
        apartmentId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});

    await queryInterface.bulkDelete('Categories', null, {});

    await queryInterface.bulkDelete('Apartments', null, {});

    await queryInterface.bulkDelete('Favorites', null, {});

    await queryInterface.bulkDelete('Photos', null, {});
  },
};
