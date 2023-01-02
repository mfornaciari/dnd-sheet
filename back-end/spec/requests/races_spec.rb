# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  let(:tested_races) { RACES.sort_by { |race| race['name'] } }

  before { tested_races.each { |hash| create(:race, hash) } }

  it 'returns all races' do
    expected_response = expected_response(tested_races, key: 'races')

    graphql_query('races { name }')

    expect(JSON.parse(response.body)['data']['races']).to match_array(expected_response['data']['races'])
  end
end
