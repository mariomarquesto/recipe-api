import { pgTable, serial, integer, timestamp, text } from 'drizzle-orm/pg-core';

export const favorites = pgTable('favorites', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').notNull(),
  recipeId: integer('recipe_id').notNull(),
  title: text('title').notNull(),
  image: text('image').notNull(),
  cookTime: text('cook_time').notNull(),
  servings: integer('servings').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});
