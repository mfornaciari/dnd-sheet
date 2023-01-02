# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  before { CHARACTER_CLASSES.each { |hash| create(:character_class, hash) } }

  it 'returns all classes' do
    expected_response = expected_response(CHARACTER_CLASSES, key: 'characterClasses')

    graphql_query('characterClasses { id name }')

    expect(JSON.parse(response.body)).to eq(expected_response)
  end

  it 'finds first class by ID and returns it' do
    expected_response = expected_response(CHARACTER_CLASSES, key: 'characterClass', first: true)

    graphql_query('characterClass(id: 0) { id name }')

    expect(JSON.parse(response.body)).to eq(expected_response)
  end
end
