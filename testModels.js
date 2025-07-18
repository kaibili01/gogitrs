import db from './models/db.js'; // adjust path if needed

async function testModels() {
  try {
    // Sync DB - WARNING: force:true drops tables, only for testing!
    await db.sequelize.sync({ force: true });
    console.log('Database synced.');

    // Create User
    const user = await db.User.create({
      firstName: 'Jane',
      lastName: 'Doe',
      username: 'janedoe',
      password: 'password123', // hooks will hash it
      email: 'jane@example.com',
    });

    // Create Post linked to User
    const post = await db.Post.create({
      title: 'Fresh Tomatoes',
      quantity: 20,
      instructions: 'Pick up between 9am-12pm',
      date: '2025-07-19',
      startTime: '09:00 AM',
      endTime: '12:00 PM',
      city: 'Springfield',
      state: 'IL',
      UserId: user.id, // Sequelize expects capitalized foreign key by default
    });

    // Create Reservation linked to User and Post
    const reservation = await db.Reservation.create({
      userId: user.id,
      postId: post.id,
    });

    // Fetch reservations with associated User and Post
    const reservations = await db.Reservation.findAll({
      include: [db.User, db.Post],
    });

    console.log(JSON.stringify(reservations, null, 2));

  } catch (error) {
    console.error('Test failed:', error);
  } finally {
    await db.sequelize.close();
  }
}

testModels();
