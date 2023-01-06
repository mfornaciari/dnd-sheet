# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  before { LEVELS.each { |hash| create(:level, hash) } }

  it 'returns all levels' do
    db_records = Level.all
    serialized_records = db_records.as_json(except: %i[id created_at updated_at])
    expected_response = camelized_hash_array(serialized_records)

    graphql_query('levels { number minExperience maxExperience }')

    expect(JSON.parse(response.body)['data']['levels']).to eq(expected_response)
  end
end
