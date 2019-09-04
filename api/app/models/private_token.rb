# NOTE:
# To be fully decentralized, this should be a side token on Luniverse blockchain
# Currently we don't have APIs for dynamic side token creation & redeem processes,
# and full decentraliazion requires much more dev works, so let this private tokens centralized.

class PrivateToken < ApplicationRecord
  belongs_to :owner, class_name: 'User'
  has_many :users, through: :user_private_tokens
  has_many :transactions
  has_many_attached :images

  # Symbol format: 2-6 characters, alphanumeric
  validates :symbol, format: { with: /\A[A-Za-z0-9]{2,6}\Z/, message: 'Token symbol must be 2-6 alphanumeric characters' }
  validates :charity, inclusion: { in: %w(the_nature_conservancy red_cross alzheimers_association) }
  validates :initial_price, numericality: { greater_than_or_equal_to: 0 }
  validates_uniqueness_of :symbol, :owner_id

  before_save :upcase_symbol!

  # TODO: Use different REOAs for each charity account
  CHARITY_REOA = {
    the_nature_conservancy: '0x0bd8eb784511a418e708a24f9f5afa5d26d48257',
    red_cross: '0x0bd8eb784511a418e708a24f9f5afa5d26d48257',
    alzheimers_association: '0x0bd8eb784511a418e708a24f9f5afa5d26d48257',
    susan_g_komen: '0x0bd8eb784511a418e708a24f9f5afa5d26d48257'
  }

  # When a buyer buys a private token from the owner's profile page
  #  -> fund goes to the charity
  #  -> user receives 1 private token
  #  -> price increased
  def buy_and_donate!(buyer)
    raise 'User stopped selling tokens' unless self.mintable

    # buyer send the fund to the charity directly
    tx = Luniverse::transfer!(buyer.reoa, CHARITY_REOA[charity.to_sym], current_price)

    ActiveRecord::Base.transaction do
      Transaction.mint!(self.id, buyer.id, current_price, tx['txHash'])

      self.purchase_count += 1
      self.save!
    end
  end

  def supply
    sum = Transaction.where(private_token_id: self.id).group(:category).sum(:amount)
    # volume_24 = Transaction.where(private_token_id: self.id, category: 'sell').where('created_at > ?', 24.hours.ago).sum(:amount)

    {
      total_sold: sum['mint'].to_d,
      total_redeem: sum['burn'].to_d,
      circulating_supply: sum['mint'].to_d - sum['burn'].to_d,
      volume_all_time: sum['sell'].to_d
      # volume_24_hour: volume_24
    }
  end

  # Must not be updated once deployed
  def current_price
    (initial_price * (1.01 ** purchase_count)).round(2)
  end

  # TODO:
  # def last_market_price

  private
    def upcase_symbol!
      self.symbol.upcase!
    end
end
