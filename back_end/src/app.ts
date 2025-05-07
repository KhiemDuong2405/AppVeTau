import express from 'express'


const app = express()

app.get(`/product`, (req, res) => {
    console.log("GET /product")
})

export const viteNodeApp = app