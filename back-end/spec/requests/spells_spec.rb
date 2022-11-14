# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  let(:spells_json) { File.read(Rails.public_path.join('data/spells.json')) }

  before { JSON.parse(spells_json, symbolize_names: true).each { |hash| create :spell, hash } }

  it 'returns all spells' do
    expected_response = expected_response(spells_json, key: :spells)

    graphql_query('spells { id name }')

    expect(JSON.parse(response.body, symbolize_names: true)).to eq(expected_response)
  end
end
