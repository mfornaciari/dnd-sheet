# frozen_string_literal: true

module Queries
  class Levels < Queries::BaseQuery
    description 'Finds all levels'

    type [Types::LevelType], null: false

    def resolve
      ::Level.all
    end
  end
end
