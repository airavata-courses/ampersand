const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')

//Google Auth
const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '858297951074-b54d4q8q6qpvq8kao44gf1utqitf3dvs.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

const PORT = process.env.PORT || 5000;

//Middleware
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());


app.get('/', (req, res)=>{
    res.render('index')
})
app.get('/login', (req,res)=>{
    res.render('login')
})
app.post('/login', (req,res)=>{
    let token = req.body.token;
    async function verify() {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });
        const payload = ticket.getPayload();
        const userid = payload['sub'];
        console.log(payload)
        // If request specified a G Suite domain:
        // const domain = payload['hd'];
      }
      verify().then(()=>{
          res.cookie('session-token', token);
          res.send('success');
      }).catch(console.error);
})
app.get('/dashboard', checkAuthenticated, (req,res)=>{
    let user = req.user;
    res.render('dashboard', {user});
})
app.get('/protectedroute', checkAuthenticated, (req,res)=>{
    res.render('protectedroute.ejs');
})
app.get('/logout', (req,res)=>{
    res.clearCookie('session-token');
    res.redirect('/login')
})

function checkAuthenticated(req, res, next){

    let token = req.cookies['session-token'];

    let user = {};
    async function verify() {
        res.set({'Cache-Control':'no-cache,private,no-store,must-revalidate,max-stale=0,post-check=0,pre-check=0'})
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        user.name = payload.name;
        user.email = payload.email;
        user.picture = payload.picture;
      }
      verify()
      .then(()=>{
          req.user = user;
          next();
      })
      .catch(err=>{
          res.redirect('/login')
      })
}

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
})