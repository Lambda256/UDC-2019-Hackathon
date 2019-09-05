require 'luniverse'

class ApplicationController < ActionController::API
  include ActionController::HttpAuthentication::Token::ControllerMethods

  def status
    render json: { status: :ok }
  end

  def charity_stats
    stats = Luniverse::CHARITY_REOA.inject({}) do |h, a|
      h[a[0]] = { reoa: a[1], balance: Luniverse::get_wallet_balance!(a[1]) }
      h
    end
    render json: {
      total_hours: Transaction.where(category: 'mint').count,
      stats: stats
    }
  end

  protected
    def render_first_error!(obj)
      render_error!(obj.errors.full_messages.first)
    end

    def render_error!(msg, status = :unprocessable_entity)
      render json: { error: msg }, status: status
    end

    def ensure_user!
      if current_user.nil?
        self.headers['WWW-Authenticate'] = 'Token realm="Application"'
        render json: { error: 'User not found' }
      end
    end

    def current_user
      return @current_user unless @current_user.nil?

      authenticate_with_http_token do |token, _|
        return @current_user if @current_user = User.find_by(api_key: token)
      end

      nil
    end
end
