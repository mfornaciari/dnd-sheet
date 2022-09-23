# frozen_string_literal: true

class_names = %w[Bárbaro Bardo Bruxo Clérigo Druida Feiticeiro Guardião Guerreiro Ladino Mago Monge Paladino]
class_names.each { |name| FactoryBot.create :character_class, name: name }

puts 'Seeding finished'
