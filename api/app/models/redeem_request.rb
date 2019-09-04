class RedeemRequest < ApplicationRecord
  belongs_to :private_token
  belongs_to :owner, class_name: 'User'
  belongs_to :sender, class_name: 'User'

  validates :amount, numericality: { only_integer: true, greater_than: 0 }

  after_create :request_redeem!

  def request_redeem!
    user_token = UserPrivateToken.find_by(user_id: self.sender_id, private_token_id: self.private_token_id)
    user_token.balance -= self.amount
    raise 'Not enough balance' if user_token.balance < 0
    user_token.pending_balance += self.amount

    user_token.save!
  end

  def sign_by_owner!
    raise 'Already signed' if self.signed_by_owner

    update!(signed_by_owner: true)
    check_all_signed! # This must not throw an exception
  end

  def sign_by_sender!
    raise 'Already signed' if self.signed_by_sender

    update!(signed_by_sender: true)
    check_all_signed! # This must not throw an exception
  end

  private
    def check_all_signed!
      if signed_by_owner && signed_by_sender
        puts "Both signed token redemption, burn the token"

        Transaction.burn!(self.private_token_id, self.sender_id, self.amount)
      end
    end
end
