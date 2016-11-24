//window.localStorage.clear( 'collect_news' );
var app= angular.module('app',[]);
app.controller('ctrl',function($scope){
	var resp =	window.localStorage.getItem('collect_news');
	
	resp = JSON.parse( resp );
	console.log( resp )
	$scope.data = resp;
	$scope.remove=function(index){
		$scope.data.splice( index,1 )
		console.log(index);
		window.localStorage.setItem( 'collect_news', JSON.stringify( $scope.data ) );
	}
	//点击新闻标题，将该条新闻的所有信息存入本地存储，并且跳转到该条新闻的详情页
	$scope.show_detail = function(obj) {
		var str = JSON.stringify(obj);
		console.log( str );
		window.localStorage.setItem("news_detail", str);
		window.location.href = "news_detail.html?_" + Math.random();
	};

})