
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const mongoose = require('mongoose')

const todosRoutes = require('./routes/todos')




const app = express()

const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})


app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.urlencoded({
    extended: true
})) 
app.use(express.static(path.join(__dirname, 'public')))




app.use(todosRoutes)



async function dev() {
    try {
        const url = 'mongodb://127.0.0.1:27017/todos'
        await mongoose.connect(url, {
            useNewUrlParser: true
        })
        app.listen(3000, () => {
            console.log('Server is running')
        })
    } catch (error) {
        console.log(error)
    }
}

dev()


// c:\data\db
// 1-terminal
// cd c:\mongodb\bin
// mongod --dbpath c:\data\db

// 2-terminal
// cd c:\mongodb\bin
// mongo 
