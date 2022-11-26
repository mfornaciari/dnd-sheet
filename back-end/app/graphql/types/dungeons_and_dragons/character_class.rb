# frozen_string_literal: true

module Types
  module DungeonsAndDragons
    class CharacterClass < Types::BaseObject
      description 'A D&D 5th edition playable character class'

      field :id,   ID,     null: false, description: "Character class' ID in the database"
      field :name, String, null: false, description: "Character class' name"
    end
  end
end
