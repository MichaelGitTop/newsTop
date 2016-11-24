
//	window.localStorage.clear( "collect_news" );
//	console.log( window.localStorage.getItem( "collect_news" ) );
var myApp = angular.module( "myApp", ['ngSanitize'] );
myApp.controller( 'ctrl', function( $scope, $http ){
	
	var news_detail = JSON.parse( window.localStorage.getItem( "news_detail" ) );
	console.log( news_detail );
	$scope.news = news_detail;
	
	//收藏按钮
	$scope.collect = function(){
		$scope.collected = !$scope.collected;
		
		if( $scope.collected ){
			console.log( '收藏这个新闻：' );
			//当前页新闻
			var news_detail = JSON.parse( window.localStorage.getItem( "news_detail" ) );
			
			//判断是否已经有收藏的新闻
			if( window.localStorage.getItem( "collect_news" ) === null ){
				console.log( '以前没有收藏的新闻' );
				var  collect_json = [];
				collect_json.push( news_detail );
				window.localStorage.setItem( "collect_news", JSON.stringify( collect_json ) );
			}else{
				console.log( '以前有收藏的新闻' );
				var  collect_json = JSON.parse( window.localStorage.getItem( "collect_news" ) );
				console.log( '旧收藏：' )
				console.log( collect_json );
				collect_json.push( news_detail );
				console.log( '新收藏：' )
				console.log( collect_json );
				window.localStorage.setItem( "collect_news", JSON.stringify( collect_json ) );
			}
		}
	}
	
	$( '.readingOut' ).hide();
	//阅读模式
	$scope.reading = function(){
		console.log( 'Reading Model' );
		$( '.readingOut' ).show( 150 );
		$( 'header' ).animate({
			height: 0
		}, 200);
		$( 'footer' ).animate({
			height: 0
		}, 200);
		$( '.m_container' ).animate({
			top: 0,
			bottom: 0
		}, 200)
		$( '.m_container .content' ).addClass( 'reading' );
		$( '.errors' ).hide();
		$( '.share_title' ).hide();
		$( '.share' ).hide();
	}
	
	//退出阅读模式
	$scope.reading_out = function(){
		$( '.readingOut' ).hide( 150 );
		$( 'header' ).animate({
			height: 48
		}, 200);
		$( 'footer' ).animate({
			height: 48
		}, 200);
		$( '.m_container' ).animate({
			top: 48,
			bottom: 48
		}, 200);
		$( '.m_container .content' ).removeClass( 'reading' );
		$( '.errors' ).show();
		$( '.share_title' ).show();
		$( '.share' ).show();
	}
});