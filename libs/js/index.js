function formatterDateTime() {
	var date=new Date()
	var month=date.getMonth() + 1
    var datetime = date.getFullYear()
            + ""// "年"
            + (month >= 10 ? month : "0"+ month)
            + ""// "月"
            + (date.getDate() < 10 ? "0" + date.getDate() : date
                    .getDate())
            + ""
            + (date.getHours() < 10 ? "0" + date.getHours() : date
                    .getHours())
            + ""
            + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
                    .getMinutes())
            + ""
            + (date.getSeconds() < 10 ? "0" + date.getSeconds() : date
                    .getSeconds());
    return datetime;
}


function GetQueryString(name){
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!=null)return  unescape(r[2]); return null;
}



//创建应用
var app = angular.module("myapp", ['ngSanitize']);
//body里添加控制器
app.controller("myctrl", function($scope, $http,$compile) {
	//加载头尾
	$http.get("header.html?_"+Math.random()).success(function( data  ){
		$compile($("header").html( data ))($scope);
		$http.get("libs/newsType.json").success(function( dataarr  ){
			$scope.newsType=dataarr;
		})
	})
	$http.get("footer.html?_"+Math.random()).success(function( data  ){
		$compile($("footer").html( data ))($scope);
	})
	//定义滚动条
	var myScroll = new IScroll('.news_container', {
		bounceTime: 1200,
		scrollbars: false,
		click: true
	});

	//新闻加载功能
	//定义一个数字变量，用来计数，每次页面加载时，加载该新闻频道的第一页
	var count = 1;
	function loadNews( newsType ){
		//加载前先显示遮罩层
//		$(".loading").show();
		$(".icon").show();
		//用$http服务
		$http({
			method: "get",
			url: "http://apis.baidu.com/showapi_open_bus/channel_news/search_news",
			headers: {
				apikey: '9a0377f67476733b42ea794a4c9a9efa'
			},
			async: true,
			params: {
				channelName: newsType,
				page: count,
				needHtml: 1,
				maxResult: 15
			}

		}).success(function(data) {
			//加载成功后得到需要的数据并隐藏遮罩层
			$(".loading").hide();
			$(".icon").hide();
			$scope.data=[];
			//给scope添加data属性，接受返回的新闻
			$scope.data = data.showapi_res_body.pagebean.contentlist;
			//给scope添加allpage属性，将该类新闻的总页数赋给它
			$scope.allpage = data.showapi_res_body.pagebean.allPages;
			myScroll.refresh();
//			console.log($scope.newsname);
			//console.log($scope.allpage);
//			return $scope.data;
			//给国内添加活动效果
			if( newsType == '国内' ){
				$( 'header ul li:first' ).addClass( 'active' );
			}
		})
	}
	window.onload = function() {
		
		//跳转个人中心
		$( 'footer li:last-child' ).on( 'touchstart', function(){
			window.location.href = 'member.html';
		});
		
		//跳转搜索页面
//		$( 'footer li:eq(1)' ).on( 'touchstart', function(){
//			window.location.href = 'newSearch.html';
//		});
		
		//页面加载时，默认加载'国内'新闻
		var newsType = "国内";
		loadNews( newsType );
		//滚动条的滚动事件
		myScroll.on('scrollEnd', function() {
			//当滚动条到达底部的时候
				if(myScroll.y == myScroll.maxScrollY) {
					count++;
					console.log( '第几次加载：' + count );
					console.log( '加载的新闻：' + newsType );
					//并且当计数变量小于该类新闻的最大页数时，加载这一页的新闻
					if(count<$scope.allpage){
						console.log(count)
						//加载的时候，显示遮罩层
//						$(".loading").show();
						$(".icon").show();
						console.log("A")
						//有$http服务请求新闻API
						$http({
							method: "get",
							url: "http://apis.baidu.com/showapi_open_bus/channel_news/search_news",
							headers: {
								apikey: '9a0377f67476733b42ea794a4c9a9efa'
							},
							async: true,
							params: {
								channelName: newsType,
								page: count,
								needHtml: 1,
								maxResult: 15
							}
	
						}).success(function(data_next) {
							//请求成功后调用函数
							myScroll.refresh();
							$(".loading").hide();
							$(".icon").hide();
							$scope.data_next = data_next.showapi_res_body.pagebean.contentlist;
							for(var i=0; i<$scope.data_next.length; i++){
								$scope.data.push($scope.data_next[i]);
							}
							$compile($(".news_container").html())($scope);
							
							console.log($scope.data_next);
							console.log($scope.data);
							return $scope.data;
							
						})
					}

				}
			})
			//每次开始滑动刷新滚动条
		$(window).on("touchstart", function() {
			myScroll.refresh();
		})
			
		console.log(count)
		
		//点击新闻标题，将该条新闻的所有信息存入本地存储，并且跳转到该条新闻的详情页
		$scope.show_detail = function(obj) {
			var str = JSON.stringify(obj);
			console.log( str );
			window.localStorage.setItem("news_detail", str);
			str = JSON.parse(window.localStorage.getItem("news_detail"));
			console.log(str);
			//			str=eval('('+str+')');
			window.location.href = "news_detail.html?_" + Math.random();
		};

//		//点击新闻的类别导航栏，给当前点击的新闻类别加样式，清除之前data里面所有存着的新闻，初始化计数器，并且获取当前点击的类别的新闻
		$scope.classify=function(obj,index){
			$("ul li").removeClass("active").eq(index).addClass("active");
			count=1;
			newsType = obj.newsType;
			loadNews( newsType );
		}
		//点击尾部的刷新按钮，清除之前data里面所有存着的新闻， 初始化计数器，重新加载该类别的新闻
		$scope.refresh = function() {
			count=1;
			loadNews( newsType );
			$scope.data=[];
		}
		//点击该条新闻的关闭按钮，将删除data的该条新闻，不刷新之前，该页面不再显示这条新闻
		$scope.closeNews = function(index){
			$scope.data.splice( index, 1 );
		}
		myScroll.refresh();
		console.log(myScroll.maxScrollY)
	}

})
