# frozen_string_literal: true

require 'rails_helper'

describe Level do
  subject(:level) { build(:level, LEVELS.first) }

  it { is_expected.to validate_presence_of(:number) }
  it { is_expected.to validate_presence_of(:min_experience) }
  it { is_expected.to validate_presence_of(:max_experience) }

  it { is_expected.to validate_uniqueness_of(:number) }
  it { is_expected.to validate_uniqueness_of(:min_experience) }
  it { is_expected.to validate_uniqueness_of(:max_experience) }

  context 'when retrieving multiple records' do
    it 'returns records ordered by level' do
      LEVELS.each { |level_hash| create(:level, level_hash) }

      expect(described_class.all).to eq described_class.order(:number)
    end
  end
end
