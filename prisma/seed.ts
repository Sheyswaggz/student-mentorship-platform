// =============================================================================
// PRISMA DATABASE SEED SCRIPT
// =============================================================================
// Production-ready seed script for development database initialization
// Creates sample users (students and mentors) with varied profiles
// Uses upsert operations to ensure idempotency
// Implements proper error handling and logging
// =============================================================================

import { PrismaClient, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

// =============================================================================
// CONSTANTS
// =============================================================================

const SALT_ROUNDS = 10;
const DEFAULT_PASSWORD = 'Password123!';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

interface SeedUser {
  id: string;
  email: string;
  password: string;
  name: string;
  role: Role;
  bio: string;
  interests: string[];
  expertise: string[];
  availability?: string;
  profilePicture?: string;
}

// =============================================================================
// SEED DATA
// =============================================================================

const SEED_USERS: Omit<SeedUser, 'password'>[] = [
  // Students
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    email: 'alice.student@example.com',
    name: 'Alice Johnson',
    role: Role.STUDENT,
    bio: 'Computer Science student passionate about web development and AI. Looking for guidance in full-stack development.',
    interests: [
      'Web Development',
      'Artificial Intelligence',
      'Machine Learning',
      'React',
      'Node.js',
    ],
    expertise: ['JavaScript', 'Python', 'HTML/CSS'],
    availability: 'Weekday evenings and weekends',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    email: 'bob.student@example.com',
    name: 'Bob Martinez',
    role: Role.STUDENT,
    bio: 'Data Science enthusiast exploring machine learning and statistical analysis. Seeking mentorship in data engineering.',
    interests: [
      'Data Science',
      'Machine Learning',
      'Statistics',
      'Data Visualization',
      'Big Data',
    ],
    expertise: ['Python', 'R', 'SQL', 'Pandas'],
    availability: 'Flexible schedule, prefer morning sessions',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    email: 'carol.student@example.com',
    name: 'Carol Chen',
    role: Role.STUDENT,
    bio: 'Mobile app developer interested in iOS and Android development. Looking to learn best practices in mobile architecture.',
    interests: [
      'Mobile Development',
      'iOS',
      'Android',
      'UI/UX Design',
      'Swift',
      'Kotlin',
    ],
    expertise: ['Swift', 'Kotlin', 'React Native', 'Flutter'],
    availability: 'Weekends and Tuesday/Thursday evenings',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    email: 'david.student@example.com',
    name: 'David Kim',
    role: Role.STUDENT,
    bio: 'Cybersecurity student focused on ethical hacking and network security. Seeking guidance in penetration testing.',
    interests: [
      'Cybersecurity',
      'Ethical Hacking',
      'Network Security',
      'Cryptography',
      'Penetration Testing',
    ],
    expertise: ['Linux', 'Python', 'Networking', 'Kali Linux'],
    availability: 'Evenings after 6 PM',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440005',
    email: 'emma.student@example.com',
    name: 'Emma Wilson',
    role: Role.STUDENT,
    bio: 'Game development student passionate about creating immersive experiences. Looking for mentorship in game engine development.',
    interests: [
      'Game Development',
      'Unity',
      'Unreal Engine',
      '3D Graphics',
      'Game Design',
    ],
    expertise: ['C#', 'C++', 'Unity', 'Blender'],
    availability: 'Weekends preferred',
  },

  // Mentors
  {
    id: '550e8400-e29b-41d4-a716-446655440101',
    email: 'frank.mentor@example.com',
    name: 'Frank Anderson',
    role: Role.MENTOR,
    bio: 'Senior Full-Stack Engineer with 10+ years of experience in web development. Specialized in React, Node.js, and cloud architecture.',
    interests: [
      'Web Development',
      'Cloud Architecture',
      'DevOps',
      'Mentoring',
      'Open Source',
    ],
    expertise: [
      'React',
      'Node.js',
      'TypeScript',
      'AWS',
      'Docker',
      'Kubernetes',
      'PostgreSQL',
      'MongoDB',
    ],
    availability: 'Monday/Wednesday evenings, Saturday mornings',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440102',
    email: 'grace.mentor@example.com',
    name: 'Grace Thompson',
    role: Role.MENTOR,
    bio: 'Data Science Lead with expertise in machine learning and big data. Passionate about helping students navigate data careers.',
    interests: [
      'Data Science',
      'Machine Learning',
      'AI Ethics',
      'Career Development',
      'Research',
    ],
    expertise: [
      'Python',
      'TensorFlow',
      'PyTorch',
      'Scikit-learn',
      'Apache Spark',
      'SQL',
      'Data Visualization',
      'Statistical Analysis',
    ],
    availability: 'Tuesday/Thursday evenings, Sunday afternoons',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440103',
    email: 'henry.mentor@example.com',
    name: 'Henry Rodriguez',
    role: Role.MENTOR,
    bio: 'Mobile Engineering Manager with 8 years of experience building iOS and Android apps. Expert in mobile architecture patterns.',
    interests: [
      'Mobile Development',
      'Team Leadership',
      'Architecture',
      'Performance Optimization',
      'Mentoring',
    ],
    expertise: [
      'Swift',
      'Kotlin',
      'React Native',
      'Flutter',
      'Mobile Architecture',
      'CI/CD',
      'App Store Optimization',
    ],
    availability: 'Weekday evenings after 7 PM',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440104',
    email: 'isabel.mentor@example.com',
    name: 'Isabel Garcia',
    role: Role.MENTOR,
    bio: 'Cybersecurity Consultant specializing in penetration testing and security audits. Certified Ethical Hacker (CEH) and OSCP holder.',
    interests: [
      'Cybersecurity',
      'Ethical Hacking',
      'Security Audits',
      'Compliance',
      'Training',
    ],
    expertise: [
      'Penetration Testing',
      'Network Security',
      'Web Application Security',
      'Cryptography',
      'Security Tools',
      'Compliance (ISO 27001, SOC 2)',
    ],
    availability: 'Flexible schedule, prefer afternoon sessions',
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440105',
    email: 'jack.mentor@example.com',
    name: 'Jack Brown',
    role: Role.MENTOR,
    bio: 'Game Development Director with 12 years in the industry. Worked on AAA titles and indie games. Expert in Unity and Unreal Engine.',
    interests: [
      'Game Development',
      'Game Design',
      'Technical Art',
      'Industry Insights',
      'Career Guidance',
    ],
    expertise: [
      'Unity',
      'Unreal Engine',
      'C++',
      'C#',
      'Game Architecture',
      'Graphics Programming',
      'Performance Optimization',
      'Team Management',
    ],
    availability: 'Weekend mornings and evenings',
  },
];

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

/**
 * Hashes a password using bcrypt
 * @param password - Plain text password to hash
 * @returns Hashed password
 */
async function hashPassword(password: string): Promise<string> {
  try {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    return hashedPassword;
  } catch (error) {
    console.error('Error hashing password:', error);
    throw new Error('Password hashing failed');
  }
}

/**
 * Seeds a single user into the database using upsert
 * @param prisma - Prisma client instance
 * @param user - User data to seed
 * @param hashedPassword - Pre-hashed password
 */
async function seedUser(
  prisma: PrismaClient,
  user: Omit<SeedUser, 'password'>,
  hashedPassword: string
): Promise<void> {
  try {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        name: user.name,
        role: user.role,
        bio: user.bio,
        interests: user.interests,
        expertise: user.expertise,
        availability: user.availability,
        profilePicture: user.profilePicture,
      },
      create: {
        id: user.id,
        email: user.email,
        password: hashedPassword,
        name: user.name,
        role: user.role,
        bio: user.bio,
        interests: user.interests,
        expertise: user.expertise,
        availability: user.availability,
        profilePicture: user.profilePicture,
      },
    });

    console.log(`✓ Seeded user: ${user.name} (${user.email})`);
  } catch (error) {
    console.error(`✗ Failed to seed user ${user.email}:`, error);
    throw error;
  }
}

// =============================================================================
// MAIN SEED FUNCTION
// =============================================================================

/**
 * Main seed function that populates the database with sample users
 * Uses upsert operations to ensure idempotency
 * Implements proper error handling and logging
 */
async function main(): Promise<void> {
  const prisma = new PrismaClient();

  try {
    console.log('🌱 Starting database seed...\n');

    // Hash the default password once
    console.log('🔐 Hashing passwords...');
    const hashedPassword = await hashPassword(DEFAULT_PASSWORD);
    console.log('✓ Password hashing complete\n');

    // Seed all users
    console.log('👥 Seeding users...');
    for (const user of SEED_USERS) {
      await seedUser(prisma, user, hashedPassword);
    }

    // Verify seed results
    const studentCount = await prisma.user.count({
      where: { role: Role.STUDENT },
    });
    const mentorCount = await prisma.user.count({
      where: { role: Role.MENTOR },
    });
    const totalCount = await prisma.user.count();

    console.log('\n✓ Database seed completed successfully!');
    console.log(`📊 Seed Summary:`);
    console.log(`   - Total users: ${totalCount}`);
    console.log(`   - Students: ${studentCount}`);
    console.log(`   - Mentors: ${mentorCount}`);
    console.log(`\n💡 Default password for all users: ${DEFAULT_PASSWORD}`);
  } catch (error) {
    console.error('\n✗ Database seed failed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 Database connection closed');
  }
}

// =============================================================================
// EXECUTION
// =============================================================================

main()
  .then(() => {
    process.exit(0);
  })
  .catch((error) => {
    console.error('Fatal error during seed:', error);
    process.exit(1);
  });