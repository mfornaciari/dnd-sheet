# frozen_string_literal: true

module Queries
  class Level < Queries::BaseQuery
    argument :id, ID, description: "A level's ID in the database", required: true

    type Types::DungeonsAndDragons::LevelType, null: false

    def resolve(id:)
      ::Level.find(id)
    end
  end
end
