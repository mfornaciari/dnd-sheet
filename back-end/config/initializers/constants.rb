# frozen_string_literal: true

MAGIC_SCHOOL_NAMES = %w[
  abjuration
  conjuration
  divination
  enchantment
  evocation
  illusion
  necromancy
  transmutation
].freeze

COMPONENTS = %w[
  material
  somatic
  verbal
].freeze

# Load data from YAML files in public/data

CHARACTER_CLASSES = YAML.load(Rails.public_path.join('data/character_classes.yml').read).freeze
RACES = YAML.load(Rails.public_path.join('data/races.yml').read).freeze
LEVELS = YAML.load(Rails.public_path.join('data/levels.yml').read).freeze
SPELLS = YAML.load(Rails.public_path.join('data/spells.yml').read).freeze
