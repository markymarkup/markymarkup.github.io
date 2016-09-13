$(function(){
	var previousLink;
	var uniqueSpies = [];

	$("#add_player").click(addPlayer);
	$("#rem_player").click(remPlayer);
	$("#start_game").click(startGame);



	function visibleRound(event)
	{
		if(event != null)
		{
			console.log("Just clicked: " + event);
			if(event == 'last' || event == 'next')
			{
				if($('#' + event).parents('li').hasClass('disabled'))
				{
					event = previousLink;
					console.log(event + " Disabled");
				}
				else
				{
					if(event == 'last')
						event = previousLink[0] + (parseInt(previousLink[1]) - 1);				
					else
					if(event == 'next')
						event = previousLink[0] + (parseInt(previousLink[1]) + 1);

					console.log("Before: " + previousLink);
					console.log("After: " + event);
				}
			}
			else
			{
				if(previousLink != event)
				{
					console.log("Active: " + event);
					console.log("\nPast: " + previousLink);

				}
			}
			if(previousLink != event)
			{
				$('#' + event).parents('li').addClass('active');
				$('#' + previousLink).parents('li').removeClass('active');
				if($('#r1').parents('li').hasClass('active'))
					$('#last').parents('li').addClass('disabled');
				if($('#r5').parents('li').hasClass('active'))
					$('#next').parents('li').addClass('disabled');
				if(previousLink == "r1")
					$('#last').parents('li').removeClass('disabled');
				else
				if(previousLink == "r5")
					$('#next').parents('li').removeClass('disabled');
				previousLink = event;	
			}
		}

		
	}

	function checkPlayers()
	{
		if($(".players .player_data").length >= 10)
		{
			$('#add_player').removeClass("btn-primary");
			$('#add_player').addClass("disabled");
		}
		else
		if($(".players .player_data").length <= 5)
		{
			$('#rem_player').removeClass("btn-danger");
			$('#rem_player').addClass("disabled");
		}
		else
		{
			$('#rem_player').removeClass("disabled");
			$('#rem_player').addClass("btn-danger");
			$('#add_player').removeClass("disabled");
			$('#add_player').addClass("btn-primary");
		}
	}

	function remPlayer()
	{

        if($("#rem_player").hasClass("disabled")) return false;
        $(".players .player_data:last-child").remove();

        checkPlayers();
    }

	function addPlayer()
	{
        if($("#add_player").hasClass("disabled")) return false;

        var playerNum = $(".players .player_data").length+1;
        var playerName;
        var playerName_type;

        if(playerNum < 10)
    		playerName = "Player 0" + playerNum;
    	else
    		playerName = "Player " + playerNum;

    	playerName_type = playerName.split(' ').join('_');

        $(".players").append
        (
        	'<div id="p' + playerNum + '" class="col-md-4 col-md-offset-4 player_data ' + playerName_type + '">' +
        		'<button type="button" class="btn btn-primary btn-block" id="player_button">' + playerName_type + '</button>' + 
          		'<div class="input-group">' +
            		'<span class="input-group-addon" id="basic-addon' + playerNum + '">' + playerName + ':</span>' +
            		'<input type="text" class="form-control player_input" placeholder="Player Name" aria-describedby="basic-addon' + playerNum + '">' +
          		'</div>' +
        	'</div>'
        );

        var input = $("#p" + playerNum + " .player_input");

        input.change(function()
        {
        	$("#p" + playerNum).removeClass(playerName_type);

        	playerName = input.val();

        	$("#p" + playerNum).addClass(playerName);
        	console.log($("#p" + playerNum + " #player_button").html());
        	$("#p" + playerNum + " #player_button").html(playerName);
        });

        $(".players #player_button").hide();
		checkPlayers();
	}

	function setSpies()
	{
		for(var i = 1; i <= $(".players .player_data").length; i++)
		{
			if($("#p" + i + " #player_button").hasClass("spy"))
			{
				$("#p" + i + " #player_button").removeClass("btn-primary");
				$("#p" + i + " #player_button").addClass("btn-danger");
			}
		}
	}

	function collectSpy(turns)
	{	
		var index;
		var chosenSpy;		
		if(!uniqueSpies.length) 
		{
			for(var i = 1; i <= $(".players .player_data").length; i++)
				uniqueSpies.push(i);
		}

		for(var j = 0; j < turns; j++)
		{
			index = Math.floor(Math.random() * uniqueSpies.length);
			chosenSpy = uniqueSpies[index];
			$("#p" + chosenSpy + " #player_button").addClass("spy");

			uniqueSpies.splice(index, 1);
		}
	}

	function startGame()
	{
		switch($(".players .player_data").length)
		{
			case 5:
			case 6:
				collectSpy(2);
				break;

			case 7:
			case 8:
			case 9:
				collectSpy(3);
				break;

			case 10:
				collectSpy(4);
				break;
		}
       	setSpies();
		$(".players .input-group").hide();
        $(".players #player_button").show();
		$('.add_remove').hide();
		$('.start').hide();

		$('#no_players').text($(".players .player_data").length + " Player Game");
		$(".round_marker").append
		(
			'<nav aria-label="Page navigation">' +
				'<ul class="pagination pagination-lg">' +
					'<li class="disabled">' +
						'<a href="#" aria-label="Previous" id="last">' +
							'<span aria-hidden="true">&laquo;</span>' +
						'</a>' +
					'</li>' +
					'<li class="active"><a href="#" id="r1">Round 1</a></li>' +
					'<li><a href="#" id="r2">Round 2</a></li>' +
					'<li><a href="#" id="r3">Round 3</a></li>' +
					'<li><a href="#" id="r4">Round 4</a></li>' +
					'<li><a href="#" id="r5">Round 5</a></li>' +
					'<li>' +
						'<a href="#" aria-label="Next" id="next">' +
							'<span aria-hidden="true">&raquo;</span>' +
						'</a>' +
					'</li>' +
				'</ul>' +
			'</nav>'
/*			'<ul class="nav nav-tabs" role="tablist">' +
				'<li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Home</a></li>' +
				'<li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Profile</a></li>' +
				'<li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Messages</a></li>' +
				'<li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Settings</a></li>' +
			'</ul>'*/
		);

		previousLink = "r1";
		$("#last").click(function(event) {visibleRound("last");});
		$("#r1").click(function(event) {visibleRound("r1");});
		$("#r2").click(function(event) {visibleRound("r2");});
		$("#r3").click(function(event) {visibleRound("r3");});
		$("#r4").click(function(event) {visibleRound("r4");});
		$("#r5").click(function(event) {visibleRound("r5");});
		$("#next").click(function(event) {visibleRound("next");});

		visibleRound();
	}

	window.onload = function ()
	{
		for(var i = 0; i < 5; i++)
			addPlayer();
	}

});