# frozen_string_literal: true

module Types
  class QueryType < Types::BaseObject
    description 'Available queries'

    # Add `node(id: ID!) and `nodes(ids: [ID!]!)`
    include GraphQL::Types::Relay::HasNodeField
    include GraphQL::Types::Relay::HasNodesField

    # Add root-level fields here.
    # They will be entry points for queries on your schema.

    field :character_classes, description: 'Finds all character classes',   resolver: Queries::CharacterClasses

    field :races,             description: 'Finds all races',               resolver: Queries::Races

    field :levels,            description: 'Finds all levels',              resolver: Queries::Levels

    field :spells,            description: 'Finds all spells',              resolver: Queries::Spells
  end
end
