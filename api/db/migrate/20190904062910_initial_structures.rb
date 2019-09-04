class InitialStructures < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email, null: false
      t.string :password_digest, null: false
      t.string :api_key, limit: 32, null: false
      t.string :name, null: false
      t.string :short_description, null: false
      t.string :reoa # Remote External Owned Account

      t.timestamps
    end
    add_index :users, :email
    add_index :users, :api_key

    create_table :private_tokens do |t|
      t.string :symbol, null: false
      t.bigint :owner_id, null: false
      t.decimal :initial_price, null: false
      t.integer :purchase_count, default: 0
      t.string :charity, null: false
      t.boolean :mintable, default: true

      t.string :category, null: false
      t.string :offers, null: false
      t.text :description, null: false

      t.json :social_links

      t.timestamps
    end
    add_index :private_tokens, :symbol, unique: :true
    add_index :private_tokens, :owner_id, unique: :true

    create_table :user_private_tokens do |t|
      t.bigint :user_id, null: false
      t.bigint :private_token_id, null: false
      t.decimal :balance, default: 0
      t.decimal :pending_balance, default: 0

      t.timestamps
    end
    add_index :user_private_tokens, [:user_id, :private_token_id], unique: true
    add_index :user_private_tokens, :private_token_id

    create_table :transactions do |t|
      t.bigint :sender_id
      t.bigint :receiver_id
      t.bigint :private_token_id, null: false
      t.string :category, null: false
      t.decimal :amount, null: false
      t.decimal :price, default: nil
      t.string :tx_hash, default: nil

      t.timestamps
    end
    add_index :transactions, :sender_id
    add_index :transactions, :receiver_id
    add_index :transactions, [:private_token_id, :category]
    add_index :transactions, :category
    add_index :transactions, :created_at
  end
end
