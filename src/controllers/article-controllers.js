export const getAllArticles = (req, res) => {
  return res.json({ articles: 1, author: "natia", id: 123 });
};

export const CreateArticle = (req, res) => {
  try {
    const body = req.body;
    console.log(body);
    return res.status(201).json({ message: "article created successfully" });
  } catch (err) {}
};
