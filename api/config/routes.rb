Rails.application.routes.draw do
  root to: 'application#status'
  get '/status', to: 'application#status'
  get '/charity_stats', to: 'application#charity_stats'

  resources :users, only: [:create] do
    collection do
      get :me
      get :api_key
      get :my_wallet
      patch :recharge
    end
  end
  resources :private_tokens, only: [:index, :create] do
    member do
      get :history
      post :buy
    end
  end

  resources :redeem_requests, only: [:create] do
    member do
      patch :sign_by_owner
      patch :sign_by_sender
    end

    collection do
      get :history
    end
  end

  resources :orders, only: [:index, :create] do
    member do
      patch :take
    end
  end
end
