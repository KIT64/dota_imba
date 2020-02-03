"use strict";

var secret_key = CustomNetTables.GetTableValue("game_options", "server_key")["1"];

var api = {
	timeout: 5000,
	base: "http://api.frostrose-studio.com/",
	endpoints: {
		meta: {
			companions: "imba/companions",
			statues: "imba/ingame-statues",
			modify_companion: "imba/modify-companion",
			modify_statue: "imba/modify-ingame-statue",
			player_info: "imba/player-info",
			multi_player_info: "meta/multi-player-info",
			game_info: "imba/game-info",
			loading_screen: "imba/loading-screen",
			resolve_map_name: "imba/resolve-map-name",
			player_armory: "imba/armory",
			modify_player_armory: "imba/modify-armory",
		}
	},

	get_url: function (endpoint, args) {
		var final = this.base + endpoint;
		if (args !== undefined) {
			final += "?";

			for (var k in args) {
				final += k + "=" + args[k] + "&";
			}
		}
		return final;
	},

	multi_player_info: function (steamids) {
		return this.request(this.get_url(this.endpoints.meta.multi_player_info, { ids: steamids.join(",") }));
	},

	resolve_map_name: function (name) {
		return this.request(this.get_url(this.endpoints.meta.resolve_map_name, { name: name }));
	},

	loading_screen: function () {
		return this.request(this.get_url(this.endpoints.meta.loading_screen));
	},

	player_info: function (username) {
		return this.request(this.get_url(this.endpoints.meta.player_info, { username: username }));
	},

	game_info: function () {
		return this.request(this.get_url(this.endpoints.meta.game_info));
	},

	get_player_armory: function (data) {
		return this.request(this.get_url(this.endpoints.meta.player_armory, data));
	},

	update_player_armory: function (data) {
		return this.request(this.get_url(this.endpoints.meta.modify_player_armory, data, "POST"));
	},

	request: function (url, data, type) {
		var self = this;

		if (type == undefined)
			type = "GET";
		if (data == undefined)
			data = {};

		$.Msg("Performing request to " + url + " with method " + type);

		return new Promise(function (resolve, reject) {
			$.AsyncWebRequest(url, {
				type: type,
				data: data,
				dataType: "json",
				timeout: self.timeout,
				headers : {'X-Dota-Server-Key' : CustomNetTables.GetTableValue("game_options", "server_key")["1"]},
				success: function (obj) {
					if (obj.error || !obj.data)
						reject("Request to '" + url + "' failed: " + (obj.message ? obj.message : "unknown error"));
					else
						resolve(obj.data);
				},
				error: function (err) {
					$.Msg("Received error: ");
					$.Msg(err);

					var before = err.responseText;
					var length = before.length; 

					var actual = "";
					for (var i = 0; i < length - 1; i++) {
						actual += before[i];
					} 

					reject(JSON.parse(actual));
				}
			});
		})
	},
};

if (Game.IsInToolsMode()) {

	var info = {
		steamid: "76561198057206770",
		hero: "npc_dota_hero_zuus",
	};

	api.get_player_armory(info).then(function (data) {
		$.Msg(data);
	}).catch(function (err) {
		$.Msg(err)
	});
/*

	var info = {
		steamid: "76561198057206770",
		item_id: "13042",
		slot_id: "persona_selector",
		hero: "npc_dota_hero_invoker",
	};

	api.update_player_armory(info).then(function (data) {
		$.Msg(data);
	}).catch(function (err) {
		$.Msg(err)
	});
*/
}

/*
var api = {
	base : "http://api.frostrose-studio.com/",
	urls : {
		modifyCompanion : "imba/modify-companion",
		modifyStatue : "imba/modify-statue",
		modifyEmblem : "imba/modify-emblem",
//		rankingsImr5v5 : "imba/meta/rankings/imr-5v5",
//		rankingsImr10v10 : "imba/meta/rankings/imr-10v10",
//		rankingsLevel1v1 : "imba/meta/rankings/level-1v1",
		toggleIngameTag : "imba/toggle-ingame-tag",
		toggleBPRewards : "imba/toggle-bp-rewards",
		togglePlayerXP : "imba/toggle-player-xp",
		toggleWinrate : "imba/toggle-winrate",
		rankingsXp : "website/statistics/ranking/xp",
		rankingsWinrate : "website/statistics/ranking/winrate",
		PlayerPosition : "imba/trackme",
	},
	updateCompanion : function(data, success_callback, error_callback) {
		$.AsyncWebRequest(api.base + api.urls.modifyCompanion, {
			type : "POST",
			dataType : "json",
			data : data,
			timeout : 5000,
			headers : {'X-Dota-Server-Key' : secret_key},
			success : function(obj) {
				if (obj.error) {
//					$.Msg("Error updating companion");
					error_callback();
				} else {
//					$.Msg("Updated companion");
					success_callback();
				}
			},
			error : function(err) {
//				$.Msg("Error updating companion" + JSON.stringify(err));
				error_callback();
			}
		});
	},
	updateStatue : function(data, success_callback, error_callback) {
		$.AsyncWebRequest(api.base + api.urls.modifyStatue, {
			type : "POST",
			dataType : "json",
			data : data,
			timeout : 5000,
			headers : {'X-Dota-Server-Key' : secret_key},
			success : function(obj) {
				if (obj.error) {
					$.Msg("Error updating statue");
					error_callback();
				} else {
					$.Msg("Updated statue");
					success_callback();
				}
			},
			error : function(err) {
				$.Msg("Error updating statue " + JSON.stringify(err));
				error_callback();
			}
		});
	},
	updateEmblem : function(data, success_callback, error_callback) {
		$.AsyncWebRequest(api.base + api.urls.modifyEmblem, {
			type : "POST",
			dataType : "json",
			data : data,
			timeout : 5000,
			headers : {'X-Dota-Server-Key' : secret_key},
			success : function(obj) {
				if (obj.error) {
					$.Msg("Error updating emblem");
					error_callback();
				} else {
					$.Msg("Updated emblem");
					success_callback();
				}
			},
			error : function(err) {
				$.Msg("Error updating emblem " + JSON.stringify(err));
				error_callback();
			}
		});
	},
	updateIngameTag : function(data, success_callback, error_callback) {
		$.AsyncWebRequest(api.base + api.urls.toggleIngameTag, {
			type : "POST",
			dataType : "json",
			data : data,
			timeout : 5000,
			headers : {'X-Dota-Server-Key' : secret_key},
			success : function(obj) {
//				$.Msg(obj)
				if (obj.error) {
					$.Msg("Error updating ingame tag");
					error_callback();
				} else {
					$.Msg("Updated ingame tag");
					success_callback();
				}
			},
			error : function(err) {
				$.Msg("Error ingame tag " + JSON.stringify(err));
				error_callback();
			}
		});
	},
	updateBPRewards : function(data, success_callback, error_callback) {
		$.AsyncWebRequest(api.base + api.urls.toggleBPRewards, {
			type : "POST",
			dataType : "json",
			data : data,
			timeout : 5000,
			headers : {'X-Dota-Server-Key' : secret_key},
			success : function(obj) {
//				$.Msg(obj)
				if (obj.error) {
					$.Msg("Error updating bp rewards");
					error_callback();
				} else {
					$.Msg("Updated bp rewards");
					success_callback();
				}
			},
			error : function(err) {
				$.Msg("Error bp rewards " + JSON.stringify(err));
				error_callback();
			}
		});
	},
	updatePlayerXP : function(data, success_callback, error_callback) {
		$.AsyncWebRequest(api.base + api.urls.togglePlayerXP, {
			type : "POST",
			dataType : "json",
			data : data,
			timeout : 5000,
			headers : {'X-Dota-Server-Key' : secret_key},
			success : function(obj) {
//				$.Msg(obj)
				if (obj.error) {
					$.Msg("Error updating ply xp");
					error_callback();
				} else {
					$.Msg("Updated ply xp");
					success_callback();
				}
			},
			error : function(err) {
				$.Msg("Error ply xp " + JSON.stringify(err));
				error_callback();
			}
		});
	},
	updateWinrate : function(data, success_callback, error_callback) {
		$.AsyncWebRequest(api.base + api.urls.toggleWinrate, {
			type : "POST",
			dataType : "json",
			data : data,
			timeout : 5000,
			headers : {'X-Dota-Server-Key' : secret_key},
			success : function(obj) {
//				$.Msg(obj)
				if (obj.error) {
					$.Msg("Error updating winrate");
					error_callback();
				} else {
					$.Msg("Updated winrate");
					success_callback();
				}
			},
			error : function(err) {
				$.Msg("Error winrate " + JSON.stringify(err));
				error_callback();
			}
		});
	},
	getTopPlayerXP : function(callback) {
		$.AsyncWebRequest(api.base + api.urls.rankingsXp, {
			type : "GET",
			dataType : "json",
			timeout : 5000,
			headers : {'X-Dota-Server-Key' : secret_key, 'X-Dota-Game-Type' : game_type},
			success : function(obj) {
				if (obj.error || !obj.data || !obj.data.players)
					$.Msg("Error finding top xp");
				else {
					callback(obj.data.players);
				}
			},
			error : function(err) {
				$.Msg("Error finding top xp " + JSON.stringify(err));
			}
		});
	},
	getTopPlayerWinrate : function(callback) {
		$.AsyncWebRequest(api.base + api.urls.rankingsWinrate, {
			type : "GET",
			dataType : "json",
			timeout : 5000,
			headers : {'X-Dota-Server-Key' : secret_key},
			success : function(obj) {
				if (obj.error || !obj.data || !obj.data)
					$.Msg("Error finding top winrate");
				else {
					callback(obj.data);
				}
			},
			error : function(err) {
				$.Msg("Error finding top winrate " + JSON.stringify(err));
			}
		});
	},
	getPlayerPosition : function(data, callback) {
		$.AsyncWebRequest(api.base + api.urls.PlayerPosition, {
			type : "GET",
			data : data,
			dataType : "json",
			timeout : 5000,
			headers : {'X-Dota-Server-Key' : secret_key},
			success : function(obj) {
				if (obj.error)
					$.Msg("Error finding player position");
				else {
					callback(obj.data);
				}
			},
			error : function(err) {
				$.Msg("Error finding player position " + JSON.stringify(err));
			}
		});
	},
};
*/
