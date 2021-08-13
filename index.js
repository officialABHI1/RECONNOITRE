const express = require('express');
const app = express();
const methodOverride = require('method-override');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const posts = [
    {
        id:0,
        username: "Sabeel",
        url: 'https://unsplash.com/photos/GsQwzPaqGB0',
        body:"This is a comment"
    },
    {
        id:1,
        username: "Keshav",
        url:'https://unsplash.com/photos/Tn8DLxwuDMA',
        body:"Meow Meow Meow"
    },
    {
        id:2,
        username: "Jitesh",
        url: 'https://unsplash.com/photos/Sg3XwuEpybU' ,
        body:"Woof Woof Woof"
    },
    {
        id:3,
        username: "Prateek",
        url: 'https://unsplash.com/photos/YSkuPlvE4nc',
        body:"Hello from Google"
    }
]

app.get('/posts', (req, res) => {
    
  res.render('show', { posts});
})

app.get('/posts/new', (req, res) => {
    
   res.render('new');
})

app.post('/posts', (req, res) => {
 const { username, body , url } = req.body;
 const id = posts.length;
 posts.push({ username, body, url,id});
 res.redirect('/posts');
})

app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const foundBlog = posts.find(c => c.id===parseInt(id));
  res.render('new1',{posts:foundBlog});
})



app.get('/posts/:id/edit', (req, res) => {
 const { id } = req.params;
 const foundBlog = comments.find(c => c.id === parseInt(id));
 
  res.render('edit', { posts: foundBlog });
})


app.patch('/posts/:id', (req, res) => {
    
  const { id } = req.params;
  const foundBlog = posts.find(c => c.id === parseInt(id));

  const updated = req.body.body;
 

  foundBlog.body = updated;

  res.redirect('/posts');
})


app.delete('/posts/:id', (req, res) => {
    
  const { id } = req.params;

  const temp = posts.filter(c => c.id !== id);

  posts = temp;

  res.redirect('/posts');
})


app.listen(3000, () => {
 console.log('server runnig at port 3000');
})
