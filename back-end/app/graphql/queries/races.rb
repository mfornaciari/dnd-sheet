# frozen_string_literal: true

module Queries
  class Races < Queries::BaseQuery
    type [Types::DungeonsAndDragons::Race], null: false

    def resolve
      ::Race.all
    end
  end
end
