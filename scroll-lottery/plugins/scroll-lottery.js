


// ------------------mockjs数据

let Random = Mock.Random;
let nums = 10;

// 候奖人数据
let title = Mock.mock("data/lotteryList",{
	"lotteryList|100":[{
		"name|1":name(),
		"pos|1":randomTxt(3,5),
		"company|1":randomTxt(5,15),
		"phone|1":randomTell(),
	}]
});
	
	
// 名字
function name(){
	let arr = [];
	for(var i=0;i<nums;i++){
		arr.push(Random.cname());
	}
	return arr;
}

// 随机文字
function randomTxt(n,m){
	let arr = [];
	for(var i=0;i<nums;i++){
		arr.push(Random.ctitle());
	}
	return arr;
}

// 随机号码
function randomTell(){
	let arr = [];
	for(var i=0;i<nums;i++){
		let tell = Mock.mock({
			"number|1":/\d{11}/
		});
		arr.push(tell.number)
	}
	return arr;
}