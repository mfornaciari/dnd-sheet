# frozen_string_literal: true

module Types
  module DungeonsAndDragons
    class LevelType < Types::BaseObject
      description 'A D&D 5th edition character class level based on experience'

      field :id,             ID,      null: false, description: "Level's ID in the database"
      field :level,          Integer, null: false, description: "Level's number"
      field :min_experience, Integer, null: false, description: 'Minimum experience to reach this level'
      field :max_experience, Integer, null: false, description: 'Maximum experience before leveling up'
    end
  end
end
