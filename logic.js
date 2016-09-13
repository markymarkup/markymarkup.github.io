$(function(){
	$("#add_player").click(addPlayer);
	$("#rem_player").click(remPlayer);
	$("#start_game").click(startGame);

	function checkPlayers()
	{
		console.log('%i', $(".players .player_data").length);
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

		console.log('removing');

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
          		'<div class="input-group">' +
            		'<span class="input-group-addon" id="basic-addon' + playerNum + '">' + playerName + ':</span>' +
            		'<input type="text" class="form-control player_input" placeholder="Player Name" aria-describedby="basic-addon' + playerNum + '">' +
            		//'<'
          		'</div>' +
        	'</div>'
        );

        var input = $("#p" + playerNum + " .player_input");

        input.change(function()
        {
        	$("#p" + playerNum).removeClass(playerName_type);

        	playerName = input.val();

        	$("#p" + playerNum).addClass(playerName);
        });

		checkPlayers();
	}

	function startGame()
	{
		$('.add_remove').fadeOut();
		$('.start').fadeOut();
	}

	window.onload = function ()
	{
		for(var i = 0; i < 5; i++)
			addPlayer();
	}

});