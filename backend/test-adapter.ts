import { prisma } from './src/lib/prisma.js';

async function testConnection() {
    try {
        console.log('Testing connection...');
        const userCount = await prisma.user.count();
        console.log('User count:', userCount);
    } catch (error) {
        console.error('Connection failed:', error);
    } finally {
        await prisma.$disconnect();
    }
}

testConnection();
