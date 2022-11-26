# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  let(:classes_json) { Rails.public_path.join('data/character_classes.json').read }
  let(:spells_json) { Rails.public_path.join('data/spells.json').read }

  before do
    JSON.parse(classes_json, symbolize_names: true).each { |hash| create(:character_class, hash) }
    JSON.parse(spells_json, symbolize_names: true).each { |hash| create(:spell, hash) }
  end

  it 'returns all spells' do
    expected_response = expected_response(spells_json, key: 'spells')

    graphql_query('spells { id name level characterClasses { id name } school castingTime range ' \
                  'components materialComponents duration description atHigherLevels ritual inSrd }')

    expect(JSON.parse(response.body)).to eq(expected_response)
  end
end
