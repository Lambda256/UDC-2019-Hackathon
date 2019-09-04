class CreateRedeemRequests < ActiveRecord::Migration[5.2]
  def change
    create_table :redeem_requests do |t|
      t.bigint :private_token_id, null: false
      t.bigint :owner_id, null: false
      t.bigint :sender_id, null: false
      t.bigint :amount, null: false
      t.boolean :signed_by_owner, default: false
      t.boolean :signed_by_sender, default: false

      t.timestamps
    end
    add_index :redeem_requests, :private_token_id
    add_index :redeem_requests, :owner_id
    add_index :redeem_requests, :sender_id
  end
end
