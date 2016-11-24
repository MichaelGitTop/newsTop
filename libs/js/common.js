$( function(){
	window.setTimeout( function(){
		$( 'footer ul li:first' ).on( 'touchstart', function(){
			window.location.href = "index.html?_"+Math.random();
		});
		$( 'footer ul li:eq(2)' ).on( 'touchstart', function(){
			window.location.href = "member.html?_"+Math.random();
		});	
		
	}, 1000)
});