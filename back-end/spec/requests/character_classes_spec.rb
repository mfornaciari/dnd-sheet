# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  it 'returns character class data' do
    create :character_class, name: 'Bardo'

    post '/graphql', params: { query: query(name: 'Bardo') }

    expect(response.body).to include('Bardo')
  end
end
