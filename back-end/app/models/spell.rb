# frozen_string_literal: true

class Spell < ApplicationRecord
  extend ArrayEnum

  has_many :spell_character_classes, dependent: :destroy
  has_many :character_classes, through: :spell_character_classes

  enum school: MAGIC_SCHOOL_NAMES.index_by(&:to_sym)

  array_enum components: SPELL_COMPONENTS.index_by(&:to_sym)

  validates(:name,
            :level,
            :school,
            :casting_time,
            :range,
            :components,
            :duration,
            :description,
            presence: true)

  validates(:level,
            numericality: { in: 0..9, only_integer: true })

  validates(:ritual,
            :in_srd,
            inclusion: [true, false])

  validates(:components,
            subset: SPELL_COMPONENTS)

  validates(:name,
            :description,
            uniqueness: true)
end
