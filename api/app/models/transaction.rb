require 'luniverse'

class Transaction < ApplicationRecord
  belongs_to :sender, class_name: :User, optional: true
  belongs_to :receiver, class_name: :User, optional: true

  validates :category, inclusion: { in: %w(mint burn sell) }
  validates :amount, numericality: { greater_than_or_equal_to: 0 }

  def self.mint!(private_token_id, receiver_id, price, tx_hash)
    receiver_token = UserPrivateToken.find_or_create_by!(user_id: receiver_id, private_token_id: private_token_id)

    ActiveRecord::Base.transaction do
      receiver_token.lock!
      receiver_token.balance += 1
      self.create!(
        private_token_id: private_token_id,
        sender_id: nil,
        receiver_id: receiver_id,
        category: 'mint',
        amount: 1,
        price: price,
        tx_hash: tx_hash
      )
      receiver_token.save!
    end
  end

  def self.burn!(private_token_id, sender_id, amount)
    sender_token = UserPrivateToken.find_or_create_by!(user_id: sender_id, private_token_id: private_token_id)
    raise 'No tokens to burn' if sender_token.nil?

    ActiveRecord::Base.transaction do
      sender_token.lock!
      sender_token.pending_balance -= amount
      raise 'Pending balance is incorrect!' if sender_token.pending_balance < 0

      Transaction.create!(
        private_token_id: private_token_id,
        sender_id: sender_id,
        receiver_id: nil,
        category: 'burn',
        amount: amount
      )
      sender_token.save!
    end
  end

  def self.sell!(private_token_id, sender_id, receiver_id, price, amount)
    sender_token = UserPrivateToken.find_by(user_id: sender_id, private_token_id: private_token_id)
    raise 'Not enough balance' if sender_token.nil? || sender_token.balance < amount

    sender = User.find_by(id: sender_id)
    raise 'Sender not found' if sender.nil?
    receiver = User.find_by(id: receiver_id)
    raise 'Receiver not found' if receiver.nil?

    # Receiver send TIME to sender
    tx = Luniverse::paid_transfer!(receiver.reoa, sender.reoa, price * amount)

    # Sender send PrivateToken to receiver
    ActiveRecord::Base.transaction do
      receiver_token = UserPrivateToken.find_or_create_by!(user_id: receiver_id, private_token_id: private_token_id)

      sender_token.lock!
      receiver_token.lock!

      sender_token.pending_balance -= amount
      raise 'Not enough pending balance' if sender_token.pending_balance < 0
      receiver_token.balance += amount

      self.create!(
        private_token_id: private_token_id,
        sender_id: sender_id,
        receiver_id: receiver_id,
        category: 'sell',
        price: price,
        amount: amount,
        tx_hash: tx['txHash']
      )
      sender_token.save!
      receiver_token.save!
    end
  end

  def receipt!
    self.tx_hash && Luniverse::get_receipt!(self.tx_hash)
  end
end
