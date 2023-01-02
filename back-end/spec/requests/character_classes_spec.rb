# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  let(:tested_character_classes) { CHARACTER_CLASSES.sort_by { |character_class| character_class['name'] } }

  before { tested_character_classes.each { |hash| create(:character_class, hash) } }

  it 'returns all classes' do
    expected_response = expected_response(tested_character_classes, key: 'characterClasses')

    graphql_query('characterClasses { name }')

    expect(JSON.parse(response.body)['data']['characterClasses']).to eq(expected_response['data']['characterClasses'])
  end
end
