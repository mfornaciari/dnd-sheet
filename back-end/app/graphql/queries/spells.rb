# frozen_string_literal: true

module Queries
  class Spells < Queries::BaseQuery
    type [Types::DungeonsAndDragons::SpellType], null: false

    def resolve
      ::Spell.all
    end
  end
end
