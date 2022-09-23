# frozen_string_literal: true

module Types
  class LevelType < Types::BaseObject
    field :id, ID, null: false
    field :level, Integer, null: false
    field :min_experience, Integer, null: false
    field :max_experience, Integer, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :updated_at, GraphQL::Types::ISO8601DateTime, null: false
  end
end
