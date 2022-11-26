# frozen_string_literal: true

require 'rails_helper'

describe Level do
  subject(:level) { create(:level, JSON.parse(levels_json, symbolize_names: true).first) }

  let(:levels_json) { Rails.public_path.join('data/levels.json').read }

  it { is_expected.to validate_presence_of(:level) }
  it { is_expected.to validate_presence_of(:min_experience) }
  it { is_expected.to validate_presence_of(:max_experience) }

  it { is_expected.to validate_uniqueness_of(:level) }
  it { is_expected.to validate_uniqueness_of(:min_experience) }
  it { is_expected.to validate_uniqueness_of(:max_experience) }
end
