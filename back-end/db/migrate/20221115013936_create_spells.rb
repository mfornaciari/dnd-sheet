class CreateSpells < ActiveRecord::Migration[7.0]
  def change
    create_table :spells do |t|
      t.string :name
      t.integer :level, default: 0
      t.integer :school, default: 0
      t.string :casting_time
      t.string :range
      t.string :components, array: true, default: []
      t.string :duration
      t.string :description
      t.string :at_higher_levels

      t.timestamps
    end
  end
end
