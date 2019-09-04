class OrdersController < ApplicationController
  before_action :ensure_user!, except: [:index]
  before_action :set_order!, only: [:take]

  # GET /orders.json?private_token_id=:id
  def index
    render json: Order.best_bids(params[:private_token_id], 6)
  end

  # POST - /orders.json
  def create
    @order = Order.new(order_params)
    @order.maker_id = @current_user.id

    if @order.save
      render json: @order, status: :created
    else
      render_first_error!(@order)
    end
  end

  # PATCH - /orders/:id/take.json
  def take
    unless @order.takeable?
      render_error!('You can only take the best order') and return
    end

    begin
      @order.take!(@current_user.id)
      render json: @order
    rescue => e
      render_error! e.message
    end
  end

  private
    def order_params
      params.require(:order).permit(:private_token_id, :price, :amount)
    end

    def set_order!
      @order = Order.find_by(id: params[:id])

      render_error! 'Invalid order ID' unless @order
    end
end