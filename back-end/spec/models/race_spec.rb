require 'rails_helper'

RSpec.describe Race, type: :model do
  subject(:race) { create :race, name: 'Anão' }

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_uniqueness_of(:name) }
end
