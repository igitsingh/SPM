import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('Seeding initial users...');

    // 1. Create Admin User
    const adminEmail = 'admin@spm.com';
    const existingAdmin = await prisma.user.findUnique({ where: { email: adminEmail } });

    if (!existingAdmin) {
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await prisma.user.create({
            data: {
                email: adminEmail,
                passwordHash: hashedPassword, // Use 'admin123' to login
                name: 'System Admin',
                role: 'admin',
                subRole: 'super_admin',
                phone: '9999999999',
                isActive: true
            }
        });
        console.log(`Created Admin: ${adminEmail} / admin123`);
    } else {
        console.log('Admin user already exists.');
    }

    // 2. Create Demo Partner
    const partnerEmail = 'partner@demo.com';
    const existingPartner = await prisma.user.findUnique({ where: { email: partnerEmail } });

    if (!existingPartner) {
        const hashedPassword = await bcrypt.hash('partner123', 10);

        // Transaction to create User + Partner Profile
        await prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email: partnerEmail,
                    passwordHash: hashedPassword,
                    name: 'Demo Partner',
                    role: 'partner',
                    subRole: 'retailer', // or distributor
                    phone: '8888888888',
                    isActive: true
                }
            });

            await tx.partner.create({
                data: {
                    userId: user.id,
                    shopName: 'Demo Book Shop',
                    gstin: '22AAAAA0000A1Z5',
                    category: 'Retailer',
                    creditLimit: 50000,
                    usedCredit: 0
                }
            });
        });
        console.log(`Created Partner: ${partnerEmail} / partner123`);
    } else {
        console.log('Partner user already exists.');
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
