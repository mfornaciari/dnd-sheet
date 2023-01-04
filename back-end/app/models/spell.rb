# frozen_string_literal: true

class Spell < ApplicationRecord
  extend ArrayEnum

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
            subset: COMPONENTS)

  validates(:name,
            :description,
            uniqueness: true)

  has_many :spell_character_classes, dependent: :destroy
  has_many :character_classes, through: :spell_character_classes

  enum school: MAGIC_SCHOOL_NAMES.index_by(&:to_sym)

  array_enum components: COMPONENTS.index_by(&:to_sym)

  default_scope -> { order(:name) }
end
