//求传递进来的所有数字的和并输出
function sum() {
	var arr = arguments,sum = 0;
	for (var i = 0; i < arr.length; i++) {
		sum += arr[i];
	}
	return sum;
}
module.exports = {
	sum : sum,
};