# frozen_string_literal: true

require 'rails_helper'

describe Race do
  subject(:race) { build(:race, RACES.first) }

  it { is_expected.to validate_presence_of(:name) }

  it { is_expected.to validate_uniqueness_of(:name) }

  context 'when retrieving multiple records' do
    it 'returns records ordered by name' do
      RACES.each { |race_hash| create(:race, race_hash) }

      expect(described_class.all).to eq described_class.order(:name)
    end
  end
end
