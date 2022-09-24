# frozen_string_literal: true

class_names = %w[Bárbaro Bardo Bruxo Clérigo Druida Feiticeiro Guardião Guerreiro Ladino Mago Monge Paladino]
class_names.each { |name| FactoryBot.create :character_class, name: name }

race_names = %w[Anão Draconato Elfo Gnomo Humano Meio-elfo Meio-orc Pequenino Tiferino]
race_names.each { |name| FactoryBot.create :race, name: name }

levels = [
  {
    id: 0,
    level: 1,
    min_experience: 0,
    max_experience: 299
  },
  {
    id: 1,
    level: 2,
    min_experience: 300,
    max_experience: 899
  },
  {
    id: 2,
    level: 3,
    min_experience: 900,
    max_experience: 2699
  },
  {
    id: 3,
    level: 4,
    min_experience: 2700,
    max_experience: 6499
  },
  {
    id: 4,
    level: 5,
    min_experience: 6500,
    max_experience: 13_999
  },
  {
    id: 5,
    level: 6,
    min_experience: 14_000,
    max_experience: 22_999
  },
  {
    id: 6,
    level: 7,
    min_experience: 23_000,
    max_experience: 33_999
  },
  {
    id: 7,
    level: 8,
    min_experience: 34_000,
    max_experience: 47_999
  },
  {
    id: 8,
    level: 9,
    min_experience: 48_000,
    max_experience: 63_999
  },
  {
    id: 9,
    level: 10,
    min_experience: 64_000,
    max_experience: 84_999
  },
  {
    id: 10,
    level: 11,
    min_experience: 85_000,
    max_experience: 99_999
  },
  {
    id: 11,
    level: 12,
    min_experience: 100_000,
    max_experience: 119_999
  },
  {
    id: 12,
    level: 13,
    min_experience: 120_000,
    max_experience: 139_999
  },
  {
    id: 13,
    level: 14,
    min_experience: 140_000,
    max_experience: 164_999
  },
  {
    id: 14,
    level: 15,
    min_experience: 165_000,
    max_experience: 194_999
  },
  {
    id: 15,
    level: 16,
    min_experience: 195_000,
    max_experience: 224_999
  },
  {
    id: 16,
    level: 17,
    min_experience: 225_000,
    max_experience: 264_999
  },
  {
    id: 17,
    level: 18,
    min_experience: 265_000,
    max_experience: 304_999
  },
  {
    id: 18,
    level: 19,
    min_experience: 305_000,
    max_experience: 354_999
  },
  {
    id: 19,
    level: 20,
    min_experience: 355_000,
    max_experience: 999_999
  }
]

levels.each { |level_hash| FactoryBot.create :level, level_hash }
