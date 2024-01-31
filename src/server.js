import Fastify from 'fastify'
const app = Fastify()
import fastifyView from '@fastify/view'
import handlebars from 'handlebars'
import {getData} from "./api.js";

app.register(fastifyView, {
    engine: {
        handlebars: handlebars
    },
    options: {
        partials: {
            header: '/templates/header.hbs',
            footer: '/templates/footer.hbs'
        }
    }
});

app.get('/', async (req, res) => {
    const personnages = await getData("https://gateway.marvel.com:443/v1/public/characters");
    return res.view('/templates/index.hbs', {personnages: personnages})
})

app.listen({ port: 3000 })