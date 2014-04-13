Bridge::Application.routes.draw do
  root to: "static_pages#home"
    get "static_pages/root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show, :update, :destroy]
    resources :tags, only: [:index, :create]
    resources :user_join_tags, only: [:create, :destroy]
  end

  resource :session, only: [:new, :create, :destroy]
end
