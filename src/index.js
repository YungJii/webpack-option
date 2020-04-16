//index.js
import './index.less';
if(module && module.hot) {
    module.hot.accept()
}
console.log(module)
class Animal {
    constructor(name) {
        this.asd1 = name;
    }
    getName() {
        return this.asd1;
    }
}


const dog = new Animal('dog');
console.log('a')


if(DEV === 'dev') {
    //
    console.log('开发环境')
}else {
	console.log('生产环境')
    //
}


// 开启server.js的4000端口，项目在3000端口，
// 需要将localhost:3000转发到localhost：4000（服务器）端口
fetch('user')
	.then(res => res.json())
	.then(data => console.log(data))
	.catch(err => console.log(err))


fetch('/login/account', {
	method: 'POST',
	headers: {
		'Accept': 'application/json',
		'Content-Type': 'application/json'
	},
	body: JSON.stringify({
		username: 'admin',
		psw: '123123'
	})
})
	.then(res => res.json())
	.then(data => console.log(data))
	.catch(err => console.log(err));