# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  before { LEVELS.each { |hash| create(:level, hash) } }

  it 'returns all levels' do
    expected_response = expected_response(LEVELS, key: 'levels')

    graphql_query('levels { id level minExperience maxExperience }')

    expect(JSON.parse(response.body)).to eq(expected_response)
  end

  it 'finds first level by ID and returns it' do
    expected_response = expected_response(LEVELS, key: 'level', first: true)

    graphql_query('level(id: 0) { id level minExperience maxExperience }')

    expect(JSON.parse(response.body)).to eq(expected_response)
  end
end
