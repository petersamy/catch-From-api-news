const express = require('express')
const request = require('request')
const app = express()
const port = 3000
const path = require('path')
const publicDirect = path.join(__dirname,'../public')
app.use(express.static(publicDirect))
app.set('view engine','hbs');
const viewPath = path.join(__dirname,'../templates/views')
app.set('views',viewPath)

app.get('/about', (req,res)=>{
    res.render('about',{
        home:'Feel safe in Home',
        name:'peter'
    })     
}),

//////////////////////////////////////////////////////////////////////////

app.get('/',(req,res)=>{
    const newsurl='http://newsapi.org/v2/top-headlines?country=eg&apiKey=8f05aa23735d4e1c951a7af90840a493'
        request({url:newsurl, json:true}, (error,response)=>{
            if(error){
                console.log('Error has Occured ')
            }else{  
                res.render('index',{
                    data:response.body.articles
                })
            }   
        }) 
    }),
//////////////////////////////////////////////////////////////////////////


app.get('*',(req,res)=>{
    res.render('not',{
        title:'404 page NotFound',
        messege:'in this world Not Found',
        name:'Default page'
    })    
}) 
//////////////////////////////////////////////////////////////////////////////////////////
//partial
const hbs = require('hbs')
const partialPath = path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialPath) 
 

 
app.listen(port,()=>console.log('event is listen'))