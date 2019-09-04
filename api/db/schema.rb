# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_09_04_093200) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "orders", force: :cascade do |t|
    t.bigint "private_token_id", null: false
    t.bigint "maker_id", null: false
    t.bigint "taker_id"
    t.decimal "price", null: false
    t.decimal "amount", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["maker_id"], name: "index_orders_on_maker_id"
    t.index ["private_token_id", "price", "created_at"], name: "index_orders_on_private_token_id_and_price_and_created_at"
    t.index ["taker_id"], name: "index_orders_on_taker_id"
  end

  create_table "private_tokens", force: :cascade do |t|
    t.string "symbol", null: false
    t.bigint "owner_id", null: false
    t.decimal "initial_price", null: false
    t.integer "purchase_count", default: 0
    t.string "charity", null: false
    t.boolean "mintable", default: true
    t.string "category", null: false
    t.string "offers", null: false
    t.text "description", null: false
    t.json "social_links"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_private_tokens_on_owner_id", unique: true
    t.index ["symbol"], name: "index_private_tokens_on_symbol", unique: true
  end

  create_table "redeem_requests", force: :cascade do |t|
    t.bigint "private_token_id", null: false
    t.bigint "owner_id", null: false
    t.bigint "sender_id", null: false
    t.bigint "amount", null: false
    t.boolean "signed_by_owner", default: false
    t.boolean "signed_by_sender", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["owner_id"], name: "index_redeem_requests_on_owner_id"
    t.index ["private_token_id"], name: "index_redeem_requests_on_private_token_id"
    t.index ["sender_id"], name: "index_redeem_requests_on_sender_id"
  end

  create_table "transactions", force: :cascade do |t|
    t.bigint "sender_id"
    t.bigint "receiver_id"
    t.bigint "private_token_id", null: false
    t.string "category", null: false
    t.decimal "amount", null: false
    t.decimal "price"
    t.string "tx_hash"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category"], name: "index_transactions_on_category"
    t.index ["created_at"], name: "index_transactions_on_created_at"
    t.index ["private_token_id", "category"], name: "index_transactions_on_private_token_id_and_category"
    t.index ["receiver_id"], name: "index_transactions_on_receiver_id"
    t.index ["sender_id"], name: "index_transactions_on_sender_id"
  end

  create_table "user_private_tokens", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "private_token_id", null: false
    t.decimal "balance", default: "0.0"
    t.decimal "pending_balance", default: "0.0"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["private_token_id"], name: "index_user_private_tokens_on_private_token_id"
    t.index ["user_id", "private_token_id"], name: "index_user_private_tokens_on_user_id_and_private_token_id", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "api_key", limit: 32, null: false
    t.string "name", null: false
    t.string "short_description", null: false
    t.string "reoa"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["api_key"], name: "index_users_on_api_key"
    t.index ["email"], name: "index_users_on_email"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
end
