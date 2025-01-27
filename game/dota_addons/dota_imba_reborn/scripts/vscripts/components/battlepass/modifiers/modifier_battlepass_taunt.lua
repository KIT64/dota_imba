modifier_battlepass_taunt = class({})

function modifier_battlepass_taunt:IsPurgable()
	return false
end

function modifier_battlepass_taunt:IsPurgeException()
	return false
end

function modifier_battlepass_taunt:IsHidden()
	return true
end

function modifier_battlepass_taunt:DeclareFunctions()
	return {
		MODIFIER_PROPERTY_OVERRIDE_ANIMATION,
		MODIFIER_PROPERTY_TRANSLATE_ACTIVITY_MODIFIERS,
	}
end

function modifier_battlepass_taunt:OnCreated(params)
	if IsServer() then
		CustomNetTables:SetTableValue("player_table", "bp_taunt_translate_anim_"..self:GetParent():GetPlayerOwnerID(), {params.taunt_anim_translate})

		print(CustomNetTables:GetTableValue("player_table", "bp_taunt_translate_anim_"..self:GetParent():GetPlayerOwnerID())["1"])
--[[
		local table = {}
		table["npc_dota_hero_invoker"] = 1
		table["npc_dota_hero_leshrac"] = 2
		table["npc_dota_hero_lion"] = 3
		table["npc_dota_hero_windrunner"] = 4
		table["npc_dota_hero_pangolier"] = 5
		table["npc_dota_hero_dark_willow"] = 6

		if table[self:GetParent():GetUnitName()] then
			self:SetStackCount(table[self:GetParent():GetUnitName()])
		end
--]]
	end
end

function modifier_battlepass_taunt:GetActivityTranslationModifiers()
	if CustomNetTables:GetTableValue("player_table", "bp_taunt_translate_anim_"..self:GetParent():GetPlayerOwnerID()) then
		return CustomNetTables:GetTableValue("player_table", "bp_taunt_translate_anim_"..self:GetParent():GetPlayerOwnerID())["1"]
	else
		return ""
	end
--[[
	local table = {}
	table[0] = ""
	table[1] = "juggle_gesture"
	table[2] = "disco_gesture"
	table[3] = "hell_gesture"
	table[4] = "blowkiss_gesture"
	table[5] = "bombadillo"
	table[6] = "rope"

	return table[self:GetStackCount()]
--]]
end

function modifier_battlepass_taunt:GetOverrideAnimation()
	return ACT_DOTA_TAUNT
end
