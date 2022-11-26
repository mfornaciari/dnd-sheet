# frozen_string_literal: true

module Queries
  class Race < Queries::BaseQuery
    description 'Finds a race by ID'

    argument :id, ID, description: "A race's ID in the database", required: true

    type Types::RaceType, null: false

    def resolve(id:)
      ::Race.find(id)
    end
  end
end
