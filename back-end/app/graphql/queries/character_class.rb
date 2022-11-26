# frozen_string_literal: true

module Queries
  class CharacterClass < Queries::BaseQuery
    description 'Finds a character class by ID'

    argument :id, ID, description: "A character class' ID in the database", required: true

    type Types::CharacterClassType, null: false

    def resolve(id:)
      ::CharacterClass.find(id)
    end
  end
end
