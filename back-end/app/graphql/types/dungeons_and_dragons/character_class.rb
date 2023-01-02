# frozen_string_literal: true

module Types
  module DungeonsAndDragons
    class CharacterClass < Types::BaseObject
      description 'A D&D 5th edition playable character class'

      field :name, String, null: false, description: 'Capitalized character class name'
    end
  end
end
