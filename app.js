//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
var _=require("lodash");
const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;

const homeStartingContent ="Make sure your question is on-topic and valid."
const line2="All things green only accepts certain types of questions about Agriculture and plant related queries.";
const line3 = "If your question is not on-topic or is otherwise unsuitable for this site,then it will likely be closed.";
const line4= "How to write a query? write your name followed by - then your Title then your query";
const line5="How to answer a query? tag the person with @XXX in the title section - followed by your name then your answer";
const aboutContent = "A community-based space to find and contribute answers to farmin related queries in All things green." ;
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
mongoose.connect("mongodb+srv://admin-varsha:varsha123@cluster0.oyyo7nr.mongodb.net/allthingsgreen");
const schemanew=new mongoose.Schema({
  name:String,
  post:String
})
const posts=new mongoose.model("posts",schemanew);

app.get("/",function(req,res){
  posts.find({},function(err,posts){
    if(err){
      console.log(err);
    }
    else{
        res.render('home',{homeContent:homeStartingContent,one:line2,two:line3,three:line3,four:line4,five:line5,postsnew:posts});
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  posts.findOne({_id: requestedPostId}, function(err, postnew){
    res.render("post", {posttitle: postnew.name,postpara: postnew.post});
  });

});
app.get("/about",function(req,res){
  res.render('about',{aboutcon:aboutContent});
});
app.get("/contact",function(req,res){
  res.render('contact',{contactcon:contactContent});
});
app.get("/compose",function(req,res){
  res.render('compose');
});
app.post("/tamilhome",function(req,res){
  res.render('tamilhome',{one:"அனைத்து விஷயங்களும் விவசாயம் மற்றும் தாவரம் தொடர்பான கேள்விகள் பற்றிய சில வகையான கேள்விகளை மட்டுமே ஏற்றுக்கொள்கிறது.",two:"உங்கள் கேள்வி தலைப்பில் இல்லை அல்லது இந்த தளத்திற்கு பொருத்தமற்றதாக இருந்தால், அது மூடப்படும்.",three:"உங்கள் கேள்வி தலைப்பில் இல்லை அல்லது இந்த தளத்திற்கு பொருத்தமற்றதாக இருந்தால், அது மூடப்படும்.",four:"ஒரு வினவல் எழுதுவது எப்படி? உங்கள் பெயரைத் தொடர்ந்து எழுதவும் - பின்னர் உங்கள் தலைப்பு பின்னர் உங்கள் வினவல்",five:"ஒரு கேள்விக்கு எவ்வாறு பதிலளிப்பது? தலைப்புப் பிரிவில் @XXX உடன் நபரைக் குறிக்கவும் - உங்கள் பெயரைத் தொடர்ந்து உங்கள் பதிலைக் குறிக்கவும்",});
    
});
app.post("/compose",function(req,res){
      const  postnew= new posts({
        name: req.body.composetitle,
        post: req.body.composetext
      });
  postnew.save()
  res.redirect("/");
});
app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
