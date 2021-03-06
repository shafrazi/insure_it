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

ActiveRecord::Schema.define(version: 2021_02_14_092307) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "customers", force: :cascade do |t|
    t.string "uid"
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "insurance_policies", force: :cascade do |t|
    t.string "policy_no"
    t.string "insurer"
    t.decimal "value"
    t.string "insurance_type"
    t.date "current_expiry"
    t.string "asset"
    t.bigint "customer_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "customer_name"
    t.index ["customer_id"], name: "index_insurance_policies_on_customer_id"
  end

  create_table "renewals", force: :cascade do |t|
    t.string "policy_no"
    t.date "start_date"
    t.date "expiry_date"
    t.bigint "insurance_policy_id", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "insurer"
    t.index ["insurance_policy_id"], name: "index_renewals_on_insurance_policy_id"
  end

  add_foreign_key "insurance_policies", "customers"
  add_foreign_key "renewals", "insurance_policies"
end
