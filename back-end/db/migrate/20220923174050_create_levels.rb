class CreateLevels < ActiveRecord::Migration[7.0]
  def change
    create_table :levels do |t|
      t.integer :level, null: false
      t.integer :min_experience, null: false
      t.integer :max_experience, null: false

      t.timestamps
    end

    add_index :levels, :level, unique: true
    add_index :levels, :min_experience, unique: true
    add_index :levels, :max_experience, unique: true
  end
end
