require 'luniverse'

class User < ApplicationRecord
  has_secure_password
  has_many :user_private_tokens
  has_many :private_tokens, through: :user_private_tokens
  has_many :redeem_requests_received, class_name: :RedeemRequest, foreign_key: :owner_id
  has_many :redeem_requests_sent, class_name: :RedeemRequest, foreign_key: :sender_id
  has_one_attached :profile_picture

  validates :name, presence: true
  validates :short_description, presence: true
  validates :password, length: { minimum: 8 }, on: :create
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true

  before_create :generate_api_key!
  after_create :create_reoa!
  before_save :downcase_email!

  # TODO: This should be called once user finished payment for HOUR tokens
  # This will be called manually for test purpose during this Hackathon
  def recharge!(amount = 1000)
    faucet_balance = Luniverse::get_wallet_balance!(Luniverse::TEAM_WALLET)

    raise 'Not enough funds' if amount > faucet_balance

    res = Luniverse::recharge!(self.reoa, amount)

    puts "Team sent #{amount} HOUR (#{res['txHash']}) -> Current user balance: #{time_balance!}"
  end

  # When a buyer buys a private token from the owner's profile page
  #  -> fund goes to the charity
  #  -> user receives 1 private token
  #  -> price increased
  def donate_and_buy!(token)
    raise 'User stopped selling tokens' unless token.mintable

    # buyer send the fund to the charity directly
    tx = Luniverse::donate!(self.reoa, token.charity, token.current_price)

    ActiveRecord::Base.transaction do
      ::Transaction.mint!(token.id, self.id, token.current_price, tx['txHash'])

      token.purchase_count += 1
      token.save!
    end

    puts "#{self.name} bought 1 #{token.symbol} at #{token.current_price} => #{token.charity} received the fund"
  end

  def time_balance!
    Luniverse::get_wallet_balance!(self.reoa)
  end

  private
    def generate_api_key!
      self.api_key = SecureRandom.uuid.split('-').join
    end

    def create_reoa!
      update!(reoa: Luniverse::create_or_retrieve_wallet!(self.id))
    end

    def downcase_email!
      self.email.downcase!
    end
end
