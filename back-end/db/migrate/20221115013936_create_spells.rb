class CreateSpells < ActiveRecord::Migration[7.0]
  def up
    create_enum :spell_school, %w[
      abjuration conjuration divination enchantment evocation illusion necromancy transmutation
    ]
    create_enum :spell_component, %w[verbal somatic material]

    create_table :spells do |t|
      t.string :name, null: false
      t.integer :level, null: false
      t.enum :school, null: false, enum_type: 'spell_school'
      t.string :casting_time, null: false
      t.string :range, null: false
      t.enum :components, null: false, array: true, enum_type: 'spell_component'
      t.string :material_component
      t.string :duration, null: false
      t.string :description, null: false
      t.string :at_higher_levels, null: false
      t.boolean :ritual, null: false
      t.boolean :in_srd, null: false

      t.timestamps
    end

    add_index :spells, :name, unique: true
  end

  def down
    remove_index :spells, :name
    remove_index :spells, :description

    drop_table :spells

    execute <<-SQL.squish
      DROP TYPE spell_school;
      DROP TYPE spell_component;
    SQL
  end
end
