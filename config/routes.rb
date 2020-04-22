Rails.application.routes.draw do
  devise_for :users
  root 'groups#index'

  # :indexを追記
  resources :users, only: [:index, :edit, :update]
  resources :groups, only: [:new, :create, :edit, :update] do
    resources :messages, only: [:index, :create]
  end

end
