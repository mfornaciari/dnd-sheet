# frozen_string_literal: true

module Queries
  class Race < Queries::BaseQuery
    argument :id, ID, description: "A race's ID in the database", required: true

    type Types::DungeonsAndDragons::Race, null: false

    def resolve(id:)
      ::Race.find(id)
    end
  end
end
