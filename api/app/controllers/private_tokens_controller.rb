class PrivateTokensController < ApplicationController
  before_action :ensure_user!, only: [:create, :buy]
  before_action :set_private_token!, only: [:buy, :holders]

  # GET - /private_tokens.json
  def index
    render json: PrivateToken.all.order(id: :asc).map { |t| token_json(t) }
  end

  # POST - /private_tokens.json
  def create
    @private_token = PrivateToken.new(private_token_params)
    @private_token.owner_id = @current_user.id

    if @private_token.save
      render json: token_json(@private_token), status: :created
    else
      render_first_error!(@private_token)
    end
  end

  # POST - /private_tokens/:id/buy.json
  def buy
    begin
      @current_user.donate_and_buy!(@private_token)

      render json: {
        hour_balance: @current_user.hour_balance!,
        private_tokens: @current_user.private_tokens.
          as_json(only: [:id, :symbol, :initial_price, :purchase_count], methods: [:current_price, :supply]),
        private_token_balances: @current_user.user_private_tokens.
          as_json(only: [:user_id, :private_token_id, :balance, :pending_balance])
      }
    rescue => e
      msg = e.message =~ /TX_FAILED/ ? 'Not enough HOUR balance' : e.message
      render_error!(msg, :service_unavailable)
    end
  end

  # GET - /private_tokens/:id/holders.json
  def holders
    render json: UserPrivateToken.where(private_token_id: @private_token.id)
  end

  private
    def private_token_params
      params.require(:private_token).permit(:symbol, :initial_price, :charity, :offers, :description, :category, social_links: {}, images: [])
    end

    def set_private_token!
      @private_token = PrivateToken.find_by(id: params[:id])

      render_error! 'PrivateToken not found' unless @private_token
    end

    def token_json(t)
      t.as_json(
        methods: [:current_price, :supply, :holder_count, :total_donation],
        include: { owner: { only: [:name, :short_description] } }
      ).merge({
        profile_picture: url_for(t.owner.profile_picture),
        images: t.images.map { |img| url_for(img) }
      })
    end
end