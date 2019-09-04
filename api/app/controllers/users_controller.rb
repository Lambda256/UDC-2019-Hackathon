require 'luniverse'

class UsersController < ApplicationController
  before_action :ensure_user!, only: [:me, :my_wallet, :recharge]

  # POST - /users.json
  def create
    @user = User.new(user_params)
    if @user.save
      render json: user_json(@user), status: :created
    else
      render_first_error!(@user)
    end
  end

  # GET - /users/me.json
  def me
    render json: user_json(@current_user)
  end

  # PATH - /users/recharge.json
  def recharge
    @current_user.recharge!
    render json: { hour_balance: @current_user.hour_balance! }
  end

  # GET - /users/api_key.json
  def api_key
    @user = User.find_by(email: params[:email])

    if @user && @user.authenticate(params[:password])
      render json: user_json(@user)
    else
      render json: { error: "Invalid email or password" }
    end
  end

  # GET - /users/my_wallet.json
  def my_wallet
    render json: {
      hour_balance: @current_user.hour_balance!,
      my_tokens: @current_user.user_private_tokens.includes(:private_token).as_json(only: [:private_token_id, :balance, :pending_balance]),
      # time_transactions: Luniverse::get_transactions!(@current_user.reoa),
      private_transactions: Transaction.where('sender_id = ? OR receiver_id = ?', @current_user.id, @current_user.id).order(id: :desc)
    }
  end

  private
    def user_json(u)
      u.as_json(except: [:password_digest]).merge(profile_picture: u.profile_picture.attached? ? url_for(u.profile_picture) : nil)
    end

    def user_params
      params.require(:user).permit(:email, :password, :name, :short_description, :profile_picture)
    end
end