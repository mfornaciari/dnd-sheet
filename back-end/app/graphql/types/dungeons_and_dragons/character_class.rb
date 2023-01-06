# frozen_string_literal: true

module Types
  module DungeonsAndDragons
    class CharacterClass < Types::BaseObject
      description 'A D&D 5th edition playable character class'

      SpellType = Types::DungeonsAndDragons::Spell

      field :name,   String,      null: false, description: 'Capitalized character class name'
      field :spells, [SpellType], null: true,  description: 'Spells this class can cast'
    end
  end
end
