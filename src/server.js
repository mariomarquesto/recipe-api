import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { db } from './config/db.js';
import { favorites } from './db/schema.js';
import { and, eq } from 'drizzle-orm';

const app = express();

app.use(cors());
app.use(express.json());


// Health
app.get('/api/health', (req, res) => {
  return res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente 🚀'
  });
});


// ✅ POST: agregar favorito
app.post('/api/favorites', async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    if (!userId || !recipeId || !title || !image || !cookTime || !servings) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newFavorite = await db
      .insert(favorites)
      .values({
        userId: Number(userId),
        recipeId: Number(recipeId),
        title,
        image,
        cookTime,
        servings: Number(servings)
      })
      .returning();

    res.status(201).json({
      message: "Favorite saved successfully",
      data: newFavorite[0]
    });

  } catch (error) {
    console.error("🔥 ERROR POST:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// ✅ DELETE: eliminar favorito
app.delete('/api/favorites/:userId/:recipeId', async (req, res) => {
  try {
    const { userId, recipeId } = req.params;

    await db
      .delete(favorites)
      .where(
        and(
          eq(favorites.userId, Number(userId)),
          eq(favorites.recipeId, Number(recipeId))
        )
      );

    res.status(200).json({ message: "Favorite removed successfully" });

  } catch (error) {
    console.error("🔥 ERROR DELETE:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// ✅ GET: obtener todos los favoritos de un usuario
app.get("/api/favorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const userFavorites = await db
      .select()
      .from(favorites)
      .where(eq(favorites.userId, Number(userId)));

    res.status(200).json(userFavorites);

  } catch (error) {
    console.error("🔥 ERROR GET:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


const port = env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

export default app;
