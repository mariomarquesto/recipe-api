import express from 'express';
import cors from 'cors';
import { env } from './config/env.js';
import { db } from './config/db.js';
import { favorites } from './db/schema.js';
import { and, eq } from 'drizzle-orm';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Health route
app.get('/api/health', (req, res) => {
  return res.status(200).json({
    status: 'OK',
    message: 'API funcionando correctamente 🚀'
  });
});

// Add favorite route
app.post('/api/favorites', async (req, res) => {
  try {
    const { userId, recipeId, title, image, cookTime, servings } = req.body;

    if (!userId || !recipeId || !title || !image || !cookTime || !servings) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newFavorite = await db
      .insert(favorites)
      .values({ userId, recipeId, title, image, cookTime, servings })
      .returning();

    return res.status(201).json({
      message: 'Favorite saved successfully',
      data: newFavorite[0]
    });

  } catch (error) {
    console.error("🔥 ERROR DRIZZLE:", error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.delete('/api/favorites/:userId/:recipeId', async (req, res) => {
try {
  const {
    userId, recipeId
  } = req.params
  await db.delete(favoritesTable).where(
    and(eq(favoritesTable.userId,userId), eq(favoritesTable.recipeId, recipeId, parseInt(recipeId)))
  )
  res.status(200).json({
    message: "Favorite removed succesfully"
  })
}
catch (error){
  console.log("error removing favorite", error);
  res.status(500).json({error: "Someting ewnt wrong"})
}

});

app.get("/api/favorites/:userId",async(req,res)=>{
  try{
    const {userId} = req.paramas;
     const userFavorites =  await db.select().from(favoritesTable).where(eq(favoritesTable.userId, userId))
     res.status(200).json(userFavorites)
  }
  catch (error){
    console.log("Error fetching the favorites", error);
    res.status(500).json({
      error: "Something went wrong"
    })
  }
})


const port = env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
