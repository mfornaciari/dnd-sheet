# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  let(:classes_json) { File.read(Rails.public_path.join('data/character_classes.json')) }

  before { JSON.parse(classes_json, symbolize_names: true).each { |hash| create :character_class, hash } }

  it 'returns all classes' do
    expected_response = expected_response(classes_json, key: :characterClasses)

    graphql_query('characterClasses { id name }')

    expect(JSON.parse(response.body, symbolize_names: true)).to eq(expected_response)
  end

  it 'finds first class by ID and returns it' do
    expected_response = expected_response(classes_json, key: :characterClass, first: true)

    graphql_query('characterClass(id: 1) { id name }')

    expect(JSON.parse(response.body, symbolize_names: true)).to eq(expected_response)
  end
end
