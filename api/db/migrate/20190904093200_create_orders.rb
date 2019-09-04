class CreateOrders < ActiveRecord::Migration[5.2]
  def change
    create_table :orders do |t|
      t.bigint :private_token_id, null: false
      t.bigint :maker_id, null: false
      t.bigint :taker_id, default: nil
      t.decimal :price, null: false
      t.decimal :amount, null: false

      t.timestamps
    end
    add_index :orders, [:private_token_id, :price, :created_at]
    add_index :orders, :maker_id
    add_index :orders, :taker_id
  end
end
