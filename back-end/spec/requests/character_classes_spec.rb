# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  it 'returns character class data' do
    create :character_class, name: 'Bardo'
    expected_response = { data: { characterClasses: [{ name: 'Bardo' }] } }

    post '/graphql', params: { query: 'query { characterClasses { name } }' }

    expect(JSON.parse(response.body, symbolize_names: true)).to eq(expected_response)
  end
end
