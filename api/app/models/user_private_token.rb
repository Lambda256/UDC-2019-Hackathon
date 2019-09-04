class UserPrivateToken < ApplicationRecord
  belongs_to :user
  belongs_to :private_token
  # delegate :symbol, to: :private_token

  validates_presence_of :user_id, :private_token_id
  validates :balance, numericality: { greater_than_or_equal_to: 0 }
end