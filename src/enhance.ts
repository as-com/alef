import arrayReduce from "./utils/arrayReduce";

export default function enhance(...enhancers: Function[]): Function {
	return (createRenderer: Function) => (config: Object) =>
		arrayReduce(
			enhancers,
			(enhancedRenderer, enhancer) => {
				enhancedRenderer = enhancer(enhancedRenderer);
				return enhancedRenderer;
			},
			createRenderer(config)
		);
}
