# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  before { RACES.each { |hash| create(:race, hash) } }

  it 'returns all races' do
    db_records = Race.all
    serialized_records = db_records.as_json(except: %i[id created_at updated_at])
    expected_response = camelized_hash_array(serialized_records)

    graphql_query('races { name }')

    expect(JSON.parse(response.body)['data']['races']).to eq(expected_response)
  end
end
