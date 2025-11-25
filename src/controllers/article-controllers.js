import Article from '../models/article.js'



export const getAllArticles = async (req, res) => {
try{
  const articles = await Article.find()
  return res.status(200).json(articles) 
}catch(err){
  return res.status(500).json({message: "Internal server error"})
}
};

export const CreateArticle = async(req, res) => {
  try {
    const body = req.body;
   const { title, text, userId } = body;
   const newArticle = new Article({
    title,
    text,
    userId
   })
   await newArticle.save()
    return res.status(201).json({ message: "article created successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};


