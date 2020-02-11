var game_version = CustomNetTables.GetTableValue("game_options", "game_version");
var game_type = undefined;
if (game_version)
	game_type = game_version.game_type;

var localTeam = Players.GetTeam(Players.GetLocalPlayer())
if (localTeam != 2 && localTeam != 3) {
	HideBattlepassButton()
}

function HideBattlepassButton() {
	$.GetContextPanel().style.visibility = "collapse";
//	$.Schedule(2.0, HideBattlepass)
}

function ToggleBattlepass() {
	$.Msg($.GetContextPanel().BHasClass("DashboardPage"))
}

(function() {
	var player_battlepass = CustomNetTables.GetTableValue("battlepass", Game.GetLocalPlayerID().toString())

	$.Msg(player_battlepass)

	if (player_battlepass == undefined)
		return;

	$.GetContextPanel().FindChildTraverse("LevelNumber").text = player_battlepass.Lvl;
	$.GetContextPanel().FindChildTraverse("PointsNeeded").text = player_battlepass.XP + " / " + player_battlepass.MaxXP
	$.GetContextPanel().FindChildTraverse("TilNextLevel").value = player_battlepass.XP / player_battlepass.MaxXP
	$.Msg($.GetContextPanel().FindChildTraverse("RewardsList").GetChild(0).GetChild(0).FindChildTraverse("Path18"))


	/* todo: find a way to use classes in event_level_shield.css
	DOTAEventLevelShield.Season_International2019.EventTierNone #ShieldBackground { background-image: url("s2r://panorama/images/compendium/international2019/basic_shield_icon_psd.vtex"); }
	DOTAEventLevelShield.Season_International2019.EventTierBronze #ShieldBackground { background-image: url("s2r://panorama/images/compendium/international2019/basic_shield_icon_psd.vtex"); }
	DOTAEventLevelShield.Season_International2019.EventTierSilver #ShieldBackground { background-image: url("s2r://panorama/images/compendium/international2019/silver_shield_icon_psd.vtex"); }
	DOTAEventLevelShield.Season_International2019.EventTierGold #ShieldBackground { background-image: url("s2r://panorama/images/compendium/international2019/gold_shield_icon_psd.vtex"); }
	DOTAEventLevelShield.Season_International2019.EventTierPlatinum #ShieldBackground { background-image: url("s2r://panorama/images/compendium/international2019/max_shield_icon_psd.vtex"); }

	DOTAEventLevelShield.Season_International2019.EventTierNone #LevelNumber { color: #fff; }
	DOTAEventLevelShield.Season_International2019.EventTierBronze #LevelNumber { color: #fff;  }
	DOTAEventLevelShield.Season_International2019.EventTierSilver #LevelNumber { color: #ffffff; }
	DOTAEventLevelShield.Season_International2019.EventTierGold #LevelNumber { color: #fff3d1; }
	DOTAEventLevelShield.Season_International2019.EventTierPlatinum #LevelNumber { color: #ffffff; 	text-shadow: 0px 0px 6px ultraDarkColor; }
*/

//	GameEvents.Subscribe("safe_to_leave", SafeToLeave);
})();
