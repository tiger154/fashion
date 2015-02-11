$(document).ready( function() {	
	//$('#logo').bind({ click: function(){ layout.initMenu(); common.redirect('/'); } });


	$('.loginArea > img').bind({
		mouseenter: function() {			
			privateLayer = $(this).parent().children("#privateBox");			
			privateLayer.show();
			$(this).parent().mouseleave(function() {privateLayer.hide();} ); 
		},
		mouseout: function() {}
	});	


});

var layout = {

	overMenu: function(num) {
		var length = $('#top-mmenu').children('li').size();
		for (var i=1; i<=length; i++) {
			var obj = $("#top-mmenu" + i);
			if (i == num) {
				obj.removeClass("menu-off" + i).addClass("menu-on" + i);				
			} else {
				obj.removeClass("menu-on" + i).addClass("menu-off" + i);				
			}
		}
		this.showSubmenu(num, length);
	},
	showSubmenu: function(num, length) {
		for (var i=1; i <= length; i++) {
			if (i == num) $("#top-smenu" + i).show();
			else $("#top-smenu" + i).hide();
		}
	},
	overSubmenu: function(num1, num2) {
		var length = $('#top-smenu'+num1).children('li').size();
		for (var i=1; i<=length; i++) {
			var obj = $("#top-smenu" + num1 + i);
			if (i == num2) {				
				obj.removeClass("smenu-off" + num1 + i).addClass("smenu-on" + num1 + i);				
			} else { 
				obj.removeClass("smenu-on" + num1 + i).addClass("smenu-off" + num1 + i);				
			}
		}
	},	
	initMenu: function() {
		common.deleteCookie('cookieMMenu',1);
		common.deleteCookie('cookieSMenu',1);
		this.showMenu();
	},	
	showMenu: function() {
		var _cookieMMenu = common.getCookie('cookieMMenu');
		var _cookieSMenu = common.getCookie('cookieSMenu');
		if(_cookieSMenu != false) {
			layout.overMenu(_cookieSMenu.substring(0,1)); 
			layout.overSubmenu(_cookieSMenu.substring(0,1), _cookieSMenu.substring(1));	
		} else {
			if(_cookieMMenu != false) layout.overMenu(_cookieMMenu); 
		}
	}
};