modifier_npc_dialog = class({})

function modifier_npc_dialog:IsHidden() return true end
function modifier_npc_dialog:IsPurgable() return false end

function modifier_npc_dialog:OnCreated( params )
	if not IsServer() then return end

	self:StartIntervalThink(3.0)
end

function modifier_npc_dialog:OnIntervalThink()
	self:StartIntervalThink(-1)

	for _, hero in pairs(HeroList:GetAllHeroes()) do
		if self:GetParent():GetUnitName() == "npc_dummy_unit_perma" then
			local netTable = {}
			netTable["DialogEntIndex"] = self:GetParent():entindex()
			netTable["PlayerHeroEntIndex"] = hero:entindex()
			if self:GetParent():GetTeamNumber() == 2 then
				netTable["DialogText"] = "#radiant_fountain_icefrog"
			else
				netTable["DialogText"] = "#dire_fountain_icefrog"
			end
			netTable["DialogAdvanceTime"] = 99999.0
			netTable["DialogLine"] = 1
			netTable["ShowAdvanceButton"] = false
			netTable["SendToAll"] = false
			netTable["JournalEntry"] = false
			CustomGameEventManager:Send_ServerToPlayer(hero:GetPlayerOwner(), "dialog", netTable)
		end
	end
end

--	netTable["DialogPlayerConfirm"] = Dialog.bPlayersConfirm
--	netTable["ConfirmToken"] = Dialog.szConfirmToken
--	netTable["WardenNote"] = hDialogEnt:FindAbilityByName( "ability_warden_note" ) ~= nil


function modifier_npc_dialog:DeclareFunctions()
	local funcs = 
	{
		MODIFIER_EVENT_ON_ATTACKED,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PHYSICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_MAGICAL,
		MODIFIER_PROPERTY_ABSOLUTE_NO_DAMAGE_PURE,
	}
	return funcs
end

function modifier_npc_dialog:CheckState()
	local state =
	{
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_BLIND] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
		[MODIFIER_STATE_LOW_ATTACK_PRIORITY] = true,
	}
	return state
end

function modifier_npc_dialog:GetAbsoluteNoDamagePhysical() return 1 end
function modifier_npc_dialog:GetAbsoluteNoDamageMagical() return 1 end
function modifier_npc_dialog:GetAbsoluteNoDamagePure() return 1 end

function modifier_npc_dialog:OnAttacked(keys)
	if not IsServer() then return end

	local attacker = keys.attacker
	local target = keys.target

	if target and target:GetUnitName() == "npc_dota_diretide_easter_egg" and attacker and attacker:GetPlayerOwner() then
		print("Easter egg!")
		if attacker:HasModifier("modifier_imba_fervor_stacks") then
			attacker:SetModifierStackCount("modifier_imba_fervor_stacks", attacker, attacker:GetModifierStackCount("modifier_imba_fervor_stacks", attacker) -1)
		elseif attacker:HasModifier("modifier_imba_juggernaut_blade_dance_wind_dance") then
			attacker:SetModifierStackCount("modifier_imba_juggernaut_blade_dance_wind_dance", attacker, attacker:GetModifierStackCount("modifier_imba_juggernaut_blade_dance_wind_dance", attacker) -1)
		elseif attacker:HasModifier("modifier_imba_juggernaut_blade_dance_secret_blade") then
			attacker:SetModifierStackCount("modifier_imba_juggernaut_blade_dance_secret_blade", attacker, attacker:GetModifierStackCount("modifier_imba_juggernaut_blade_dance_secret_blade", attacker) -1)
		elseif attacker:HasModifier("modifier_imba_juggernaut_blade_dance_jade_blossom") then
			attacker:SetModifierStackCount("modifier_imba_juggernaut_blade_dance_jade_blossom", attacker, attacker:GetModifierStackCount("modifier_imba_juggernaut_blade_dance_jade_blossom", attacker) -1)
		end

		local netTable = {}
		netTable["DialogEntIndex"] = target:entindex()
		netTable["PlayerHeroEntIndex"] = attacker:entindex()
		netTable["DialogText"] = "#roshan_easter_egg"
		netTable["DialogAdvanceTime"] = 5.0
		netTable["DialogLine"] = 1
		netTable["ShowAdvanceButton"] = false
		netTable["SendToAll"] = false
		netTable["JournalEntry"] = target:GetUnitName() == "npc_dota_diretide_easter_egg"
		CustomGameEventManager:Send_ServerToPlayer(attacker:GetPlayerOwner(), "dialog", netTable)
	end
end
