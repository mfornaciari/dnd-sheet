# frozen_string_literal: true

module Types
  module DungeonsAndDragons
    class Race < Types::BaseObject
      description 'A D&D 5th edition playable race'

      field :id,   ID,     null: false, description: "Race's ID in the database"
      field :name, String, null: false, description: "Race's name"
    end
  end
end
