class RedeemRequestsController < ApplicationController
  before_action :ensure_user!
  before_action :set_redeem_request!, only: [:sign_by_owner, :sign_by_sender]

  # POST - /redeem_requests.json
  def create
    @p = redeem_request_params
    unless token = PrivateToken.find_by(id: @p[:private_token_id])
      render_error! 'Invalid token ID' and return
    end

    user_token = UserPrivateToken.find_by(user_id: @current_user.id, private_token_id: @p[:private_token_id])
    if user_token.nil? || user_token.balance < @p[:amount].to_d
      render_error! 'Not enough balance' and return
    end

    begin
      redeem_request = RedeemRequest.create!(
        private_token_id: token.id,
        owner_id: token.owner_id,
        sender_id: user_token.user_id,
        amount: @p[:amount]
      )

      render json: {
        redeem_request: redeem_request,
        token_balance: user_token.reload
      }
    rescue => e
      render_error! e.message
    end
  end

  # GET - /redeem_requests/history.json
  def history
    render json: {
      received: @current_user.redeem_requests_received,
      sent: @current_user.redeem_requests_sent
    }
  end

  # PATCH - /redeem_requests/:id/sign_by_owner.json
  def sign_by_owner
    begin
      raise 'Permission denied' if @redeem_request.owner_id != @current_user.id
      @redeem_request.sign_by_owner!

      render json: @redeem_request
    rescue => e
      render_error! e.message
    end
  end

  # PATCH - /redeem_requests/:id/sign_by_sender.json
  def sign_by_sender
    begin
      raise 'Permission denied' if @redeem_request.sender_id != @current_user.id
      @redeem_request.sign_by_sender!

      render json: @redeem_request
    rescue => e
      render_error! e.message
    end
  end

  private
    def redeem_request_params
      params.require(:redeem_request).permit(:private_token_id, :amount)
    end

    def set_redeem_request!
      @redeem_request = RedeemRequest.find_by(id: params[:id])

      render_error! 'Invalid redeem request ID' unless @redeem_request
    end
end