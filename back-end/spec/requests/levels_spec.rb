# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  let(:tested_levels) { LEVELS.sort_by { |level| level['number'] } }

  before { tested_levels.each { |hash| create(:level, hash) } }

  it 'returns all levels' do
    expected_response = expected_response(tested_levels, key: 'levels')

    graphql_query('levels { number minExperience maxExperience }')

    expect(JSON.parse(response.body)['data']['levels']).to eq(expected_response['data']['levels'])
  end
end
