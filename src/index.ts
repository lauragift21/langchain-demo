import { S3Loader } from 'langchain/document_loaders/web/s3';

export interface Env {
	ACCESS_KEY: string;
	ACCESS_SECRET_KEY: string;
	UNSTRUCTURED_API_KEY: string;
}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		const loader = new S3Loader({
			bucket: 'lauragift-bucket',
			key: 'gift.png',
			s3Config: {
				region: 'us-east-1',
				credentials: {
					accessKeyId: env.ACCESS_KEY,
					secretAccessKey: env.ACCESS_SECRET_KEY,
				},
			},
			unstructuredAPIKey: env.UNSTRUCTURED_API_KEY,
			unstructuredAPIURL: 'https://api.unstructured.io/general/v0/general',
		});
		const docs = await loader.load();
		console.log(docs);
		return new Response('Hello World!', { status: 200});
	},
};
