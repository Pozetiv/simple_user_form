// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require rails-ujs
//= require activestorage
//= require turbolinks
//= require_tree .

$(document).on('turbolinks:load', function() {
	$(".error_form").hide();
	$(".fa-exclamation, .fa-check").hide();

	var valid_nick = false;
	var valid_name = false ;
	var valid_surname = false ;
	var valid_email = false;
	var valid_password = false;


	$("#user_nick").focusout(function(){
		check_nick();
		uniqueness_nick();
	});

	$("#user_name").focusout(function(){
		check_name();
	});

	$("#user_surname").focusout(function(){
		check_surname();
	});

	$("#user_email").focusout(function(){
		check_email();
		uniqueness_email();
	});

	$("#user_password").focusout(function(){
		check_password();
	});

	function check_nick() { 
	var pattern = /^[a-zA-z]+[a-zA-Z0-9]*$/;
	var form_value = $("#user_nick").val();
	if ( pattern.test(form_value) && form_value !== '') {
			$("#nick_error_message").hide();
			show_valid_icon("div.nick_icons_field");
			valid_nick = true;
			} else {
			  show_invalid_icon("div.nick_icons_field")
			  $("#nick_error_message").text("Ник неверного формата");
			  $("#nick_error_message").show();
			  valid_nick = false;
			}
			status_button()
	  }

	function check_name() {
		var pattern = /^[а-яА-Я]*$/;
		var form_value = $("#user_name").val();
		if (pattern.test(form_value) && form_value !== '') {
			$("#name_error_message").hide();
			show_valid_icon("div.name_icons_field");
			valid_name = true;
			} else {
				show_invalid_icon("div.name_icons_field")
				$("#name_error_message").text("Имя может содержать только кирилицу");
				$("#name_error_message").show();
				valid_name = false;
			}	
			status_button()
	  }

	function check_surname() {
		var pattern = /^[а-яА-Я]*$/;
		var form_value = $("#user_surname").val();
		if (pattern.test(form_value) && form_value !== '') {
			$("#surname_error_message").hide();
			show_valid_icon("div.surname_icons_field");
			valid_surname = true;
			} else {
				show_invalid_icon("div.surname_icons_field")
				$("#surname_error_message").text("Фамилия может содержать только кирилицу");
				$("#surname_error_message").show();
				valid_surname = false;
			}	
			status_button()
	  };

	function check_email() {
		var pattern = /^[a-z\d]+[0-9a-z\d]*@[a-z\d]+\.[a-z]+$/;
		var form_value = $("#user_email").val();
		if (pattern.test(form_value) && form_value !== '') {
			$("#email_error_message").hide();
			show_valid_icon("div.email_icons_field");
			valid_email = true;
			} else {
				show_invalid_icon("div.email_icons_field")
				$("#email_error_message").text("Неверная кобинация");
				$("#email_error_message").show();
				valid_email = false;
		  }
		  status_button()
	  };

	function check_password() {
		if ( $("#user_password").val().length >= 5 ) {
			$("#password_error_message").hide();
			show_valid_icon("div.password_icons_field");
			valid_password = true;
		} else {
			show_invalid_icon("div.password_icons_field");
			$("#password_error_message").text("Пожайлуства введите пароль длинее 5 символов");
			$("#password_error_message").show();
			valid_password = false;
		}
		status_button();
	};


	function uniqueness_nick() {
		$.ajax({
      url: '/nick_validator/' + $('#user_nick').val(),
      type: 'GET',
      dataType: 'json',
      error: function(jqXHR, textStatus, errorThrown) {},
      success: function(data, textStatus, jqXHR) {
         if (data.valid == true) {
         	$("#password_error_message").hide();
         	show_valid_icon("div.nick_icons_field");
        	valid_nick = true
        } else if ( data.valid == false ){
        	$("#nick_error_message").text("Человек с таким никнеймом уже зарегестрирован");
			$("#nick_error_message").show();
        	show_invalid_icon("div.nick_icons_field");
        	valid_nick = false;
        }
      }
     });
		status_button()
	};

	function uniqueness_email() {
			$.ajax({
	      url: '/email_validator/',
	      type: 'POST',
	      dataType: 'json',
	      data: $('#user_email').serialize(),
	      error: function(jqXHR, textStatus, errorThrown) {},
	      success: function(data, textStatus, jqXHR) {
	         if (data.valid == true) {
	         	$("#email_error_message").hide();
	         	show_valid_icon("div.email_icons_field");
	        	valid_email = true
	        } else if ( data.valid == false ){
	        	$("#email_error_message").text("На этот ящик уже зарегестрирован аккаунт");
				$("#email_error_message").show();
	        	show_invalid_icon("div.email_icons_field");
	        	valid_email = false;
	        }
	      }
	     });
			status_button();
		};


	function status_button() {
		if ( valid_nick == true && valid_name == true && valid_surname == true && valid_email == true && valid_password == true ) {
			$("#submit").removeAttr("disabled");
			} else {
			  $("#submit").attr('disabled', 'true');
		 }
	};

	});

function show_valid_icon(url){
	$(".fa-exclamation", url).hide();
	$(".fa-check", url).show();
};

function show_invalid_icon(url){
	$(".fa-check", url).hide();
	$(".fa-exclamation", url).show();
};

