# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  let(:tested_spells) { SPELLS[0...10] }

  before do
    CHARACTER_CLASSES.each { |hash| create(:character_class, hash) }
    tested_spells.each { |hash| create(:spell, hash) }
  end

  it 'returns all spells' do
    expected_response = expected_response(tested_spells, key: 'spells')

    graphql_query('spells { id name level characterClasses { id name } school castingTime range ' \
                  'components materialComponents duration description atHigherLevels ritual inSrd }')

    expect(JSON.parse(response.body)['data']['spells']).to match_array(expected_response['data']['spells'])
  end
end
