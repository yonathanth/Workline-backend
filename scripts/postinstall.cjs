#!/usr/bin/env node

// Load environment variables if .env file exists
try {
  require('dotenv/config');
} catch (e) {
  // dotenv not available or .env doesn't exist, continue
}

// Check if DATABASE_URL is set before running prisma generate
if (process.env.DATABASE_URL) {
  const { execSync } = require('child_process');
  try {
    execSync('prisma generate', { stdio: 'inherit' });
  } catch (error) {
    console.error('Failed to run prisma generate:', error.message);
    process.exit(1);
  }
} else {
  console.log('⚠️  Skipping prisma generate: DATABASE_URL environment variable not set');
  console.log('   Run "npm run prisma:generate" manually after setting up your .env file');
}

