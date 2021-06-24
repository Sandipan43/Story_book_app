const express=require('express');
const dotenv=require('dotenv');
const path=require('path');
const exphbs=require('express-handlebars');
const passport =require('passport');
const session=require('express-session');
const morgan=require('morgan');
const mongoose =require('mongoose');
const connectDB=require('./config/db');
const MongoStore=require('connect-mongo')(session);
//const bodyParser=require('body-parser');
const methodOverride=require('method-override');
const {formatDate,trancate,editIcon} =require('./helpers/hbs');


const app=express();

//Load config
dotenv.config({path:'./config/config.env'});
connectDB();

//passport config
require('./config/passport')(passport);

//session config
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized:false,
    store:new MongoStore({mongooseConnection:mongoose.connection})  
  }));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
};

app.engine('.hbs', exphbs({helpers:{formatDate,trancate,editIcon},defaultLayout:'main',extname: '.hbs'}));
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname,'public')));

//method-override
app.use(methodOverride('_method'));

//routes
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));
app.use('/stories',require('./routes/stories'));

const PORT=process.env.PORT||5000
app.listen(PORT,console.log(`server running in ${process.env.NODE_ENV} mode in ${PORT}`));


