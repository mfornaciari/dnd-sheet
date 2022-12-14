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

ActiveRecord::Schema[7.0].define(version: 2022_11_19_132952) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  # Custom types defined in this database.
  # Note that some types may not work with other database engines. Be careful if changing database.
  create_enum "spell_component", ["material", "somatic", "verbal"]
  create_enum "spell_school", ["abjuration", "conjuration", "divination", "enchantment", "evocation", "illusion", "necromancy", "transmutation"]

  create_table "character_classes", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_character_classes_on_name", unique: true
  end

  create_table "levels", force: :cascade do |t|
    t.integer "number", null: false
    t.integer "min_experience", null: false
    t.integer "max_experience", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["max_experience"], name: "index_levels_on_max_experience", unique: true
    t.index ["min_experience"], name: "index_levels_on_min_experience", unique: true
    t.index ["number"], name: "index_levels_on_number", unique: true
  end

  create_table "races", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_races_on_name", unique: true
  end

  create_table "spell_character_classes", force: :cascade do |t|
    t.bigint "spell_id", null: false
    t.bigint "character_class_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["character_class_id"], name: "index_spell_character_classes_on_character_class_id"
    t.index ["spell_id"], name: "index_spell_character_classes_on_spell_id"
  end

  create_table "spells", force: :cascade do |t|
    t.string "name", null: false
    t.integer "level", null: false
    t.enum "school", null: false, enum_type: "spell_school"
    t.string "casting_time", null: false
    t.string "range", null: false
    t.enum "components", null: false, array: true, enum_type: "spell_component"
    t.string "material_components"
    t.string "duration", null: false
    t.string "description", null: false
    t.string "at_higher_levels"
    t.boolean "ritual", null: false
    t.boolean "in_srd", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["description"], name: "index_spells_on_description", unique: true
    t.index ["name"], name: "index_spells_on_name", unique: true
  end

  add_foreign_key "spell_character_classes", "character_classes"
  add_foreign_key "spell_character_classes", "spells"
end
