# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  let(:races_json) { File.read(Rails.public_path.join('data/races.json')) }

  before { JSON.parse(races_json, symbolize_names: true).each { |hash| create :race, hash } }

  it 'returns all races' do
    expected_response = expected_response(races_json, key: :races)

    graphql_query('races { id name }')

    expect(JSON.parse(response.body, symbolize_names: true)).to eq(expected_response)
  end

  it 'finds first race by ID and returns it' do
    expected_response = expected_response(races_json, key: :race, first: true)

    graphql_query('race(id: 1) { id name }')

    expect(JSON.parse(response.body, symbolize_names: true)).to eq(expected_response)
  end
end
