# frozen_string_literal: true

module Queries
  class CharacterClass < Queries::BaseQuery
    argument :id, ID, description: "A character class' ID in the database", required: true

    type Types::DungeonsAndDragons::CharacterClassType, null: false

    def resolve(id:)
      ::CharacterClass.find(id)
    end
  end
end
