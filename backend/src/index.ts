import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import scalar from '@scalar/fastify-api-reference'
import { fastify } from 'fastify'
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from 'fastify-type-provider-zod'
import { env } from './env'
import { photoRoutes } from './routes/photo.routes'
import { userRoutes } from './routes/user.routes'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, {
	origin: true,
})

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'ProzLove API',
			version: '0.0.0',
		},
	},
	transform: jsonSchemaTransform,
})

app.register(scalar, {
	routePrefix: '/docs',
})

app.register(userRoutes, {
	prefix: '/user',
})

app.register(photoRoutes, {
	prefix: '/photo',
})

app.listen({ host: env.HOST, port: env.PORT }, (err, address) => {
	if (err) {
		app.log.error(err)
		process.exit(1)
	}
	console.log(`Server listening at ${address}`)
})
