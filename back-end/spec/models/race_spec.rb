# frozen_string_literal: true

require 'rails_helper'

describe Race do
  subject(:race) { create(:race, RACES.first) }

  it { is_expected.to validate_presence_of(:name) }

  it { is_expected.to validate_uniqueness_of(:name) }
end
