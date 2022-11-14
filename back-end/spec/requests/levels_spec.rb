# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  let(:levels_json) { File.read(Rails.public_path.join('data/levels.json')) }

  before { JSON.parse(levels_json, symbolize_names: true).each { |hash| create :level, hash } }

  it 'returns all levels' do
    expected_response = expected_response(levels_json, key: :levels)

    graphql_query('levels { id level minExperience maxExperience }')

    expect(JSON.parse(response.body, symbolize_names: true)).to eq(expected_response)
  end

  it 'finds first level by ID and returns it' do
    expected_response = expected_response(levels_json, key: :level, first: true)

    graphql_query('level(id: 1) { id level minExperience maxExperience }')

    expect(JSON.parse(response.body, symbolize_names: true)).to eq(expected_response)
  end
end
