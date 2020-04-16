// public/config.js 除了以下的配置之外，这里面话可以有许多的配置，例如 publicPath 的路径等等
module.exports = {
	dev: {
		template: {
			title: '你好',
			header: false,
			footer: false
		}
	},
	build: {
		template: {
			title: '你好才怪',
			header: true,
			footer: false
		}
	}
}