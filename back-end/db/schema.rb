# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_09_23_174050) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "character_classes", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_character_classes_on_name", unique: true
  end

  create_table "levels", force: :cascade do |t|
    t.integer "level", null: false
    t.integer "min_experience", null: false
    t.integer "max_experience", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["level"], name: "index_levels_on_level", unique: true
    t.index ["max_experience"], name: "index_levels_on_max_experience", unique: true
    t.index ["min_experience"], name: "index_levels_on_min_experience", unique: true
  end

  create_table "races", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_races_on_name", unique: true
  end

end
