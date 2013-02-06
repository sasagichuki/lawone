// JavaScript Document
//connect to database
//var username = "user2", pwd = "user2";

$(document).bind("mobileinit", function(){
	//overide to open db
	//$.mobile.db = openDatabase('lawone', '1.0', 'lawone database', 2*1024*1024);
	//$.mobile.db.transaction(function(t) {
			//t.executeSql('CREATE TABLE IF NOT EXISTS users (id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, pwd TEXT)');
			//t.executeSql('INSERT INTO users(username, pwd) VALUES (?,?)',[username, pwd]);
    //});
	
	//menu show and hide
$('#myPage').live('pageinit', function(event) {
	$("#hide").hide();
    $("#show_menu").bind('tap',function(event, ui){
        $('#menu').show('fast', function() {});
		$('#hide').show('fast', function() {});
		$(this).hide();
		//$( "#show_menu" ).dialog({ overlayTheme: "a" });
		//$.mobile.page.prototype.options.theme  = "b";
		$(function() {
			//var docHeight = $(document).height();
			$('#main').append("<div id='overlay'></div>");
			$("#overlay")
			//.height(docHeight)
			.css({
				'opacity' : 0.4,
				'position': 'absolute',
				'top': 0,
				'left': 0,
				'background-color': 'black',
				'width': '100%',
				'height':'100%',
				'margin-top':'105px',
				'z-index': 5000
				});
			});
    })
	
	$("#hide").bind('tap',function(event, ui){
		$(this).hide();
        $('#menu').hide('fast', function() {});
		$('#show_menu').show('fast', function() {});
		$('#overlay').remove()
    })
	
	
	$('#overlay').live('click', function()  {
    	$(this).fadeOut("slow", function() {
			$(this).remove();
			$('#hide').hide('fast', function() {});
			$('#show_menu').show('fast', function() {});
			$('#menu').hide('fast', function() {});
		
		});
	});
		
});
//end show and hide
});



//data role page transition
$("a[data-role=tab]").each(function () {
    var anchor = $(this);
    anchor.bind("click", function () {
        $.mobile.changePage(anchor.attr("href"), {
            transition: "none",
            changeHash: false
        });
        return false;
    });
});

$("div[data-role=page]").bind("pagebeforeshow", function (e, data) {
    $.mobile.silentScroll(0);
    $.mobile.changePage.defaults.transition = 'slide';
});


$(function() {$('#dashboard').live("pagebeforeshow",getUsers);
		//$('#new').live('pageshow', getLocation);
		//$('#insert').live('submit', insertEntry);
});

function getUsers() {
	var list = $('#list'), items = [];
	
	$.mobile.db.transaction(function(t) {
		//get records
		t.executeSql('SELECT id, username,pwd FROM users ORDER BY id ',[],
		
		//display records
		function(t, result) {
			var i,
			len = result.rows.length,
			row;
			
			if (len > 0 ) {
				
				for (i = 0; i < len; i += 1) {
					row = result.rows.item(i);
					items.push(//'<li><a href="#display" data-user="'+ row.id + '">' + row.username + '</a></li>'
					'<tr><td><a href="#display" data-user="'+ row.id + '">' + row.username + '</a></td><td>' + row.pwd + '</td></tr>');
					}
					
				list.html(items.join());
				//list.listview('refresh');
				
				$('a', list).live('click',function(e) {
					getItem(($(this).attr('data-user')));
					});
			} 
		});
		
	});	
}

