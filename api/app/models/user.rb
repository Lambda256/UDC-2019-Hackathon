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
  def recharge!(amount = 100)
    faucet_balance = Luniverse::get_wallet_balance!(Luniverse::TEAM_WALLET)

    raise 'Not enough funds' if amount > faucet_balance

    res = Luniverse::recharge!(self.reoa, amount)

    puts "Team sent #{amount} HOUR (#{res['txHash']}) -> Current user balance: #{time_balance!}"
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
