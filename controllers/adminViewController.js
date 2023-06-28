const { host_url } = require("../configs/dotenv_config");

// const fetch = require("node-fetch");
exports.dashboard = (req, res) => {
  return res.render("./index", { title: "Admin Panel" });
};
exports.page = async (req, res) => {
  const sub_page = req.params.sub_page;
  console.log(sub_page);
  // JSON.stringify(users[0].user_id);
  // /news/all
  switch (sub_page) {
    // /news/all
    case "all":
      fetch(host_url + "/api/posts/all/")
        .then((response) => response.json())
        .then((all_posts_old) => {
          // console.log(all_posts);
          const all_posts = all_posts_old.map((post) => {
            const createdAtDate = new Date(post.created_at);
            const formattedCreatedAt = createdAtDate.toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            );

            const updatedAtDate = new Date(post.updated_at);
            const formattedUpdatedAt = updatedAtDate.toLocaleDateString(
              "en-US",
              {
                month: "long",
                day: "numeric",
                year: "numeric",
              }
            );

            return {
              ...post,
              created_at: formattedCreatedAt,
              updated_at: formattedUpdatedAt,
            };
          });

          // let date = all_posts.get("created_at");
          return res.render("../views/pages/news/all_news", {
            title: "All News - Admin",
            all_posts,
          });
        })
        .catch((error) => console.error(error));
      break;
    case "category":
      fetch(host_url + "/api/category/")
        .then((response) => response.json())
        .then((cat) => {
          // console.log(all_posts);
          return res.render("../views/pages/news/news_category", {
            title: "All Category - Admin",
            cat,
          });
        })
        .catch((error) => console.error(error));
      break;
    case "news_sub_cat":
      res.send("news_sub_cat");
      break;
    default:
      res.render("../views/pages-error-404.ejs");
      break;
  }

  // return;

  // if (content === "users") {
  //   return res.render("../views/pages/user/user.ejs");
  // }
};
