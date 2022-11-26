# frozen_string_literal: true

module Queries
  class CharacterClasses < Queries::BaseQuery
    type [Types::DungeonsAndDragons::CharacterClassType], null: false

    def resolve
      ::CharacterClass.all
    end
  end
end
