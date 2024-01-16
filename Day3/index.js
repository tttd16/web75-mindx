import express from "express";
import axios from "axios";
import { v4 as uuid } from "uuid";

const app = express();
app.use(express.json());

const PORT = 3000;
const url = "http://localhost:8080";

app.listen(PORT, () => {
  console.log(`Connect port ${PORT}`);
});

// 1. Viết API việc đăng ký user với userName, id sẽ được là một string ngẫu nhiên, không được phép trùng, bắt đầu từ ký tự US (ví dụ: US8823).
app.post("/register", async (req, res) => {
  try {
    const id = "US" + uuid();
    const { userName } = req.body;
    if (!userName) throw new Error("Khong co user!");
    const { data: users } = await axios.get(`${url}/users`);
    const index = users.findIndex((user) => user.userName === userName);
    if (index !== -1) throw new Error("User da ton tai");
    const { data: user } = await axios.post(`${url}/users`, { id, userName });
    res.status(200).send({
      data: user,
      success: true,
      msg: "Dang ky Username thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      success: false,
      msg: error.message,
    });
  }
});

// 2. Viết API cho phép user tạo bài post (thêm bài post, xử lý id tương tự user).
app.post("/user/:userId/post", async (req, res) => {
  try {
    const { userId } = req.params;
    const { content } = req.body;
    const postId = uuid();
    const { data: users } = await axios.get(`${url}/users`);
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) throw new Error("User khong ton tai");
    if (!content) throw new Error("Khong co content");
    const data = { id: postId, userId, content };
    const { data: post } = await axios.post(`${url}/posts`, data);
    res.status(200).send({
      data: post,
      success: true,
      msg: "POST thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      success: false,
      msg: error.message,
    });
  }
});
// 3. Viết API cho phép user chỉnh sửa lại bài post (chỉ user tạo bài viết mới được phép chỉnh sửa).
app.put("/user/:userId/post/:postId", async (req, res) => {
  try {
    const { userId, postId } = req.params;
    const { content } = req.body;
    const { data: posts } = await axios.get(`${url}/posts`);
    const postFind = posts.find((post) => post.id === postId);
    if (!content) throw new Error("Khong co content");
    if (!postFind) throw new Error("Bai post khong ton tai");
    if (postFind.userId !== userId) throw new Error("User nay khong co quyen");
    postFind.content = content;
    const { data: postUpdate } = await axios.put(`${url}/posts/${postId}`, { ...postFind });
    res.status(200).send({
      data: postUpdate,
      success: true,
      msg: "UPDATE thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      success: false,
      msg: error.message,
    });
  }
});

/// 4 Viết API cho phép user được comment vào bài post
let commentArr = [];
app.post("/user/:userId/comment/:postId", async (req, res) => {
  try {
    const { data: posts } = await axios.get(`${url}/posts`);
    const { postId, userId } = req.params;
    const { comment } = req.body;
    const postData = posts.find((post) => post.id === postId);
    if (!comment) throw new Error("Khong co comment");
    if (postData.length < 1) throw new Error("Bai post khong ton tai");
    if (postData.userId !== userId) throw new Error("Bai user khong ton tai");
    const commentId = uuid();
    const commentData = { postId, userId, id: commentId, comment };
    const { data: dataComments } = await axios.post(`${url}/comments`, commentData);
    if (postData.comments && postData.comments.length > 0) {
      commentArr = postData.comments;
    }

    commentArr.push(commentData);
    const commentPostData = { ...postData, comments: commentArr };
    const { data: commentPost } = await axios.put(`${url}/posts/${postId}`, commentPostData);
    res.status(200).send({
      data: { comments: dataComments, post: commentPost },
      success: true,
      msg: "POST comment thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      success: false,
      msg: error.message,
    });
  }
});

//5 Viết API cho phép user chỉnh sửa comment (chỉ user tạo comment mới được sửa)
app.put("/user/:userId/comment/:commentId", async (req, res) => {
  try {
    const { comment } = req.body;
    const { userId, commentId } = req.params;
    if (!comment) throw new Error("khong co noi dung comment sua");
    const { data: comments } = await axios.get(`${url}/comments`);
    const commentsData = comments.find((i) => i.id === commentId);
    if (!commentsData) throw new Error("Khong co comment nay");
    if (commentsData.userId !== userId) throw new Error("User khong co quyen chinh sua comment");
    commentsData.comment = comment;
    const { data: commentUpdate } = await axios.put(`${url}/comments/${commentId}`, commentsData);
    res.status(200).send({
      data: commentUpdate,
      success: true,
      msg: "UPDATE thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      success: false,
      msg: error.message,
    });
  }
});

/// 6 Viết API lấy tất cả comment của một bài post.
app.get("/comments/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { data: comments } = await axios.get(`${url}/comments`);
    const commentsFilter = comments.filter((i) => i.postId === postId);
    console.log(commentsFilter);
    if (commentsFilter.length < 1) throw new Error("Bai post k ton tai!");

    res.status(200).send({
      data: commentsFilter,
      success: true,
      msg: "GET Comments trong 1 bai post thanh cong!",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      success: false,
      msg: error.message,
    });
  }
});

// 7 Viết API lấy tất cả các bài post, 3 comment đầu (dựa theo index) của tất cả user .
app.get("/posts", async (req, res) => {
  try {
    const { data: posts } = await axios.get(`${url}/posts`);
    const postsWithComments = posts.map((post) => {
      const comments = post.comments || [];
      console.log(comments);
      const firstThreeComments = comments.slice(0, 3);
      return {
        ...post,
        comments: firstThreeComments,
      };
    });

    res.status(200).send({
      data: postsWithComments,
      success: true,
      msg: "OK",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      success: false,
      msg: error.message,
    });
  }
});
// API lấy một bài post và tất cả comment của bài post đó thông qua postId
app.get("/posts/:postId", async (req, res) => {
  try {
    const { postId } = req.params;
    const { data: posts } = await axios.get(`${url}/posts`);
    const post = posts.find((i) => i.id === postId);
    if (!post) throw new Error("Bài post không tồn tại");
    res.status(200).send({
      data: post,
      success: true,
      msg: "OK",
    });
  } catch (error) {
    res.status(400).send({
      data: null,
      success: false,
      msg: error.message,
    });
  }
});
