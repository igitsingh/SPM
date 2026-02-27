import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PartnersModule } from './partners/partners.module';
import { CustomersModule } from './customers/customers.module';
import { BooksModule } from './books/books.module';
import { OrdersModule } from './orders/orders.module';
import { ReferralsModule } from './referrals/referrals.module';
import { InvoicesModule } from './invoices/invoices.module';
import { PaymentsModule } from './payments/payments.module';
import { PrismaModule } from './prisma/prisma.module';

import { VideosModule } from './videos/videos.module';

import { InventoryModule } from './inventory/inventory.module';
import { SchemesModule } from './schemes/schemes.module';
import { SystemConfigModule } from './system-config/system-config.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', 'public'), // dist/src -> dist -> root -> public
      serveRoot: '/public',
    }),
    AuthModule, UsersModule, PartnersModule, CustomersModule, BooksModule,
    OrdersModule, ReferralsModule, InvoicesModule, PaymentsModule, PrismaModule,
    VideosModule, InventoryModule, SchemesModule, SystemConfigModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
