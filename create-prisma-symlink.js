// create-prisma-symlink.js
const fs = require('fs');
const path = require('path');

try {
  const schemaPath = path.join(__dirname, 'prisma', 'schema', 'schema.prisma');
  const symlinkPath = path.join(__dirname, 'prisma', 'schema.prisma');
  
  // Remove existing symlink if it exists
  try { fs.unlinkSync(symlinkPath); } catch {}
  
  // Create new symlink
  fs.symlinkSync(schemaPath, symlinkPath, 'file');
  console.log(`Created symlink: ${symlinkPath} -> ${schemaPath}`);
} catch (error) {
  console.error('Error creating Prisma symlink:', error);
  process.exit(1);
}