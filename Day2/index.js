import express from "express";
import { v4 as uuid } from "uuid";
import { users, posts } from "./data.js";

const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Connect port ${PORT}`);
});

app.post("/posts/:id", (req, res) => {
  const { id } = req.params;
  const { content, createAt, isPublic } = req.body;
  const user = users.find((i) => i.id === id);
  if (user) {
    const post = { userId: id, postId: uuid(), content: content, createAt: createAt, isPublic: isPublic };
    posts.push(post);
    res.status(201).json({
      status: 201,
      success: true,
    });
  } else {
    res.status(404).json({
      status: 404,
      success: false,
    });
  }
});

app.put("/posts/:postId", (req, res) => {
  const { postId } = req.params;
  const { userId, content } = req.body;
  const postIdUpdate = posts.find((post) => post.postId === postId);
  if (!postIdUpdate) {
    return res.status(404).json({
      status: 404,
      success: false,
    });
  }
  if (postIdUpdate.userId !== userId) {
    return res.status(403).json({
      status: 403,
      success: false,
    });
  }
  postIdUpdate.content = content;
  res.status(200).json({
    status: 200,
    success: true,
    data: JSON.stringify(postIdUpdate),
  });
});

app.delete("/posts/:postId", (req, res) => {
  const { postId } = req.params;
  const { userId } = req.body;
  const postIndex = posts.findIndex((post) => post.postId === postId);
  if (postIndex === -1) {
    return res.status(404).json({
      status: 404,
      success: false,
    });
  }

  const postDelete = posts[postIndex];
  if (postDelete.userId !== userId) {
    return res.status(403).json({
      status: 403,
      success: false,
    });
  }
  posts.splice(postIndex, 1);
  res.json({
    status: 200,
    success: true,
    data: posts,
  });
});

app.get("/posts/search", (req, res) => {
  const { content, isPublic } = req.query;
  if (content) {
    const postFil = posts.filter((post) => post.content === content);
    if (postFil.length > 0) {
      res.json({
        status: 200,
        success: true,
        data: postFil,
      });
    } else {
      res.status(404).json({
        status: 404,
        success: false,
        data: null,
      });
    }
    return;
  }
  if (isPublic) {
    const isPublicFil = posts.filter((post) => post.isPublic.toString() === isPublic);
    if (isPublicFil.length > 0) {
      res.json({
        status: 200,
        success: true,
        data: isPublicFil,
      });
    } else {
      res.status(404).json({
        status: 404,
        success: false,
        data: null,
      });
    }
    return;
  }
});

app.get("/posts/ispublic", (req, res) => {
  const postFil = posts.filter((i) => (i.isPublic = true));
  if (postFil.length > 0) {
    res.json({
      status: 200,
      success: true,
      data: postFil,
    });
  } else {
    res.status(404).json({
      status: 404,
      success: false,
      data: null,
    });
  }
});
