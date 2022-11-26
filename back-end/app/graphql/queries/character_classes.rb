# frozen_string_literal: true

module Queries
  class CharacterClasses < Queries::BaseQuery
    type [Types::DungeonsAndDragons::CharacterClass], null: false

    def resolve
      ::CharacterClass.all
    end
  end
end
