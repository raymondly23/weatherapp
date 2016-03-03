'use strict';
		var city;
		var citiesOnPage = [];
		var $apiKey = '9a79bd3fb1ae1149f5912f23997a2b83';

$(function() {
	loadFromLocalStorage();
	$('#submit').click(addWeather);
	$(this).on('click','.remover', remove);
});

function addWeather(event){
		var $city = $('#city').val().toLowerCase();
		var $country = $('#country').val();	
		event.preventDefault();
		if(city.indexOf($city) === -1){
			city.push($city);
			saveToLocalStorage();
		}

		if(citiesOnPage.indexOf($city) === -1){
			citiesOnPage.push($city);
			$('#city').val('');
			$.get(`http://api.openweathermap.org/data/2.5/forecast?q=${$city}&units=imperial&mode=json&appid=${$apiKey}`)
			.done(function(data){
				$("#cityName").text(data.city.name);
				for(var i = 0; i < 5; i++){
				var $temp = $('<td>').text('Temperature: ' + data.list[i].main.temp + '\u2109');
				var day = '#day' + (i+1);
				var $conditions = $("<td>").text(data.list[i].weather[0].description);
				// $("#forecast").find("tbody tr").append($conditions);
				$("#forecast").find("tbody tr").append($temp);
			}
		})
			.fail(function(data){
				console.log('FAILURE!');
			})
	}
}

function loadFromLocalStorage(){
	if(localStorage.cities === undefined) {
		localStorage.cities ='[]';
	}
	city = JSON.parse(localStorage.cities);
	for(var i = 0; i < city.length; i++){
		$.get(`http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&units=imperial&appid=${$apiKey}`)
			.done(function(data){
				var $name = $('<td>').text(data.name);
				var $icon = data.weather[0].icon;
				var icon = $('<img>').attr('src', 'http://openweathermap.org/img/w/'+$icon+'.png')
				var $weather = $('<td>').text(data.weather[0].description).append(icon)
				var $temp = $('<td>').text('Temperature: ' + data.main.temp + '\u2109');
				var $button = $('<button>').addClass('remover');
				$button.addClass('glyphicon glyphicon-remove-circle');
				var $tr = $('<tr>').append($name).append($weather).append($temp).append($button)
				$('#localData tbody').append($tr);
			})
			
		}
}

function saveToLocalStorage(){
	localStorage.cities = JSON.stringify(city);
}

function remove(event){
	$('tr').remove()
	}




