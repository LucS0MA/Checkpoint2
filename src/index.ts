import { startStandaloneServer } from '@apollo/server/standalone'
import { ApolloServer } from '@apollo/server'
import { buildSchema } from 'type-graphql'
import { dataCheckPoint } from './config/db'
import CountryResolver from './resolver/CountryResolver'

async function start() {

    await dataCheckPoint.initialize()

    const schema = await buildSchema({
        resolvers: [CountryResolver],
    })

    const server = new ApolloServer({
        schema,
    })


    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    })

    console.log(`🚀 Server ready at ${url}`)
}

start()