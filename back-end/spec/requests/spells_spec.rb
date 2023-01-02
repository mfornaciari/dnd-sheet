# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  let(:tested_spells) { SPELLS[0...10].sort_by { |spell| spell['name'] } }

  before do
    CHARACTER_CLASSES.each { |hash| create(:character_class, hash) }
    tested_spells.each { |hash| create(:spell, hash) }
  end

  it 'returns all spells' do
    expected_response = expected_response(tested_spells, key: 'spells')

    graphql_query('spells { name level characterClasses { name } school castingTime range ' \
                  'components materialComponents duration description atHigherLevels ritual inSrd }')

    expect(JSON.parse(response.body)).to eq(expected_response)
  end
end
