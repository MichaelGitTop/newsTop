var myScroll;
var val = window.localStorage.getItem("searchVal");
onload = function(){
	$("header").load("header.html?_" + Math.random());
	$("footer").load("footer.html?_" + Math.random());
	
	myScroll = new IScroll('#wrapper', { scrollX: true, freeScroll: true, scrollbars:true, wheelAction:scroll});
	
	//angular改变节点时，需要加刷新，不然iscroll不会滚动
	myScroll.on('scrollStart',function(){
			myScroll.refresh();
		})
}
//这里要加，但是加了，头部的滚动就出现问题了
document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);

var app = angular.module("myApp",[]);
	app.controller("myCtrl",function($scope,$http){
		$scope.val = val;
		$scope.arr = [];
		for(var i=1; i<11; i++){
			$http({
				method : "get",
				url    : "http://apis.baidu.com/showapi_open_bus/channel_news/search_news",
				headers: {
					apikey:'9a0377f67476733b42ea794a4c9a9efa'
				},
				async  : true,
				params : {
					channelId : "5572a109b3cdc86cf39001db",
					page        : i,
					needHtml    : 1,
					maxResult   : 15
				}
		    }).success(function(response){
		   		$scope.getDatas = response.showapi_res_body.pagebean.contentlist;
		   		$scope.arr.push($scope.getDatas);
				return $scope.arr;
		 	})
		}
	})