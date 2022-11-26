# frozen_string_literal: true

module Queries
  class Races < Queries::BaseQuery
    description 'Finds all races'

    type [Types::RaceType], null: false

    def resolve
      ::Race.all
    end
  end
end
