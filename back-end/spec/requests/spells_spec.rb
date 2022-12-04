# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  before do
    CHARACTER_CLASSES.each { |hash| create(:character_class, hash) }
    SPELLS.each { |hash| create(:spell, hash) }
  end

  it 'returns all spells' do
    expected_response = expected_response(SPELLS, key: 'spells')

    graphql_query('spells { id name level characterClasses { id name } school castingTime range ' \
                  'components materialComponents duration description atHigherLevels ritual inSrd }')

    expect(JSON.parse(response.body)).to eq(expected_response)
  end
end
