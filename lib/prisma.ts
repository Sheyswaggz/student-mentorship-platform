// =============================================================================
// PRISMA CLIENT SINGLETON
// =============================================================================
// Production-ready Prisma Client singleton with connection pooling
// Prevents connection pool exhaustion in serverless environments
// Implements proper error handling and logging for database operations
// =============================================================================

import { PrismaClient } from '@prisma/client';

// =============================================================================
// TYPE DEFINITIONS
// =============================================================================

type GlobalPrismaClient = {
  prisma: PrismaClient | undefined;
};

// =============================================================================
// GLOBAL AUGMENTATION
// =============================================================================

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

// =============================================================================
// PRISMA CLIENT CONFIGURATION
// =============================================================================

/**
 * Creates a new Prisma Client instance with production-ready configuration
 * Includes query logging in development and proper error handling
 */
const createPrismaClient = (): PrismaClient => {
  const isDevelopment = process.env.NODE_ENV === 'development';

  return new PrismaClient({
    log: isDevelopment
      ? [
          { level: 'query', emit: 'event' },
          { level: 'error', emit: 'stdout' },
          { level: 'warn', emit: 'stdout' },
        ]
      : [
          { level: 'error', emit: 'stdout' },
          { level: 'warn', emit: 'stdout' },
        ],
    errorFormat: isDevelopment ? 'pretty' : 'minimal',
  });
};

// =============================================================================
// SINGLETON INSTANCE
// =============================================================================

/**
 * Prisma Client singleton instance
 * Reuses connection in development to prevent connection pool exhaustion
 * Creates new instance in production for each deployment
 */
const globalForPrisma = globalThis as unknown as GlobalPrismaClient;

const prismaClientInstance = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prismaClientInstance;
}

// =============================================================================
// QUERY LOGGING (DEVELOPMENT ONLY)
// =============================================================================

if (process.env.NODE_ENV === 'development') {
  prismaClientInstance.$on('query' as never, (e: unknown) => {
    const event = e as { query: string; params: string; duration: number };
    console.warn('Query:', event.query);
    console.warn('Params:', event.params);
    console.warn('Duration:', `${event.duration}ms`);
  });
}

// =============================================================================
// CONNECTION ERROR HANDLING
// =============================================================================

/**
 * Validates database connection on startup
 * Logs connection errors with actionable context
 */
prismaClientInstance
  .$connect()
  .then(() => {
    if (process.env.NODE_ENV === 'development') {
      console.warn('✓ Database connection established');
    }
  })
  .catch((error: Error) => {
    console.error('✗ Database connection failed:', error.message);
    console.error('Ensure DATABASE_URL is set and PostgreSQL is running');
    console.error('Connection string format: postgresql://user:password@host:port/database');
  });

// =============================================================================
// GRACEFUL SHUTDOWN
// =============================================================================

/**
 * Handles graceful shutdown of database connections
 * Ensures all pending queries complete before process exit
 */
const gracefulShutdown = async (): Promise<void> => {
  try {
    await prismaClientInstance.$disconnect();
    if (process.env.NODE_ENV === 'development') {
      console.warn('✓ Database connection closed gracefully');
    }
  } catch (error) {
    console.error('✗ Error during database disconnect:', error);
    process.exit(1);
  }
};

process.on('SIGINT', () => {
  void gracefulShutdown();
});

process.on('SIGTERM', () => {
  void gracefulShutdown();
});

// =============================================================================
// EXPORTS
// =============================================================================

export const prisma = prismaClientInstance;
export default prisma;