const express = require('express')

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false }))



app.use('/add-users', (req,res, next)=>{
res.send(`
<form action="/users" method="POST">
<input type ="text" name ="username">
<input type ="number" name ="age">
<button type="submit">send</button>
</form>
`)
})
app.use('/users',(req,res,next)=>{
    console.log(req.body)
    res.redirect('/')
})
app.use('/', (req,res, next)=>{
    res.send("<h1>main page</h1>")
    })


const PORT = process.env.PORT || 2607

app.listen(PORT,()=>{
    console.log('Server iske qosildi PORT 2607da')
})