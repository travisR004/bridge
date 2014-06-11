Bridge::Application.routes.draw do
  root to: "static_pages#home"
    get "static_pages/root"
    post "static_pages/allow_access"
    get "static_pages/not_home"

  namespace :api, defaults: {format: :json} do
    resources :images
    resources :explores, only: [:index]
    resources :users, only: [:show, :create, :update, :destroy]
    resources :tags, only: [:index, :create]
    resources :passion_joins, only: [:create, :destroy]
    resources :skill_joins, only: [:create, :destroy]
    resources :projects, only: [:create, :show, :update, :destroy, :index]
    resources :partnerships, only: [:index]
  end
  resource :session, only: [:new, :create, :destroy]
end
