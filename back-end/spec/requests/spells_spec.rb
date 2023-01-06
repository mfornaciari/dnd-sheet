# frozen_string_literal: true

require 'rails_helper'

describe 'POST /graphql' do
  before do
    CHARACTER_CLASSES.each { |hash| create(:character_class, hash) }
    SPELLS[0..20].each { |hash| create(:spell, hash) }
  end

  it 'returns all spells' do
    db_records = Spell.includes(:character_classes)
    serialized_records = db_records.as_json(include: { character_classes: { only: :name } },
                                            except: %i[id created_at updated_at])
    expected_response = camelized_hash_array(serialized_records)

    graphql_query('spells { name level characterClasses { name } school castingTime range ' \
                  'components materialComponents duration description atHigherLevels ritual inSrd }')

    expect(JSON.parse(response.body)['data']['spells']).to eq(expected_response)
  end
end
