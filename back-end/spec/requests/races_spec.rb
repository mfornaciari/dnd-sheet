# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  before { RACES.each { |hash| create(:race, hash) } }

  it 'returns all races' do
    expected_response = expected_response(RACES, key: 'races')

    graphql_query('races { id name }')

    expect(JSON.parse(response.body)).to eq(expected_response)
  end

  it 'finds first race by ID and returns it' do
    expected_response = expected_response(RACES, key: 'race', first: true)

    graphql_query('race(id: 0) { id name }')

    expect(JSON.parse(response.body)).to eq(expected_response)
  end
end
