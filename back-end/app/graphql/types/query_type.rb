# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :character_classes, [Types::CharacterClassType], null: false

    def character_classes
      CharacterClass.all
    end

    field :character_class, Types::CharacterClassType, null: false do
      argument :id, ID, required: true
    end

    def character_class(id:)
      CharacterClass.find(id)
    end

    field :races, [Types::RaceType], null: false

    def races
      Race.all
    end

    field :race, Types::RaceType, null: false do
      argument :id, ID, required: true
    end

    def race(id:)
      Race.find(id)
    end
  end
end
