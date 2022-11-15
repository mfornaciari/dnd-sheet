# frozen_string_literal: true

require 'rails_helper'

describe Level do
  subject(:level) { create(:level, level: 1, min_experience: 0, max_experience: 300) }

  it { is_expected.to validate_presence_of(:level) }
  it { is_expected.to validate_presence_of(:min_experience) }
  it { is_expected.to validate_presence_of(:max_experience) }
  it { is_expected.to validate_uniqueness_of(:level) }
  it { is_expected.to validate_uniqueness_of(:min_experience) }
  it { is_expected.to validate_uniqueness_of(:max_experience) }
end
