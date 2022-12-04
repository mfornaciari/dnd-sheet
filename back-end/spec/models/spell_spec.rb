# frozen_string_literal: true

require 'rails_helper'

describe Spell do
  subject(:spell) do
    CHARACTER_CLASSES.each { |hash| create(:character_class, hash) }
    create(:spell, SPELLS.first)
  end

  it { is_expected.to validate_presence_of(:name) }
  it { is_expected.to validate_presence_of(:level) }
  it { is_expected.to validate_presence_of(:school) }
  it { is_expected.to validate_presence_of(:casting_time) }
  it { is_expected.to validate_presence_of(:range) }
  it { is_expected.to validate_presence_of(:duration) }
  it { is_expected.to validate_presence_of(:description) }

  it { is_expected.to validate_numericality_of(:level).only_integer }

  it { is_expected.to validate_inclusion_of(:level).in_range(0..9).with_message('must be in 0..9') }

  it { is_expected.not_to allow_value(nil).for(:ritual) }
  it { is_expected.not_to allow_value(nil).for(:in_srd) }
  it { is_expected.not_to allow_values(nil, []).for(:components) }

  it { is_expected.to allow_values(COMPONENTS, COMPONENTS.first).for(:components) }
  it { is_expected.to allow_values(nil, 'acid arrow material components').for(:material_components) }
  it { is_expected.to allow_values(nil, 'acid arrow at higher levels').for(:at_higher_levels) }

  it { is_expected.to validate_uniqueness_of(:name) }
  it { is_expected.to validate_uniqueness_of(:description) }

  it { is_expected.to have_many(:spell_character_classes).dependent(:destroy) }
  it { is_expected.to have_many(:character_classes).through(:spell_character_classes) }

  it do
    expect(spell).to define_enum_for(:school)
      .backed_by_column_of_type(:enum)
      .with_values(MAGIC_SCHOOL_NAMES.index_by(&:to_sym))
  end
end
