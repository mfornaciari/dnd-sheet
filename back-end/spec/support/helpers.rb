# frozen_string_literal: true

module TestHelpers
  def expected_response(json_data, key:, first: false)
    formatted_data = JSON.parse(json_data.camelize, symbolize_names: true)
    returned_data = first ? formatted_data.first : formatted_data
    { data: { key => returned_data } }
  end

  def graphql_query(query_string)
    post '/graphql', params: { query: "query { #{query_string} }" }
  end
end

RSpec.configure do |config|
  config.include TestHelpers
end
