# frozen_string_literal: true

module Queries
  class Spells < Queries::BaseQuery
    type [Types::DungeonsAndDragons::Spell], null: false

    def resolve
      ::Spell.includes(:character_classes)
    end
  end
end
