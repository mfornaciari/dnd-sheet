# frozen_string_literal: true

module TestHelpers
  ASSOCIATIONS = %w[character_class spell].freeze

  def graphql_query(query_string)
    post '/graphql', params: { query: "query { #{query_string} }" }
  end

  def camelized_hash_array(hash_array)
    hash_array.map { |hash| hash.deep_transform_keys { |key| key.camelize(:lower) } }
  end
end

RSpec.configure do |config|
  config.include TestHelpers
end
