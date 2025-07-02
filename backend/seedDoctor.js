const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const bcrypt = require('bcryptjs');


dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


async function seedDoctors() {
  const doctors = [
    {
      name: 'Dr. Abdullah',
      email: 'abdullah@example.com',
      password: '123456',
      specialization: 'Cardiologist',
    },
    {
      name: 'Dr. Kabeer',
      email: 'kabeer@example.com',
      password: '123456',
      specialization: 'Neurologist',
    },
    {
      name: 'Dr. Eshwar',
      email: 'eshwar@example.com',
      password: '123456',
      specialization: 'Dermatologist',
    },
  ];

  for (const doc of doctors) {
    const existingUser = await User.findOne({ email: doc.email });
    if (existingUser) {
      console.log(`⏭ Skipping ${doc.email} (already exists)`);
      continue;
    }

    const hashedPassword = await bcrypt.hash(doc.password, 10);
    const user = await User.create({
      name: doc.name,
      email: doc.email,
      password: hashedPassword,
      role: 'doctor',
    });

    await Doctor.create({
      user: user._id,
      specialization: doc.specialization,
    });

    console.log(`✅ Created ${doc.name}`);
  }

  mongoose.connection.close();
}

seedDoctors();