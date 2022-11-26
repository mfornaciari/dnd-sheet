# frozen_string_literal: true

module Queries
  class CharacterClasses < Queries::BaseQuery
    description 'Finds all character classes'

    type [Types::CharacterClassType], null: false

    def resolve
      ::CharacterClass.all
    end
  end
end
