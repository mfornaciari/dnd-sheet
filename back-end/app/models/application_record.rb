# frozen_string_literal: true

class ApplicationRecord < ActiveRecord::Base
  primary_abstract_class

  MAGIC_SCHOOL_NAMES = %w[abjuration
                          conjuration
                          divination
                          enchantment
                          evocation
                          illusion
                          necromancy
                          transmutation].freeze
  SPELL_COMPONENTS = %w[verbal somatic material].freeze
end
