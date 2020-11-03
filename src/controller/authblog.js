// get /blogs  get list of blogs for user from all the other users
const passport=require("passport")


function blogInit(app){


    app.post(
        "blogs/",
        passport.authenticate("jwt", { session: false }),
        async function (request, response) {
          const { body } = request;
          const { blog ,blogtitle } = body;
    
          const createdBLOg = await sequelize.models.blogs.create({
           blogtitle,
           blog
          });
          response.send(createdBLOg);
        }
      );
    
    app.get("/blogs",  async function (request, response) {
        const blogs = await sequelize.models.blogs.findAll({});
        response.send(blogs);
      });


  app.get("/blog/:id", async function (request, response) {
    const { id } = request.params;
    const blog= await sequelize.models.blogs.findOne({where:{ id }});
    response.send({ blog });
  });


      app.delete("delete/blogs/:id",
      passport.authenticate("jwt", { session: false }),
       async function (request, response) {
        const { id } = request.params;
        const blog = await sequelize.models.blogs.findOne({ where:{ id }});
        const deletedblog = await blog.destroy();
        response.send({ deletedblog });
      });
      
      app.put("put /blogs/:id",
      passport.authenticate("jwt", { session: false }),
      async function(request,response){
       const {id}=request.params;
       const existingBlog = await sequelize.models.blogs.findOne({where:{ id }});
       const {body}=request;
       const{blogtitle,blog}=body;
       existingBlog.blogtitle=blogtitle?blogtitle:existingBlog.blogtitle;
       existingBlog.blog=blog?blog:existingBlog.blog;
       await blog.save();
       response.send(movie);


      });

    
      
    }
    module.exports={
        blogInit
    }






