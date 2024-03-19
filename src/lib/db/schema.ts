import { integer, pgEnum, serial, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import {pgTable} from 'drizzle-orm/pg-core';


export const userSystemEnum = pgEnum('user_system_enum', ['system', 'user'])

//pg is post gres table
export const chats = pgTable('chats', {
    id: serial('id').primaryKey(),
    pdfName: text('pdf_name').notNull(),
    pdfUrl: text('pdf_url').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),  
    userId: varchar('user_id', {length:256}).notNull(),
    fileKey: text('file_key').notNull(),
});


export const messages = pgTable('messages' , {
    id: serial('id').primaryKey(),
    chatId: integer('chat_id').references(() => chats.id).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    role: userSystemEnum('role').notNull(),

});

//defaultNow() to the current timestamp


//drizzle-orm
//drizzle-kit