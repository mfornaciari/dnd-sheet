# frozen_string_literal: true

require 'rails_helper'

describe CharacterClass do
  subject(:character_class) { build(:character_class, CHARACTER_CLASSES.first) }

  it { is_expected.to validate_presence_of(:name) }

  it { is_expected.to validate_uniqueness_of(:name) }

  it { is_expected.to have_many(:spell_character_classes).dependent(:destroy) }
  it { is_expected.to have_many(:spells).through(:spell_character_classes) }

  context 'when retrieving multiple records' do
    it 'returns records ordered by name' do
      CHARACTER_CLASSES.each { |character_class_hash| create(:character_class, character_class_hash) }

      expect(described_class.all).to eq described_class.order(:name)
    end
  end
end
